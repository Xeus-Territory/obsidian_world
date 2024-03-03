---
title: Compile gRPC for 1st time
tags:
  - research
  - makefile
  - DIY
  - cmake
---
*So like the previous topic - [[Play with Makefile]], I hope you and me can produce the makefile for helping compile `C++` project, especially gRPC - pretty hard when work with `C++` than others language. So take a look and maybe we will learn about `CMake`. I' dunno but I will try* 🙌🙌🙌

# Hard to try gRPC with Makefile

>[!info]
>Base on the official project from gRPC, `Make` is deprecated optional although default choice when build for UNIX based system used this one. Recommendation, should use `bazel` or `cmake` instead

![[Pasted image 20240301132741.png]]

>[!quote]
>*Upset, but you need to know, there is not easily to managing the gRPC and add-ons pluggin when you write the makefile for yourself and compile project, It's really tough, hard and waste much time to understand how you wrong is it, like me* 😄😄😄

 So don't waste your time, gprc is making some helpful thing compiler with automation generate the completion makefile via CMake. Go quick and check that in official homepage of [CMake](https://cmake.org/)
# Quick setup gRPC
## How can setup grpc ?
![[Pasted image 20240301133750.png]]
>[!summary]
>**Why gRPC ?**
>
>gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.
>
>**Feature gRPC**
>1. Simple service definition
>2. Start quickly and scale
>3. Works across languages and platforms
>4. Bi-directional streaming and integrated auth

