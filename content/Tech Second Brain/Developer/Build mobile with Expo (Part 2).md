---
title: Build mobile with Expo (Part 2)
tags:
  - devops
  - mobile
  - automation
---
>[!quote]
>Hi @all, how is your week ? are u ready for learn something ? In this session, we will go to next session of expo for building mobile application, but in release stuff like artifacts to App Store and Google Play. Now let digesting, and don't turn around

But before we start, if you want to know what happen in previous session, take your time to check [[Build mobile with Expo (Part 1)]] - Article cover about `expo`, way to build your application and get connection to authentication your host to `expo.dev`

# About Mobile Artifact

>[!quote]
>Honestly, I don't release as much application to these platforms, I just have little bit experience to hang out with `Google Play` and `App Store` for particular release to `Testflight` for IOS and `Google Play Internal` for Android, at least for internal testing. The story get your application to one of huge platform, ain't gonna lie really hard in this time

![[Pasted image 20240918005114.png]]
<div align="center">
	<p style="text-align: center;">IOS CI/CD (Created by: Bitrise)</p>
</div>

![[Pasted image 20240918005443.png]]
<div align="center">
	<p style="text-align: center;">Android CI/CD (Created by: Bitrise)</p>
</div>

>[!info]
>In my perspective, this progress is try to describe step by step in the image with workflow, and give the illustration for understand more how to build artifact come, what file we get after that and where we head to release application.

Technically, `expo` does same thing as `bitrise` - Illustration of `bitrise` attached, automation platform to build and distribute mobile applications. But I want to share the journey, and you can do to get the best result with `expo`. But if you want to inspect more detail to build one of these artifact, I think `fastlane` is one of thing you want to find, read my old article to understand more

- [[Build mobile with fastlane (Part 1)]]
- [[Build mobile with fastlane (Part 2)]]

As you can see, the artifact of each platform have different in someway, and method to hang out make different but with `expo` anything else becoming easy more ever. Some reason, I will try to list in below about what thing you can do with `expo`

1. Not need to implement build progress - if you read about previous session, you don't need to hang out with implement step by step to build. Your application will sign with auto generated in `expo.dev`, but the sign it's on you
2. Have place to help you store certificate - The big problem is using with `fastlane` about method to keep anything secure, especially certificates for IOS and Android Platform, and anything else resolve store that in `expo.dev` with automation generate and supply for your application
3. Artifact is stored inside `expo.dev` - You can retrieve your artifact inside `expo.dev` for 30 days, and be ready submit to any platform

