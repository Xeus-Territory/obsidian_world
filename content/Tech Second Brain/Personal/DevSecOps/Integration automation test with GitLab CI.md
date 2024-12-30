---
title: Integration automation test with GitLab CI
tags:
  - cicd
  - automation
  - gitlab
  - unit-test
---
>[!quote]
>Hi @all, how is your week? I feel awesome with couple things I learn from a bit podcast, movie and some story when I try talk with my friend. However, I am not ever forgot to write a something for this weekend, so we will learn about integrating automation test with GitLab and see the supportive of GitLab for this stuff. Let's digest !!

# Why we need automation test ?

![[meme-short-story.png|center]]

The story stands behind the automation test that will be a lot and when we need separate into some categories, you will figure out kind general things in those scenarios, such as

- Increase accuracy
- Increase speed with lest effort and long-term available (24/7)
- Consistency
- Cost savings
- Enhance test coverage
- Test Reusability
- Continuous testing

As you can see, with integrating automation test into progress and life circle of product, you will receive more thing than you lost. But in the chaos and explosion of technology, automation test submit the crucial role for industry and the result responses truly incredible, lot of bug will take care and QA need to focus in special case not at all for common because automation usually better than manual, honestly.

You can find and read couple articles to understand about automation because I will not focus into theory at all, but I think you figure out something afterward

