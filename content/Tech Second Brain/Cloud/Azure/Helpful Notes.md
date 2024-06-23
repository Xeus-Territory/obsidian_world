---
title: Azure Cloud Helpful Notes and Article
tags:
  - cheatsheet
  - helpful
  - azure
  - cloud-services
---
# Azure Virtual Machine

- Add a new disk for your `linux` virtual machine, you can check about that via [Azure Article - Use the portal to attach a data disk to a Linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal) or [Azure Article - Add a disk to a Linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/add-disk?tabs=ubuntu)

	1. Add a new disk with portal or `azcli`
	2. Login to your machine with `ssh`, try to find your disk with not formatted yet via `lsblk`

		```shell
		lsblk -o NAME,HCTL,SIZE,MOUNTPOINT | grep -i "sd"
		```

		![[Pasted image 20240620102257.png]]

		`sdc` disk actually not mount, that target disk you need to format and attach to your machine

	3. Partition the disk when you attach a new one, you can follow instruction about [Create a Partition in Linux - A Step-by-Step Guide](https://www.digitalocean.com/community/tutorials/create-a-partition-in-linux), [Prepare a new empty disk](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal#prepare-a-new-empty-disk),  [https://phoenixnap.com/kb/linux-format-disk](https://phoenixnap.com/kb/linux-format-disk) to understand way to handle that

		```shell
		sudo parted /dev/sdc --script mklabel gpt mkpart xfspart xfs 0% 100%
		sudo mkfs.xfs /dev/sdc1
		sudo partprobe /dev/sdc1
		```

	4. Mount your partition disk into the directories of machine via `mount`

		```bash
		sudo mount /dev/sdc1 /root
		```

		![[Pasted image 20240620104104.png]]

	5. Check your disk is add to `/etc/fstab`, you can use `blkid` to handle that

		```bash
		sudo blkid
		```

		![[Pasted image 20240620104730.png]]

>[!info]
>In my situation, when mount to `/` instead of `/root`, It makes some change and gave you new definition for your current route, mean `/dev/sdc1` will replace default disk and can be cause the problem, I think 😄. Just `umount` and repeat `mount` again

