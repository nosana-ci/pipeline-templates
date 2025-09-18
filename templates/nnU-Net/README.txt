# nnU-Net Medical Image Segmentation

## Description

This Nosana template enables automatic medical image segmentation using the powerful `nnU-Net` framework. It uses a pre-trained model to segment structures from 3D MRI or CT scan images. The output is a mask representing the segmented regions for each input image.

## Features

- Plug-and-play segmentation using `nnUNet_predict`
- Supports 3D MRI or CT images in NIfTI format
- Outputs segmentation masks for clinical analysis or research
- GPU-accelerated for faster inference
- Automatically selects the best configuration for the task

## Technical Details

- Model: nnU-Net (`3d_fullres`, `nnUNetTrainerV2`)
- Task: Task001_MRI (replaceable with your custom task)
- Image format: NIfTI (.nii.gz)
- Input directory: `/data/imagesTs`
- Output directory: `/data/output`

## Requirements

- 3D NIfTI images (`.nii.gz`) placed in `/data/imagesTs`
- Compatible with GPU systems
- Pre-trained nnU-Net model for `Task001_MRI` must be preinstalled in the container (default in `nbutter/nnunet`)

## Usage

1. Prepare your test images in NIfTI format (e.g., `image_0000.nii.gz`)
2. Mount them to the `/data/imagesTs` directory
3. Run the job via the Nosana CLI or dashboard
4. The predicted segmentation masks will be saved to `/data/output`

## Example Command Run Inside Container

```bash
nnUNet_predict \
  -i /data/imagesTs \
  -o /data/output \
  -t Task001_MRI \
  --model 3d_fullres \
  --trainer nnUNetTrainerV2