So, with summary about gRPC - the brief from [official homepage](https://grpc.io/) - Maybe it will help you gain your knowledge about this technologies which help you in some case like
- Increase your transfer performance
- Improving the security for bi-direction data
- ...

>[!quote]
>But theory is just theory, knowing what it is and how to apply it is important.Therefore, come from the `C++/C`, the low level of code, that will help you understand how it work and implementation.But first of all, how we can setup the environment for gRPC ? easy or hard ? I am the first try, I choose the hardest thing - Installed the gRPC from multiple project by myself.

This bash script is created for first time install gRPC, nightmare !!!. It generate fail grpc, not including package, ...

```bash
## First Bash Script for installing gRPC and protobuf
#!/bin/bash
grpc_version=$1     # 1.60.1
proto_version=$2    # 25.2
if [[ $grpc_version == "" ]] && [[ $proto_version == "" ]] 
then
    printf "Missing grpc or proto version 🐲🐲🐲 \nPlease select version and providing it:\n- grpc     💨💨💨 https://github.com/grpc/grpc \n- protobuf 💨💨💨 https://github.com/protocolbuffers/protobuf"
    exit 1
fi
sudo apt update
sudo apt install -y cmake
sudo apt install -y build-essential autoconf libtool pkg-config curl wget unzip protobuf-compiler-grpc
# Download, extract and copy module into including library in your machine
wget "https://github.com/grpc/grpc/archive/refs/tags/v$grpc_version.tar.gz" -O ~/grpc.tar.gz && \
mkdir -p ~/grpc && \
tar -xzf ~/grpc.tar.gz -C ~/grpc && \
sudo cp -r ~/grpc/grpc-"$grpc_version"/include/* /usr/include
# Download, extract and copy some dependencies with grpc
wget https://github.com/abseil/abseil-cpp/releases/download/20240116.0/abseil-cpp-20240116.0.tar.gz -O ~/abseil-cpp-20240116.0.tar.gz && \
mkdir -p ~/abseil && \
tar -xzf ~/abseil-cpp-20240116.0.tar.gz -C ~/abseil && \
sudo cp -r ~/abseil/abseil-cpp-20240116.0/absl /usr/include
# Install protobuf for work with grpc
# 1. Install binary protoc
wget "https://github.com/protocolbuffers/protobuf/releases/download/v$proto_version/protoc-$proto_version-linux-x86_64.zip" -O ~/protoc-"$proto_version"-linux-x86_64.zip && \
mkdir -p ~/protobuf && \
unzip ~/protoc-"$proto_version"-linux-x86_64.zip -d ~/protobuf && \
sudo cp -r ~/protobuf/bin/* /usr/local/bin
# 2. Install lib for protoc
wget "https://github.com/protocolbuffers/protobuf/archive/refs/tags/v$proto_version.tar.gz" -O ~/v"$proto_version".tar.gz && \
tar -xzf ~/v"$proto_version".tar.gz -C ~/protobuf && \
sudo cp -r ~/protobuf/protobuf-"$proto_version"/src/google /usr/include
```

So maybe choose believe yourself, you should learn from gRPC and It will suggest you about optional to install it, that helpful link [CPP - Quick start](https://grpc.io/docs/languages/cpp/quickstart/) is the manual which help you. Secondly change, I don't have made another mistake when install gRPC, just put bash script and you will have what you want

```bash
# setup.sh

#!/bin/bash
grpc_version=$1     # 1.61.0
if [[ $grpc_version == "" ]]
then
    printf "Default version will be installed 1.61.0, for specified versions run script again with version.\n\nE.x: ./setup.sh 1.60.1 \n\nGo & check version in Github: https://github.com/grpc/grpc"
    grpc_version="1.61.0"
fi
# Install require and dependencies package for buiding grpc
sudo apt update
sudo apt install -y cmake
sudo apt install -y build-essential autoconf libtool pkg-config curl wget unzip
# Setup install path for build binary and including package
INSTALL_DIR="$HOME/.local"
if [ -d "$INSTALL_DIR" ]; then
    echo "Directory existed, skip this step !!!"
else
    mkdir -p "$INSTALL_DIR"
fi
git clone --recurse-submodules -b v"$grpc_version" --depth 1 --shallow-submodules https://github.com/grpc/grpc "$HOME/grpc"
mkdir -p "$HOME/grpc/cmake/build"
pushd "$HOME/grpc/cmake/build" || exit 1
cmake -DgRPC_INSTALL=ON \
      -DgRPC_BUILD_TESTS=OFF \
      -DCMAKE_INSTALL_PREFIX="$INSTALL_DIR" \
      ../..
make -j 4
make install
popd || exit 1
```

This script is better way and collected the multiple task from gRPC official documentation, It will help you install gRPC and adds-on plugin attach about 10 or more. So just run the script and your workspace will have gRPC *(Test on Ubuntu 22-04, Debian and will not work with another UNIX, Linux Distros)*

```bash
# Change the mode of setup file
chmod +x setup.sh
# Execution the bash file
./setup.sh <version-grpc> # default: 1.61.0
```
## Some tips to setup gRPC for your `C++/C` workspace 

*This recommendation just for Ubuntu 22.04 with shell like zsh or bash)*

1. Export PATH for to used bin module like `protoc`

Optional 1: Setup for only currently session

```bash
export PATH="$PATH:$HOME/.local"
```

Optional 2: Setup for persistent in Linux (Ubuntu 22.04 zsh or bashrc)

```bash
# Check your currently shell
echo $SHELL

# IF: /usr/bin/zsh
# Open zsh-profile for export PATH
nano ~/.zshrc
# Append this statement on last file
export PATH="$PATH:$HOME/.local"

# IF: /usr/bin/bash
# Open bash-profile for export PATH
nano ~/.bashrc
# Append this statement on last file
export PATH="$PATH:$HOME/.local"

# Applied new profile in currently shell
source ~/.zshrc || source ~/.bashrc
```

That all, you have the new PATH, you can check via command to knowing right or not

```bash
# List env or specify PATH
printenv
env
echo $PATH

# Verify protoc is actually work
which protoc
## --> /home/user/.local/protoc
```

2.  Setup gRPC including and package requirements PATH

>[!warning]
>Easily for development to ignoring some warning and error messages when not finding the include package for project dependencies

Like the first tip, you need export some variables into your default shell. This will help your editor know location of package, find right PATH is easily for coding and suggestion. This list of will help you know more and more
- [GCC - Environment Variables](https://gcc.gnu.org/onlinedocs/cpp/Environment-Variables.html)
- [pkg-config](https://linux.die.net/man/1/pkg-config)
- [ld-linux](https://linux.die.net/man/8/ld-linux)

```bash
# Include PATH for g++
# Including the C++ Include PATH
export CPLUS_INCLUDE_PATH="$HOME/.local/include:$CPLUS_INCLUDE_PATH"
# Include the C++ LD Library PATH
export LD_LIBRARY_PATH="/usr/local/lib:/usr/local/lib64:$LD_LIBRARY_PATH"
# Include the C++ PKG config for Make and CMake
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:$HOME/.local/lib/pkgconfig:$PKG_CONFIG_PATH"
```

You can verify that by

```bash
# Check include PATH of gcc
g++ -x c++ -E -v -

# Check (ld) dynamic linker
# Article: https://stackoverflow.com/questions/50159/how-to-show-all-shared-libraries-used-by-executables-in-linux
ldd path/to/the/tool

# Check pkg_config
pkg-config --list-all
```

# First compiling gRPC with CMake
## What is CMake ?

![[Pasted image 20240301152142.png]]

>[!info]
><h2>CMake: A Powerful Software Build System</h2>
>
>CMake is the de-facto standard for building C++ code, with over 2 million downloads a month. It’s a powerful, comprehensive solution for managing the software build process. Get everything you need to successfully leverage CMake by visiting our resources section.
>
>Feature CMake
>- [Cross-platform packaging system](https://cmake.org/features/#cross-platform-packaging-system)
>- [Out-of-source-builds](https://cmake.org/features/#out-of-source-builds)
>- [Single source builds on multiple platforms](https://cmake.org/features/#single-source-builds)
>- [System Introspection](https://cmake.org/features/#system-introspection)
>- [Cross-platform testing system](https://cmake.org/features/#cross-platform-testing-system)
>
>Documentation
>- [Getting started](https://cmake.org/getting-started/)
>- [Documentation](https://cmake.org/documentation/)

>[!quote]
>With gRPC, CMake is very helpful and powerful. Actually, CMake is just generate tool and help you create Makefile, but it will optimize the effort when it is not easily to creating by yourself (thousand lines)

## Implementation CMake for gRPC project

This script is created by me which base on some collection script from gRPC, github, ... for suitable applied on project structure below. Therefore, I think those helpful documentations do for something 😆😆😆

- [chungphb - grpccpp](https://github.com/chungphb/grpc-cpp/blob/master/CMakeLists.txt)
- [grpc - examples/cpp/helloworld](https://github.com/grpc/grpc/blob/v1.61.0/examples/cpp/helloworld/CMakeLists.txt)

Step to create CMake file for your projects
1. First of all, you can make project directory like me
```bash
gprc-project
├── cmake
│   ├── build
│   └── common.cmake
├── CMakeLists.txt
├── protos
│   └── sample.proto
└── src
```

2. Create `CMakeLists.txt` in root directory, the contents is about and you need `common.cmake` to handle others work ▶️ ▶️ [common.cmake](https://github.com/grpc/grpc/blob/v1.61.0/examples/cpp/cmake/common.cmake) (NOTICE: `add_subdirectory(../../.. ${CMAKE_CURRENT_BINARY_DIR}/grpc EXCLUDE_FROM_ALL)` changing this PATH for suitable with your project)

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.22)
project(grpc-projects LANGUAGES CXX)

include(./cmake/common.cmake)

get_filename_component(hw_proto "./protos/sample.proto" ABSOLUTE)
get_filename_component(hw_proto_path "${hw_proto}" PATH)

set(hw_proto_srcs "${CMAKE_CURRENT_BINARY_DIR}/sample.pb.cc")
set(hw_proto_hdrs "${CMAKE_CURRENT_BINARY_DIR}/sample.pb.h")
set(hw_grpc_srcs "${CMAKE_CURRENT_BINARY_DIR}/sample.grpc.pb.cc")
set(hw_grpc_hdrs "${CMAKE_CURRENT_BINARY_DIR}/sample.grpc.pb.h")

add_custom_command(
    OUTPUT "${hw_proto_srcs}" "${hw_proto_hdrs}" "${hw_grpc_srcs}" "${hw_grpc_hdrs}"
    COMMAND ${_PROTOBUF_PROTOC}
    ARGS --grpc_out "${CMAKE_CURRENT_BINARY_DIR}"
    --cpp_out "${CMAKE_CURRENT_BINARY_DIR}"
    -I "${hw_proto_path}"
    --plugin=protoc-gen-grpc="${_GRPC_CPP_PLUGIN_EXECUTABLE}"
    "${hw_proto}"
    DEPENDS "${hw_proto}"
)

include_directories("${CMAKE_CURRENT_BINARY_DIR}")

# hw_grpc_proto
add_library(hw_grpc_proto
  ${hw_grpc_srcs}
  ${hw_grpc_hdrs}
  ${hw_proto_srcs}
  ${hw_proto_hdrs})
target_link_libraries(hw_grpc_proto
  ${_REFLECTION}
  ${_GRPC_GRPCPP}
  ${_PROTOBUF_LIBPROTOBUF})

# Targets sample_[async_](client|server)
foreach(_target
  sample_client sample_server)
  add_executable(${_target} "./src/${_target}.cc")
  target_link_libraries(${_target}
    hw_grpc_proto
    absl::flags
    absl::flags_parse
    ${_REFLECTION}
    ${_GRPC_GRPCPP}
    ${_PROTOBUF_LIBPROTOBUF})
endforeach()
```

In head of file, you will define CMake version, what language `C` or `C++` used, include `common.make`

```cmake
cmake_minimum_required(VERSION 3.22)
project(grpc-projects LANGUAGES CXX)

include(./cmake/common.cmake)
```

After that, specify PATH for protos directory and your location expected when proto is generated. It will help you create gRPC file and header to support your proto

```cmake
get_filename_component(hw_proto "./protos/sample.proto" ABSOLUTE)
get_filename_component(hw_proto_path "${hw_proto}" PATH)

set(hw_proto_srcs "${CMAKE_CURRENT_BINARY_DIR}/sample.pb.cc")
set(hw_proto_hdrs "${CMAKE_CURRENT_BINARY_DIR}/sample.pb.h")
set(hw_grpc_srcs "${CMAKE_CURRENT_BINARY_DIR}/sample.grpc.pb.cc")
set(hw_grpc_hdrs "${CMAKE_CURRENT_BINARY_DIR}/sample.grpc.pb.h")

add_custom_command(
    OUTPUT "${hw_proto_srcs}" "${hw_proto_hdrs}" "${hw_grpc_srcs}" "${hw_grpc_hdrs}"
    COMMAND ${_PROTOBUF_PROTOC}
    ARGS --grpc_out "${CMAKE_CURRENT_BINARY_DIR}"
    --cpp_out "${CMAKE_CURRENT_BINARY_DIR}"
    -I "${hw_proto_path}"
    --plugin=protoc-gen-grpc="${_GRPC_CPP_PLUGIN_EXECUTABLE}"
    "${hw_proto}"
    DEPENDS "${hw_proto}"
)
```

Last one, you need to add some PATH of your project, dynamic link and requirement lib to build gRPC. With responsibility, CMAKE will collect and import into the module generated when run build.

```cmake
include_directories("${CMAKE_CURRENT_BINARY_DIR}")

# hw_grpc_proto
add_library(hw_grpc_proto
  ${hw_grpc_srcs}
  ${hw_grpc_hdrs}
  ${hw_proto_srcs}
  ${hw_proto_hdrs})
target_link_libraries(hw_grpc_proto
  ${_REFLECTION}
  ${_GRPC_GRPCPP}
  ${_PROTOBUF_LIBPROTOBUF})

# Targets sample_(client|server)
foreach(_target
  sample_client sample_server)
  add_executable(${_target} "./src/${_target}.cc")
  target_link_libraries(${_target}
    hw_grpc_proto
    absl::flags
    absl::flags_parse
    ${_REFLECTION}
    ${_GRPC_GRPCPP}
    ${_PROTOBUF_LIBPROTOBUF})
endforeach()
```

## Compile and Enjoy the results

To compile this project you need something to do with that, so with reference, I just copied and renewed `C++/C` for doing this things. Take a look

```c++
# sample_client.cc

#include "sample.grpc.pb.h"

#include <grpc++/grpc++.h>

#include <memory>

#include <iostream>

  

using grpc::Channel;

using grpc::ClientContext;

using grpc::Status;

using sample::SampleRequest;

using sample::SampleResponse;

using sample::SampleService;

  

class SampleClient

{

public:

    SampleClient(std::shared_ptr<Channel> channel) : _stub{SampleService::NewStub(channel)} {}

  

    std::string SampleMethod(const std::string &request_sample_field)

    {

        // Prepare request

        SampleRequest request;

        request.set_request_sample_field(request_sample_field);

  

        // Send request

        SampleResponse response;

        ClientContext context;

        Status status;

        status = _stub->SampleMethod(&context, request, &response);

  

        // Handle response

        if (status.ok())

        {

            return response.response_sample_field();

        }

        else

        {

            std::cerr << status.error_code() << ": " << status.error_message() << std::endl;

            return "RPC failed";

        }

    }

  

private:

    std::unique_ptr<SampleService::Stub> _stub;

};

  

int main(int argc, char **argv)

{

    std::string server_address{"localhost:2510"};

    SampleClient client{grpc::CreateChannel(server_address, grpc::InsecureChannelCredentials())};

    std::string request_sample_field{"world"};

    std::string response_sample_field = client.SampleMethod(request_sample_field);

    std::cout << "Client received: " << response_sample_field << std::endl;

    return 0;

}
```

```c++
# sample_server.cc

#include "sample.grpc.pb.h"

#include <grpc++/grpc++.h>

#include <memory>

#include <iostream>

  

using grpc::Server;

using grpc::ServerBuilder;

using grpc::ServerContext;

using grpc::Status;

using sample::SampleRequest;

using sample::SampleResponse;

using sample::SampleService;

  

class SampleServiceImpl final : public SampleService::Service {

    Status SampleMethod(ServerContext* context, const SampleRequest* request, SampleResponse* response) override {

        response->set_response_sample_field("Hello " + request->request_sample_field());

        return Status::OK;

    }

};

  

void RunServer() {

    std::string server_address{"localhost:2510"};

    SampleServiceImpl service;

  

    // Build server

    ServerBuilder builder;

    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());

    builder.RegisterService(&service);

    std::unique_ptr<Server> server{builder.BuildAndStart()};

  

    // Run server

    std::cout << "Server listening on " << server_address << std::endl;

    server->Wait();

}

  

int main(int argc, char** argv) {

    RunServer();

    return 0;

}
```

Preparation completely, next you need to compile this project into binary and running that. Go some command below and enjoy results

1. Create CMake folder to build, simple create `build` folder inside `cmake` folder, add this directory into stack to easily control when switch dev and build task

```bash
# Create build in cmake
mkdir -p cmake/build

# Add directory to stack with pushd
pushd cmake/build
```

2. Compile your project with CMake and Makefile generated

```bash
# CMake run for collect and generated Makefile for compiling project
# NOTICE: REMEMBER PUT YOUR LOCATION gRPC LIB INTO CMAKE COMPILE
MY_INSTALL_DIR="<location_grpc_lib>"; cmake -DCMAKE_PREFIX_PATH=$MY_INSTALL_DIR ../.. # Default: $HOME/.local

# Compile project with Makefile generated by Cmake
make -j 4
```

3. Results is will the twice binary file include 1 server and 1 client. Just run execution file in Linux with `./<name_of_file>`

![[Pasted image 20240303091823.png]]

## Some Addon after you understand gRPC compiling

1.  You can switch from stack and normal shell with command `pushd <directory>` and `popd`

>[!tips]
>With these command, you will not mess up your terminal and fear when compile gRPC, It's actually helpful when you need to fast compile and don't want to wrong PATH

2. You can recompile your code to build a new proto file, new code with run `make` again, anything will up to date
3. Clean everything on CMake, Just run `make clean`
4. Create `dev` environment for ignore not found packages

>[!tips]
>Please, Run in root directory with `makefile` below which will help you creating  `*.cc` and `*.h` files base on `*.proto`

```make
PROTOC = protoc
GRPC_CPP_PLUGIN = grpc_cpp_plugin
GRPC_CPP_PLUGIN_PATH ?= `which $(GRPC_CPP_PLUGIN)`

SOURCE_PATH = ./src
PROTOS_PATH = ./protos
vpath %.proto $(PROTOS_PATH)

.PRECIOUS: %.grpc.pb.cc
%.grpc.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --grpc_out=$(SOURCE_PATH) --plugin=protoc-gen-grpc=$(GRPC_CPP_PLUGIN_PATH) $<

.PRECIOUS: %.pb.cc
%.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --cpp_out=$(SOURCE_PATH) $<

clean:
	rm -f *.pb.cc *.pb.h
```

- When want to create proto support, just run `make -f <makefile> <nameproto>.grpc.pb.cc <nameproto>.pb.cc`
- When want to clean to create a new one because when make exist file, you can't not running to update (NOTICE: Add `.PHONY` but maybe in later), just run `make -f <makefile> clean`

# Conclusion

>[!summary]
>I hope this article is choice for your first gRPC project compiled with `C++`. This is really basic, so expand it base on your idealy, maybe It can help you. On some other, I will contribute about CMake to understanding this technologies and find out best way to create CMake. Enjoy and have fun 😉😉😉😉







