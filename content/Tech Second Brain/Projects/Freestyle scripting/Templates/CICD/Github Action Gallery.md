---
title: Github Actions Gallery
tags:
  - cicd
  - automation
  - github
  - basic-templates
---
>[!info]
>The Gallery of some `github-actions` pipeline. Manual down below
>- [GitHub Actions documentation](https://docs.github.com/en/actions)
>- [Github Actions Contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)

# Example

```yaml title="github-actions.yaml"
# Define name of Actions
name: Deploy the wiki to internet

# Trigger of Actions
# Read on: https://docs.github.com/en/actions/using-workflows/triggering-a-workflow
on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

# Assigning permissions to jobs
# Read on: https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs
permissions:
  contents: read
  pages: write
  id-token: write

 # About concurrency
 # Read on: https://docs.github.com/en/actions/using-jobs/using-concurrency
concurrency:
  group: "pages"
  cancel-in-progress: false

# Define job in a workflow
# Read on: https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow
jobs:
  build:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v3
        with:
          node-version: 18.14
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: public
 
  deploy:
	# Condition for running the job
    if: github.ref == 'refs/heads/main'
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: self-hosted
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```