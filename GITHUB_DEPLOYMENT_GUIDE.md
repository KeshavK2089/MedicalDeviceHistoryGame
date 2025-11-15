# GitHub Pages Deployment Guide

## Overview
This guide will help you deploy the Medical Device History Game to GitHub Pages at:
`https://YOUR_USERNAME.github.io/MedicalDeviceHistoryGame/`

## Prerequisites
- A GitHub account
- Git installed on your machine

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `MedicalDeviceHistoryGame`
3. Make it Public (required for free GitHub Pages)
4. Don't initialize with README (we already have code)
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Run these commands in your Replit terminal:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Medical Device History Game"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/MedicalDeviceHistoryGame.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Click "Save"

## Step 4: Trigger Deployment

The GitHub Action will automatically run when you push to main. You can also:
1. Go to "Actions" tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Click green "Run workflow" button

## Step 5: Access Your Site

After the deployment completes (1-2 minutes):
- Your site will be live at: `https://YOUR_USERNAME.github.io/MedicalDeviceHistoryGame/`

## Files Created for Deployment

✅ `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
✅ `vite.config.gh-pages.ts` - Vite configuration with correct base path
✅ `dist/.nojekyll` - Tells GitHub Pages not to use Jekyll processing

## Manual Build (Optional)

To test the build locally before deploying:

```bash
npx vite build --config vite.config.gh-pages.ts
```

This will create a `dist` folder with your static site.

## Troubleshooting

### Blank page after deployment
- Check browser console for 404 errors
- Ensure base path is set correctly in `vite.config.gh-pages.ts`

### Build fails
- Check that all dependencies are installed: `npm install`
- Verify Vite config file exists: `vite.config.gh-pages.ts`

### GitHub Action fails
- Check the Actions tab for error details
- Ensure repository is public
- Verify GitHub Pages is enabled in Settings

## Updating Your Site

To update your deployed site:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update game content"
   git push
   ```
3. GitHub Actions will automatically rebuild and redeploy

---

**Note:** This deployment is for the static frontend only. All game data is stored in the browser's localStorage - no backend required!
