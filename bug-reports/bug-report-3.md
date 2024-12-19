# Bug Report

**Title**: Application UI is not mobile friendly

**ID**: 03

**Date**: 2024-11-26

**Reported By**: Valtteri Rajalainen


## Description
When emulating mobile devices via Chrome, the application layout does not reposition to be mobile friendly. Instead, all elements are packed together, overlapping each other. This makes the application not usable on mobile devices.


## To reproduce:
- Login.
- Open browser’s dev tools and emulate a mobile device.


## Expected Result
Layout repositions, or otherwise adapts to the mobile device screen dimensions.

## Actual Result
Elements in the layout are packed together and overlapping each other. The screen needs to be scrolled both vertically and horizontally to use any functionality.


## Environment
**OS**: Windows

**Browser**: Chrome 131.0.6778.86, emulating mobile devices

**Device**: Huawei Matebook laptop


## Severity & Reproducibility

**Severity**: High (mobile devices are expected to be at least 50% of users)

**Reproducibility**: Always
