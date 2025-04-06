---
title: The awesome of Kafka
tags:
  - usage
  - devops
  - tools
  - collections
---

# Documentations and Articles

## Articles

- [AWS - What’s the Difference Between Kafka and RabbitMQ?](https://aws.amazon.com/compare/the-difference-between-rabbitmq-and-kafka/?nc1=h_ls)
- [Viblo - RabbitMQ vs Kafka - Hai Cách Truyền Tải Khác Nhau](https://viblo.asia/p/rabbitmq-vs-kafka-hai-cach-truyen-tai-khac-nhau-pgjLNdYE432)
- [Confluent - KRaft: Apache Kafka Without ZooKeeper](https://developer.confluent.io/learn/kraft/)
## General

- [Confluent - Introduction to Apache Kafka](https://docs.confluent.io/kafka/introduction.html)
- [Kafka - Documentation](https://kafka.apache.org/documentation/)
- [Viblo - Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2)
- [LocalStack - Managed Streaming for Kafka (MSK)](https://docs.localstack.cloud/user-guide/aws/msk/)
## Organization

- [Confluent Inc.](https://github.com/confluentinc): Real-time streams powered by Apache Kafka®

## Tips & Configurations

- [NetApp - Use Apache Kafka with the Command Line](https://www.instaclustr.com/support/documentation/kafka/using-kafka/use-kafka-with-the-command-line/)
- [Huawei Cloud - Deleting a Kafka Consumer Group](https://support.huaweicloud.com/intl/en-us/usermanual-kafka/kafka-ug-0012.html)
- [Confluent - How to run Kafka locally with Docker](https://developer.confluent.io/confluent-tutorials/kafka-on-docker/)
- [Scaler - Configuring Zookeeper for a Kafka Cluster](https://www.scaler.com/topics/kafka-tutorial/configuring-zookeeper-for-a-kafka-cluster/)
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

In the situations, your `kafka` cluster use truststore key for validate login, you should configure `ssl-user-config.properties` like

```toml title="ssl-user-config.properties"
ssl.enabled.protocols=TLSv1.2,TLSv1.1,TLSv1
ssl.truststore.location = truststore.jks
ssl.truststore.password = "truststore-password"
ssl.protocol=TLS
security.protocol=SASL_SSL
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required 
  username="your-username" 
  password="your-password";
```

But in some situations, you just use `ssl` for connection, your configuration file will be

```toml title="ssl-user-config.properties"
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required 
  username="your-username" 
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

# Kafka Tools

## Installation

- [Strimzi](https://strimzi.io/docs/operators/latest/overview): Strimzi simplifies the process of running [Apache Kafka](https://kafka.apache.org/) within a Kubernetes cluster
- Docker Images:
	- [apache/kafka](https://hub.docker.com/r/apache/kafka)
	- [bitami/kafka](https://hub.docker.com/r/bitnami/kafka)
## Queue Services (Alternative)

- [AutoMQ](https://docs.automq.com/automq/what-is-automq/overview) : AutoMQ re-engineers Kafka for the cloud by decoupling storage to object storage. While maintaining **100% compatibility** with Apache Kafka®, it offers users up to **10 times cost efficiency** and **100 times elasticity**.
- [RabbitMQ](https://www.rabbitmq.com/): An open-source message broker for asynchronous messaging, queueing and delivery acknowledgement.
## UI

- [akhq](https://github.com/tchiotludo/akhq): Kafka GUI for Apache Kafka to manage topics, topics data, consumers group, schema registry, connect and more...
- [kafka-ui](https://github.com/provectus/kafka-ui): Open-Source Web UI for Apache Kafka Management