>[!quote]
>I think if you want to try some easily, `expo` is one of thing recommendation for your first Android and IOS to build and distribute (NOTE: Bare `React Native` is hard but you will learn a lot, don't rush to use `expo`) 

I think with helping from tutorial articles of relate topics that can help you to earning more little knowledge before we start with next part

- [Medium - A comprehensive guide on CI/CD for Expo Projects](https://blog.devops.dev/ci-cd-on-github-for-expo-projects-288c517ff14a)
- [Building a CI/CD pipeline for your Expo app using EAS](https://atlas.dev/blog/building-a-ci-cd-pipeline-for-your-expo-app-using-eas)
- [Why you’ll want to use Expo for your next React Native app](https://www.nascentdigital.com/thoughts/reasons-we-love-using-expo-with-react-native)
- [Configure EAS Submit with eas.json](https://docs.expo.dev/submit/eas-json/)
- [Submit to the Google Play Store](https://docs.expo.dev/submit/android/)
- [Submit to the Apple App Store](https://docs.expo.dev/submit/ios/)
# Try to release

As you can see, `expo` takes care mostly thing for us when try to release to one of build to  platforms, including `Google Play Store` and `App Store` with zero (0) effort and complexity.

![[Pasted image 20240922104735.png|center]]

[EAS Submit](https://docs.expo.dev/submit/introduction/) bring us powerful feature to release your build previous session through `eas.json`, again you need to take care itself  inside profile, and submit it to help `expo` imagine what keys and certificate to help your application go to right place.

With both, Android and IOS, they have different way to create that secrets one, but I think you can get this with step by step through tutorial of Apple **(Ease to understand)**

- **Android**: You need to handling create [Google Service Account](https://github.com/expo/fyi/blob/main/creating-google-service-account.md) for yourself to help `expo` have permission to submit `.aab` to your Google Play Console **(NOTE: Pay 29$ to using it)**. Android Platform require you manually created for first time to automation after that, explore at [First Submission of an Android App](https://github.com/expo/fyi/blob/main/first-android-submission.md)
- **IOS**: With Apple you need create [Apple Account](https://developer.apple.com/account/) for yourself, and ain't gonna lie really expensive **(NOTE: 99$ to using it)**. IOS makes some sort of different with Android through you must be submitted through [Apple upload methodology](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds) and you can't do this step manually in Apple Portal.

>[!quote]
>With `expo`, I don't have opportunity to release application `Google Play`, but with `Testflight` I have something want to share, but let go to `app.json`, you need to take a look some information to help you prevent error when upload
## App Version

First thing, you need to notice about [App Version](https://docs.expo.dev/build-reference/app-versions/) parameter in `app.json` because Expo base on that value to assign value build for your both `Android` and `IOS` application, It means if you not make a change your next build won't upload successfully to both platform

![[Pasted image 20240922111543.png]]
<div align="center">
	<p style="text-align: center;">Can't upload in Google Play</p>
</div>

![[Pasted image 20240922111715.png]]
<div align="center">
	<p style="text-align: center;">Can't upload in Apple Connect</p>
</div>

>[!warning]
>Therefore reason, `app.json` is placing you need to concerning every time to build and release your application because when you make a mistake, you need to try again and cost money to build **(NOTE: Sometime 30 build-free times are not enough for a month)** 😄

Take the look with [App Versions](https://docs.expo.dev/build-reference/app-versions/#app-versions) part in documentation, you will figure out what parameter inside `app.json` need to replace

|Property|Description|
|---|---|
|[`version`](https://docs.expo.dev/versions/latest/config/app#version)|The user-facing version visible in stores. On Android, it represents `versionName` name in **android/app/build.gradle**. On iOS, it represents `CFBundleShortVersionString` in **Info.plist**.|
|[`android.versionCode`](https://docs.expo.dev/versions/latest/config/app#versioncode)|The developer-facing build version for Android. It represents `versionCode` in **android/app/build.gradle**.|
|[`ios.buildNumber`](https://docs.expo.dev/versions/latest/config/app#buildnumber)|The developer-facing build version for iOS. It represents `CFBundleVersion` in **Info.plist**.|

```json title="app.json" {5,9,16}
{
  "expo": {
    "name": "ExampleApp",
    "slug": "example-app",
    "version": "1.0.0",
	...
    "ios": {
	  ...
      "buildNumber": "7",
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
	  ...
      "versionCode": 7
    }
}
```

>[!info]
>It means in one `version` - the big one, you need to specific unique or increment **build version number** `buildNumber` or `versionCode` to help your application to release successful corresponding to  big version. When your application need to change new version - the big one, you can return to build version 1 for starting in new big version

But that action isn't really need if you use expo version higher than 12.0, because in this version, Expo support user to use `cli` with `remote` mode instead of `local` mode, and It means you can try retrieve the build number Expo Cloud instead of from `app.json`. Read more at [Remote version source](https://docs.expo.dev/build-reference/app-versions/) and you can hang on through configuration

```json title="eas.json" {2-3,11}
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
    },
    "preview": {
    },
    "production": {
      "autoIncrement": true
    }
  }
}

```

As you can see set `cli` to `remote` because default will take `local` and in your profile build set `autoIncrement` to help you auto increase your app build, and your work is enjoying and `expo` will take care of all for you 😃.

But It has some warning from `expo`, maybe you need to concern BTW

>[!warning]
>The remote version is initialized with the value from the local project. For example, if you have `android.versionCode` set to `1` in app config, when you create a new build using the remote version source, it will auto increment to `2`. However, if you do not have build versions set in your app config, the remote version will initialize with `1` when the first build is created.

One more thing, It will make sense your build from remotely, and you can safety removing your `buildNumber` or `versionCode` out of configuration inside `app.json`

In some other cases, you maybe need to concern to check out, really helpful with synchronize feature

- [Syncing already defined versions to remote](https://docs.expo.dev/build-reference/app-versions/#syncing-already-defined-versions-to-remote)
- [Syncing versions from remote to local](https://docs.expo.dev/build-reference/app-versions/#syncing-versions-from-remote-to-local)
- [Limitations](https://docs.expo.dev/build-reference/app-versions/#limitations)

>[!info]
>The big version - `vesion` won't take effect from this feature, you need to manually change it inside your `app.json`

Or if you want to take around with `local` mode, the default option, come and take a look with [Local version source](https://docs.expo.dev/build-reference/app-versions/#local-version-source) but recommendation spend for `remote` with good behavior

## App Encryption Compliance

![[Pasted image 20240922122521.png]]

When I first time to come up with `Testflight`, I wonder how the heck is this encryption because I don't meet anything else with Android, actually this is not gonna **App Signed**, we will talk a bit on next part.

Therefore, try to google and you will figure out [Complying with Encryption Export Regulations](https://developer.apple.com/documentation/security/complying-with-encryption-export-regulations) - A declaration the use of encryption in your app to streamline the app submission process.

>[!info]
>When you submit your app to TestFlight or the App Store, you upload your app to a server in the United States. If you distribute your app outside the U.S. or Canada, your app is subject to U.S. export laws, regardless of where your legal entity is based. If your app uses, accesses, contains, implements, or incorporates encryption, this is considered an export of encryption software, which means your app is subject to U.S. export compliance requirements, as well as the import compliance requirements of the countries where you distribute your app.
>
>Every time you submit a new version of your app, App Store Connect asks you questions to guide you through a compliance review. You can bypass these questions and streamline the submission process by providing the required information in your app’s [Information Property List](https://developer.apple.com/documentation/bundleresources/information_property_list) file.
>
>For more information about export compliance, read [Export compliance overview](https://help.apple.com/app-store-connect/#/dev88f5c7bf9).

It means you need to give documentation or doublecheck about encryption methodology because your application is outside the US. Maybe this article can give you best visualize about landscape problems

- [Appstore submission: Does your app use encryption? How to determine if your app contain encryption?](https://dev.to/akhil_karonnon_/appstore-submission-does-your-app-use-encryption-how-to-determine-if-your-app-contain-encryption-2gab)
- [iOS App Security: Best Practices](https://medium.com/@abdelmeniemmohamed/ios-app-security-best-practices-fecfb13d0744)
- [Overview of export compliance](https://developer.apple.com/help/app-store-connect/manage-app-information/overview-of-export-compliance/)

In this case, after you release app to `testflight`, It makes you costed little time to check the question of compliance, and that why `expo` or `apple` give us the methodology to reduce this step

- [Bypassing Manual Encryption Check for iOS Apps](https://mattrighetti.com/2023/02/06/bypassing-manual-encryption-check-for-ios-apps)
- [Export Compliance in iOS App Submission](https://stackoverflow.com/questions/45855629/export-compliance-in-ios-app-submission)
- [ITSAppUsesNonExemptEncryption](https://developer.apple.com/documentation/bundleresources/information_property_list/itsappusesnonexemptencryption)

Apple give us choose boolean for `ITSAppUsesNonExemptEncryption` inside `expo` configuration, to help you bypass this selection and reduce more time to access Apple Connect. Back to `app.json`, if you notice about `usesNonExemptEncryption`, It actually means for bypass encryption for application submission

```json title="app.json" {10-11}
{
  "expo": {
    "name": "ExampleApp",
    "slug": "example-app",
    "version": "1.0.0",
	...
    "ios": {
	  ...
      "buildNumber": "7",
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
	  ...
      "versionCode": 7
    }
}
```

>[!info]
>If don't wanna set anything else about encryption, you just need to change that into `false` instead of `true` by default. After submission successfully, your application can directly gain permit for internal user accessible to our application

## App Store Connect API

![[Pasted image 20240922125937.png]]

The story in this situation will not need to talk but it makes me cost little bit time and diligent to figure out what happening in Expo

With **Apple Store Connect**, they separate to multiple [role](https://developer.apple.com/help/app-store-connect/reference/role-permissions/) and [permission](https://developer.apple.com/help/account/manage-your-team/roles/). Usually, when you try to get one Apple Account for yourself, you will stand on highest permission with **Account Holder**, and you will gently create Apple Store Connect API with zero (0) effort with `submit` command, and help you create a **Apple Connect API Key** right permission, and set to `expo.dev`. You should check out articles and documentations to figure out what you need to

- [How to grant API key access to Apple App Store Connect](https://www.youtube.com/watch?v=CmhNHNCorIY&ab_channel=AppStoreOptimization%2CTranslationandAutomation)
- [App Store Connect API](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api/)
- [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
- [Creating an App Store Connect API Key](https://github.com/expo/fyi/blob/main/creating-asc-api-key.md)

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/LE4Mgkrf7Sk?si=ePvBJ4vdrSla5n1b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

In my situation, I am only stand **App Manager**, It means I can't not create **Apple Store Connect API Key** for myself, and I need to request Admin or Account Holder to provide my API Key. But you must clarify twice type of Apple Store Connect API Key

- **Team Key** - **Required role:** Account Holder or Admin - this one actual thing you need to help `expo` connect to your Apple Store Connect, used across all the apps in your account, or you can assign them to only specific roles. **(E.g - format: AuthKey_xxxxxxxx.p8)**
- **Individual Key** - **Required role:** Account Holder, Admin, App Manager, Customer Support, Developer, or Marketing - This one to help your application have permission to call API Service with only your account **(E.g - format: AuthKey_xxxxxxxx.p8)**

Therefore, you need to have `Admin` Key or higher to help your `expo` connect Apple Store Connect, and after that if your account not with `Admin` or `Account Holder`, please submit that key inside portal of `expo.dev` in `credential` of Application

![[Pasted image 20240922131334.png|center]]

>[!note]
>Remember `Issuer Identifier` can found in Admin or Admin Holder who one issue the ASC API Key for you, and `Key Identifier` usually the number behind your key, it mean `xxxxxxxx` on `AuthKey-xxxxxxxx.p8`

And now you can try to submit that with command

```bash
# Export EXPO_TOKEN
export EXPOT_TOKEN=<token>

# Get the build
eas build:view # View the nearest build
eas build:view --json # In json type

# Get the full list of build
eas build:list
```

>[!info]
>Now you will copy `ID` of build, It usually have format `GUID`

Submitting with command

```bash
eas submit -p ios --id Build-GUID
```

>[!note]
>Your profile will not configure anything, so `expo` will ask you couple question like Apple ID and Password, providing it for your shell and anything step will be taken by Expo

After successfully notification in your shell, you can get the result in your apple account, in `testflight` tab. With tester, you can invite them through `testflight` app in [AppStore](https://apps.apple.com/us/app/testflight/id899247664)

# Talk about automation story

![[Pasted image 20240922135526.png]]

Yeah I know you handle multiple step with `expo` with manually, so how about `automation`. When I try to relate you with some article about, let's take the look again

- [Medium - A comprehensive guide on CI/CD for Expo Projects](https://blog.devops.dev/ci-cd-on-github-for-expo-projects-288c517ff14a)
- [Building a CI/CD pipeline for your Expo app using EAS](https://atlas.dev/blog/building-a-ci-cd-pipeline-for-your-expo-app-using-eas)

Expo write a guide to help you provide secrets information through `eas.json`, and create a methodology to automation at all for your release. Read at [Submitting your app using CI](https://docs.expo.dev/submit/ios/#submitting-your-app-using-ci) and following step

- Provide the archive source (`--latest`, `--id`, `--path`, or `--url`). Get this one for you

```bash
npx eas build:view --json | jq -r ".id"
```

- Make sure that the iOS Bundle Identifier is present in your [app config file](https://docs.expo.dev/workflow/configuration). Actually, you will always push this stuff to your repositories
- Set the ASC App ID (`ascAppId` in **eas.json**). The ASC App ID is required to skip the Apple Developer log-in process, which will **likely not be possible on CI due to the 2FA prompt.** You must set apple id with non 2FA methodology to use itself on pipeline
- Set up your App Store Connect API Key with EAS Servers. You can check the state of your credentials by running `eas credentials` or by running `eas submit -p ios` interactively.

	1. **App Store Connect API Key**: Submitting in portal `expo.dev`, you don't need configuration, unless you run expo in your local place

	```json
	...
	"ios": {
		"appleId": "john@turtle.com",
		"ascAppId": "1234567890",
		"appleTeamId": "AB12XYZ34S",
		"ascApiKeyPath": "/path/to/asc/p8/key",
		"ascApiKeyIssuerId": "AB12XYZ34S",
		"ascApiKeyId": "AB12XYZ34S",
		...
	}
	...
	```

	2. **App Specific Password:** Provide your [password](https://expo.fyi/apple-app-specific-password) and Apple ID Username by passing them in with the `EXPO_APPLE_APP_SPECIFIC_PASSWORD` environment variable and `appleId` field in **eas.json**, respectively.

With Expo, **EAS_CLI** actually support you through method to handling both `build` and `submit` in same time through `build` command

```bash
eas build --platform "$DEPLOY_PLATFORM" --non-interactive --no-wait --profile production --auto-submit
```

Fully CI/CD Pipeline write down in Github Action by [Luca Zani](https://medium.com/devops-dev/ci-cd-on-github-for-expo-projects-288c517ff14a), get the applause for him withj really useful and detail pipeline 🤝

# Conclusion

![[byebye.png|center|500]]

>[!done]
>That is @all for blog, hope you have time to take a look about artifact of Expo Build, and give you landscape to imagine step to help you distribute mobile application to Google Store and App Store. Expo is one great choice when I try to adapt pipeline, and automation with this platform, clear and make sense for all steps you need to completely. If you need your help, Expo is ready to listening and supporting inside their [Github](https://github.com/expo/expo), [Discord](https://chat.expo.dev/), [X](https://x.com/expo) and [Reddit](https://www.reddit.com/r/expo)

>[!quote]
>The week of mine come up with many thing, and I need to take care but yeah the weekend is time to stop, and try to write about the thing learn through journey. Therefore, stay safe, learn more and see yah on next weekend. Don't forget check out new article [[Switch Role between AWS Accounts]] to hang out with AWS Cloud. Bye Bye 🙌









