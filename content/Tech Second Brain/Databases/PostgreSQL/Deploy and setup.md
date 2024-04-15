---
title: "PostgreSQL: Tips and note when setup and operating"
tags:
  - database
  - postgresql
  - helpful
  - usage
---
# Healthcheck for Docker or Kubernetes

You can use command `pg_isready` for healthcheck container before bring up

```bash
pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}
```

# Helpful SQL for working with PostgreSQL

If you want to detect location of configuration file apply for postgres, use this querry

```sql
# Find main configuration of postgresql
SHOW config_file;

# Find connection configuration file
SHOW hba_files;
```

Delete and close all connection for specify database, use for delete or truncate database

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = '<TARGET_DB_NAME>' AND pid != pg_backend_pid();
AND leader_pid IS NULL;
```

Show running query

```sql
SELECT pid, age(clock_timestamp(), query_start), usename, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start desc;

## Get Running Queries (And Lock statuses) in PostgreSQL

SELECT S.pid, age(clock_timestamp(), query_start), usename, query, L.mode, L.locktype, L.granted FROM pg_stat_activity S inner join pg_locks L on S.pid = L.pid order by L.granted, L.pid DESC;
```

Kill running query

```sql
SELECT pg_cancel_backend(procpid);
```

Kill idle query

```sql
SELECT pg_terminate_backend(procpid);
```