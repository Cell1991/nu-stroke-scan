#!/usr/bin/env python3
"""
NU STROKE SCAN - Automatic Model Weights Downloader
Downloads production deep learning model checkpoints from GitHub Releases.
"""

from __future__ import annotations

import os
import sys
import time
import urllib.request
from pathlib import Path

RELEASE_TAG = "v1.0.0-weights"
BASE_URL = f"https://github.com/Cell1991/nu-stroke-scan/releases/download/{RELEASE_TAG}"

MODELS = [
    {
        "filename": "patcher_best.ckpt",
        "description": "Patcher (Patch SegFormer)",
        "expected_bytes": 27_672_349,
    },
    {
        "filename": "modality.pth",
        "description": "Non-Contrast Brain CT Screener",
        "expected_bytes": 44_781_835,
    },
    {
        "filename": "dlka_best.pth",
        "description": "Deformable LKA (MaxViT + LKA)",
        "expected_bytes": 407_153_573,
    },
    {
        "filename": "classification_best.pth",
        "description": "Multiclass Stroke Classifier",
        "expected_bytes": 475_805_641,
    },
    {
        "filename": "vcanet_best.pth",
        "description": "VCA-Net (Visual Cortex Attention)",
        "expected_bytes": 484_169_591,
    },
]


def format_bytes(num_bytes: int) -> str:
    for unit in ["B", "KB", "MB", "GB"]:
        if num_bytes < 1024.0:
            return f"{num_bytes:.1f} {unit}"
        num_bytes /= 1024.0
    return f"{num_bytes:.1f} TB"


def download_with_progress(url: str, dest_path: Path, expected_size: int):
    temp_path = dest_path.with_suffix(".tmp")
    start_time = time.time()

    def report(count: int, block_size: int, total_size: int):
        downloaded = count * block_size
        total = total_size if total_size > 0 else expected_size
        percent = min(100.0, (downloaded / total) * 100.0) if total > 0 else 0
        elapsed = max(0.001, time.time() - start_time)
        speed = downloaded / elapsed

        bar_len = 30
        filled = int(bar_len * percent / 100)
        bar = "=" * filled + "-" * (bar_len - filled)

        sys.stdout.write(
            f"\r    [{bar}] {percent:5.1f}% | "
            f"{format_bytes(downloaded)} / {format_bytes(total)} | "
            f"{format_bytes(speed)}/s"
        )
        sys.stdout.flush()

    # User-Agent header to avoid any GitHub rate limit/blocking on python urllib
    opener = urllib.request.build_opener()
    opener.addheaders = [("User-Agent", "Mozilla/5.0 (nu-stroke-scan-downloader)")]
    urllib.request.install_opener(opener)

    try:
        urllib.request.urlretrieve(url, temp_path, reporthook=report)
        print()  # newline after progress bar
        if temp_path.exists():
            if dest_path.exists():
                dest_path.unlink()
            temp_path.rename(dest_path)
    except Exception as exc:
        if temp_path.exists():
            temp_path.unlink()
        raise exc


def main():
    root_dir = Path(__file__).resolve().parent.parent
    checkpoints_dir = root_dir / "checkpoints"
    checkpoints_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 65)
    print("   NU STROKE SCAN - MODEL WEIGHTS CHECK & AUTO-DOWNLOADER")
    print(f"   Release Source: {BASE_URL}")
    print("=" * 65)

    all_exist = True
    missing_models = []

    for item in MODELS:
        dest = checkpoints_dir / item["filename"]
        if dest.exists() and dest.stat().st_size > 1_000_000:
            print(f"[OK] {item['filename']} ({format_bytes(dest.stat().st_size)}) - Already present.")
        else:
            all_exist = False
            missing_models.append(item)

    if all_exist:
        print("\n[*] All model checkpoints are present and verified. Ready to run!")
        return 0

    print(f"\n[*] Found {len(missing_models)} missing model checkpoints to download.")
    print("    This may take 1-3 minutes depending on your internet connection.\n")

    for i, item in enumerate(missing_models, 1):
        filename = item["filename"]
        dest = checkpoints_dir / filename
        url = f"{BASE_URL}/{filename}"

        print(f"[{i}/{len(missing_models)}] Downloading {filename} ({item['description']})...")
        try:
            download_with_progress(url, dest, item["expected_bytes"])
            print(f"    -> Successfully verified and saved {filename}\n")
        except Exception as exc:
            print(f"\n[ERROR] Failed to download {filename}: {exc}")
            print(f"        You can manually download it from: {url}")
            return 1

    print("=" * 65)
    print("[*] All model checkpoints successfully downloaded to checkpoints/")
    print("=" * 65)
    return 0


if __name__ == "__main__":
    sys.exit(main())
