---
title: install_nvm.sh
tags:
  - fundamentals
  - basic-knowledge
  - bash
  - linux
  - nodejs
---

```bash
#!/bin/bash

## Install
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

## Source
your_shell=$(echo $SHELL)
echo $your_shell
if [[ $your_shell == "/usr/bin/zsh" ]]; then
  source ~/.zshrc
fi
if [[ $your_shell == "/usr/bin/bash" ]]; then
  source ~/.bashrc
fi

## Install version
version=$1

nvm install $version

## Check version

node --version
npm --version
```