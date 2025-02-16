---
title: What is Wrapper Pattern ?
tags:
  - design-pattern
  - devops
  - developer
  - helpful
  - whatis
---
>[!quote]
>Hi @all, how are your weekend ? Stay tune okay, and this week topic will take around `wrapper`, what is this and what we can deal with `warpper` to push efficiency for your work with them. Let digest about that 👍👍👍

# What is wrapper ? Is it a design pattern ?

![[meme-question-1-10.png]]

>[!quote]
>So a lot of question when you learn about new things in technologies, that make this game become unique and interested in something, and `wrapper` is not exception

First of all, you may need some articles talk about `wrapper`, let's see what is it. Check the down below

- [Decorator - Also know as: Wrapper](https://refactoring.guru/design-patterns/decorator)
- [Hiểu biết cơ bản về Decorator pattern - Vietnamese](https://viblo.asia/p/hieu-biet-co-ban-ve-decorator-pattern-pVYRPjbVG4ng)
- [About Wrapper](https://webflow.com/glossary/wrapper)
- [Wikipedia - Wrapper function](https://en.wikipedia.org/wiki/Wrapper_function)
- [Wikipedia - Wrapper library](https://en.wikipedia.org/wiki/Wrapper_library)

>[!info]
><h2>Wrapper</h2>
>
>A wrapper is a programming language function for encapsulating and organizing elements within a well-defined interface. You can understand `wrapper` become factor to call a second subroutine or a system call with little or no additional computation

Wrapper, is one most of things can make your time when programing to become shorten and you will handle multiple things with wrapper via `interface` that provide. Why you need that, let define that through example in [refactoring.guru](https://refactoring.guru/design-patterns/decorator)

>[!example]
>Imagine that you’re working on a notification library which lets other programs notify their users about important events.

![[Pasted image 20240630103230.png]]

When you want to open or add a new provider to your notification class, it make you hard to change logical of your service, such as if your client want `facebook` and `slack` notification but your service just provide only `sms`, that will make you hard to control or changing big deals when you want. You can handle that to add more `subclasses` to handle that, but accidentally, you make the code bloated and difficult to control. That is reason why you need `Decorator` or `Wrapper` Pattern
## Why and what useful `wrapper` can bring back ?

Follow the example, you can understand the problems when you want make `template` of your functionality or your application, additional will not the best solution to pull back anything follow only concept. But do you think about `Inheritance`, an extend class ? 

![[Pasted image 20240630132427.png]]

Let make the deals with `Inheritance` and `subclasses` before you dive deeper to `wrapper` pattern

Follow the instruction `refactoring.guru`, **Inheritance** will the first thing you need to reserve when think about change behavior of object, but it actually exists several things you need to be awareness

- Inheritance can't change behavior in runtime, it means you can only replace whole object with another different classes
- You will have one parent class when use inheritance, most of languages does support inherit behavior from multiple classes at the same time

>[!quote]
>I do not familiar with much about `inheritance` because I am not working like Developer with long time, so maybe I talk about wrong, but in my opinion you will have mess up with inheritance, but **can't negate that one is the strongest kinds in OOP (Object Oriented Programing)**

Additional, you can have another solution which fix problem inheritance meet with patterns called `Aggregation` and `Composition`. You can read more at theses articles

- [Association, aggregation, and composition in OOPs](https://medium.com/@bindubc/association-aggregation-and-composition-in-oops-8d260854a446)
- [OOP: Inheritance vs. Aggregation](https://www.baeldung.com/cs/inheritance-aggregation)

And that means, you have superb stand behind as components to make `Decorator` or `Wrapper` pattern

![[Pasted image 20240630134226.png]]



And Yup, you have `wrapper` is  an object that can be linked with some target object. The wrapper contains the same set of methods as the target and delegates to it all requests it receives. However, the wrapper may alter the result by doing something either before or after it passes the request to the target.

To make wrapper become helpful, It comes from property of wrapper to make the wrapper’s reference field accept any object that follows that interface. This will let you cover an object in multiple wrappers, adding the combined behavior of all the wrappers to it.

>[!quote]
>I dunno this is right or not, but you can image when you want upgrade methodology but not want to make big difference for your functionals, you will not touch any about original function, you just make a change on the components you want base on the `decorate` with take from original function. 
>
>For example, You can dynamic and give safety when you want to upgrade version from 1.x --> 2.x like me DevOps will work `Gradle`, Wrapper of `Gradle` will take responsibility to handle when you want to use between 6.x --> 8.x and it will install new things and make functionality base on original function but on different version
>

![[Pasted image 20240630135429.png]]

Like notification, you can see it will make different between multiple method base `decorator` which have original function from `notifier` class, you can make big deals when create multiple version just base on `decorator` instead of `root`. On the client side, just use specific `decorator` and do not care about `root` or `decorator` one. That make `wrapper` is such helpful when you design a pattern for your application

## Conclusion

![[meme-confuse-but-curious.png]]

 That why you need `wrapper` or `decorator` when you want to expand or change behavior of your class or functionality to different method but keep the same work, it just alternative for `inheritance`. I know you will understand that more than me, let give evident and reason when you need that from `refactoring.guru`, and do not hesitate the example from this website, super cool. Let brief them to some concludes, Okay 🤔🤔
 
-  Use the Decorator pattern when you need to be able to assign extra behaviors to objects at runtime without breaking the code that uses these objects.
-  Use the pattern when it’s awkward or not possible to extend an object’s behavior using inheritance.

# How about the wrapper in DevOps ? Any use

Honestly to say, I dunno bro but with `wrapper` is have seen some optional, and I can be listed of them we can learn from them to understand Role or function of them in DevOps

- [Gradlew](https://docs.gradle.org/current/userguide/gradle_wrapper.html) - wrapper of Gradle. You can read about article to give you perspective between `gradle` and `gradlew` via [Difference between using gradlew and gradle](https://stackoverflow.com/questions/39627231/difference-between-using-gradlew-and-gradle)
- [Terragrunt](https://terragrunt.gruntwork.io/) - a thin wrapper of Terraform
- [Shell Wrappers](https://tldp.org/LDP/abs/html/wrapper.html) - A wrapper is a shell script that embeds a system command or utility. Read more about that via [Article](https://www.cyberciti.biz/tips/unix-linux-bash-shell-script-wrapper-examples.html)

With `wrapper`, base on DevOps culture, it submits a role for

- Dynamic the way to setup and control parameter to give for `root` tools - Gradlew
- Make the your code of configuration to becoming Dry, and can easily to reuse - Terragrunt
- Reduce the complexity of your command-lines - Shell Wrapper

That has different between them, just release to do with specify purpose and just one thing, users can have the simple way to reach goals when use original tools but dynamic way through `wrapper`

![[meme-not-simply-gradle.png]]

So go with me to specific to give perspective different between of them 🤭

## Gradlew

![[Pasted image 20240630144535.png]]

So like from above, Gradlew is called wrapper of Gradle, which can bring up you some features

- Download and install the correct `gradle` version
- Parse the arguments
- Call a `gradle` task

That make your game become easily, because `gradlew`  will help you install base Gradle base on your configuration, and execution method or functionality just via `gradlew` and you do not need to care about install Gradle in your host. `gradlew` support both file to execution `gradlew.bat` (Windows CMD) or `gradlew` (Mac or Linux)

To simple create wrapper for `Gradle`, easily job just

```bash
gradle wrapper
```

 that will create `gradle` directory, and put wrapper inside like these
 
![[Pasted image 20240630144406.png]]

But when you work with Android project, It will auto generate when you create project base on your selection configuration when you create project.

You can play with `gradlew` via properties file at `gradle/wrapper/gradle-wrapper.properties`, it will store configuration about

- The **server hosting** the Gradle distribution.
- The **type of Gradle distribution**. By default, the `-bin` distribution contains only the runtime but no sample code and documentation.
- The **Gradle version** used for executing the build. By default, the `wrapper` task picks the same Gradle version used to generate the Wrapper files.
- Optionally, a **timeout** in ms used when downloading the Gradle distribution.
- Optionally, a **boolean** to set the **validation of the distribution** URL.

With `gradlew`, it brings you more helpful when you separate the source code between teammates, or can be easily setup your build pipeline for CI/CD on different project, mostly use for Java or Android application, that actually make your game become simplify and easily to handle

You can do more such superb thing with `gradlew`

- [Customizing the Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html#customizing_wrapper)
- [Upgrading the Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:upgrading_wrapper)

## Terragrunt

![[design-terragrunt-wrapper-aws.png]]

Terragrunt comes up to solution, a wrapper for Terraform and Opentofu which can help you orchestration infrastructure as Infrastructure as Code

Terragrunt brings you some features which help you do helpful jobs instead of `terraform` and `opentofu`

- Keep your Terraform code DRY
- Keep your backend configuration DRY
- Keep your Terraform CLI arguments DRY
- Execute Terraform commands on multiple modules at once
- Before & After hooks

With Terragrunt, your work with `terraform` can be reduced and simple than ever, `Terragrunt` support us about `auto-init` and `auto-retry` so it means you can skip `init` step in `terraform` work flow and can do `plan` for firstly.

>[!note]
>Terragrunt will forward almost all commands, arguments, and options directly to Terraform, but based on the settings in your `terragrunt.hcl` file.

That such wonderful comes up with DRY (Don't Repeat yourself), It means `terragrunt` will help you remove most of `copy/paste` between different module or environment, It can help you prevent the mistake when you can overwrite each others module between environment, that terrible 🥶🥶🥶

Follow the instruction from `Terragrunt`, To use Terragrunt, add a single `terragrunt.hcl` file to the root of your repo, in the `stage` folder, and one `terragrunt.hcl` file in each module folder

```tree
stage
├── terragrunt.hcl
├── frontend-app
│   ├── main.tf
│   └── terragrunt.hcl
└── mysql
    ├── main.tf
    └── terragrunt.hcl
```

Now you can define your `backend` configuration just once in the root `terragrunt.hcl` file

```hcl
# stage/terragrunt.hcl
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket = "my-terraform-state"

    key = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "my-lock-table"
  }
}
```

Do you see on the **Line 11**, key will point to via `path_relative_to_include()`, which will automatically set `key` to the relative path between the root `terragrunt.hcl` and the child module (so your Terraform state folder structure will match your Terraform code folder structure, which makes it easy to go from one to the other).

The `generate` attribute is used to inform Terragrunt to generate the Terraform code for configuring the backend. When you run any Terragrunt command, Terragrunt will generate a `backend.tf` file with the contents set to the `terraform` block that configures the `s3` backend, just like what we had before in each `main.tf` file.

The final step is to update each of the child `terragrunt.hcl` files to tell them to include the configuration from the root `terragrunt.hcl`

```hcl
# stage/mysql/terragrunt.hcl
include "root" {
  path = find_in_parent_folders()
}
```

The `find_in_parent_folders()` helper will automatically search up the directory tree to find the root `terragrunt.hcl` and inherit the `remote_state` configuration from it.

And that do same thing to prevent DRY code when `Terraform` can't support us but `Terragrunt` can. That's a good things and wonderful functional which `Terragrunt` bring up. Just take a look few example via links down below

- [Keep your backend configuration DRY](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/#keep-your-backend-configuration-dry)
- [Keep your provider configuration DRY](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/#keep-your-provider-configuration-dry)
- [Keep your Terraform CLI arguments DRY](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/#keep-your-terraform-cli-arguments-dry)
- [Promote immutable, versioned Terraform modules across environments](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/#promote-immutable-versioned-terraform-modules-across-environments)
- [Inputs](https://terragrunt.gruntwork.io/docs/features/inputs/#inputs)
- [Before, After, and Error Hooks](https://terragrunt.gruntwork.io/docs/features/hooks/#)

## Shell wrapper

Like I have related above about [shell wrapper](https://tldp.org/LDP/abs/html/wrapper.html), that simple way to reuse system command or utility, that accepts and passes a set of parameters to that command. Mostly use `sed` and `awk` command to do incredible thing

![[Pasted image 20240630154228.png]]

When use shell wrapper, you have mostly kind of helpful thing, like

1. Time saving.
2. Customize collection of *nix commands.
3. Passing default arguments to binaries or 3rd party apps.
4. Call to start the desired job.
5. Wrappers are perfect when tools or command that require customized environmental variable settings, system controls or job-submission parameter.
6. Useful in HPC, clustered environment, *nix sysadmin, and scientific research.

On my position, I work command regularly so that trick and wrapper can help me reduce a lot of work when execute command. But do not familiar right now but if have any updated, please follow [[Awesome Linux profile]], and I will give update about linux configuration and wrapper on that articles

# Conclusion

![[meme-learn-new-daily.png]]

>[!done]
>That all for today, Not long and but I have time to learning around new thing, I hope you can do same thing. Wrapper can make a graceful thing, and help a lot for perspective to do great pattern to design your application, API or such as a build or IaC tool, that actually make the game become to interesting and shorten time to handle lots of job to do different purpose in same construction, just dynamic that one 

>[!quote]
>That be graceful and happiness to contribute and sharing with you about `wrapper`, on next stage maybe I will bring a quite fun thing again, let wait. So @all, stay safe, happy hacking and I will see you soon. Bye bye 👋👋👋

