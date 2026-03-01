---
title: Awesome Golang
tags:
  - awesome
  - developer
  - usage
---

# Go and Common Usages

![[thumbnail-golang.png]]
## Install Golang with Binary

The easy way to install Go is downloading the binary from source, and load them into PATH of Linux Machine, and it's same but easier than for Windows with installer.

To find more version support, you can double-check at [Official Release of Golang](https://go.dev/dl/). Now let's install specific version, e.g (1.23.1) for your host, following the guideline at [Go - Download and install](https://go.dev/doc/install)

First of all, download the compress package from repositories and decompress them

```bash
wget https://go.dev/dl/go1.23.1.linux-amd64.tar.gz
tar -xzf go1.23.1.linux-amd64.tar.gz
```

Next move the decompress of Golang to the place where you want and able to set into the host PATH

```bash
sudo mv go /usr/local/
echo "export PATH=\"\$PATH:/usr/local/go/bin\"" >> ~/.zshrc
source ~/.zshrc
go version
rm -rf go1.23.1.linux-amd64.tar.gz
```

After expose and setup several stuff to retrieve go binary, you need to setup more about GOROOT where golang save the package in your host, and use them to workaround with tools, library dependencies, ...

```bash
# As usual, I create the `.go` directory at home path
mkdir -p ~/.go

# Now setup them with GOROOT and GOPATH
export GOROOT="/usr/local/go"
export GOPATH="$HOME/.go"
```
# General

![[meme-golang.png]]
## Awesome Repositories

- [awesome-go](https://github.com/avelino/awesome-go): A curated list of awesome Go frameworks, libraries and software
- [go-patterns](https://github.com/tmrts/go-patterns): Curated list of Go design patterns, recipes and idioms
## Library and Package Repositories

- [go-packager](https://pkg.go.dev/): The Go Packager
# Tools

![[thumbnail-go-package.png]]
## Developer Wrapper

- [grocksdb](https://github.com/linxGnu/grocksdb): RocksDB wrapper for Go. Support 9.x, 8.x, 7.x, 6.x, etc