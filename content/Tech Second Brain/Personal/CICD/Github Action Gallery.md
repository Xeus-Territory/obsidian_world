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
>- [Github Action Variables](https://docs.github.com/en/actions/learn-github-actions/variables)

# Deploy React application to Github Page

```yaml title="github-actions.yaml"
# Define name of Actions
name: Deploy the page to internet

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
      - name: Build Application
        run: npm build
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

# Deploy React application to Azure SWA

```yaml title="github-actions.yaml"
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: "/" # App source code path
          api_location: "" # Api source code path - optional
          output_location: "public" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```