---
title: Play with Makefile
tags:
  - research
  - makefile
---
*On this topic, It just put a couple things to finding out how we can use `Makefile`. It just a brief tutorials from [Learn Makefiles With the tastiest examples](https://makefiletutorial.com/), Just learn and figure out why want to play with this one and C, C++*

Reference Documentation
- [Official GNU Make](https://www.gnu.org/software/make/)
- [Learn Makefiles With the tastiest examples](https://makefiletutorial.com/)
# Makefile and anything about that type scripting
## Define, Why do we need Makefile ?

![[Pasted image 20240223104857.png]]
>[!info] Makefiles are used to help decide which parts of a large program need to be recompiled. In the vast majority of cases, C or C++ files are compiled. Other languages typically have their own tools that serve a similar purpose as Make. Make can also be used beyond compilation too, when you need a series of instructions to run depending on what files have changed. 

On my opinion, with `C` or `C++`, multiple file need to compile in one time, although if you think you will run with command, so just go ahead, but I need to said that not easily. You can see how you need `Makefile` instead of type command like example *(IDK but grpc make nightmare when compile with typing)*
```bash
g++ sample_client.cc ./build/sample.grpc.pb.cc `pkg-config --libs --static protobuf grpc++ absl_flags absl_flags_parse $PROTOBUF_ABSL_DEPS`\
	$PROTOBUF_UTF8_RANGE_LINK_LIBS \
	-pthread\
	-Wl,--no-as-needed -lgrpc++_reflection -Wl,--as-needed\
	-ldl -o build/sample_client
```

I just a fresher with `Makefile` but i need to figure out when you give a time for defining `Makefile`, I will cut a lot of time when you need moving `C` or `C++` module into another environment, module or container and compile itself for example, so that reason why i need to learn this 😄😄😄
## What alternatives are there to Make?
- C/C++: [SCons](https://scons.org/), [CMake](https://cmake.org/), [Bazel](https://bazel.build/), and [Ninja](https://ninja-build.org/) or maybe Visual Studio or Visual Studio Code will help you compile
- Java: [Ant](https://ant.apache.org/), [Maven](https://maven.apache.org/what-is-maven.html), and [Gradle](https://gradle.org/).
- Other languages like Go, Rust, and TypeScript have their own build tools

>[!info] Interpreted languages like Python, Ruby, and raw Javascript don't require an analogue to Makefiles. The goal of Makefiles is to compile whatever files need to be compiled, based on what files have changed. But when files in interpreted languages change, nothing needs to get recompiled. When the program runs, the most recent version of the file is used.

## Version of Make and Install Make
Currently version Make on Ubuntu 22.04 is 4.3. You can check it with below command

```bash
make --version
GNU Make 4.3
Built for x86_64-pc-linux-gnu
Copyright (C) 1988-2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

In situation, your shell doesn't have `make`, you can install it via some package managing like `apt(Linux) / choco(Windows) / yum(CentOS/RedHat)` or directly from website like [Window](https://gnuwin32.sourceforge.net/packages/make.htm). Some instruction can helping [Intro to ‘make’ Linux Command: Installation and Usage](https://ioflood.com/blog/install-make-command-linux/#:~:text=In%20most%20Linux%20distributions%2C%20the,command%20sudo%20yum%20install%20make%20.)

With Ubuntu 22.04, Just easily run this command
```bash
sudo apt update && sudo apt install make -y
```

# Makefile syntax, properties with example
## Syntax
A Makefile consists of a set of _rules_. A rule generally looks like this:
```makefile
targets: prerequisites
	command
	command
	command
```

- The _targets_ are file names, separated by spaces. Typically, there is only one per rule.
- The _commands_ are a series of steps typically used to make the target(s). These _need to start with a tab character_, not spaces.
- The _prerequisites_ are also file names, separated by spaces. These files need to exist before the commands for the target are run. These are also called _dependencies_

### Basic Example
So let take a editor or just terminal for create the first Makefile, this command will help you
```bash
touch Makefile # Sometime it just makefile
nano Makefile # Edit this via nano or you can use vim for instead
```

After you have your Makefile, let play with it and analysis about this one

```makefile
hello:
	echo "Hello, world !"
hello1:
	echo "Hello, world 1!"
```

Like I refer above about the Makefile use for do compile a bunch of files, if your terminal doesn't exist `hello` and `hello1` file, Makefile will actually work and print your string. Let's run command and view the result

```bash
# Just run with make
$ make       
echo "Hello, world !"
Hello, world !

# Run make with appending the name of file
$ make hello
echo "Hello, world !"
Hello, world !

$ make hello1
echo "Hello, world 1!"
Hello, world 1!
```

When we run `make`, it will run the first target of Makefile is `hello` --> currently It will find `hello` file is exist or not, if not it will execute command. So if `hello` file really exist, it will not execute command. You can specify the target with `make` command with append it into.

### Deep into advantage Makefile
*This [tutorial documentation](https://makefiletutorial.com/#:~:text=are%20still%20confusing.-,More%20quick%20examples,-The%20following%20Makefile) is contributing this example*
#### Level 1
Create a file `blah.c `and put some line of `C` into this, after that create make file for compile `blah.c` file

```c
// blah.c
int main() {printf("Hello world"); return 0;}
```

```makefile
blah:
	cc blah.c -o blah
```

So just run with basic `make` command, you will see output file is `blah` in your directory. `make` help you build this file from command, but in secondly, your `make` command will return  `make: 'blah' is up to date.`. Like I refer above, if you file is already existed, your command will not run

But It has problems, when you change `blah.c` --> `make` is not actually work, so you need to but the thing called "prerequisites" into Makefile

```makefile
blah: blah.c
	cc blah.c -o blah
```

With this condition `blah.c` will become factor which effect into `blah`. This mean, when you change `blah.c` --> Target `blah` can recompiled. Let's run `make` and watch a result

Conclusion you will have take in those example
- The first target is selected, because the first target is the default target
- This has a prerequisite of `blah.c`
- Make decides if it should run the `blah` target. It will only run if `blah` doesn't exist, or `blah.c` is _newer than_ `blah`
>[!hint]
>🔥**Fact**🔥
>To make this happen, it uses the filesystem timestamps as a proxy to determine if something has changed. This is a reasonable heuristic, because file timestamps typically will only change if the files are modified. But it's important to realize that this isn't always the case. You could, for example, modify a file, and then change the modified timestamp of that file to something old. If you did, Make would incorrectly guess that the file hadn't changed and thus could be ignored.

#### Level 2
If you work with more target, `makefile` will have some fun. Change your make file to new one
```makefile
blah: blah.o
	cc blah.o -o blah # Runs third

blah.o: blah.c
	cc -c blah.c -o blah.o # Runs second

blah.c:
	echo "int main() { return 0; }" > blah.c # Runs first
```

This file above from official documentation, It mean when you run `make`, It will execute and run those target because
- Have condition between those targets, before depend on like `blah` --> `blah.o` --> `blah.c`
- Actually condition when you want to run `make` successfully is removing `blah.c` and run make.

Copy this `makefile` and run it with your shell to get result

```bash
$ make       
echo "int main() { return 0; }" > blah.c # Runs first
cc -c blah.c -o blah.o # Runs second
cc blah.o -o blah # Runs third
```

After I deleted `blah.c`, rerun with `make` and all step will run. Go far way, If you edit it (and thus change the timestamp to newer than `blah.o`), the first two targets will run. If you run `touch blah.o` (and thus change the timestamp to newer than `blah`), then only the first target will run. If you change nothing, none of the targets will run. Try it out!

```bash
# Experiment 1 (Change blah.c)
~/Experimental/playmakefile ⌚ 14:34:14
$ echo "int main() { printf(\"Helloworld1\"); return 0; }" > blah.c 

~/Experimental/playmakefile ⌚ 14:34:28
$ make
cc -c blah.c -o blah.o # Runs second
cc blah.o -o blah # Runs third

# Experiment 2 (Change blah.o)
~/Experimental/playmakefile ⌚ 14:30:43
$ touch blah.o

~/Experimental/playmakefile ⌚ 14:30:53
$ make
cc blah.o -o blah # Runs third

# Experiment 3 (Not change anything)
~/Experimental/playmakefile ⌚ 14:34:32
$ make 
make: 'blah' is up to date.
```

With those concept, you can handle infinity loop when create and update a file with this example. Have Conditions but itself make dependency on others, but will cause effect for  each others

```makefile
some_file: other_file
	echo "This will always run, and runs second"
	touch some_file

other_file:
	echo "This will always run, and runs first"
```

## Make Clean
- `clean` is target for using remove the outputs of other target, not special wold in `make`
- `clean` is not first target (default) and not a prerequisite. It just run when you do `make clean`

>[!warning]
>`clean` is not intended to be a filename. If you happen to have a file named `clean`, this target won't run, which is not what we want. Use `.PHONY` to fix this

Example
```makefile
hello:
	touch hpnewyear
clean:
	rm -rf hpnewyear
```

Run make with command and see what result you will have
```bash
~/Experimental/playmakefile ⌚ 14:51:16
$ make
touch hpnewyear

~/Experimental/playmakefile ⌚ 14:51:28
$ make hello
touch hpnewyear

~/Experimental/playmakefile ⌚ 14:51:37
$ make clean
rm -rf hpnewyear
```

First of all, when you run `make` in default, it just run `hello` target and not execution `clean` and when you run with `make hello`, `clean` will not execute. Providing it, `clean` is not first or default target, If you want to execution it, Do command `make clean`

## Make Target

In the Make will some situations when you play with target ▶️ ▶️ [Documentation Example](https://makefiletutorial.com/#:~:text=works%0A%09echo%20%24x-,Targets,-The%20all%20target)
- When you want to make run all target, Make offer you `all`. If `all` target is listed, it will primary target and run default when not specify target when run `make` command --> `all: one two three`
- Multiple target can call easily via `$@`, it automatic variable and will run for each to contain target name

## Make variables
### I rate about `Make` variables

*Like any program or scripting language, Variables is important part when code or write script for any kind of them. Make script become parameterize, secure and flexible. Make is not exception*

Variables can only be strings. You'll typically want to use `:=`, but `=` also works

Example
```makefile
files := file1 file2
some_file: $(files)
	echo "Look at this variable: " $(files)
	touch some_file

file1:
	touch file1
file2:
	touch file2

clean:
	rm -f file1 file2 some_file
```

>[!important]
>- Single or double quotes have no meaning to Make. If you put a single quote, your script will parse to `'file'`
>- Reference variables using either `${}` or `$()`. When you try with `$x`, it works but not recommend

Some special case when doing with `Makefile` variables

There are two type of variables
- recursive (use `=`) - only looks for the variables when the command is _used_, not when it's _defined_.
- simply expanded (use `:=`) - like normal imperative programming -- only those defined so far get expanded

### Different between `recursive` or `simply expanded`
1. Overwrite or changing in last result
```makefile
# Recursive variable. This will print "later" below
one = one ${later_variable}
# Simply expanded variable. This will not print "later" below
two := two ${later_variable}

later_variable = later

all: 
	echo $(one)
	echo $(two)
```

With this example above, Tell us something 
- `recursive` can append or relate by others's define variables on whatever effect for it . In the end of Make, when print, this one can show the last result which effect the variable.
- But some how, `simply expanded` can't do like that `two` is just `two` and not append anymore like `recursive`. Because `later_variable` is not put on the head of two variable when it defined, therefore just `two` variable can't read `later_variable`

2. Allow append to a variable or not
With `recursive`, It will not append anything, just infinite loop when call itself --> `Makefile:3: *** Recursive variable 'one' references itself (eventually).  Stop.` but on the beside `simply expanded` do great things when can be able append to itself

```makefile
# Recursive append itself
one = one

one = ${one} # Error, cause exception and stop make

# Simply expanded append itself
two := two

two := two ${two} # Do a great job

all: 
	echo $(one)
	echo $(two)
```

### Special things when assign with variable
- `?=` only sets variables if they not set
- An undefined variable is actually an empty string!
- To make a variable with a single space, use `$(nullstring)`
- Use `+=` to append

### Environment variable with Makefile

*When Make starts, it automatically creates Make variables out of all the environment variables that are set when it's executed.*

```makefile
all:
	# Print out the Shell variable
	echo $$shell_env_var

	# Print out the Make variable
	echo $(shell_env_var)
```

```bash
~/Experiment/playmakefile ⌚ 14:25:57
$ export shell_env_var="123"

~/Experiment/playmakefile ⌚ 14:31:55
$ make     
# Print out the Shell variable
echo $shell_env_var
123
# Print out the Make variable
echo 123
123
```

The `export` directive takes a variable and sets it the environment for all shell commands in all the recipes

```makefile
shell_env_var = helloworld 123
export shell_env_var
all:
	# Print out the Shell variable
	echo $$shell_env_var

	# Print out the Make variable
	echo $(shell_env_var)
```

```bash
~/Experiment/playmakefile ⌚ 14:35:17
$ make
# Print out the Shell variable
echo $shell_env_var
helloworld 123
# Print out the Make variable
echo helloworld 123
helloworld 123
```

With some complicated, just take a look in how can perform `make` effect with sub `make`. And with `.EXPORT_ALL_VARIABLES` will exports all variables for you. You can copy and play with on ▶️ ▶️ [Documentation Example](https://makefiletutorial.com/#:~:text=As%20such%2C%20when%20you%20run%20the%20make%20command%20inside%20of%20make%2C%20you%20can%20use%20the%20export%20directive%20to%20make%20it%20accessible%20to%20sub%2Dmake%20commands.%20In%20this%20example%2C%20cooly%20is%20exported%20such%20that%20the%20makefile%20in%20subdir%20can%20use%20it.)

### Automatic Variables and Wildcards 

*Take a look in tutorials, it will talk about some wildcards and special automatic variables, some tips and usage when you know what you are doing ▶️ ▶️ [Example Documentation](https://makefiletutorial.com/#:~:text=Automatic%20Variables%20and%20Wildcards)*

# Advance Makefile Part

`Make` is made for doing easily when compile `C` and `C++`, If you reach this part, maybe will need to redirect to [Tutorial documentation - Chase Lambert](https://makefiletutorial.com/) to figuring out it. I will listed some hotkey and you can reach it from the tutorials.
- [Fancy Rules](https://makefiletutorial.com/#:~:text=hey%20one%20two-,Fancy%20Rules,-Implicit%20Rules) : Specify and implicit rules, kind of thing like precompile or compile with brief or short way, I think so. Moreover, you will have meet some specify pattern and functional with rule like [Static Pattern Rules](https://makefiletutorial.com/#:~:text=rm%20%2Df%20blah*-,Static%20Pattern%20Rules,-Static%20pattern%20rules), [Static Pattern Rules and Filter Function](https://makefiletutorial.com/#:~:text=Static%20Pattern%20Rules%20and%20Filter), [Pattern Rules](https://makefiletutorial.com/#:~:text=f%20%24(src_files)-,Pattern%20Rules,-Pattern%20rules%20are) and [Double-Colon Rules](https://makefiletutorial.com/#:~:text=c%3A%0A%20%20%20touch%20%24%40-,Double%2DColon%20Rules,-Double%2DColon%20Rules)
- [Commands and execution](https://makefiletutorial.com/#:~:text=Commands%20and%20execution): This part will talk about how you can do [slient](https://makefiletutorial.com/#:~:text=Command%20Echoing/Silencing) with `Makefile`, use [command execution rule](https://makefiletutorial.com/#:~:text=But%20this%20will%22-,Command%20Execution,-Each%20command%20is), [set default shell](https://makefiletutorial.com/#:~:text=cd%20..%3B%20%5C%0A%09echo%20%60pwd%60-,Default%20Shell,-The%20default%20shell) , [Double dollar sign](https://makefiletutorial.com/#:~:text=Hello%20from%20bash%22-,Double%20dollar%20sign,-If%20you%20want), [Error handling](https://makefiletutorial.com/#:~:text=Error%20handling%20with%20%2Dk%2C%20%2Di%2C%20and%20%2D), [Interrupting or killing make](https://makefiletutorial.com/#:~:text=Interrupting%20or%20killing%20make), [Recursive use of make](https://makefiletutorial.com/#:~:text=Recursive%20use%20of%20make)and [Arguments to make](https://makefiletutorial.com/#:~:text=rm%20%2Drf%20subdir-,Arguments%20to%20make,-There%27s%20a%20nice)
- [Additional variables](https://makefiletutorial.com/#variables-pt-2): This part will talk about how we can do [Override variable](https://makefiletutorial.com/#:~:text=Command%20line%20arguments%20and%20override),[List of commands and define](https://makefiletutorial.com/#:~:text=List%20of%20commands%20and%20define ),[Target-specific variables](https://makefiletutorial.com/#:~:text=Target%2Dspecific%20variables) and [Pattern-specific variables](https://makefiletutorial.com/#:~:text=Pattern%2Dspecific%20variables)
- [Conditional part of Makefiles](https://makefiletutorial.com/#:~:text=Conditional%20part%20of%20Makefiles): Like the name it will talk about condition with [If/else statements](https://makefiletutorial.com/#:~:text=part%20of%20Makefiles-,Conditional%20if/else,-foo%20%3D%20ok%0A%0Aall), [Check if a variable is empty](https://makefiletutorial.com/#:~:text=Check%20if%20a%20variable%20is%20empty), [Check if a variable is defined](https://makefiletutorial.com/#:~:text=Check%20if%20a%20variable%20is%20defined)and [MAKEFLAG](https://makefiletutorial.com/#:~:text=with%20findstring%20and-,MAKEFLAGS,-.%20Run%20this%20example)
- [Functions](https://makefiletutorial.com/#:~:text=to%20MAKEFLAGS%22%0Aendif-,Functions,-First%20Functions): Talk about how to create a functions with [First Functions](https://makefiletutorial.com/#:~:text=Functions-,First%20Functions,-Functions%20are%20mainly), [String Substitution](https://makefiletutorial.com/#string-substitution), [The foreach function](https://makefiletutorial.com/#the-foreach-function), [The if function](https://makefiletutorial.com/#the-if-function), [The call function](https://makefiletutorial.com/#the-call-function) and [The shell function](https://makefiletutorial.com/#the-shell-function)
- [Others](https://makefiletutorial.com/#other-features): Some others function has offered by Make like [Include Makefiles](https://makefiletutorial.com/#the-foreach-function:~:text=Other%20Features-,Include%20Makefiles,-The%20include%20directive), [The vpath Directive](https://makefiletutorial.com/#the-foreach-function:~:text=the%20Makefile%20Cookbook-,The%20vpath%20Directive,-Use%20vpath%20to), [Multiline](https://makefiletutorial.com/#the-foreach-function:~:text=rm%20%2Df%20some_binary-,Multiline,-The%20backslash%20(%22%5C%22)%20character), [.phony](https://makefiletutorial.com/#the-foreach-function:~:text=into%20multiple%20lines-,.phony,-Adding%20.PHONY%20to) and [.delete_on_error](https://makefiletutorial.com/#the-foreach-function:~:text=rm%20%2Df%20clean-,.delete_on_error,-The%20make%20tool)



















