from __future__ import annotations

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch import Tensor


class Conv2d_BN_Block(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, **kwargs) -> None:
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, bias=True, **kwargs),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(inplace=True),
        )

    def forward(self, x: Tensor) -> Tensor:
        return self.conv(x)


class Up_Conv_Block(nn.Module):
    def __init__(self, in_channels: int, out_channels: int) -> None:
        super().__init__()
        self.up = nn.Sequential(
            nn.Upsample(scale_factor=2),
            nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=True),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(inplace=True),
        )

    def forward(self, x: Tensor) -> Tensor:
        return self.up(x)


class V1Module(nn.Module):
    def __init__(self, in_channels: int) -> None:
        super().__init__()
        self.branch1x1 = Conv2d_BN_Block(in_channels, 32, kernel_size=1)
        self.branch3x3_1 = Conv2d_BN_Block(in_channels, 52, kernel_size=1)
        self.branch3x3_2a = Conv2d_BN_Block(52, 52, kernel_size=(1, 3), padding=(0, 1))
        self.branch3x3_2b = Conv2d_BN_Block(52, 52, kernel_size=(3, 1), padding=(1, 0))

        self.branch3x3dbl_1 = Conv2d_BN_Block(in_channels, 64, kernel_size=1)
        self.branch3x3dbl_2 = Conv2d_BN_Block(64, 52, kernel_size=3, padding=1)
        self.branch3x3dbl_3a = Conv2d_BN_Block(52, 52, kernel_size=(1, 3), padding=(0, 1))
        self.branch3x3dbl_3b = Conv2d_BN_Block(52, 52, kernel_size=(3, 1), padding=(1, 0))

        self.branch_pool = Conv2d_BN_Block(in_channels, 16, kernel_size=1)

    def forward(self, x: Tensor) -> Tensor:
        branch1x1 = self.branch1x1(x)
        branch3x3 = torch.cat([self.branch3x3_2a(self.branch3x3_1(x)), self.branch3x3_2b(self.branch3x3_1(x))], dim=1)
        branch3x3dbl_tmp = self.branch3x3dbl_2(self.branch3x3dbl_1(x))
        branch3x3dbl = torch.cat([self.branch3x3dbl_3a(branch3x3dbl_tmp), self.branch3x3dbl_3b(branch3x3dbl_tmp)], dim=1)
        branch_pool = self.branch_pool(F.avg_pool2d(x, kernel_size=3, stride=1, padding=1))
        return torch.cat([branch1x1, branch3x3, branch3x3dbl, branch_pool], dim=1)


class V1Block(nn.Module):
    def __init__(self, in_channels: int, filter_0: int, filter_1: int, filter_2: int, filter_3: int) -> None:
        super().__init__()
        self.conv1 = Conv2d_BN_Block(in_channels, filter_0, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Sequential(
            nn.Conv2d(filter_0, filter_0, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm2d(filter_0),
            nn.LeakyReLU(inplace=True),
        )
        self.conv3 = Conv2d_BN_Block(filter_0, filter_1, kernel_size=3, stride=1, padding=1)
        self.conv4 = V1Module(filter_1)
        self.conv5 = Conv2d_BN_Block(filter_2, filter_3, kernel_size=3, stride=1, padding=1)
        self.conv6 = nn.Sequential(
            nn.Conv2d(filter_3, filter_3, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm2d(filter_3),
            nn.LeakyReLU(inplace=True),
        )
        self.maxpool = nn.MaxPool2d(kernel_size=2, stride=2)

    def forward(self, x: Tensor) -> tuple[Tensor, Tensor, Tensor, Tensor]:
        x1 = self.conv1(x)
        x2 = self.conv2(x1)
        c1 = x2
        x2 = self.maxpool(x2)
        x3 = self.conv3(x2)
        x4 = self.conv4(x3)
        c2 = x4
        x4 = self.maxpool(x4)
        x5 = self.conv5(x4)
        x6 = self.conv6(x5)
        c3 = x6
        x6 = self.maxpool(x6)
        return x6, c1, c2, c3


class V2Block(nn.Module):
    def __init__(self, in_channels: int, pool_features: int) -> None:
        super().__init__()
        self.branch1x1 = Conv2d_BN_Block(in_channels, 128, kernel_size=1)
        self.branch5x5_1 = Conv2d_BN_Block(in_channels, 48, kernel_size=1)
        self.branch5x5_2 = Conv2d_BN_Block(48, 64, kernel_size=5, padding=2)
        self.branch3x3dbl_1 = Conv2d_BN_Block(in_channels, 64, kernel_size=1)
        self.branch3x3dbl_2 = Conv2d_BN_Block(64, 96, kernel_size=3, padding=1)
        self.branch3x3dbl_3 = Conv2d_BN_Block(96, 64, kernel_size=3, padding=1)
        self.branch_pool = Conv2d_BN_Block(in_channels, 256, kernel_size=1)

    def forward(self, x: Tensor) -> Tensor:
        branch1x1 = self.branch1x1(x)
        branch5x5 = self.branch5x5_2(self.branch5x5_1(x))
        branch3x3dbl = self.branch3x3dbl_3(self.branch3x3dbl_2(self.branch3x3dbl_1(x)))
        branch_pool = self.branch_pool(F.avg_pool2d(x, kernel_size=3, stride=1, padding=1))
        return torch.cat([branch1x1, branch5x5, branch3x3dbl, branch_pool], dim=1)


class V4Block(nn.Module):
    def __init__(self, in_channels: int, out_channels: int) -> None:
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=True),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(inplace=True),
        )
        self.conv_ = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=1, padding=0, bias=True),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(inplace=True),
        )

    def forward(self, x: Tensor, y: Tensor) -> Tensor:
        return torch.cat([self.conv(x), self.conv_(y)], dim=1)


