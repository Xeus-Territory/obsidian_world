---
title: Setup HA Database for MongoDB
tags:
  - database
  - devops
  - high-availability
  - system-architecture
draft: "true"
---

Resources

- [MongoDB - Self-Managed Configuration File Options](https://www.mongodb.com/docs/manual/reference/configuration-options/)
- [MongoDB - Deploy a Self-Managed Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/)
- [MongoDB - Add Members to a Self-Managed Replica Set](https://www.mongodb.com/docs/manual/tutorial/expand-replica-set/)
- [MongoDB - Self-Managed Replica Set Deployment Tutorials](https://www.mongodb.com/docs/manual/administration/replica-set-deployment/)
- [MongoDB - Self-Managed Member Configuration Tutorials](https://www.mongodb.com/docs/manual/administration/replica-set-member-configuration/)
- [MongoDB - Built-In Roles](https://www.mongodb.com/docs/manual/reference/built-in-roles/)
- [Digital Ocean - How To Configure Keyfile Authentication for MongoDB Replica Sets on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-configure-keyfile-authentication-for-mongodb-replica-sets-on-ubuntu-20-04)
- [StackOverFlow - Mongoexport auth error using mechanism "SCRAM-SHA-1"](https://stackoverflow.com/questions/68927857/mongoexport-auth-error-using-mechanism-scram-sha-1)
- [StackOverFlow - Mongodb replica set status showing "RECOVERING"](https://stackoverflow.com/questions/14332010/mongodb-replica-set-status-showing-recovering)

Note

Change priority of node via `mongosh`, access the **primary node** for doing this configuration

```bash
# Get current config
cfg = rs.conf()

# Set priority
cfg.members[0].priority = 3
cfg.members[1].priority = 2
cfg.members[2].priority = 1

# Update new configuration
rs.reconfig(cfg)
```

Role of MongoDB in Cluster

```bash
# change your account into admin
use admin

# create a userAdmin, who carry on about setting user/passwd and authentication in any database
db.createUser(
   {
     user: "mongo-useradmin",
     pwd: passwordPrompt(),
     roles: [
        { role: "userAdminAnyDatabase", db: "admin" }
     ]
   }
)

# create a root, who carry on about whole configuration, useradmin, readwrite and authentication in any database
db.createUser(
   {
     user: "mongo-root",
     pwd: passwordPrompt(),
     roles: [
        { role: "root", db: "admin" }
     ]
   }
)

# create a readwrite, who carry on about whole readwrite in any database
db.createUser(
   {
     user: "mongo-readwrite",
     pwd: passwordPrompt(),
     roles: [
        { role: "readwrite", db: "admin" }
     ]
   }
)
```

add new node

```bash
rs.add({_id: 1, host: "192.168.xx.xxx:27017"})

rs.add({_id: 2, host: "192.168.xx.xxx:27017"})
```