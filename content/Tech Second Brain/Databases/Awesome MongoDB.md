---
title: Awesome MongoDB
tags:
  - awesome
  - mongodb
  - admin
  - usage
---

![[thumbnail-mongodb.png|center]]
# Documentations and Articles

## Repositories

- [awesome-mongodb](https://github.com/ramnes/awesome-mongodb): 🍃 A curated list of awesome MongoDB resources, libraries, tools and applications
## High-Availability

- [Medium - High-availability MongoDB Cluster Configuration Solutions](https://alibaba-cloud.medium.com/high-availability-mongodb-cluster-configuration-solutions-465cc82cd0bc) 🌟 **(Recommended)**
- [Medium - Configure 3 nodes replica set of MongoDB on AWS EC2](https://medium.com/@pnle/configure-3-nodes-replica-set-of-mongodb-on-aws-ec2-be778281ee9a)
- [MongoDB - Deploy a Self-Managed Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/) 🌟 **(Recommended)**
- [Medium - Setting Up MongoDB Cluster: Replication, Sharding, and High Availability](https://harsh05.medium.com/setting-up-mongodb-cluster-replication-sharding-and-high-availability-1c95290156ad)
## Tips & Configuration

- [Medium - Solving curious case of excess memory consumption by MongoDB](https://tech.oyorooms.com/mongodb-out-of-memory-kill-process-mongodb-using-too-much-memory-solved-44e9ae577bed)
- [Medium - MongoDB primary failover with Keepalived (with MongoDB cluster)](https://medium.com/@azsecured/mongodb-primary-failover-with-keepalived-with-mongodb-cluster-3462469a9730)
## General

- [Medium - Everything You Need to Know About MongoDB Oplogs](https://medium.com/data-platform-engineering/everything-you-need-to-know-about-mongodb-oplogs-feebae3bd257)
# MongoDB Tools

![[meme-technology.png|center]]

## Backup

- [percona-backup-mongodb](https://github.com/percona/percona-backup-mongodb): a distributed, low-impact solution for achieving consistent backups of MongoDB sharded clusters and replica sets
## Driver & Connector

- [mongobetween](https://github.com/coinbase/mongobetween): a proxying connections for mongodb. It is developed by coinbase.

# MongoDB Installation

To installation MongoDB into your host in binary package, [mongod](https://www.mongodb.com/docs/manual/reference/program/mongod/) is one of things you should setup in your host. By default, your host will not find any package related to mongodb, especially Ubuntu, so we need add keymap and multiple things to help `apt` package can find and download them for us

Like as another tools, you have repository to find the key to let your `apt` know what version and repository to download package, and mongodb does the same things. Explore more about at 

- [MongoDB - MongoDB public GPG key](https://pgp.mongodb.com/)
- [MongoDB - MongoDB APT Repository](https://repo.mongodb.org/apt/)

```bash
# For example, we will download the mongodb latest version: 8.0
# Download requirement package and import the public key
sudo apt install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
   
# Add the file list to help apt find the mongodb repository
. /etc/os-release
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu $VERSION_CODENAME/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Reload package database
sudo apt update

# find and install mongodb community server
sudo apt search mongodb-org
sudo apt install -y mongodb-org

# To specific minor version, you can use
# sudo apt install -y mongodb-org=8.0.3

# When you want to downgrade version, perform with --allow-downgrades
# sudo apt install mongodb-org=8.0.3 --allow-downgrades -y
```

By the way to look more detail and try by your own, please double-check the [MongoDB -  Install MongoDB Community Edition on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

If you consider to find the alternative way and more solution, these below resources can be help you couple of things

- [MongoDB - Install using .tgz Tarball](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu-tarball/)
- [MongoDB - Download Center](https://www.mongodb.com/try/download/community)
- [MongoDB - Achieve Release](https://www.mongodb.com/try/download/community-edition/releases/archive)
# Install MongoDB Tools

## Mongoshell

You can download and install [mongosh](https://www.mongodb.com/try/download/shell). If you already use `linux`, you can follow my guideline

```bash
wget https://downloads.mongodb.com/compass/mongodb-mongosh_2.4.2_amd64.deb
chmod +x  mongodb-mongosh_2.4.2_amd64.deb
sudo dpkg -i mongodb-mongosh_2.4.2_amd64.deb
```

After download, you can validate the mongosh by

```bash
mongosh --version
```

## Backup and Restore

To backup and restore, we need to use [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/), such as `mongodump` and `mongorestore`. Following the guideline to install

```bash
wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.12.0.deb
chmod +x mongodb-database-tools-debian10-x86_64-100.12.0.deb
sudo dpkg -i mongodb-database-tools-debian10-x86_64-100.12.0.deb
```

## Login into cluster

```bash
# Connect via parameter
mongosh --host <host> --port <port> -u <username> -p <password>

# Connect via connection string
mongosh 'mongodb://<user>:<pass>@<host>:<port>/<collection>'
```

# Knowledge

## Use MongoDB Connector with DirectConnection

This configuration relate in configuration of MongoDB, when you set `replicaset` mode for your MongoDB, when you double-check the configuration member, you can see this at

- [MongoDB - Self-Managed Replica Set Configuration](https://www.mongodb.com/docs/manual/reference/replica-configuration/#std-label-replica-set-configuration-document)
- [MongoDB - Connect to a Replica Set](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-replica-set)

For the configuration, you can use command with `mongosh`

```bash
rs.conf()
```

It will show your replicaset configuration in MongoDB, like this

```json
{
  _id: <string>,
  version: <int>,
  term: <int>,
  protocolVersion: <number>,
  writeConcernMajorityJournalDefault: <boolean>,
  configsvr: <boolean>,
  members: [
    {
      _id: <int>,
      host: <string>,
      arbiterOnly: <boolean>,
      buildIndexes: <boolean>,
      hidden: <boolean>,
      priority: <number>,
      tags: <document>,
      secondaryDelaySecs: <int>,
      votes: <number>
    },
    ...
  ],
  settings: {
    chainingAllowed : <boolean>,
    heartbeatIntervalMillis : <int>,
    heartbeatTimeoutSecs: <int>,
    electionTimeoutMillis : <int>,
    catchUpTimeoutMillis : <int>,
    getLastErrorModes : <document>,
    getLastErrorDefaults : <document>,
    replicaSetId: <ObjectId>
  }
}
```

If It returns your `host` configuration as private ip address, you can encounter some problems about connection when this IP range same as IP range used for your network, that why sometime it will show connection timeout. So for fix this problem, you should connect directly into replicaset via `directConnection=true` parameter

```bash
mongosh 'mongodb://username:password@server-uri/db?directConnection=true'
```

>[!info]
>In some situations, you can bypass this configuration because it will add default into your connection string, like
>- The `replicaSet` query parameter is present in the connection string.
>- The connection string uses the `mongodb+srv://` connection string format.
>- The connection string contains a seed list with multiple hosts.
>- The connection string already contains a `directConnection` parameter.

## Backup Script for MongoDB Cluster

```bash
#!/bin/bash

# MongoDB connection information
MONGO_HOST="MONGO_HOST"
MONGO_PORT="MONGO_PORT"
MONGO_USER="MONGO_USER"
MONGO_PASSWORD="MONGO_PASSWORD"

# MinIO connection information
MINIO_ALIAS="MINIO_ALIAS"
MINIO_BUCKET="MINIO_BUCKET"

# Get a list of all databases
DATABASES=$(mongo --host $MONGO_HOST --port $MONGO_PORT -u $MONGO_USER -p $MONGO_PASSWORD --authenticationDatabase admin --quiet --eval "db.adminCommand('listDatabases').databases.map(db => db.name).join(' ')")

# Backup each database
for DB_NAME in $DATABASES; do
    BACKUP_DIR="${DB_NAME}_backup"
    
    echo "Backing up database: $DB_NAME"
    mongodump --host $MONGO_HOST --port $MONGO_PORT -u $MONGO_USER -p $MONGO_PASSWORD --authenticationDatabase admin --db $DB_NAME --out $BACKUP_DIR
    
    # Create a tar.gz archive of the backup
    tar -czvf $BACKUP_DIR.tar.gz $BACKUP_DIR
    
    # Upload to MinIO
    echo "Uploading $BACKUP_DIR.tar.gz to MinIO"
    mc cp $BACKUP_DIR.tar.gz $MINIO_ALIAS/$MINIO_BUCKET/$BACKUP_DIR.tar.gz
    
    # Optionally remove the local backup directory and archive
    rm -rf $BACKUP_DIR
    rm $BACKUP_DIR.tar.gz
done

echo "All databases backed up and uploaded to MinIO."
```

# Common Query Configuration of MongoDB

When you work with MongoDB, there are sort of queries for checking the configuration, such as:  replicaSet, isMaster, Opslog, ...

## Get the OpsLog information

To double-check the `opslog` in replication in current state and default configuration, you can use

```bash
> rs.printReplicationInfo()

actual oplog size
'9184.92578125 MB'
---
configured oplog size
'9184.92578125 MB'
---
log length start to end
'2565292 secs (712.58 hrs)'
---
oplog first event time
'Sun Aug 17 2025 22:47:34 GMT+0700 (Indochina Time)'
---
oplog last event time
'Tue Sep 16 2025 15:22:26 GMT+0700 (Indochina Time)'
---
now
'Tue Sep 16 2025 15:22:32 GMT+0700 (Indochina Time)'
```

## Get the replicaSet configuration

In the situation, you want to see what replicaset in configuration, you can use 

```bash
# Get configuration of replicaset
> rs.conf()

{
  _id: 'rs0',
  version: 3,
  term: 2,
  members: [
    {
      _id: 0,
      host: 'x.x.x.x:27017',
      arbiterOnly: false,
      buildIndexes: true,
      hidden: false,
      priority: 1,
      tags: {},
      secondaryDelaySecs: Long('0'),
      votes: 1
    }
  ],
  protocolVersion: Long('1'),
  writeConcernMajorityJournalDefault: true,
  settings: {
    chainingAllowed: true,
    heartbeatIntervalMillis: 2000,
    heartbeatTimeoutSecs: 10,
    electionTimeoutMillis: 10000,
    catchUpTimeoutMillis: -1,
    catchUpTakeoverDelayMillis: 30000,
    getLastErrorModes: {},
    getLastErrorDefaults: { w: 1, wtimeout: 0 },
    replicaSetId: ObjectId('xxxxxxxxxxx')
  }
}

# Get status of replicaset
> rs.status()
```

## Check your host is Primary Or Secondary Or Arbiter

If you operate your MongoDB in replicaSet architecture, you will approach there type of node in MongoDB

- [Primary](https://www.mongodb.com/docs/manual/core/replica-set-primary/):  the only member in the replica set that receives write operations. MongoDB applies write operations on the [primary](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary) and then records the operations on the primary's [oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/)
- [Secondary](https://www.mongodb.com/docs/manual/core/replica-set-secondary/): A secondary maintains a copy of the [primary's](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary) data set. To replicate data, a secondary applies operations from the primary's [oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/#std-label-replica-set-oplog) to its own data set in an asynchronous process. A replica set can have one or more secondaries
- [Arbiter](https://www.mongodb.com/docs/manual/core/replica-set-arbiter/): A participant participates in [elections for primary](https://www.mongodb.com/docs/manual/core/replica-set-elections/#std-label-replica-set-elections) but an arbiter does **not** have a copy of the data set and **cannot** become a primary

You can use bunch of queries below to find what role of your mongodb

```bash
> rs.isMaster()

{
  topologyVersion: {
    processId: ObjectId('xxxxxxxxxxx'),
    counter: Long('6')
  },
  hosts: [ 'x.x.x.x:27017' ],
  setName: 'rs0',
  setVersion: 3,
  ismaster: true,
  secondary: false,
  primary: 'x.x.x.x:27017',
  me: 'x.x.x.x:27017',
  electionId: ObjectId('7fffffff0000000000000002'),
  lastWrite: {
    opTime: { ts: Timestamp({ t: 1758014134, i: 11 }), t: Long('2') },
    lastWriteDate: ISODate('2025-09-16T09:15:34.000Z'),
    majorityOpTime: { ts: Timestamp({ t: 1758014134, i: 11 }), t: Long('2') },
    majorityWriteDate: ISODate('2025-09-16T09:15:34.000Z')
  },
  maxBsonObjectSize: 16777216,
  maxMessageSizeBytes: 48000000,
  maxWriteBatchSize: 100000,
  localTime: ISODate('2025-09-16T09:15:36.923Z'),
  logicalSessionTimeoutMinutes: 30,
  connectionId: 1140819,
  minWireVersion: 0,
  maxWireVersion: 21,
  readOnly: false,
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758014134, i: 13 }),
    signature: {
      hash: Binary.createFromBase64('xxxxxxxxxxxxxxx', 0),
      keyId: Long('xxxxxxxxxxxxxx')
    }
  },
  operationTime: Timestamp({ t: 1758014134, i: 11 }),
  isWritablePrimary: true
}
```

