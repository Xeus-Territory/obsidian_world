---
title: Awesome Database World
tags:
  - cheatsheet
  - helpful
  - research
  - database
  - awesome
---

# General Repositories and Articles

![[meme-documentation.png]]
## General

- [Medium - 15 Databases, 15 Use Cases — The Ultimate Guide That No One Asked For (But Everyone Needs)](https://medium.com/gitconnected/15-databases-15-use-cases-the-ultimate-guide-that-no-one-asked-for-but-everyone-needs-47ca4009be78) 🌟 **(Recommended)**
- [Medium - 11 Data Structures Powering Database](https://medium.com/gitconnected/11-data-structures-powering-database-51fc4691fcf7) 🌟 **(Recommended)**
- [Dev.to - What is RocksDB (and its role in streaming)?](https://dev.to/mrkandreev/what-is-rocksdb-and-its-role-in-streaming-3bla)
- [Redis - What is Valkey?](https://redis.io/blog/what-is-valkey/)
## Configurations & Strategies

- [Datacamp - Database Sharding: Examples, Strategies, Tools, and More](https://www.datacamp.com/blog/database-sharding) 🌟 **(Recommended)**
- [Azure - Analyze and prevent deadlocks in Azure SQL Database](https://learn.microsoft.com/en-us/azure/azure-sql/database/analyze-prevent-deadlocks?view=azuresql&tabs=ring-buffer)
- [SQLShack - Configuring a SQL Server AlwaysOn High Availability Group](https://www.sqlshack.com/configuring-a-sql-server-alwayson-high-availability-group/)
## High Availability

- [Percona - InnoDB Cluster Setup: Building a 3-Node High Availability Architecture (MySQL)](https://www.percona.com/blog/innodb-cluster-setup-building-a-3-node-high-availability-architecture/)
## Troubleshoot

- [Youtube - Performance Troubleshooting | Azure SQL](https://www.youtube.com/playlist?list=PLlrxD0HtieHgDkZ84FfCSDLBcJmUn8ktU)
- [Azure - Deadlocks guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver16)
## Migrations

- [Medium - How We Migrated 1 Billion Records from DB1 to DB2 Without Downtime](https://medium.com/@himanshusingour7/how-we-migrated-db-1-to-db-2-1-billion-records-without-downtime-c034ce85d889) 🌟 **(Recommended)**
- [AWS - Strategies and best practices for very large database migrations into Amazon RDS for Oracle](https://aws.amazon.com/blogs/database/strategies-and-best-practices-for-very-large-database-migrations-into-amazon-rds-for-oracle/)
- [Dev.to - Zero-Downtime Database Migration: The Complete Engineering Guide](https://dev.to/ari-ghosh/zero-downtime-database-migration-the-definitive-guide-5672) 🌟 **(Recommended)**
- [Medium - Zero-Downtime Migration: How to Re-Platform Without Losing Customers](https://altersquare.medium.com/zero-downtime-migration-how-to-re-platform-without-losing-customers-21534f0f8fd5)
## Pages

- [DB-Engines](https://db-engines.com/en/): Knowledge Base of Relational and NoSQL Database Management Systems 🌟 **(Recommended)**
## Repository

- [awesome-db-tools](https://github.com/mgramin/awesome-db-tools) : Everything that makes working with databases easier 🌟 **(Recommended)**
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

- [etcd](https://github.com/etcd-io/etcd): Distributed reliable key-value store for the most critical data of a distributed system 🌟 **(Recommended)**
- [redis](https://github.com/redis/redis): An in-memory database that persists on disk 🌟 **(Recommended)**
- [rocksdb](https://github.com/facebook/rocksdb): A library that provides an embeddable, persistent key-value store for fast storage.
- [tikv](https://github.com/tikv/tikv): Distributed transactional key-value database, originally created to complement TiDB
- [valkey](https://github.com/valkey-io/valkey): A flexible distributed key-value datastore that is optimized for caching and other realtime workloads 🌟 **(Recommended)**
## No-Code

>[!info]
>A no-code database platform is similar to a spreadsheet. It’s a collection of data that can be used for storing, processing and retrieving related information without coding

- [nocodb](https://github.com/nocodb/nocodb): 🔥 🔥 🔥 Open Source Airtable Alternative. [Website](https://nocodb.com/)
## Relational DBMS

>[!info]
>A high-performance, column-oriented SQL DBMS for online analytical processing (OLAP) that uses all available system resources to their full potential to process each analytical query as fast as possible. It is available as both an open-source software and a cloud offering.

- [ClickHouse](https://github.com/ClickHouse/ClickHouse): ClickHouse® is a real-time analytics DBMS 🌟 **(Recommended)**
- [cockroach](https://github.com/cockroachdb/cockroach): the cloud native, distributed SQL database designed for high availability, effortless scale, and control over data placement.
- [Apache Druid](https://github.com/apache/druid): A high performance real-time analytics database.
- [duckdb](https://github.com/duckdb/duckdb): An analytical in-process SQL database management system
- [tidb](https://github.com/pingcap/tidb): the open-source, cloud-native, distributed SQL database designed for modern applications.
## Search Engine

>[!info]
>[NoSQL](https://db-engines.com/en/article/NoSQL) [database management systems](https://db-engines.com/en/article/Database+Management+System) dedicated to the search for data content. In addition to general optimization for this type of application, the specialization consists in typically offering the following features:
>- Support for complex search expressions
>- Full text search
>- Stemming (reducing inflected words to their stem)
>- Ranking and grouping of search results
>- Distributed search for high scalability

- [manticoresearch](https://github.com/manticoresoftware/manticoresearch): Easy to use open source fast database for search | Good alternative to Elasticsearch now | Drop-in replacement for E in the ELK soon 🌟 **(Recommended)**
- [typesense](https://github.com/typesense/typesense): Open Source alternative to Algolia + Pinecone and an Easier-to-Use alternative to ElasticSearch ⚡ 🔍 ✨
- [OpenSearch](https://github.com/opensearch-project/OpenSearch): 🔎 Open source distributed and RESTful search engine 🌟 **(Recommended)**
## Time Series DBMS

>[!info]
>A [database management system](https://db-engines.com/en/article/Database+Management+System) that is optimized for handling time series data: each entry is associated with a timestamp.

- [influxdb](https://github.com/influxdata/influxdb): Scalable datastore for metrics, events, and real-time analytics
# Database Tools

![[meme-technology.png|center]]
## Driver & Connector

- [GatewayD](https://docs.gatewayd.io/getting-started/welcome): a free and open-source cloud-native database gateway and framework for building data-driven applications
## Database IDE

- [beekeeper-studio](https://github.com/beekeeper-studio/beekeeper-studio): Modern and easy to use SQL client for MySQL, Postgres, SQLite, SQL Server, and more. Linux, MacOS, and Windows
- [Chat2DB](https://github.com/CodePhiliaX/Chat2DB): 🔥🔥🔥AI-driven database tool and SQL client, The hottest GUI client, supporting MySQL, Oracle, PostgreSQL, DB2, SQL Server, DB2, SQLite, H2, ClickHouse, and more.
- [dbeaver](https://github.com/dbeaver/dbeaver): Free universal database tool and SQL client
## Database Management

- [bytebase](https://github.com/bytebase/bytebase) : The GitHub/GitLab for database DevOps.
- [limbo](https://github.com/tursodatabase/limbo): A work-in-progress, in-process OLTP database management system, compatible with SQLite.
## Migration Tools

- [goose](https://github.com/pressly/goose): A database migration tool. Supports SQL migrations and Go functions.
- [migrate](https://github.com/golang-migrate/migrate): Database migrations. CLI and Golang library.