class ITBottleneck(nn.Module):
    def __init__(self, in_channels: int, out_channels: int) -> None:
        super().__init__()
        self.conv_v1 = nn.Conv2d(512, 1024, kernel_size=5, stride=2, padding=2, bias=True)
        self.conv_v2 = nn.Conv2d(512, 1024, kernel_size=5, stride=2, padding=2, bias=True)
        self.conv_v4 = nn.Conv2d(2048, 2048, kernel_size=3, stride=1, padding=1, bias=True)
        self.norm_v1 = nn.BatchNorm2d(1024)
        self.relu_v1 = nn.LeakyReLU(inplace=True)
        self.norm_v2 = nn.BatchNorm2d(1024)
        self.relu_v2 = nn.LeakyReLU(inplace=True)
        self.norm_v4 = nn.BatchNorm2d(2048)
        self.relu_v4 = nn.LeakyReLU(inplace=True)
        self.norm_v12 = nn.BatchNorm2d(1024)
        self.relu_v12 = nn.LeakyReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=2, stride=2)
        self.v4_conv1 = nn.Conv2d(2048, 1024, kernel_size=3, padding=2, stride=1, dilation=2, bias=True)

    def forward(self, v1: Tensor, v2: Tensor, v4: Tensor) -> Tensor:
        v1_ = self.relu_v1(self.norm_v1(self.conv_v1(v1)))
        v2_ = self.relu_v2(self.norm_v2(self.conv_v2(v2)))
        v4_ = self.relu_v4(self.norm_v4(self.conv_v4(v4)))
        v12_ = torch.cat([v1_, v2_], dim=1)
        vm = v4_ * v12_
        v4_ = self.v4_conv1(v4_)
        return torch.cat([v4_, vm], dim=1)


class VCANet(nn.Module):
    def __init__(self, in_channels: int = 1, out_channels: int = 1) -> None:
        super().__init__()
        self.in_channels = in_channels
        self.out_channels = out_channels
        n1 = 64
        filters = [n1, n1 * 2, n1 * 4, n1 * 8, n1 * 16]

        self.V1 = V1Block(in_channels, filters[0], filters[1], filters[2], filters[3])
        self.V2 = V2Block(filters[3], filters[3])
        self.V4 = V4Block(filters[3], filters[4])
        self.IT = ITBottleneck(filters[4], filters[4])
        self.maxpool = nn.MaxPool2d(kernel_size=2, stride=2)

        self.up1 = Up_Conv_Block(3072, filters[3])
        self.upconv1 = Conv2d_BN_Block(2560, filters[3], kernel_size=3, stride=1, padding=1)
        self.up2 = Up_Conv_Block(filters[3], filters[2])
        self.upconv2 = Conv2d_BN_Block(768, filters[2], kernel_size=3, stride=1, padding=1)
        self.up3 = Up_Conv_Block(filters[2], filters[1])
        self.upconv3 = Conv2d_BN_Block(384, filters[1], kernel_size=3, stride=1, padding=1)
        self.up4 = Up_Conv_Block(filters[1], filters[0])
        self.upconv4 = Conv2d_BN_Block(filters[1], filters[0], kernel_size=3, stride=1, padding=1)
        self.outconv = nn.Conv2d(filters[0], out_channels, kernel_size=1, stride=1, padding=0)

    def forward(self, inputs: Tensor) -> Tensor:
        x_v1, c1, c2, c3 = self.V1(inputs)
        x_v2 = self.V2(x_v1)
        x_v4 = self.V4(x_v2, x_v1)
        c4 = x_v4
        x_v4 = self.maxpool(x_v4)
        x_it = self.IT(x_v1, x_v2, x_v4)

        y1 = self.up1(x_it)
        y1 = torch.cat([c4, y1], dim=1)
        y1 = self.upconv1(y1)

        y2 = self.up2(y1)
        y2 = torch.cat([c3, y2], dim=1)
        y2 = self.upconv2(y2)

        y3 = self.up3(y2)
        y3 = torch.cat([c2, y3], dim=1)
        y3 = self.upconv3(y3)

        y4 = self.up4(y3)
        y4 = torch.cat([c1, y4], dim=1)
        y4 = self.upconv4(y4)

        return self.outconv(y4)
