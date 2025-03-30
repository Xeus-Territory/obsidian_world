---
title: The awesome of MongoDB
tags:
  - awesome
  - mongodb
  - admin
  - usage
---

# Documentations and Articles

## Setup

- [Medium - High-availability MongoDB Cluster Configuration Solutions](https://alibaba-cloud.medium.com/high-availability-mongodb-cluster-configuration-solutions-465cc82cd0bc)
- [Medium - Configure 3 nodes replica set of MongoDB on AWS EC2](https://medium.com/@pnle/configure-3-nodes-replica-set-of-mongodb-on-aws-ec2-be778281ee9a)
- [MongoDB - Deploy a Self-Managed Replica Set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/)
## Tips & Configuration

- [Medium - Solving curious case of excess memory consumption by MongoDB](https://tech.oyorooms.com/mongodb-out-of-memory-kill-process-mongodb-using-too-much-memory-solved-44e9ae577bed)
# Use MongoDB Connect with DirectConnection

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