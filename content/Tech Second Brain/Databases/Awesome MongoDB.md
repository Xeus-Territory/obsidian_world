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

## Setup

- [Medium - High-availability MongoDB Cluster Configuration Solutions](https://alibaba-cloud.medium.com/high-availability-mongodb-cluster-configuration-solutions-465cc82cd0bc) 🌟 **(Recommended)**
- [Medium - Configure 3 nodes replica set of MongoDB on AWS EC2](https://medium.com/@pnle/configure-3-nodes-replica-set-of-mongodb-on-aws-ec2-be778281ee9a)
- [MongoDB - Deploy a Self-Managed Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/) 🌟 **(Recommended)**
- [MongoDB - Ensuring High Availability for MongoDB on Kubernetes](https://www.mongodb.com/developer/products/mongodb/mongodb-with-kubernetes/) 🌟 **(Recommended)**
## Tips & Configuration

- [Medium - Solving curious case of excess memory consumption by MongoDB](https://tech.oyorooms.com/mongodb-out-of-memory-kill-process-mongodb-using-too-much-memory-solved-44e9ae577bed)

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

# Knowledge

## Use MongoDB Connect with DirectConnection

This configuration relate in configuration of MongoDB, when you set `replicaset` mode for your MongoDB, when you double-check the configuration member, you can see this at

- [MongoDB - Self-Managed Replica Set Configuration](https://www.mongodb.com/docs/manual/reference/replica-configuration/#std-label-replica-set-configuration-document)
- [MongoDB - Connect to a Replica Set](https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-replica-set)

For the configuration, you can use command with `mongosh`

```bash
rs.conf()
```

It will show your replicaset configuration in MongoDB, like this

```bash
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
# MongoDB CLI Usage

## Login into cluster

```bash
# Connect via parameter
mongosh --host <host> --port <port> -u <username> -p <password>

# Connect via connection string
mongosh 'mongodb://<user>:<pass>@<host>:<port>/<collection>'
```
