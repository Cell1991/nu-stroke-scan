from __future__ import annotations

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch import Tensor


class DWConv(nn.Module):
    def __init__(self, dim: int = 768) -> None:
        super().__init__()
        self.dwconv = nn.Conv2d(dim, dim, 3, 1, 1, bias=True, groups=dim)

    def forward(self, x: Tensor, H: int, W: int) -> Tensor:
        B, N, C = x.shape
        x = x.transpose(1, 2).view(B, C, H, W)
        x = self.dwconv(x)
        return x.flatten(2).transpose(1, 2)


class Mlp(nn.Module):
    def __init__(self, in_features: int, hidden_features: int | None = None, out_features: int | None = None, drop: float = 0.0) -> None:
        super().__init__()
        out_features = out_features or in_features
        hidden_features = hidden_features or in_features
        self.fc1 = nn.Linear(in_features, hidden_features)
        self.dwconv = DWConv(hidden_features)
        self.act = nn.GELU()
        self.fc2 = nn.Linear(hidden_features, out_features)
        self.drop = nn.Dropout(drop)

    def forward(self, x: Tensor, H: int, W: int) -> Tensor:
        x = self.fc1(x)
        x = self.dwconv(x, H, W)
        x = self.act(x)
        x = self.drop(x)
        x = self.fc2(x)
        x = self.drop(x)
        return x


