---
title: Github Actions
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
>- [Github Action syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
>- [Github Action reuse workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)

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

# Build Mobile with Expo

You need to use `eas.json` to configuration how can `expo-cli` talk with your source code

```json title="eas.json"
{
  "cli": {
    "version": ">= 10.2.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "env": {
          "EXPO_PUBLIC_API_URL" : "https://xeusnguyen.xyz/"
        }
      }
    },
    "bundle": {
      "android": {
        "buildType": "app-bundle",
        "gradleCommand": "app:bundleRelease",
        "env": {
          "EXPO_PUBLIC_API_URL" : "https://xeusnguyen.xyz/"
        }
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}

```

After define that you will have permission to use `expo` inside your github-actions

```yaml
# Define name of Actions
name: Build and Release Applications
# Trigger of Actions by manually
# Read on: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#workflow_dispatch
on: workflow_dispatch
  
# Define job in a workflow
# Read on: https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow
jobs:
  build_android:
    runs-on: ubuntu-latest
    env:
      EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info

      - uses: actions/setup-node@v3
        with:
          node-version: 18.20

      - name: Install Dependencies
        run: |
          npm install -g eas-cli
          npx eas --version

      - name: Build Android Application
        run: npx eas build -p android --profile preview --non-interactive

      - name: Download Artifact from Expo
        run: |
          artifactURL=$(npx eas build:view --json | jq -r ".artifacts.buildUrl")
          mkdir -p ./android
          wget -q $artifactURL -O ./android/$(cat app.json | jq -r '(.expo.name + "." + .expo.version)').apk
      
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          path: android
          retention-days: 30

  ################################################
  ## Use for production, need account to permit ##
  ## Doc: https://docs.expo.dev/submit/android/ ##
  ################################################

  # release-android:
  #   runs-on: ubuntu-latest
  #   needs: build_android
  #   env:
  #     EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
  #   steps:
  #     - name: Bundle Application
  #       run: |
  #         npx eas build -p android --profile bundle --non-interactive

  #     - name: Release app to Google Play
  #       run: |
  #         # Current not have account, We will provide after
  #         # Doc: https://docs.expo.dev/tutorial/eas/android-production-build/
  #         echo "Release aab to Google Play"


```