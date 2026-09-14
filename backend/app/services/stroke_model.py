from __future__ import annotations

from pathlib import Path

import torch
from PIL import Image
from torch import Tensor, nn
from torchvision.transforms import functional as TF


class ConvBN(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, kernel_size: tuple[int, int] = (3, 3)) -> None:
        super().__init__()
        padding = (kernel_size[0] // 2, kernel_size[1] // 2)
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size, padding=padding, bias=True),
            nn.BatchNorm2d(out_channels),
        )

    def forward(self, x: Tensor) -> Tensor:
        return torch.relu(self.conv(x))


class InceptionBlock(nn.Module):
    def __init__(self, in_channels: int, branch_specs: dict[str, tuple[int, ...]]) -> None:
        super().__init__()
        self.branch1x1 = ConvBN(in_channels, branch_specs["branch1x1"][0], (1, 1))
        self.branch5x5_1 = ConvBN(in_channels, branch_specs["branch5x5_1"][0], (1, 1))
        self.branch5x5_2 = ConvBN(branch_specs["branch5x5_1"][0], branch_specs["branch5x5_2"][0], (5, 5))
        self.branch3x3dbl_1 = ConvBN(in_channels, branch_specs["branch3x3dbl_1"][0], (1, 1))
        self.branch3x3dbl_2 = ConvBN(branch_specs["branch3x3dbl_1"][0], branch_specs["branch3x3dbl_2"][0], (3, 3))
        self.branch3x3dbl_3a = ConvBN(branch_specs["branch3x3dbl_2"][0], branch_specs["branch3x3dbl_3a"][0], (1, 3))
        self.branch3x3dbl_3b = ConvBN(branch_specs["branch3x3dbl_3a"][0], branch_specs["branch3x3dbl_3b"][0], (3, 1))
        self.branch_pool = ConvBN(in_channels, branch_specs["branch_pool"][0], (1, 1))

    def forward(self, x: Tensor) -> Tensor:
        branch1 = self.branch1x1(x)
        branch5 = self.branch5x5_2(self.branch5x5_1(x))
        branch3 = self.branch3x3dbl_3b(self.branch3x3dbl_3a(self.branch3x3dbl_2(self.branch3x3dbl_1(x))))
        pooled = self.branch_pool(torch.nn.functional.avg_pool2d(x, kernel_size=3, stride=1, padding=1))
        return torch.cat((branch1, branch5, branch3, pooled), dim=1)


