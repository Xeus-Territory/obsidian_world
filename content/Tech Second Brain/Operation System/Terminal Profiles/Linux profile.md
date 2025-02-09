---
title: Linux profile
tags:
  - terminal-profile
  - helpful
  - linux
  - zsh
---
>[!sumarry]
>This is about some configuration to make your effective when work with linux shell, `Oh-My-Zsh`. It will collection from multiple source, and process will describe on the following page, check it 😄

First of all, you need to install `ZSH` and `Oh-my-zsh` for your shell

- [Vietnamese - Cách cài đặt zsh và zsh-autosuggestions trên Ubuntu](https://viblo.asia/p/cach-cai-dat-zsh-va-zsh-autosuggestions-tren-ubuntu-LzD5ddDO5jY)
- [How to Install Zsh in Ubuntu 22.04](https://itslinuxfoss.com/how-to-install-zsh-in-ubuntu-22-04/)
- [Ohmyzsh's Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)
- [Gist - Setup ZSH extension](https://gist.github.com/n1snt/454b879b8f0b7995740ae04c5fb5b7df)
- [ZSH Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)
- [Install bamboo for Vietnamese Keyboard](https://github.com/BambooEngine/ibus-bamboo?tab=readme-ov-file#ubuntu-v%C3%A0-c%C3%A1c-distro-t%C6%B0%C6%A1ng-t%E1%BB%B1)
- [Extension - Clipboard](https://extensions.gnome.org/extension/779/clipboard-indicator/)
- [Extension - Blur My Shell](https://extensions.gnome.org/extension/3193/blur-my-shell/)

I just brief step, and combine all into one bash file, you run it
# Setup oh-my-zsh 

```bash title="oh-my-zsh-setup.sh"
#!/bin/bash

# Step 1: Update package repository and install zsh
sudo apt update
sudo apt install zsh -y

# Step 2: Install oh-my-zsh from script
# It will ask you change your default shell to zsh, select yes (y)
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# Or if you want to select again, you can do command downbelow
# sudo chsh -s $(which zsh)

# Currently, your default shell will turn to zsh. But for setup and work with .zshrc, you need install some extension and profile

# Install zsh-autosuggestion
# Github: https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Install zsh-autocomplete
# Github: https://github.com/marlonrichert/zsh-autocomplete
git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git $ZSH_CUSTOM/plugins/zsh-autocomplete

# Intall zsh-syntax-highlighting
# Github: https://github.com/zsh-users/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting

# Install az completion (config if you want)
# echo -n "source /etc/bash_completion.d/azure-cli" >> ~/.zshrc

# Install Fira Code Font
wget https://github.com/tonsky/FiraCode/releases/download/6.2/Fira_Code_v6.2.zip
unzip Fira_Code_v6.2.zip -d firacode
mkdir -p ~/.local/share/fonts
cp -r firacode/ttf/* ~/.local/share/fonts
rm -rf firacode Fira_Code_v6.2.zip
```

# Install helpful tools for ZSH

Install some tool, which actually need

```bash title="common-tools.sh"
#!/bin/bash

# Update
sudo apt update

# Install linux tool, docker and some common tools
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo chmod 666 /var/run/docker.sock

sudo apt install -y jq \
	curl \
	git \
	wget \
	net-tools \
	htop \
	procps \
	gnome-shell-extensions \
	gnome-shell-extension-manager \
	terminator
	
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin

# Install helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# # Install Powershell (If you need)
# ###################################
# # Prerequisites

# # Update the list of packages
# sudo apt-get update

# # Install pre-requisite packages.
# sudo apt-get install -y wget apt-transport-https software-properties-common

# # Get the version of Ubuntu
# source /etc/os-release

# # Download the Microsoft repository keys
# wget -q https://packages.microsoft.com/config/ubuntu/$VERSION_ID/packages-microsoft-prod.deb

# # Register the Microsoft repository keys
# sudo dpkg -i packages-microsoft-prod.deb

# # Delete the Microsoft repository keys file
# rm packages-microsoft-prod.deb

# # Update the list of packages after we added packages.microsoft.com
# sudo apt-get update

# ###################################
# # Install PowerShell
# sudo apt-get install -y powershell

# # Start PowerShell
# pwsh

# Intall az
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Install aws
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip

# Install terraform
wget https://releases.hashicorp.com/terraform/1.8.3/terraform_1.8.3_linux_amd64.zip -O terraform.zip
unzip ./terraform.zip -d terraform
sudo mv ./terraform/terraform /usr/local/bin 
rm -rf terraform terraform.zip

# Install NVM
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install krew (Kubectl plugin)
(
  set -x; cd "$(mktemp -d)" &&
  OS="$(uname | tr '[:upper:]' '[:lower:]')" &&
  ARCH="$(uname -m | sed -e 's/x86_64/amd64/' -e 's/\(arm\)\(64\)\?.*/\1\2/' -e 's/aarch64$/arm64/')" &&
  KREW="krew-${OS}_${ARCH}" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/${KREW}.tar.gz" &&
  tar zxvf "${KREW}.tar.gz" &&
  ./"${KREW}" install krew
)
echo "export PATH=\"${KREW_ROOT:-$HOME/.krew}/bin:$PATH\"" >> ~/.zshrc
source ~/.zshrc

# Install Vscode Stable Version
wget https://code.visualstudio.com/sha/download\?build\=stable\&os\=linux-deb-x64 -O vscode.deb && sudo dpkg -i vscode.deb && rm -rf vscode.deb

# Install Chrome stable version
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O chrome.deb && sudo dpkg -i chrome.deb && rm -rf chrome.deb

# Install digital ocean CLI
# Doc: https://docs.digitalocean.com/reference/doctl/how-to/install/
wget https://github.com/digitalocean/doctl/releases/download/v1.104.0/doctl-1.104.0-linux-amd64.tar.gz
tar xf doctl-1.104.0-linux-amd64.tar.gz
sudo mv doctl /usr/local/bin
rm -rf doctl-1.104.0-linux-amd64.tar.gz

# Install gimp for edit image
# Doc: https://linuxcapable.com/how-to-install-gimp-on-ubuntu-linux/
sudo apt update
sudo apt install gimp -y

# Install bamboo for vietnamese
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo
sudo apt-get update
sudo apt-get install ibus ibus-bamboo --install-recommends
ibus restart
# If failure to connect, It means bamboo daemon not work, you can use 
# ibus-daemon -d

# Install fast for testing network connection
wget https://github.com/ddo/fast/releases/download/v0.0.4/fast_linux_amd64 -O fast && chmod +x fast && sudo mv fast /usr/local/bin
```

# Install programming language for ZSH

Install `language` compiler for your shell

```bash
#!/bin/bash

# With zsh profile will .zshrc but with bash you have .bashrc (just replace)

# Install golang (https://go.dev/doc/install)
wget "https://go.dev/dl/go1.23.1.linux-amd64.tar.gz"
tar -xzf go1.23.1.linux-amd64.tar.gz
sudo mv go /usr/local/
echo "export PATH=\"\$PATH:/usr/local/go/bin\"" >> ~/.zshrc
source ~/.zshrc
go version
rm -rf go1.23.1.linux-amd64.tar.gz
mkdir -p ~/.go # Create for GOHOME, easily download go into that one

# Install ruby (https://www.ruby-lang.org/en/documentation/installation/#apt
sudo apt install -y ruby-full

# Install rust (https://www.rust-lang.org/tools/install)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh # Press enter
echo "export PATH=\"\$PATH:~/.cargo/bin\"" >> ~/.zshrc
source ~/.zshrc

# Install pip3 and python3
sudo apt install python3 python3-pip -y # (Default: 3.9)

# Install gcc
sudo apt install build-essential -y

# Install java
sudo apt install openjdk-11-jdk –y 

# Install nodejs
nvm install 18.20

# Install .NET
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x ./dotnet-install.sh
./dotnet-install.sh --version latest

echo "export DOTNET_ROOT=$HOME/.dotnet" >> ~/.zshrc
echo "export PATH=\"\$PATH:\$DOTNET_ROOT:\$DOTNET_ROOT/tools\"" >> /.zshrc
```

# Oh-my-zsh profile

Lately, you can apply the `.zshrc` profile down below for configuration your terminal

```bash title=".zshrc"
#!/bin/bash

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="amuse"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git kubectl zsh-autosuggestions zsh-syntax-highlighting docker \
	docker-compose podman zsh-autocomplete terraform aws azure dotnet \
	doctl fluxcd golang kind)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# Alias tools
alias stegsolve="java -jar $HOME/.stego_tools/stegsolve/stegsolve.jar"

# Python Path/GCC PATH (Use tool of Python with command)
export PATH="$PATH:~/.local/bin"

# Kubectl completion and alias
export KUBE_EDITOR="nano" # Kube edit will use nano for default editor

# source <(kubectl completion zsh)
alias k="kubectl"
# alias kgp="kubectl get pods"
alias kn="kubectl config set-context --current --namespace"
alias kaf="kubectl apply -f "
alias kr="kubectl run --dry-run=client -o yaml "
alias krcp="k resource-capacity -p --util"
alias krca="k resource-capacity -a"

# krew and kubectl pluggins
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
# Example for used completion with kubectl source <(kubectl resource-capacity completion zsh)

# NVM PATH and Completion (Node.js)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Change default text editor of Kubectl
export KUBE_EDITOR="nano"

# Export Path for Golang
export GOROOT="/usr/local/go"
export GOPATH="$HOME/.go"

# Export path for rust
export PATH="$PATH:$HOME/.cargo/bin"

# Include PATH for g++ (Used when you have some install lib for c++)
export CPLUS_INCLUDE_PATH="$HOME/.local/include:$CPLUS_INCLUDE_PATH"
export LD_LIBRARY_PATH="/usr/local/lib:/usr/local/lib64:$LD_LIBRARY_PATH"
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:$HOME/.local/lib/pkgconfig:$PKG_CONFIG_PATH"

# Alias command to get Public IP
alias pubip="curl -4 icanhazip.com"

# Terragrunt bash complete 
autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/local/bin/terragrunt terragrunt

# Check the cpu-temp in your machine
alias cputemp="paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'"

# URL encode and decode with python
# Encode
alias urlencode='python3 -c "import sys, urllib.parse as ul; \
    print (ul.quote_plus(sys.argv[1]))"'
# Decode
alias urldecode='python3 -c "import sys, urllib.parse as ul; \
    print(ul.unquote_plus(sys.argv[1]))"'

# JWT decode with jq
# Decode
jwt_decode(){
    jq -R 'split(".") | .[1] | @base64d | fromjson' <<< "$1"
}
# But you can use advance to get specific header and payload
# Find that at: https://gist.github.com/thomasdarimont/46358bc8167fce059d83a1ebdb92b0e7
decode_base64_url() {
  local len=$((${#1} % 4))
  local result="$1"
  if [ $len -eq 2 ]; then result="$1"'=='
  elif [ $len -eq 3 ]; then result="$1"'=' 
  fi
  echo "$result" | tr '_-' '/+' | openssl enc -d -base64
}

decode_jwt(){
   decode_base64_url $(echo -n $2 | cut -d "." -f $1) | jq .
}

# Decode JWT header
alias jwth="decode_jwt 1"

# Decode JWT Payload
alias jwtp="decode_jwt 2"
```

# Custom plugins for Oh-my-zsh

For create custom oh-my-zsh, you can follow this step to add-on plugins for your shell

```bash
# For example, azcopy support completion for zsh
# To validate
azcopy completion zsh

# Create folder plugins
mkdir -p ~/.oh-my-zsh/custom/plugins/azcopy

# Add completion zsh to folder with prefix
azcopy completion zsh > ~/.oh-my-zsh/custom/plugins/azcopy/azcopy.plugin.zsh

# Change plugins in .zshrc
nano ~/.zshrc
```

![[Pasted image 20240729105225.png]]
Save and reload your zsh profile, enjoy completion

```bash
source ~/.zshrc
```