---
title: Awesome Python
tags:
  - awesome
  - developer
  - usage
---

# Python3, Pip and Common usage


![[meme-awesome.png|center|500]]

## Install Python3 and Pip

When you work in Ubuntu or any Linux Distribution, you can usually see the `python3` installed by default inside your kernel, because many tools and services in Linux are built and operate by `python3`, especially networking with `netplan`

For that reason, you need to careful upgrade or reinstall any version of Python3 because it can cause some disturb for us. In the situation, if you want to install or update couple alternative version in Python3 at linux via `apt` **(NOTE: I don't recommend download via source, because it can encounter lots of trouble about library)**, who is a great friend when you work with `debian` distro, especially Ubuntu. You can double-check these articles to find the best way you can for installing Python Package in couple of Linux Distros

- [StackOverFlow - What is the best way to install Python packages?](https://askubuntu.com/questions/95037/what-is-the-best-way-to-install-python-packages)
- [Blog - Installing Python 3 on Linux](https://docs.python-guide.org/starting/install3/linux/)
- [Bitlaunch - How to safely install Python and Python3 on Ubuntu](https://bitlaunch.io/blog/how-to-install-python-on-ubuntu/)

If you still want to download and build `pyhon3` from source, you will need these resources

- [Python - Python3 Source Releases](https://www.python.org/downloads/source/)
- [Tools - Build, compile and install Python from source code](https://www.build-python-from-source.com/)

Otherwise, you can choose to use `apt` via **PPA (Personal Package Archive) Repositories** which provide a lot of python3 package pre-built and easy to install with [PPA Deadsnake](https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa) for besting distribution Python3 package in Ubuntu **(Great for 22.04 and 24.04 version)**

First, you need add the `ppa:deaksnake` into your `apt` repositories

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
```

After that, you are available to see the different version of Python with not only version of your host. Trying search them with `apt search`

```bash
sudo apt search python3
```

Now you can available to choose which version you want to install, it's usually force you to download the latest version, if you need any customize lower or higher, you need wait them to compile other, or you need consider to use `annaconda` with creating `venv` with customize version

```bash
sudo apt install python3.12 python3.12-venv -y
```

After install, you can verify which version you installed, for example

```bash
# Install python3.12
python3.12 --version

# Install python3.11
python3.11 --version
```

To finishing install, for usually install python package, we usually use `pip` and by default when install from `ppa:deadsnake` won't install `pip`, and you need install individual. The best way follow the documentation of pip at [Documentation - Pip Installation](https://pip.pypa.io/en/stable/installation/) is using `ensurepip` or `get-pip.py`

With the package download by ppa, it's seem not have `ensurepip` and the great way to install `pip` will use via `get-pip.py` from [https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py) with python command

```bash
# Install python3.12
curl -sSfL https://bootstrap.pypa.io/get-pip.py | python3.12

# Install python3.11
curl -sSfL https://bootstrap.pypa.io/get-pip.py | python3.11
```

>[!warning]
>Don't use any command `python3` or `python` because it will use the default version of your host  and it won't install any version for specific version of your

>[!tip]
>For easily work on multiple version `python` in your host, you can consider to use `update-alternatives` but for recommending, `venv` or virtual environment is the best idea to switch between multiple versions by multiple python profiles. Go and check the guideline below for creating your own `python3-venv`
## Create virtual environment with `venv`

With `Python3` from **version 3.12**, it require `venv` or use `--break-system-packages` for global environment. But in some situation, you need find out to `conda` or `venv` to make your environment become more convenience to install external package

To setup `venv`, Read more in official documentation [venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)

First of all, create new environment with command

```bash
python3 -m venv /path/to/new/venv
```

Active the environment

```bash
source /path/to/new/venv/bin/active
```

When you finish and want to comeback to global environment, in the `venv` shell, you can use command

```bash
deactivate
```

## Break system for installing with `pip`

With `Python3` from version 3.12, there isn't gonna easy for us to install package, so if you want to force install with `python3-pip`, you can add the optional `--break-system-packages` after the pip command

```bash
pip3 install numpy --break-system-packages
```

With read from file, we can do same way

```bash
pip3 install -r requirements.txt --break-system-packages
```

## Specific PyTorch version

In some situations, your environment have higher version CUDA or driver of NVIDIA compare with Torch, you can use this version to bypass and migrate your torch to compatible version with your graphic card. Read more at [Reddit - RTX 5090 Training Issues - PyTorch Doesn't Support Blackwell Architecture Yet?](https://www.reddit.com/r/LocalLLaMA/comments/1law1go/rtx_5090_training_issues_pytorch_doesnt_support/)

```bash
pip install -U torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
```

# Python General

![[icon-python.png|center]]

## Awesome Repositories

- [awesome-python](https://github.com/vinta/awesome-python) : An opinionated list of awesome Python frameworks, libraries, software and resources.
## Organizations

- [pypa](https://github.com/pypa): Python Packaging Authority
- [pallets](https://github.com/pallets): The Community stands behind [Flask](https://github.com/pallets/flask), [Jinja](https://github.com/pallets/jinja)
## Library and Package Repositories

- [pypi](https://pypi.org/): Find, install and publish Python packages with the Python Package Index
# Tools

![[icon-python-pypi.svg|center|350]]

## Package Management

- [poetry](https://github.com/python-poetry/poetry): Python packaging and dependency management made easy 🌟 **(Recommended)**
- [uv](https://github.com/astral-sh/uv): An extremely fast Python package and project manager, written in Rust

## Toolbox

- [Pythonium](https://pythonium.net/): Tools for Python Developers