class V1InceptionBlock(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.branch1x1 = ConvBN(128, 32, (1, 1))
        self.branch3x3_1 = ConvBN(128, 52, (1, 1))
        self.branch3x3_2a = ConvBN(52, 52, (1, 3))
        self.branch3x3_2b = ConvBN(52, 52, (3, 1))
        self.branch3x3dbl_1 = ConvBN(128, 64, (1, 1))
        self.branch3x3dbl_2 = ConvBN(64, 52)
        self.branch3x3dbl_3a = ConvBN(52, 52, (1, 3))
        self.branch3x3dbl_3b = ConvBN(52, 52, (3, 1))
        self.branch_pool = ConvBN(128, 16, (1, 1))

    def forward(self, x: Tensor) -> Tensor:
        branch1 = self.branch1x1(x)
        branch3 = self.branch3x3_2b(self.branch3x3_2a(self.branch3x3_1(x)))
        branch3dbl = self.branch3x3dbl_3b(self.branch3x3dbl_3a(self.branch3x3dbl_2(self.branch3x3dbl_1(x))))
        pooled = self.branch_pool(torch.nn.functional.avg_pool2d(x, 3, 1, 1))
        return torch.cat((branch1, branch3, branch3dbl, pooled), dim=1)


class V2InceptionBlock(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.branch1x1 = ConvBN(512, 128, (1, 1))
        self.branch5x5_1 = ConvBN(512, 48, (1, 1))
        self.branch5x5_2 = ConvBN(48, 64, (5, 5))
        self.branch3x3dbl_1 = ConvBN(512, 64, (1, 1))
        self.branch3x3dbl_2 = ConvBN(64, 96)
        self.branch3x3dbl_3 = ConvBN(96, 64)
        self.branch_pool = ConvBN(512, 256, (1, 1))

    def forward(self, x: Tensor) -> Tensor:
        branch1 = self.branch1x1(x)
        branch5 = self.branch5x5_2(self.branch5x5_1(x))
        branch3 = self.branch3x3dbl_3(self.branch3x3dbl_2(self.branch3x3dbl_1(x)))
        pooled = self.branch_pool(torch.nn.functional.avg_pool2d(x, 3, 1, 1))
        return torch.cat((branch1, branch5, branch3, pooled), dim=1)


class VCAEncoder(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.V1 = nn.Module()
        self.V1.conv1 = ConvBN(2, 64)
        self.V1.conv2 = nn.Sequential(nn.Conv2d(64, 64, 1), nn.BatchNorm2d(64))
        self.V1.conv3 = ConvBN(64, 128)
        self.V1.conv4 = V1InceptionBlock()
        self.V1.conv5 = ConvBN(256, 512)
        self.V1.conv6 = nn.Sequential(nn.Conv2d(512, 512, 1), nn.BatchNorm2d(512))
        self.V2 = V2InceptionBlock()
        self.V4 = nn.Module()
        self.V4.conv = nn.Sequential(nn.Conv2d(512, 1024, 3, padding=1), nn.BatchNorm2d(1024), nn.ReLU(), nn.Conv2d(1024, 1024, 1), nn.BatchNorm2d(1024))
        self.V4.conv_ = nn.Sequential(nn.Conv2d(512, 1024, 1), nn.BatchNorm2d(1024))
        self.IT = nn.Module()
        self.IT.conv_v1 = nn.Conv2d(512, 1024, 5, padding=2)
        self.IT.conv_v2 = nn.Conv2d(512, 1024, 5, padding=2)
        self.IT.conv_v4 = nn.Conv2d(2048, 2048, 3, padding=1)
        self.IT.norm_v1 = nn.BatchNorm2d(1024)
        self.IT.norm_v2 = nn.BatchNorm2d(1024)
        self.IT.norm_v4 = nn.BatchNorm2d(2048)
        self.IT.norm_v12 = nn.BatchNorm2d(1024)
        self.IT.v4_conv1 = nn.Conv2d(2048, 1024, 3, padding=1)

        self.up1 = nn.Module()
        self.up1.up = nn.Sequential(nn.Upsample(scale_factor=2, mode="bilinear", align_corners=False), nn.Conv2d(3072, 512, 3, padding=1), nn.BatchNorm2d(512))
        self.upconv1 = nn.Module()
        self.upconv1.conv = nn.Sequential(nn.Conv2d(2560, 512, 3, padding=1), nn.BatchNorm2d(512))
        self.up2 = nn.Module()
        self.up2.up = nn.Sequential(nn.Upsample(scale_factor=2, mode="bilinear", align_corners=False), nn.Conv2d(512, 256, 3, padding=1), nn.BatchNorm2d(256))
        self.upconv2 = nn.Module()
        self.upconv2.conv = nn.Sequential(nn.Conv2d(768, 256, 3, padding=1), nn.BatchNorm2d(256))
        self.up3 = nn.Module()
        self.up3.up = nn.Sequential(nn.Upsample(scale_factor=2, mode="bilinear", align_corners=False), nn.Conv2d(256, 128, 3, padding=1), nn.BatchNorm2d(128))
        self.upconv3 = nn.Module()
        self.upconv3.conv = nn.Sequential(nn.Conv2d(384, 128, 3, padding=1), nn.BatchNorm2d(128))
        self.up4 = nn.Module()
        self.up4.up = nn.Sequential(nn.Upsample(scale_factor=2, mode="bilinear", align_corners=False), nn.Conv2d(128, 64, 3, padding=1), nn.BatchNorm2d(64))
        self.upconv4 = nn.Module()
        self.upconv4.conv = nn.Sequential(nn.Conv2d(128, 64, 3, padding=1), nn.BatchNorm2d(64))
        self.outconv = nn.Conv2d(64, 1, 1)

    @staticmethod
    def fit_channels(x: Tensor, channels: int) -> Tensor:
        if x.shape[1] == channels:
            return x
        if x.shape[1] > channels:
            return x[:, :channels]
        return torch.cat((x, x.new_zeros(x.shape[0], channels - x.shape[1], *x.shape[2:])), dim=1)

    def forward(self, x: Tensor) -> Tensor:
        x1 = torch.relu(self.V1.conv2(self.V1.conv1(x)))
        x1 = torch.relu(self.V1.conv3(torch.nn.functional.avg_pool2d(x1, 2)))
        x1 = self.V1.conv4(x1)
        x1 = self.fit_channels(x1, 256)
        x1 = torch.relu(self.V1.conv6(self.V1.conv5(torch.nn.functional.avg_pool2d(x1, 2))))
        x2 = self.V2(torch.nn.functional.avg_pool2d(x1, 2))
        x2 = self.fit_channels(x2, 512)
        x4 = torch.relu(self.V4.conv(torch.nn.functional.avg_pool2d(x2, 2)))
        v1_input = torch.nn.functional.interpolate(x1, size=x4.shape[-2:], mode="bilinear", align_corners=False)
        v2_input = torch.nn.functional.interpolate(x2, size=x4.shape[-2:], mode="bilinear", align_corners=False)
        v1 = torch.relu(self.IT.norm_v1(self.IT.conv_v1(v1_input)))
        v2 = torch.relu(self.IT.norm_v2(self.IT.conv_v2(v2_input)))
        v12 = torch.relu(self.IT.norm_v12((v1 + v2) / 2))
        v4 = torch.relu(self.IT.norm_v4(self.IT.conv_v4(torch.cat((v1, v2), dim=1))))
        it = torch.relu(self.IT.v4_conv1(v4))
        d1_input = self.fit_channels(torch.cat((v12, it, x4, v2), dim=1), 3072)
        d1 = self.up1.up(d1_input)
        x4_skip = torch.nn.functional.interpolate(x4, size=d1.shape[-2:], mode="bilinear", align_corners=False)
        it_skip = torch.nn.functional.interpolate(it, size=d1.shape[-2:], mode="bilinear", align_corners=False)
        d1 = torch.relu(self.upconv1.conv(self.fit_channels(torch.cat((d1, x4_skip, it_skip), dim=1), 2560)))
        d2 = self.up2.up(d1)
        d1_skip = torch.nn.functional.interpolate(d1, size=d2.shape[-2:], mode="bilinear", align_corners=False)
        d2 = torch.relu(self.upconv2.conv(self.fit_channels(torch.cat((d2, d1_skip), dim=1), 768)))
        d3 = self.up3.up(d2)
        d2_skip = torch.nn.functional.interpolate(d2, size=d3.shape[-2:], mode="bilinear", align_corners=False)
        d3 = torch.relu(self.upconv3.conv(self.fit_channels(torch.cat((d3, d2_skip), dim=1), 384)))
        d4 = self.up4.up(d3)
        d3_skip = torch.nn.functional.interpolate(d3, size=d4.shape[-2:], mode="bilinear", align_corners=False)
        d4 = torch.relu(self.upconv4.conv(self.fit_channels(torch.cat((d4, d3_skip), dim=1), 128)))
        return self.outconv(d4)


def load_model(checkpoint_path: Path, device: torch.device) -> VCAEncoder:
    model = VCAEncoder()
    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=True)
    model.load_state_dict(checkpoint, strict=True)
    model.to(device).eval()
    return model


def prepare_image(image: Image.Image, size: int = 256) -> Tensor:
    grayscale = image.convert("L")
    resized = TF.resize(grayscale, [size, size], antialias=True)
    tensor = TF.to_tensor(resized)
    return torch.cat((tensor, tensor), dim=0).unsqueeze(0)
