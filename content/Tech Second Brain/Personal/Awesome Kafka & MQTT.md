---
title: Awesome Kafka & MQTT
tags:
  - usage
  - devops
  - tools
  - collections
---

![[thumbnail-kafka-arch.png]]
# Documentations and Articles

## Awesome Repositories

- [awesome-kafka (Newest)](https://github.com/conduktor/awesome-kafka): A curated list of awesome Apache Kafka resources, tools, libraries, and applications
- [awesome-kafka](https://github.com/semantalytics/awesome-kafka): A curated list of awesome things related to Apache Kafka
- [awesome-mqtt](https://github.com/awesome-mqtt/awesome-mqtt): Curated list of MQTT brokers, clients, tools, resources and more.
## Articles

- [AWS - What’s the Difference Between Kafka and RabbitMQ?](https://aws.amazon.com/compare/the-difference-between-rabbitmq-and-kafka/?nc1=h_ls) 🌟 **(Recommended)**
- [Viblo - RabbitMQ vs Kafka - Hai Cách Truyền Tải Khác Nhau](https://viblo.asia/p/rabbitmq-vs-kafka-hai-cach-truyen-tai-khac-nhau-pgjLNdYE432)
- [Confluent - KRaft: Apache Kafka Without ZooKeeper](https://developer.confluent.io/learn/kraft/) 🌟 **(Recommended)**
## General

- [Confluent - Introduction to Apache Kafka](https://docs.confluent.io/kafka/introduction.html)
- [Kafka - Documentation](https://kafka.apache.org/documentation/)
- [Viblo - Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2)
- [LocalStack - Managed Streaming for Kafka (MSK)](https://docs.localstack.cloud/user-guide/aws/msk/)
- [RedHat - Apache Kafka: 10 essential terms and concepts explained](https://www.redhat.com/en/blog/apache-kafka-10-essential-terms-and-concepts-explained) 🌟 **(Recommended)**
- [RabbitMQ - RabbitMQ vs. Apache Kafka®](https://www.rabbitmq.com/docs/compare/kafka) 🌟 **(Recommended)**
## Organization

- [Confluent Inc.](https://github.com/confluentinc): Real-time streams powered by Apache Kafka®
- [Strimzi](https://github.com/strimzi): Kubernetes-native data streaming powered by Apache Kafka
## Tips & Configurations

- [NetApp - Use Apache Kafka with the Command Line](https://www.instaclustr.com/support/documentation/kafka/using-kafka/use-kafka-with-the-command-line/)
- [Huawei Cloud - Deleting a Kafka Consumer Group](https://support.huaweicloud.com/intl/en-us/usermanual-kafka/kafka-ug-0012.html)
- [Confluent - How to run Kafka locally with Docker](https://developer.confluent.io/confluent-tutorials/kafka-on-docker/)
- [Scaler - Configuring Zookeeper for a Kafka Cluster](https://www.scaler.com/topics/kafka-tutorial/configuring-zookeeper-for-a-kafka-cluster/) 🌟 **(Recommended)**
- [Strimzi - Migrate your Strimzi-operated cluster from ZooKeeper to KRaft](https://strimzi.io/blog/2024/03/22/strimzi-kraft-migration/)
# Kafka CLI Usage

## Installation

Following my tutorial to install once `kafka cli` for your shell. Explore more version at: [Apache Kafka](https://kafka.apache.org/downloads)

```bash
mkdir -p ~/.kafka
wget https://dlcdn.apache.org/kafka/4.0.0/kafka_2.13-4.0.0.tgz
tar -xzf kafka_2.13-4.0.0.tgz -C ~/.kafka --strip-components=1
echo "export PATH=\"\$PATH:\$HOME\.kafka\\\bin\"" >> ~/.zshrc
source ~/.zshrc
```

Now check command for validate it downloads and setups successful

```bash
kafka-consumer-groups.sh --version
```

## Setup Connection Properties

For help you connect into remote cluster with username and password, you need to create file

In the situations, your `kafka` cluster use **truststore** key for validate login, you should configure `ssl-user-config.properties` like

>[!warning]
>Remembering, you must keep the `sasl.jaas.config` on same line, if you have to break, you must be add the space and symbol `/` to present your line breaking

```toml title="ssl-user-config.properties"
ssl.enabled.protocols=TLSv1.2,TLSv1.1,TLSv1
ssl.truststore.location = truststore.jks
ssl.truststore.password = "truststore-password"
ssl.protocol=TLS
security.protocol=SASL_SSL
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
  username="your-username" \
  password="your-password";
```

But in some situations, you just use `ssl` for connection, your configuration file will be

```toml title="ssl-user-config.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-256 # Change the machanism for your cluster
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
  username="your-username" \
  password="your-password";
```

Save this file into location which you can reuse, usually we set it on `$KAFKA_HOME/config`

## Configure Consumers Group

```bash
kafka-consumer-groups.sh --bootstrap-server <host-kafka>:<port-kafka> --command-config ~/.kafka/config/ssl-user-config.properties --list
```

When I want to delete bunch of Consumer Group, you can use

```bash
kafka-consumer-groups.sh --bootstrap-server <host-kafka>:<port-kafka> --command-config ~/.kafka/config/ssl-user-config.properties --delete --group <name-consumer-group>
```

# Kafka & MQTT Tools

![[thumbnail-message-queue.png]]

## Installation

- [Strimzi](https://strimzi.io/docs/operators/latest/overview): Strimzi simplifies the process of running [Apache Kafka](https://kafka.apache.org/) within a Kubernetes cluster 🌟 **(Recommended)**
- [apache/kafka](https://hub.docker.com/r/apache/kafka): Official Apache Kafka Docker Image
- [landoop/fast-data-dev](https://hub.docker.com/r/landoop/fast-data-dev): For 'Kafka developers' with Kafka, Schema Registry, Connect, Lenses.io StreamReactor Connectors
## Broker

- [Apache ActiveMQ](https://github.com/apache/activemq): a high performance Message Broker
- [tansu](https://github.com/tansu-io/tansu): Apache Kafka® compatible broker with S3, PostgreSQL, SQLite, Apache Iceberg and Delta Lake
- [hermes](https://github.com/allegro/hermes): Fast and reliable message broker built on top of Kafka.
- [mosquitto](https://github.com/eclipse-mosquitto/mosquitto): an open source implementation of a server for version 5.0, 3.1.1, and 3.1 of the MQTT protocol.
- [emqx](https://github.com/emqx/emqx): The most scalable and reliable MQTT broker for AI, IoT, IIoT and connected vehicles
## Kafka Alternative

- [AutoMQ](https://docs.automq.com/automq/what-is-automq/overview) : AutoMQ re-engineers Kafka for the cloud by decoupling storage to object storage. While maintaining **100% compatibility** with Apache Kafka®, it offers users up to **10 times cost efficiency** and **100 times elasticity**.
- [RabbitMQ](https://www.rabbitmq.com/): An open-source message broker for asynchronous messaging, queueing and delivery acknowledgement.
- [NATS](https://github.com/nats-io/nats-server): High-Performance server for NATS.io, the cloud and edge native messaging system.
- [Apache Pulsar](https://github.com/apache/pulsar): Apache Pulsar - distributed pub-sub messaging system
## UI

- [akhq](https://github.com/tchiotludo/akhq): Kafka GUI for Apache Kafka to manage topics, topics data, consumers group, schema registry, connect and more...
- [kafka-ui](https://github.com/provectus/kafka-ui): Open-Source Web UI for Apache Kafka Management 🌟 **(Recommended)**
