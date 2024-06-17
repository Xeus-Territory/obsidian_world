---
title: Build mobile with fastlane (Part 2)
tags:
  - android
  - cicd
  - azure
  - devops
  - azure-devops
---
>[!quote]
>Hi @all, If you know you know, I am doing the full completely progress when you want to build mobile application. Therefore on part 2, I will guide you to understand how you can sign your application with keystone, beta release to Google Play 👍👍👍
>
>**(NOTE: Android is go first, Because it is cheaper than IOS, and easily to release)**

You can find another topics in series down below

- [[Setup Environment for build android]]
- [[Build mobile with fastlane (Part 1)]]

# Create account and connect fastlane to Google

>[!note]
>This step is **very important**, and risk to you because it will charge you `25$` to create your organization. You need to concern that, and yup let's digest !!!

You can access [Google Play Console](https://play.google.com/console/signup), It will redirect to registration page, sorry because it writes in my primary language, but imaginary you will have 2 options, `organization` and `personal`.

- With `orgranization`, if you want to create an account for an organization or business, even if you are a sole proprietorship.
- With `personal`, if you want to create an account for yourself and don't have an organization or business.

![[Pasted image 20240605113419.png]]

On my opinion, you can choose `personal` mode, It will charge you 25$ for create the account. And another, you need to provide email address, phone number and your methodology to paid your service (Visa debit or credit)

![[Pasted image 20240605125923.png]]

When you have it, your Google Play Console will already for in use *(Sorry because private information)*

![[Pasted image 20240605131200.png]]

Let's back to `fastlane` documentation, gracefully they give us the specify to talk about releasing android applications. Read more at: [Getting started with fastlane for Android](https://docs.fastlane.tools/getting-started/android/setup/#)

With android, you will use extension belong `fastlane` called `supply`

>[!info]
>`supply` is a fastlane tool that uploads app metadata, screenshots and binaries to Google Play. You can also select tracks for builds and promote builds to production!
>
>For supply to be able to initialize, you need to have successfully uploaded an APK to your app in the Google Play Console at least once.
>
>Setting it up requires downloading a credentials file from your Google Developers Service Account.

Therefore, you need to give time to create Service Account for fastlane validate connection to Google Play Console. Follow the step base on [fastlane documentation](https://docs.fastlane.tools/getting-started/android/setup/#:~:text=Collect%20your%20Google%20credentials) or [official documentation from Google](https://developers.google.com/android-publisher/getting_started/?hl=en)

After create and validate, you will have `key-xxx.json` with include credential variables to authentication to Google Console **(NOTE: Keep it secrets because leaking will dangerous because Admin Permission)**

```json title="key.json"
{
  "type": "service_account",
  "project_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "private_key_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "private_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "client_email": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "universe_domain": "googleapis.com"
}
```

To validate fastlane can authentication, use `run` command with extension [validate_play_store_json_key](https://docs.fastlane.tools/actions/validate_play_store_json_key/)

```bash
fastlane run validate_play_store_json_key json_key:/path/to/your/key/json
```

![[Pasted image 20240605133225.png]]

>[!done]
>Successfully, you are connecting to Google Play Account, and ready to release your application 😏

# Create your application on Google Play

On first sight, you will have two way to create application, such as

- Create through portal of Google Play Console
- Use the `fastlane` and `supply` to fetch metadata, if not exist, `fastlane` will create it

On my situation, the problem occur when `supply` from fastlane local to Google Play Console, therefore, obligatory I must choose first option

First of all, you will go `Home` and choose **Create app**

![[Pasted image 20240605220628.png]]

You will require to providing App name, Type of app, Paid or not, ... After fill all form, click Create app to create `Android` application

And the problem is official starting, base on the rule and requirements in November 2023 of Google, your application need to participant to testing progress before your application available on Google Play. Read more at: [App testing requirements for new personal developer accounts](https://support.google.com/googleplay/android-developer/answer/14151465)

I mean you need to push the bundle of application maybe `apk` or `aab`, perform test and that will cost us 2 week to official release to Google Play. 

![[Pasted image 20240606091934.png]]

Before you can do this, let's learn about sign code because Google Play requires the version of bundle already sign for **release**, and don't approve for **debug** mode

![[Pasted image 20240606103258.png]]
# Sign code for your application

You have multiple way to sign your code, and I think the relate link that helpful for us, such as

- [Youtube -  Signing App & Building Release App Using Fastlane (Android)](https://www.youtube.com/watch?v=3sgv2Nr3Kjw&ab_channel=HossamAbdelnasser) : Very clear step but him said on the Egypt language
- [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android) : Official Documentation of React Native
- [Azure - Code sign for Android](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/code-sign-android) : Article about build android written by Azure
- [Bitrise - Android code signing using the Android Sign Step](https://devcenter.bitrise.io/en/code-signing/android-code-signing/android-code-signing-using-the-android-sign-step.html) : Article about automation ci/cd for their platform bitrise
- [Android Studio - Sign your app](https://developer.android.com/studio/publish/app-signing) : Methodology use android studio for sign the application
- [fastlane configuration to sign your app](https://docs.fastlane.tools/actions/build_android_app/#:~:text=You%20can%20use%20this%20to%20automatically%20sign%20and%20zipalign%20your%20app%3A) : Use gradle properties in fastlane to sign your app

To generate `keystroke`, you can use `keytool` which install with `java`

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Remember put the input requirement, and on the last step It will ask you about confirm `Yes/No`, typing `yes` and your key will generate in current location

![[Pasted image 20240606101037.png]]

Let try two method, first one configuration to `build.gradle` and `properties` of `Gradle`, second one, I will config directly to `Fastfile`

## Configuration on Gradle

Base on documentation, you need to move `keystore` to `android/app` directory, you can perform or not because if your `keystore` exist, you wouldn't need to do that

```bash
mv my-upload-key.keystore android/app
```

Next, configure `gradle.properties` with these variables, remember `*****` to your actually password

```bash
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

If you save the completely, reach next to `build.gradle` on `./app` directory

```bash
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

![[Pasted image 20240606104104.png]]

Go to the `fastlane` folder, and change some configuration on `Fastfile` like

```ruby title="Fastfile"
default_platform(:android)

platform :android do
  desc "Build application to apk file"
  lane :buildDebug do
    gradle(
      task: "clean assembleDebug",
    )
  end

  desc "Build application to aab file"
  lane :bundleDebug do
    gradle(
      task: "bundleDebug",
    )
  end

  desc "Build application release to apk file"
  lane :buildRelease do
    gradle(
      task: "clean assembleRelease",
    )
  end

  desc "Build application release to aab file"
  lane :bundleRelease do
    gradle(
      task: "bundleRelease",
    )
  end
end
```

and trigger `fastlane` command

```bash
fastlane android buildRelease && fastlane android bundleRelease
```

Your bundle app will export to `app/build/outputs/bundle/release/`, and you can upload that Google Play to see what you got

![[Pasted image 20240606124741.png]]

## Set properties on fastlane

So I will keep state in current methodology 1, checkout `develop` and test on the second one 😄. With second, simply change on `Fastfile` with overwrite the configuration

First of all, we will move `keystore` file to location on `/home/$USER`, After that, add to `Fastfile` on the lane `release` with option `properties`, For example

```bash
# See your user
echo $USER

cp -r keystore.jks /home/$USER
```

```ruby title="Fastfile"
...
gradle(
  task: "assemble",
  build_type: "Release",
  print_command: false,
  properties: {
    "android.injected.signing.store.file" => "/home/user/keystore.jks",
    "android.injected.signing.store.password" => "store_password",
    "android.injected.signing.key.alias" => "key_alias",
    "android.injected.signing.key.password" => "key_password",
  }
)
...
```

That all, you just perform `fastlane` command, and you will get the sign application with no change in `gradle` file

```ruby title="Fastfile"
default_platform(:android)

platform :android do
  desc "Build application to apk file"
  lane :buildRelease do
    gradle(
      task: "clean assembleRelease",
      print_command: false,
      properties: {
        "android.injected.signing.store.file" => "/home/user/xxxxxxxx",
        "android.injected.signing.store.password" => "xxxxxxxx",
        "android.injected.signing.key.alias" => "xxxxxxxx",
        "android.injected.signing.key.password" => "xxxxxxxx",
      }
    )
  end

  desc "Bundle application to aab file"
  lane :bundleRelease do
    gradle(
      task: "bundleRelease",
      print_command: false,
      properties: {
        "android.injected.signing.store.file" => "/home/user/xxxxxxxx",
        "android.injected.signing.store.password" => "xxxxxxxx",
        "android.injected.signing.key.alias" => "xxxxxxxx",
        "android.injected.signing.key.password" => "xxxxxxxx",
      }
    )
  end
end

```

```bash
fastlane buildRelease && fastlane bundleRelease
```

![[Pasted image 20240606161326.png]]
![[Pasted image 20240606161340.png]]

And double check on location `app/build/outputs/apk/release` and `app/build/outputs/bundle/release`, your binary of application will still there

# Conclusion

>[!info]
>That all for today, happy to learn how we can sign the application, submit and create application on google play . But not thing easily, base on rule from Google, I will write new release part to guide you about how we can official release application to Google Play and It needs a time to completely 😃

>[!quote]
>So hopefully  you enjoy with my sharing about `fastlane` build, the way to custom sign your application and upload success to Google Play for Internal test. Therefore, wait and see what you got on the next part of series. Stay safe, learn more and see you soon @all. See yah !!! 😄