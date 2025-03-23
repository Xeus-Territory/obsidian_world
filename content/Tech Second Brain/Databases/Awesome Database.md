---
title: The awesome of Database World
tags:
  - cheatsheet
  - helpful
  - research
  - database
  - awesome
---

>[!info]
>Purpose to share what I learn and figure out when work with multiple Database like solutions, managing and helpful guideline for next people. Enjoy 😅😅😅
# Articles

![[meme-documentation.png]]
## General

- [Medium - 15 Databases, 15 Use Cases — The Ultimate Guide That No One Asked For (But Everyone Needs)](https://medium.com/gitconnected/15-databases-15-use-cases-the-ultimate-guide-that-no-one-asked-for-but-everyone-needs-47ca4009be78)
- [Medium - 11 Data Structures Powering Database](https://medium.com/gitconnected/11-data-structures-powering-database-51fc4691fcf7)
- [dev.to - What is RocksDB (and its role in streaming)?](https://dev.to/mrkandreev/what-is-rocksdb-and-its-role-in-streaming-3bla)
- [Medium - Running SpiceDB with Postgresql using docker-compose](https://akoserwal.medium.com/running-spicedb-with-postgresql-using-docker-compose-cc7ee999da73)
## Redis

- [What is Valkey?](https://redis.io/blog/what-is-valkey/)
## SQL Server

### Setup

- [SQLShack - Configuring a SQL Server AlwaysOn High Availability Group](https://www.sqlshack.com/configuring-a-sql-server-alwayson-high-availability-group/)

### Tips & Configuration

- [Azure - Analyze and prevent deadlocks in Azure SQL Database](https://learn.microsoft.com/en-us/azure/azure-sql/database/analyze-prevent-deadlocks?view=azuresql&tabs=ring-buffer)
- [How to find and fix SQL Server deadlocks](https://www.site24x7.com/learn/resolve-sql-server-deadlocks.html#:~:text=A%20Microsoft%20SQL%20Server%20deadlock,cancel%20one%20of%20the%20processes.)
- [Performance Troubleshooting | Azure SQL](https://www.youtube.com/playlist?list=PLlrxD0HtieHgDkZ84FfCSDLBcJmUn8ktU)
- [Azure - Deadlocks guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver16)

# Awesome repositories

## Pages

- [DB-Engines](https://db-engines.com/en/): Knowledge Base of Relational and NoSQL Database Management Systems
## Repository

- [awesome-db-tools](https://github.com/mgramin/awesome-db-tools) : Everything that makes working with databases easier
- [mongodb-kubernetes-operator](https://github.com/mongodb/mongodb-kubernetes-operator) : MongoDB Community Kubernetes Operator
## Topics

- [Database](https://github.com/topics/database)
- [MongoDB](https://github.com/topics/mongodb)
- [NoSQL](https://github.com/topics/nosql)
- [Object–relational mapping (ORM)](https://github.com/topics/orm)
- [PostgreSQL](https://github.com/topics/postgresql)
# Database Collections

## Key-value Stores

>[!info]
>Key-value stores are probably the simplest form of database management systems. They can only store pairs of keys and values, as well as retrieve values when a key is known.

- [etcd](https://github.com/etcd-io/etcd): Distributed reliable key-value store for the most critical data of a distributed system
- [redis](https://github.com/redis/redis): An in-memory database that persists on disk.
- [rocksdb](https://github.com/facebook/rocksdb): A library that provides an embeddable, persistent key-value store for fast storage.
- [tikv](https://github.com/tikv/tikv): Distributed transactional key-value database, originally created to complement TiDB
- [valkey](https://github.com/valkey-io/valkey): A flexible distributed key-value datastore that is optimized for caching and other realtime workloads.
## No-Code

>[!info]
>A no-code database platform is similar to a spreadsheet. It’s a collection of data that can be used for storing, processing and retrieving related information without coding

- [nocodb](https://github.com/nocodb/nocodb): 🔥 🔥 🔥 Open Source Airtable Alternative. [Website](https://nocodb.com/)
## Relational DBMS

>[!info]
>A high-performance, column-oriented SQL DBMS for online analytical processing (OLAP) that uses all available system resources to their full potential to process each analytical query as fast as possible. It is available as both an open-source software and a cloud offering.

- [ClickHouse](https://github.com/ClickHouse/ClickHouse): ClickHouse® is a real-time analytics DBMS. [Website](https://clickhouse.com/)
- [cockroach](https://github.com/cockroachdb/cockroach): the cloud native, distributed SQL database designed for high availability, effortless scale, and control over data placement.
- [Apache Druid](https://github.com/apache/druid): A high performance real-time analytics database.
- [duckdb](https://github.com/duckdb/duckdb): An analytical in-process SQL database management system. [Website Documentation](https://duckdb.org/docs/)
- [tidb](https://github.com/pingcap/tidb): the open-source, cloud-native, distributed SQL database designed for modern applications.
## Search Engine

>[!info]
>[NoSQL](https://db-engines.com/en/article/NoSQL) [database management systems](https://db-engines.com/en/article/Database+Management+System) dedicated to the search for data content. In addition to general optimization for this type of application, the specialization consists in typically offering the following features:
>- Support for complex search expressions
>- Full text search
>- Stemming (reducing inflected words to their stem)
>- Ranking and grouping of search results
>- Distributed search for high scalability

- [manticoresearch](https://github.com/manticoresoftware/manticoresearch): Easy to use open source fast database for search | Good alternative to Elasticsearch now | Drop-in replacement for E in the ELK soon
- [typesense](https://github.com/typesense/typesense): Open Source alternative to Algolia + Pinecone and an Easier-to-Use alternative to ElasticSearch ⚡ 🔍 ✨
## Time Series DBMS

>[!info]
>A [database management system](https://db-engines.com/en/article/Database+Management+System) that is optimized for handling time series data: each entry is associated with a timestamp.

- [influxdb](https://github.com/influxdata/influxdb): Scalable datastore for metrics, events, and real-time analytics
# Database Tools
## Configuration

- [pgbouncer](https://github.com/pgbouncer/pgbouncer): lightweight connection pooler for PostgreSQL
- [mongobetween](https://github.com/coinbase/mongobetween): a proxying connections for mongodb. It is developed by coinbase.

## Database IDE

- [beekeeper-studio](https://github.com/beekeeper-studio/beekeeper-studio): Modern and easy to use SQL client for MySQL, Postgres, SQLite, SQL Server, and more. Linux, MacOS, and Windows. [Website](https://www.beekeeperstudio.io/)
- [Chat2DB](https://github.com/CodePhiliaX/Chat2DB): 🔥🔥🔥AI-driven database tool and SQL client, The hottest GUI client, supporting MySQL, Oracle, PostgreSQL, DB2, SQL Server, DB2, SQLite, H2, ClickHouse, and more.
- [dbeaver](https://github.com/dbeaver/dbeaver): Free universal database tool and SQL client. [Website](https://dbeaver.io/)
## Database Management

- [bytebase](https://github.com/bytebase/bytebase) : The GitHub/GitLab for database DevOps.
- [limbo](https://github.com/tursodatabase/limbo): A work-in-progress, in-process OLTP database management system, compatible with SQLite.
## Migration Tools

- [goose](https://github.com/pressly/goose): A database migration tool. Supports SQL migrations and Go functions.
## Self-hosted

- [pigsty](https://github.com/Vonng/pigsty): Battery-Included PostgreSQL Distro as a Free & Better RDS Alternative —— Pigsty
- [postgresql_cluster](https://github.com/vitabaks/postgresql_cluster): PostgreSQL High-Availability Cluster (based on Patroni). Automating with Ansible.