- [QAMadness - Your Guide to Automated Integration Testing](https://www.qamadness.com/your-guide-to-automated-integration-testing/)
- [Codilime - The importance and benefits of unit testing](https://codilime.com/blog/unit-testing/)
- [Katalon - What is Automation Testing? Ultimate Guide & Best Practices](https://katalon.com/resources-center/blog/what-is-automation-testing)
- [Katalon - 9 Core Benefits of Automation Testing](https://katalon.com/resources-center/blog/benefits-of-automation-testing)

To approach automation test, you need to prepare some couple tools and platform, and GitLab is one place to help you set up the process. No cap 😄

# Framework and GitLab CI for automation testing?

I need to say, community already serve us multiple ways to improve the product again, again and again with and I appreciate with effort of them. Because when you try to google, there are a lot of framework you faced that help you create E2E testing for your project, such as

- [Katalon - Top 10 Best End-to-End Testing Tools and Frameworks](https://katalon.com/resources-center/blog/end-to-end-e2e-testing-tools-frameworks)
- [Leapwork - The Top 20 Test Automation Tools of 2024](https://www.leapwork.com/blog/top-20-test-automation-tools)
- [JavaScript unit testing frameworks in 2024: A comparison](https://raygun.com/blog/javascript-unit-testing-frameworks/)

When I try to dig into this field, I figure out you need to pick up only one for your, and I find [`jest` - javascript framework](https://jestjs.io/) - ease to use and pretty cool for integrating that into automation test, so why not?

![[icon-jest.png|center|400]]

The first reason why I choose `Jest`, because `Jest` already enough things to create completely things to integrating test inside working pipelines with awesome features, such as

- Zero Config
- Snapshots
- Isolated
- Great API

`Jest` is supporting for multiple `Javascript` things like `Typescipt`, `Node`, `React`, `Angular` and `Vue`. One more thing makes `Jest` become more worthy of trust because big tech companies believe `Jest` for automation testing parts of things inside product pipelines, like Facebook, X (Twitter), Spotify, ...

You can find more information about `Jest` with couple pages

- [Jest - Documentation Page](https://jestjs.io/docs/getting-started)
- [Jest - API and CLI](https://jestjs.io/docs/api)

So pick up a tools, and now you need to help developers bring that into automation with no more effort. Test cases will prepared by developers and your duty as DevOps, you need to change into pipelines with 100% automatic.

You can hand-on with couple platform, such as GitHub Actions, AWS Code Pipelines, GitLab CI, Circle CI, Travis CI, ... It's actually a lot I think, you can try to learn from these articles

- [Bitovi - Automate Jest Tests in Your DevOps Pipeline with GitHub Actions](https://www.bitovi.com/blog/automate-jest-tests-in-your-devops-pipeline-with-github-actions)
- [Chucks's Academy - Test Automation with CI/CD using Jest](https://www.chucksacademy.com/en/topic/dom-testing-jest/test-automation-with-ci-cd-using-jest)
- [Caylent - Automated Testing with Jest on AWS](https://caylent.com/blog/automated_testing_with_jest_on_aws)
- [GitLab - How to automate testing for a React application with GitLab](https://about.gitlab.com/blog/2022/11/01/how-to-automate-testing-for-a-react-application-with-gitlab/)

But why I prefer GitLab CI because ecosystem of this platform creates insane place for adopting any process into GitOps mindset. IYKYK, GitLab keeps both responsibilities, repository and devsecops platforms, and when you try focus on GitLab you can see a lot of features that provides for developers truly useful and totally free.

You can come and read about some topics in [GitLab Documentation - Test with GitLab CI/CD and generate reports in merge requests](https://docs.gitlab.com/ee/ci/testing/)

![[Pasted image 20241117143823.png]]

As you can see, GitLab provides a lot of types to test, and you can try one of these inside Platform, and I will focus with you to use `Jest` in running Unit-Test (UT) for project and see the result fulfillment

One more thing to make GitLab CI becomes the best place to operate your pipeline because the incredible report responses after automation testing passthrough, with provide a lot of things to help you direct vision of efficiency of testing with product.

Unit Test report with support [`artifacts:reports:junit`](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html#artifactsreportsjunit) type and support for multiple language in public exporting report about unit-test

![[Pasted image 20241117144608.png]]

BTW, You can use one of two visualization to export report into GitLab to see what coverage of testing process as HTML Page, Coverage score, and a lots

- [Cobertura Coverage Reports](https://docs.gitlab.com/ee/ci/testing/test_coverage_visualization/cobertura.html)
- [JaCoCo Coverage Reports](https://docs.gitlab.com/ee/ci/testing/test_coverage_visualization/jacoco.html)

>[!done]
>Throughput anything else, I think that make GitLab CI become potential place when you try to store your source code, adapt the pipelines process, retrieve the high quality report, and moreover. Now we will bump to practical session to know more about automation test and GitLab CI
# Practical Session

>[!question]
>In this practical session, we will focus into how to leverage GitLab CI and Jest to create fully automation testing process for Typescript

Before starting, you can check it out couple articles and repository to help you figure how can implement

- [Medium - GitLab CI/CD for Automated Testing](https://medium.com/@vinoji2005/day-9-gitlab-ci-cd-for-automated-testing-c942d9cec232)
- [Testmo - GitLab CI/CD Test Automation Pipeline & Reporting](https://www.testmo.com/guides/gitlab-ci-test-automation/)
- [Viblo - Automation Test với Docker và Gitlab CI](https://viblo.asia/p/automation-test-voi-docker-va-gitlab-ci-yMnKMv2DZ7P)
- [Evolvingweb - A Comprehensive Guide to React Native, Jest and GitLab CI/CD](https://evolvingweb.com/blog/comprehensive-guide-react-native-jest-and-gitlab-cicd)

## Prepare and Introduce Module

Actually, I don't remember how the project of example particularly, but sorry to not attach you in here, shout out to him/her to help me retrieve useful example for the experiment

You can try to access to my repository to get one example product for yourself at [Automation Test with Jest](https://gitlab.com/automation-test-with-jest). This organization will include two repository, including

- [jest-unit-test](https://gitlab.com/automation-test-with-jest/jest-unit-test "Automation Test with Jest / jest-unit-test") : Implement the TestCase, Code and GitLab Pipelines
- [ut-gitlab-template](https://gitlab.com/automation-test-with-jest/ut-gitlab-template "Automation Test with Jest / ut-gitlab-template"): Store the GitLab Pipelines template for automation testing

BTW you need to focus in first one, and I will try to help you implement directly run unit-test for specific inside `.gitlab-ci.yml` file

When you try to access and clone the source code, you can see with `jest` that have some specific file, for example: `jest.config.js`

```js title="jest.config.js"
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '((\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ["html", "text", "text-summary", "cobertura"]
}
```

To empower with more configuration of `Jest`,  you need to use `jest.config.js` to ramp up this and it will be discovered automatically when you run test

You can find some options to define inside this configuration at [Configuring Jest - Options](https://jestjs.io/docs/configuration#options), and in our circumstance, `Jest` file will focus into

- Testing TypeScript with `ts-jest` option
- Regex to detect test definition for TypeScript
- Set array of file extensions your module use
- Set reporter to use `covertura` coverage report with HTML export after running test

You can take a look in example, I will focus into two test-case, first for `math.ts` and second for `cpf.ts` with `*.test.ts` definition inside [`src` PATH](https://gitlab.com/automation-test-with-jest/jest-unit-test/-/tree/main/src?ref_type=heads)

Next, you need to catch up with `package.json` to see what module dependency. When you work with `jest` and try to export unit-test, you need to add two package module into this file, including

- [jest](https://www.npmjs.com/package/jest)
- [jest-junit](https://www.npmjs.com/package/jest-junit)

If your `package.json` is not exist, you can try to add with command to install dependencies for at all

```bash
npm add <package>
```

One more things, you need to define more inside `package.json` about how your module actual work. In my circumstance, I define `test` command to use `resultProcessor` with Junit and expose coverage with configuration inside `jest.config.js`. If you want to do more with command, I think you should explore with [Jest CLI Documentation](https://jestjs.io/docs/cli)

## Bump in the GitLab CI pipelines

Now, The source code already prepare, you need to reach to `.gitlab-ci.yml` file and define what you need into this workflow.

```bash
stages:
  - unit-test
  - unit-test-report

default:
  image: node:18.20.4

# Run unit test with integrate coverage, export coverage number and generate report
unit-test:
  stage: unit-test
  script:
    - npm install
    - npm run test
  # To specify a list of files and directories to cache between jobs.
  # Documentation: https://docs.gitlab.com/ee/ci/yaml/#cache
  cache:
    paths:
      - coverage/
  artifacts:
    untracked: false
    when: on_success
    access: all
    expire_in: "30 days"
    reports:
      # Upload junit report to exporting test result in pipeline
      # Documentation: https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html#artifactsreportsjunit
      junit:
        - junit.xml
      # Upload coverage report to web use `cobertura`
      # Documentation: https://docs.gitlab.com/ee/ci/testing/test_coverage_visualization/cobertura.html
      coverage_report:
        path: "coverage/cobertura-coverage.xml"
        coverage_format: cobertura
    # Upload coverage report whole folder generate to prepare access via browser
    paths:
      - "coverage/**"
  # To help you know last result (coverage) of unit-test
  coverage: '/All files[^\|]*\|[^\|]*\s+([\d\.]+)/'

# Upload report to artifact, use it as website to see detail UT process
ut-report:
  stage: unit-test-report
  # Retrieve the artifact from successful in the previous job
  dependencies:
	- unit-test
  script:
    - mkdir -p .public
    - cp -r coverage/* .public
    - mv .public public
  artifacts:
    untracked: false
    when: on_success
    access: all
    expire_in: "30 days"
    paths:
      - public
```

As you can see, we will include two step, run `unit-test` and expose report with `ut-report`.

With `unit-test`, we will run install to setup `node_modules` to adapt libs and packages for source code, and after that your run `test` command with defining in `package.json` to run and export report

Important part in `unit-test` step, you will upload artifact with including whole report, coverage about test process, and `coverage` result with regex, you can get another type at [Test coverage examples](https://docs.gitlab.com/ee/ci/testing/code_coverage.html#test-coverage-examples)

- `junit` --> `junit.xml`
- `coverage` --> `coverage/cobertura-coverage.xml`
- `HTML` --> `coverage/**`

After that you receive the artifact next job with `dependencies: unit-test`, and expose webpage with GitLabCI because with `public` folder that GitLab permits to use as webpage through GitLab Page. Explore more at [GitLab Pages public folder](https://docs.gitlab.com/ee/user/project/pages/public_folder.html)

Now you can run the pipeline, create a new commit and push that into `main` branch

## Result of automation test in GitLab CI

When you push your commit into branch, GitLab will auto trigger your pipeline, you can follow inside `Build >> Pipelines`

![[Pasted image 20241117160516.png]]

Next, you need to view detail with pipeline, you can try click with `Status` button to see detail

![[Pasted image 20241117160645.png]]

When you try to change into `Jobs` tab, you will see the `coverage` value after running `unit-test` job which expose from information inside job logs

Next you change into `Tests` tab, you will see test total information of your test process

![[Pasted image 20241117160950.png]]

If you want to view detail each test cases, you can try to click to name of jobs, e.g `unit-test`

![[Pasted image 20241117161032.png]]

You think how to access HTML as GitLab Page, you can easily to access into artifact inside `unit-test-report` job, follow these steps `unit-test-report >> Browser (Artifact) >> Public >> index.html`

![[Pasted image 20241117161235.png]]

![[Pasted image 20241117161257.png]]

>[!done]
>You can access GitLab Page, and see your coverage report inside that with detail report. I don't actual know about meaning of these one but it's seem directly report and you debug, figure out the error easier and less effort

# Conclusion

![[meme-byebye.png|center|500]]

>[!done]
>That @all for this week, I hope you find well with this article and prepare enough for your automation testing integration progress. I think `jest` that truly useful and power framework to testing with Javascript and framework, and with GitLab, This platform is superb and huge to deep dive and you will always surprise with this one, 100% honestly. However, You have chance to absorb anything else and I think write couple thing for automation testing is one of these process

>[!quote]
>This blog is enough to read but not long as well, BTW I enjoy a lot to write this one. This weekend session head to end soon, so stay safe, learning new thing and I will back next weekend with Kubewekend, I think 😄. Bye Bye









