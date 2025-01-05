---
title: How to serve Java API with Maven and Tomcat
tags:
  - devops
  - java
  - webserver
  - usage
---
>[!quote]
>Hi @all, it's me again, long time no see, how is your new year? Let's kickoff a bit energy with simple trying from my site with new technology and methodology to build and serve Java API with couple of tools, such as Maven, Tomcat and see how it work. Now, let's digest for first blog of 2025

![[meme-long-time-no-see.png|center]]

# Java world and attachable technologies

>[!question]
>When I come up with new idea 2025, I think about learn around webserver for first start and luckily, I found to `Tomcat` cuz I have request from my old co-worker to help him see why his web hosted by `Tomcat` is not work, I give a bit time to see Tomcat work and It actually kinda interesting

But anyway, when I try to reach to Tomcat and I know this tool spent for Java, especially Java Servlet because I know this technology for the long time before when I learn that one in university, kinda old but yeah, I found some a bit idea to foster that become more enchanting.

![[icon-java.png|center]]


`Java` and `C#` are both of big technology, I means there are a lot of differences to build up the product from those languages, you need to know about 

- Build tools
- WebServer for serving
- Integrate attachable
- and more and more

That why make those language is becoming big and separate with DevOps who work with lot of stuff related Node, PHP, ... But corresponded among languages, we always have multiple choice about technology for each topics above, and java is really insane. Let's see what we got