class Attention(nn.Module):
    def __init__(self, dim: int, num_heads: int = 8, qkv_bias: bool = True, qk_scale: float | None = None, attn_drop: float = 0.0, proj_drop: float = 0.0, sr_ratio: int = 1) -> None:
        super().__init__()
        self.dim = dim
        self.num_heads = num_heads
        head_dim = dim // num_heads
        self.scale = qk_scale or head_dim**-0.5
        self.q = nn.Linear(dim, dim, bias=qkv_bias)
        self.kv = nn.Linear(dim, dim * 2, bias=qkv_bias)
        self.attn_drop = nn.Dropout(attn_drop)
        self.proj = nn.Linear(dim, dim)
        self.proj_drop = nn.Dropout(proj_drop)
        self.sr_ratio = sr_ratio
        if sr_ratio > 1:
            self.sr = nn.Conv2d(dim, dim, kernel_size=sr_ratio, stride=sr_ratio)
            self.norm = nn.LayerNorm(dim)

    def forward(self, x: Tensor, H: int, W: int) -> Tensor:
        B, N, C = x.shape
        q = self.q(x).reshape(B, N, self.num_heads, C // self.num_heads).permute(0, 2, 1, 3)
        if self.sr_ratio > 1:
            x_ = x.permute(0, 2, 1).reshape(B, C, H, W)
            x_ = self.sr(x_).reshape(B, C, -1).permute(0, 2, 1)
            x_ = self.norm(x_)
            kv = self.kv(x_).reshape(B, -1, 2, self.num_heads, C // self.num_heads).permute(2, 0, 3, 1, 4)
        else:
            kv = self.kv(x).reshape(B, -1, 2, self.num_heads, C // self.num_heads).permute(2, 0, 3, 1, 4)
        k, v = kv[0], kv[1]
        attn = (q @ k.transpose(-2, -1)) * self.scale
        attn = attn.softmax(dim=-1)
        attn = self.attn_drop(attn)
        x = (attn @ v).transpose(1, 2).reshape(B, N, C)
        x = self.proj(x)
        return self.proj_drop(x)


class Block(nn.Module):
    def __init__(self, dim: int, num_heads: int, mlp_ratio: float = 4.0, qkv_bias: bool = True, qk_scale: float | None = None, drop: float = 0.0, attn_drop: float = 0.0, sr_ratio: int = 1) -> None:
        super().__init__()
        self.norm1 = nn.LayerNorm(dim)
        self.attn = Attention(dim, num_heads=num_heads, qkv_bias=qkv_bias, qk_scale=qk_scale, attn_drop=attn_drop, proj_drop=drop, sr_ratio=sr_ratio)
        self.norm2 = nn.LayerNorm(dim)
        self.mlp = Mlp(in_features=dim, hidden_features=int(dim * mlp_ratio), drop=drop)

    def forward(self, x: Tensor, H: int, W: int) -> Tensor:
        x = x + self.attn(self.norm1(x), H, W)
        x = x + self.mlp(self.norm2(x), H, W)
        return x


class PatchEmbed(nn.Module):
    def __init__(self, patch_size: int = 2, in_chans: int = 1, embed_dim: int = 32) -> None:
        super().__init__()
        self.proj = nn.Conv2d(in_chans, embed_dim, kernel_size=patch_size, stride=patch_size)

    def forward(self, x: Tensor) -> tuple[Tensor, int, int]:
        x = self.proj(x)
        B, C, H, W = x.shape
        x = x.flatten(2).transpose(1, 2)
        return x, H, W


class StageBlock(nn.Module):
    def __init__(self, patch_size: int, in_chans: int, embed_dim: int, depths: int, num_heads: int, sr_ratio: int) -> None:
        super().__init__()
        self.patch_embed = PatchEmbed(patch_size=patch_size, in_chans=in_chans, embed_dim=embed_dim)
        self.block = nn.ModuleList([Block(dim=embed_dim, num_heads=num_heads, sr_ratio=sr_ratio) for _ in range(depths)])
        self.norm = nn.LayerNorm(embed_dim)

    def forward(self, x: Tensor) -> Tensor:
        B = x.shape[0]
        x, H, W = self.patch_embed(x)
        for blk in self.block:
            x = blk(x, H, W)
        x = self.norm(x)
        return x.reshape(B, H, W, -1).permute(0, 3, 1, 2).contiguous()


class MLP(nn.Module):
    def __init__(self, input_dim: int, embed_dim: int = 256) -> None:
        super().__init__()
        self.proj = nn.Linear(input_dim, embed_dim)

    def forward(self, x: Tensor) -> Tensor:
        x = x.flatten(2).transpose(1, 2)
        return self.proj(x)


class ConvModule(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, kernel_size: int = 1) -> None:
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels, kernel_size=kernel_size, bias=False)
        self.bn = nn.BatchNorm2d(out_channels)
        self.activate = nn.ReLU(inplace=True)

    def forward(self, x: Tensor) -> Tensor:
        return self.activate(self.bn(self.conv(x)))


class PatcherSegFormer(nn.Module):
    """Pure PyTorch SegFormer / PatchTransformer segmentation model.
    Matches checkpoints/patcher_best.ckpt exactly without requiring mmcv or SyncBatchNorm.
    """

    def __init__(self) -> None:
        super().__init__()
        embed_dims = [32, 64, 160, 256]
        num_heads = [1, 2, 5, 8]
        sr_ratios = [8, 4, 2, 1]
        depths = [2, 2, 2, 2]
        in_chans = [1, 32, 64, 160]

        self.encoder = nn.ModuleList([
            StageBlock(patch_size=2, in_chans=in_chans[i], embed_dim=embed_dims[i], depths=depths[i], num_heads=num_heads[i], sr_ratio=sr_ratios[i])
            for i in range(4)
        ])

        self.linear_c1 = MLP(embed_dims[0], 256)
        self.linear_c2 = MLP(embed_dims[1], 256)
        self.linear_c3 = MLP(embed_dims[2], 256)
        self.linear_c4 = MLP(embed_dims[3], 256)
        self.linear_fuse = ConvModule(1024, 256, 1)
        self.linear_pred = nn.Conv2d(256, 1, 1)
        self.conv_seg = nn.Conv2d(128, 1, 1)

    def forward(self, x: Tensor) -> Tensor:
        orig_size = x.shape[-2:]
        c1 = self.encoder[0](x)
        c2 = self.encoder[1](c1)
        c3 = self.encoder[2](c2)
        c4 = self.encoder[3](c3)

        n, _, h, w = c4.shape
        _c4 = self.linear_c4(c4).permute(0, 2, 1).reshape(n, -1, h, w)
        _c4 = F.interpolate(_c4, size=c1.shape[-2:], mode="bilinear", align_corners=False)

        _c3 = self.linear_c3(c3).permute(0, 2, 1).reshape(n, -1, c3.shape[-2], c3.shape[-1])
        _c3 = F.interpolate(_c3, size=c1.shape[-2:], mode="bilinear", align_corners=False)

        _c2 = self.linear_c2(c2).permute(0, 2, 1).reshape(n, -1, c2.shape[-2], c2.shape[-1])
        _c2 = F.interpolate(_c2, size=c1.shape[-2:], mode="bilinear", align_corners=False)

        _c1 = self.linear_c1(c1).permute(0, 2, 1).reshape(n, -1, c1.shape[-2], c1.shape[-1])

        _c = self.linear_fuse(torch.cat([_c4, _c3, _c2, _c1], dim=1))
        out = self.linear_pred(_c)
        out = F.interpolate(out, size=orig_size, mode="bilinear", align_corners=False)
        return out