Following [LambdaTest - 19 Best Java Build Tools For Developers](https://www.lambdatest.com/blog/best-java-build-tools/) and [BairesDevBlog - Top 5 Java Build Tools Compared](https://www.bairesdev.com/blog/java-build-tool/) about Build Tools for Java, you often see couple of things familiar, including

- [Apache Ant](https://ant.apache.org/): A Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other (XML-based configurations)
- [Apache Maven](https://maven.apache.org/) (Recommendation): An open-source project management and build automation tool sed mainly for [Java projects](https://www.bairesdev.com/technologies/java/outsource-services/) (Declarative formats)
- [Gradle](https://gradle.org/): An advanced build automation tool thanks to its powerful, flexible domain-specific language based on Groovy/Kotlin
- Others way, we have [CMake](https://cmake.org/), [Bazel](https://bazel.build/), ... but that not spend for all of us

>[!quote]
>When I hear from my friend, shout out to [Tri An](https://www.linkedin.com/in/tri-an-nguyen-4b06302b7/) who super recommendation about Maven and talk Maven is most of powerful thing him work with as Java Developer Engineer

Next, I spend a couple mins and see about list of WebServer for Java Developed and It provides a lot of information about which one should be choice, explore at [Baeldung - Web and Application Servers for Java](https://www.baeldung.com/java-servers)

- [Apache Tomcat](https://tomcat.apache.org/): One of the more popular web servers in the Java ecosystem
- [Jetty](https://jetty.org/): A highly scalable and memory-efficient web server and servlet container, supporting many protocols such as HTTP/3,2,1 and WebSocket
- [Apache TomEE](https://tomee.apache.org/): A lightweight, yet powerful, JavaEE Application server with feature rich tooling.
- [Oracle WebLogic Server](https://www.oracle.com/vn/java/weblogic/):  A unified and extensible platform for developing, deploying, and running enterprise applications in Java for on-premises and in the cloud

>[!quote]
>Yeah, absolutely multiple optional for newbie when they want to start like me, so I ask my friend, again Tri An and him said about only Maven or should be attached with "Tomcat" cuz Jetty is not good enough when compare between them.

Spend a bit time and I see couple of blogs write about e2e pipeline CI/CD with Java and he try to combine between Tomcat and Maven, so I catch this chance to setup and see how both them work 😄. BTW, you can explore those blogs below

- [Medium - Real Time CI/CD Pipeline for Java Application to Deploy on Apache Server](https://medium.com/@madithatisreedhar123/real-time-ci-cd-pipeline-for-java-application-to-deploy-on-apache-server-ab51a4b1ae6e)
- [Medium - 🌻10 Stages Real-World CI/CD DevSecOps Pipeline for Deployment of Petclinic Application 🌻](https://medium.com/cloud-native-daily/10-stages-real-world-ci-cd-devsecops-pipeline-for-deployment-of-petclinic-application-f95431bf940)
- [Medium - Jenkins CICD for Java Application on Tomcat](https://medium.com/@risbud/jenkins-cicd-for-java-application-on-tomcat-a8daba671600)

But first of all, let learn a bit about Maven and Tomcat

# About Maven and Tomcat

![[meme-confuse-but-curious.png|center]]

>[!info]
>As usual, when kick off something like practice or lab session, I will spend a little bit time to go through technology used and see what is it ?

## Maven

![[icon-maven.png|center|400]]
>[!info]
><h2>What is Maven?</h2>
>
>[Apache Maven](https://maven.apache.org/) is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information.

[Couple of primary goals](https://maven.apache.org/what-is-maven.html) of Maven, such as

- Making the build process easy
- Providing a uniform build system
- Providing quality project information
- Encouraging better development practices

Once information from documentation, *"Maven is truly extend and reusable Ant scriptlets"*. It seems kinda straightforward contribute, but I know that do such incredible thing cuz that truthful have high recognize from community, especially Java Developer, so happiness and totally appreciate for such incredible contributing 🙌

When you work with `Maven`, You will spend a bit time to learn and define configuration through **XML** below couple of files, including

- [POM (Project Object Model)](https://maven.apache.org/pom.html): An XML representation of a Maven project held in a file named `pom.xml` (Same as `package.json` (Node) or `requirements.txt` (Python))
- [Settings](https://maven.apache.org/settings.html): `settings` element in the `settings.xml` file contains elements used to define values which configure Maven execution in various ways, like the `pom.xml`, but should not be bundled to any specific project, or distributed to an audience. These include values such as the local repository location, alternate remote repository servers, and authentication information.

It actually complex than what I know 😄, BTW we will turn back when we start a practical session, but let's see are there any thing else. So, I found about [Maven Repository](https://mvnrepository.com/), again that kinda same like [npm](https://www.npmjs.com/), [pypi](https://pypi.org/), [crates](https://crates.io/), and moreover. It seems like place where developer public package, library to serve developing process.

To run and execute `Maven`, this tool provides [CLI](https://maven.apache.org/ref/3.9.9/maven-embedder/cli.html), [plugins](https://maven.apache.org/plugins/index.html), [extension](https://maven.apache.org/extensions/index.html) and you can try to install `Maven` in your shell through some links, including

- [Downloading Apache Maven 3.9.9](https://maven.apache.org/download.cgi)
- [Installing Apache Maven](https://maven.apache.org/install.html)
- [Running Apache Maven](https://maven.apache.org/run.html)
- [Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [Configuring Apache Maven](https://maven.apache.org/configure.html)

>[!done]
>I think kinda enough for `Maven`, if i spend hour in `Maven`, I will share multiple information about this one and really confuse. Therefore, we will move to `Tomcat` before we turn back in the practical session

## Tomcat

![[icon-tomcat.png|center|400]]

>[!info]
><h2>What is Tomcat ?</h2>
>
>[Apache Tomcat](https://tomcat.apache.org/index.html) is a free and open-source implementation of the Jakarta Servlet, Jakarta Expression Language, and WebSocket technologies. It provides a "pure Java" HTTP web server environment in which Java code can also run. Thus it is a Java web application server, although not a full JEE application server.

Following the [Wikipedia - Apache Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat), they talk about these components implement and provide by Tomcat, such as

 - **Catalina**: Tomcat's [servlet container](https://en.wikipedia.org/wiki/Web_container "Web container"). Catalina implements [Sun Microsystems](https://en.wikipedia.org/wiki/Sun_Microsystems)' specifications for [servlet](https://en.wikipedia.org/wiki/Java_servlet "Java servlet") and JavaServer Pages (JSP).
 - **Coyote**: A Connector component for Tomcat that supports the HTTP 1.1 and 2 protocol as a web server
 - **Jasper**: Tomcat's JSP Engine. Jasper [parses](https://en.wikipedia.org/wiki/Parsing "Parsing") [JSP](https://en.wikipedia.org/wiki/JavaServer_Pages "JavaServer Pages") files to compile them into Java code as servlets (that can be handled by Catalina).
 - **Cluster**:  Used for [load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing) "Load balancing (computing)") that can be achieved through many techniques
 - **High availability**: Facilitate the scheduling of system upgrades (e.g. new releases, change requests) without affecting the live environment.
 - Plus more - **Valve**: Pluggable components for intercepting requests at any point in the processing pipeline.

Thank to [Jimin](https://jiminbyun.medium.com/) who contribute legit helpful articles about Tomcat Architecture and Configuration with detailed explanation at

- [Medium - Apache Tomcat (1): Core Components and Their Interactions](https://jiminbyun.medium.com/apache-tomcat-1-core-components-and-their-interactions-939f1f476544)
- [Medium - Apache Tomcat (2): Navigating the Tomcat Configuration](https://jiminbyun.medium.com/navigating-the-tomcat-configuration-2-deff9b7e3a01)

From those articles, I collect some cool stuff about Tomcat. From my perspective, Tomcat have to maintain and approach the configuration with **XML**, so we need to have experience when we work with Tomcat as well. There are four files to concern when we work with Tomcat WebServer

| Configuration File | Scope                          | Functionality                                                                                                                 |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| server.xml         | Global                         | Configures Tomcat's server-wide settings such as connectors, thread pools, virtual hosts, and global servlet definitions.     |
| context.xml        | Application-Specific or Global | Configures resources and environment settings for individual web applications or globally across all web applications.        |
| web.xml            | Application-Specific           | Defines how each web application handles requests and responses, including servlets, filters, welcome files, and error pages. |
| tomcat-users.xml   | Global                         | Defines user accounts and roles for authentication and authorization purposes within Apache Tomcat.                           |
|                    |                                |                                                                                                                               |
<div align="center">
	<p style="text-align: center;"><a href="https://gist.github.com/JiminByun0101/ec1fdbb9e99c07c2d1792d9fe17b09f3">Source: Jimin</a></p>
</div>

>[!done]
>Once upon again, we will reach to detail for what you need to configure with `Tomcat` server, so turn back in next part, practical session to see how we can work with both `Maven` and `Tomcat`

# Practical Session

>[!question]
>Now, we are kicking off the practical session, in this session, I will focus inside run spring boot java application through artifact application of `Maven` and deploying into `Tomcat` Server. That one will totally encapsulate inside docker container, just build and run.

First of all, I am not familiar with Java in my daily job, I have bit experience when I lay in university, that why I can  code `Java` but can't familiar or expertise to setup Spring Boot Framework project as well for example, but don't worry I always try to learn and found some source code, and we can inspect together. 

![[meme-thankful.png|center|500]]

Therefore, today I found once for this lab, shout out to [shawon100](https://github.com/shawon100) who contribute the detailing concept and repository like lab expectation, Explore more at [Spring-Boot-Maven-Tomcat-Docker](https://github.com/shawon100/Spring-Boot-Maven-Tomcat-Docker)

## Prerequisites

First of all, we need to figure out project what is it, learn and inspect deeper inside. So we will separate that into two progress, run with local and run through docker. To handle this situation you need to setup and install couple of tools, including

- Docker
- Java
- Maven
- Linux VM or WSL2

>[!warning]
>To easier approach and follow my step, you need to use Linux OS with couple distro about Debian like **Ubuntu** Or **Debian**. If you are window user, you can use Linux through [**WSL2**](https://learn.microsoft.com/en-us/windows/wsl/install)

For install `Docker`, that is a simple task and you just need to paste this command and Docker will be on your host

```bash
curl -fsSL https://get.docker.com | sudo bash -
```

Next, you need to install Java and Maven, in my situation I will try to install maven version 3.9.9 (LTS Version) and it doesn't specific particular java JDK, so I will try to install JDK18 to see what going on 😃. BTW, you can double check about [Version Range Specification](https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html)

With `Java`, you can install via `apt` package with simple command

```bash
sudo apt install openjdk-18-jdk –y 
```

Wait a bit and you have java version 18 in your host, double check with command

```bash
java --version
```

Afterward, we will install `Maven` and version specific is `3.9.9`. We can easily install by couple of commands

```bash
# Download maven 3.9.9
wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz

# Extract compress file
tar -xzf apache-maven-3.9.9-bin.tar.gz

# Move decompress into /usr/local
sudo mv apache-maven-3.9.9 /usr/local

# Serve PATH for bin folder of Maven 3.9.9 (Edit inside .zshrc or .bashrc)
export PATH="$PATH:/usr/local/apache-maven-3.9.9/bin"
```

Now you can have `Maven` in your local machine, double check with command

```bash
mvn --version
```

>[!note]
>You can add `mvn` into plugin `Oh-my-zsh` if used to execute completion mode for `Maven` in your shell

Now you environment in local machine is ready to practice. Reach next part to see what happen
## Play with Project

First of all, you need to ensure clone code from repository

```bash
git clone https://github.com/shawon100/Spring-Boot-Maven-Tomcat-Docker.git
```

First insight, we can take look about structure of project

```bash
Spring-Boot-Maven-Tomcat-Docker/
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── shawon
        │           └── dockerdemo
        │               ├── DockerDemoApp.java
        │               └── MyController.java
        ├── resources
        │   └── application.properties
        └── webapp
            └── WEB-INF
                └── jsp
                    └── index.jsp
```

As you can see, we have few thing to inspect, such as

- `Dockerfile`
- `pom.xml`
- `DockerDemoApp.java` and `MyController.java`
- `index.jsp`

If you take a look about `java` and `jsp`, the website is kinda simple API with GET Method. When we hit into that URL, it will return the text `Welcome` + parameter `name=?`

So we reach to `pom.xml` and see what is it, you need to take [POM (Project Object Model)](https://maven.apache.org/pom.html) documentation to understand more configuration

```xml title="pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.2.5.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.shawon</groupId>
	<artifactId>DockerDemoApp</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>DockerDemoApp</name>
	<description>Demo project for Spring Boot Webapp deployed in Tomcat running in Docker</description>
	<packaging>war</packaging>

	<properties>
		<java.version>11</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.apache.tomcat.embed</groupId>
			<artifactId>tomcat-embed-jasper</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
			<scope>provided</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<finalName>sample</finalName>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

When take a look, we can see couple of things to concern inside this file

- POM version `4.0.0`
- Java version `11`
- Install package include
	1. `spring-boot-starter-web`
	2. `tomcat-embed-jasper`
	3. `spring-boot-starter-tomcat` (provided) - a container to provide it at runtime
- Build plugin `spring-boot-maven-plugin` for **Spring Boot** and **Maven**
- In final, artifact build will name to `sample.war`

Now we try to build the artifact file for this project

```bash
mvn clean package
```

After wait about 1-2 mins for download package and build `war` file inside `target/` folder

```bash
target
├── DockerDemoApp-0.0.1-SNAPSHOT
│   ├── META-INF
│   └── WEB-INF
├── DockerDemoApp-0.0.1-SNAPSHOT.war
├── classes
│   ├── application.properties
│   └── com
├── generated-sources
│   └── annotations
├── maven-archiver
│   └── pom.properties
├── maven-status
│   └── maven-compiler-plugin
└── sample.war
```

As you can see `sample.war` is archive and now you can run this file to expose WEB API

Following the discussion about [StackOverFlow - How do I run a class in a WAR from the command line?](https://stackoverflow.com/questions/1842972/how-do-i-run-a-class-in-a-war-from-the-command-line), you have two ways to serve your website

**Run with standalone command (Not Recommend)**

```bash
java -jar target/sample.war
```

- This command will host `Tomcat` server with one embed inside build progress
- But it will expose **exception** about `java.io.IOException: Unable to open root Jar file` cuz we don't provide enough lib for this operation

>[!info]
>But It seems like not have any problem, so we can consider to run for testing. BTW, we have another way can be better.
>

**Run with bunch of commands to use class inside build (Recommend)**

This methodology look simple as well, so you need to follow couple of step to operate your WEB API

1. Unwrap the War file

```bash
jar -xvf target/sample.war
```

After step unwrap, you can see folder `WEB-INF` and `META-INF` created, you can use this one to execute your web in next step

2. Redirect into `WEB-INF` directory

```bash
cd WEB-INF
```

3. Read  `MANIFEST.MF` in `META-INF` folder to get `Start-Class`

```bash title="MANIFEST.MF" {7}
Manifest-Version: 1.0
Created-By: Maven Archiver 3.4.0
Build-Jdk-Spec: 18
Implementation-Title: DockerDemoApp
Implementation-Version: 0.0.1-SNAPSHOT
Main-Class: org.springframework.boot.loader.WarLauncher
Start-Class: com.shawon.dockerdemo.DockerDemoApp
Spring-Boot-Version: 2.2.5.RELEASE
Spring-Boot-Classes: WEB-INF/classes/
Spring-Boot-Lib: WEB-INF/lib/
```

4. Run your website with command

```bash
java -classpath "lib/*:classes/." com.shawon.dockerdemo.DockerDemoApp 
```

![[Pasted image 20250105211714.png]]
## Docker with Tomcat Server

>[!question]
>When you run standalone website, you need to decompress or use webserver to process `war` file and `Tomcat` is one handler of this.
>
>But it's not cover the strategy encapsulate and easier to deliver, so we can try to use `Tomcat` to become factor and help WEB API smoothly deliver and deploy.

So with strategy of project, author have write and encapsulate whole project into Docker Image and It's make project become easier to deliver and deploy

```Dockerfile
#Build Stage
FROM maven:3.6.3-openjdk-11-slim AS build

RUN mkdir -p /usr/local/app
 
COPY ./src /usr/local/app/src

COPY ./pom.xml /usr/local/app/pom.xml
 
WORKDIR /usr/local/app/
 
RUN mvn -Dmaven.test.skip=true clean package

# Publish Stage
FROM tomcat:8.5-jdk11-openjdk-slim
COPY --from=build /usr/local/app/target/sample.war  /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]
```

- Separate into 2 stage `Build` and `Publish`
- Copy manifest `sample.war` from `Build` to `Publish` Stage
- Use `Tomcat` to serve compress `war` file inside `webapps` folder
- Use `catalina.sh` to run servlet container. Explore more about [bin/catalina.sh](https://github.com/apache/tomcat/blob/main/bin/catalina.sh)

>[!note]
>For more information and script to interact with tomcat, you can explore at inside source code of Tomcat at [GitHub - Tomcat](https://github.com/apache/tomcat/tree/main/bin)

Now we can build docker image and try to run that to see what happen

```bash
docker build -t maven-tomcat:latest -f Dockerfile .
```

Wait a bit for build docker image success and after that we will run to see how it work

```bash
docker run -d -p 8080:8080 --name sample-maven-tomcat maven-tomcat:latest
```

![[Pasted image 20250105215422.png]]

>[!done]
>It works and now we can serve Spring Boot API with `Tomcat` Server

# Conclusion

![[meme-byebye.png|center|400]]

>[!done]
>That's all for this weekend, hope you find well information and enjoy your time to read my blog. New year for new challenge, new things to learn and truly want to contribute ever and ever, so that is my honor to keep my sprint, hold on the discipline and hopefully y'all guys stand with me for new things in this year 2025.

>[!quote]
>Happy to turn back soon with y'all guys, next week will have some special things, I move on for new job and let's see what thing to motivate new technology fields. Therefore, stay safe, keep learning and we will see each others next weekend. Happy new year and Bye 👋

