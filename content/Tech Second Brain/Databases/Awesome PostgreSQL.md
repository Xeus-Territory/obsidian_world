---
title: Awesome PostgreSQL
tags:
  - database
  - postgresql
  - helpful
  - usage
  - cheatsheet
---

![[thumbnail-postgresql.png|center|600]]
# Documentation and Articles
## Setup

- [Linode - A Comparison of High Availability PostgreSQL Solutions](https://www.linode.com/docs/guides/comparison-of-high-availability-postgresql-solutions/)
- [Youtube - Techno Tim - PostgreSQL Clustering the Hard Way... High Availability, Scalable, Production Ready Postgres](https://www.youtube.com/watch?v=RHwglGf_z40&t=1529s&ab_channel=TechnoTim) 🌟 **(Recommended)**
- [DevOps.vn - Triển khai PostgreSQL high availability với Patroni trên Ubuntu (Cực kỳ chi tiết)](https://devops.vn/posts/cai-dat-postgresql-high-availability-tren-ubuntu/) 🌟 **(Recommended)**
## Tips & Configuration

- [Medium - Postgres is eating the database world](https://medium.com/@fengruohang/postgres-is-eating-the-database-world-157c204dcfc4) 🌟 **(Recommended)**
- [How To Kill All Connections to a Database in PostgreSQL](https://www.dbvis.com/thetable/how-to-kill-all-connections-to-a-database-in-postgresql/)
- [Medium - Solve PostgreSQL DataFileRead and buffer_io with Parameter Tuning](https://medium.com/@Monika_Yadav/solve-postgresql-datafileread-and-buffer-io-with-parameter-tuning-72c8a3d0c5be)
- [Github Gist - psql-with-gzip-cheatsheet.sh](https://gist.github.com/brock/7a7a70300096632cec30)
- [Azure PostgreSQL - Backup and Restore](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-backup-restore)
- [Internet - Useful PostgreSQL (psql) queries, commands and snippets](https://codefibershq.com/blog/useful-postgresql-pgsql-queries-commands-and-snippets) 🌟 **(Recommended)**
- [Github Gist - PSQL Cheatsheet](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)
- [Medium - Running SpiceDB with Postgresql using docker-compose](https://akoserwal.medium.com/running-spicedb-with-postgresql-using-docker-compose-cc7ee999da73)
- [Citus - Citus 12: Schema-based sharding for PostgreSQL](https://www.citusdata.com/blog/2023/07/18/citus-12-schema-based-sharding-for-postgres/) 🌟 **(Recommended)**
# PostgreSQL Utilities Tools

## Backup database

>[!info]
>PostgreSQL offer for us to using multiple way backup database inside, manipulate the output backup, moreover

Documentation: [PostgreSQL official - Chapter 26. Backup and Restore](https://www.postgresql.org/docs/current/backup.html)

### Use `pg_dump` for backup the database

1. Basic usage for dumping data with command

```bash
pg_dump dbname > dumpfile
```

But also, you want to specify the location, user or what database for dumping. Add flag or environment variable like

- `PGHOST` = `-h` : Host connection parameter
- `PGPORT` = `-p`: Port connection parameter
- `PGDATABSE` = `-d`: Database that use for connection
- `PGUSER` = `-U` : User that use for connection
- `PGPASSWORD` : Password parameter provide for connection
- `PGPASSFILE`: `passfile` that provide password for connection
- `-W, --password` : force password prompt (should happen automatically)

2. Manipulation output with `gzip` or `compression`

*Use gzip for compressing*

```bash
pg_dump dbname | gzip > filename.gz
```

Use `-F` for decide output type

```bash
pg_dump -F <type> dbname > filename

custom     c  -- custom-format archive                                      directory  d  -- directory-format archive                                   plain      p  -- plain-text SQL script                                     tar        t  -- tar-format archive  
```

Use `pg_dump` with parallel

```bash
pg_dump -j num -F d -f out.dir dbname
```

### Archive File System for backup

>[!question]
>When you decide to choose this method, make sure you know where location of data storage, how to connect and backup that on `server:server` or `geography`

You tar for compress your file_system, It will scale down your size to minimal

```bash
tar -cf backup.tar /usr/local/pgsql/data
```

>[!info]
>There are two restrictions, however, which make this method impractical, or at least inferior to the pg_dump method:
>1. The database server _must_ be shut down in order to get a usable backup. Half-way measures such as disallowing all connections will _not_ work (in part because `tar` and similar tools do not take an atomic snapshot of the state of the file system, but also because of internal buffering within the server). Information about stopping the server can be found in [Section 19.5](https://www.postgresql.org/docs/current/server-shutdown.html "19.5. Shutting Down the Server"). Needless to say, you also need to shut down the server before restoring the data.
>2. If you have dug into the details of the file system layout of the database, you might be tempted to try to back up or restore only certain individual tables or databases from their respective files or directories. This will _not_ work because the information contained in these files is not usable without the commit log files, `pg_xact/*`, which contain the commit status of all transactions. A table file is only usable with this information. Of course it is also impossible to restore only a table and the associated `pg_xact` data because that would render all other tables in the database cluster useless. So file system backups only work for complete backup and restoration of an entire database cluster.

Related documentation:

- [File System Level Backup](https://www.postgresql.org/docs/current/backup-file.html#BACKUP-FILE)

### Backup Script for PostgreSQL Cluster

```bash
#!/bin/bash

# PostgreSQL connection information
DB_USER="DB_USER"
DB_PASSWORD="DB_PASSWORD"
DB_HOST="DB_HOST"
DB_PORT="DB_PORT"

# MinIO connection information
MINIO_ALIAS="MINIO_ALIAS"
MINIO_BUCKET="MINIO_BUCKET"

# Get a list of all databases
DATABASES=$(PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -t -c "SELECT datname FROM pg_database WHERE datistemplate = false;")

# Backup each database
for DB_NAME in $DATABASES; do
    DB_NAME=$(echo $DB_NAME | xargs)  # Trim leading/trailing whitespace
    BACKUP_FILE="${DB_NAME}_backup.dump"
    
    echo "Backing up database: $DB_NAME"
    PGPASSWORD=$DB_PASSWORD pg_dump -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -F c -b -v -f $BACKUP_FILE
    
    # Upload to MinIO
    echo "Uploading $BACKUP_FILE to MinIO"
    mc cp $BACKUP_FILE $MINIO_ALIAS/$MINIO_BUCKET/$BACKUP_FILE
    
    # Optionally remove the local backup file
    rm $BACKUP_FILE
done

echo "All databases backed up and uploaded to MinIO."
```

## Restore database

>[!info]
>Mapping backup and restore methods will have appropriate and corresponding methods

### Basic usage

On this situation, your backup is raw SQL file. You just use `pgsql` for restoring, but before that removing and create a new database again

```bash
psql -c "DROP DATABASE <name>;"
psql -c "CREATE DATABSE <name>;"

psql -d <name> < /var/backup/file

# OR you can use pipe for migrate from host1 -> host2
pg_dump -h host1 dbname | psql -h host2 dbname
```

### Manipulate compress situation

1. Use `gzip`

You can use `gzip` with `-d` or `--decompress` to extract the backup, or you can use `gunzip` with compatible functionality

```bash
gzip -d filename.gz | psql dbname

# or
gunzip -c filename.gz | psql dbname

# or

cat filename.gz | gunzip | psql dbname

```

2. Use `-F` flag to compress

On this situation, you use customize dump, It will not exist on `raw` SQL, you must be used `pg_restore` for instead

```bash
pg_restore -d dbname filename
```

3. For dump with multiple thread, you can do same thing with restore with `-j` flag 

```bash
pg_restore -j num -d dbname filename
```

## Healthcheck for Docker or Kubernetes

You can use command `pg_isready` for healthcheck container before bring up

```bash
pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}
```

# PSQL Command

## Setup PSQL

To download `psql`, we can use command in `ubuntu` or `debian` via `apt`

```bash
# Download full
sudo apt install postgresql

# Specific only client
sudo apt install postgresql-client-16 -y
```

## Extension PSQL

Double-check more `psql` command at [postgres-cheatsheet.md](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)

```bash
# List database
postgres=# \l

# Turn on mode easier for read
postgres=# \x on

# List tables from all schemas
postgres=# \dt
```

# Helpful SQL for working with PostgreSQL

## Find the location of configuration for `postgres`

```sql
# Find main configuration of postgresql
SHOW config_file;

# Find connection configuration file
SHOW hba_files;
```

## Delete and close all connection for specify database

Use for delete or truncate database

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = '<TARGET_DB_NAME>' AND pid != pg_backend_pid();
AND leader_pid IS NULL;
```

## Show running query

```sql
SELECT pid, age(clock_timestamp(), query_start), usename, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start desc;

## Get Running Queries (And Lock statuses) in PostgreSQL

SELECT S.pid, age(clock_timestamp(), query_start), usename, query, L.mode, L.locktype, L.granted FROM pg_stat_activity S inner join pg_locks L on S.pid = L.pid order by L.granted, L.pid DESC;
```

## Kill running query

```sql
SELECT pg_cancel_backend(procpid);
```

## Kill idle query

```sql
SELECT pg_terminate_backend(procpid);
```

## Create PostgreSQL User

Explore more methodologies at

- [Medium - Creating user, database and adding access on PostgreSQL](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
- [StrongDM - How to Create a Postgres User (Step-by-Step Tutorial)](https://www.strongdm.com/blog/postgres-create-user)
- [StackOverFlow - Why am I getting a permission denied error for schema public on pgAdmin 4?](https://stackoverflow.com/questions/67276391/why-am-i-getting-a-permission-denied-error-for-schema-public-on-pgadmin-4)

```sql
# Create user with password
CREATE USER your_new_username WITH ENCRYPTED PASSWORD 'your_new_password';

# Grant all permission
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_new_username;

# Grant schema permission for user (consider with pg15)
GRANT ALL ON SCHEMA public TO your_new_username;

# Grant owner database for user (consider with pg15)
ALTER DATABASE your_database_name OWNER TO your_new_username;
```

# Setup PosgreSQL with Ansible

>[!summary]
>This progress will setup the `postgresql`, configure for `postgresql` for remote access on docker image

![[thumbnail-ansible-postgresql.png]]

For running to set up `postgresql` in VM. Go for it with commands

**Notice:**

- Upgrading your specify hosts from `hosts` file and verify `ssh-key` with your `ssh-agent`

```bash
#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/<YOUR_SSH_KEY>
ansible <YOUR_HOSTS> -i inventories/hosts -m ping (200 Succeed - Moving to next step)
```

- Deprecated: Configuration your `pg_hba.conf` and `postgresql.conf` on templates folder --> Changing into use `PostgreSQL` database inside container but this `pg_hba` & `postgresql.conf` still work if you find the right path to mounting.
- Running the ansible for setup postgresql and configure your postgresql. This configuration will put inside `YAML` style and refer with this article to deployment via `ansible`

	1. [[Awesome Ansible#In Docker|PostgreSQL in Docker with Ansible]]
	2. [[Awesome Ansible#In VM|PostgreSQL in host with Ansible]]

```bash
#!/bin/bash
ansible-playbook -i inventories/hosts --extra-vars name_machine=deal_platform --tags update general-tasks.yaml
ansible-playbook -i inventories/hosts --extra-vars name_machine=deal_platform --tags install general-tasks.yaml
ansible-playbook -i inventories/hosts --tags install_psql postgres_docker_tasks.yaml
```
# Monitoring Performance

>[!quote]
>*Thanks for [Dmitry Romanoff](https://dev.to/dm8ry) who posted this article, which help me optimize the effort to find out the way to doing statistic jobs for PostgreSQL queries and make it to dashboard for monitoring for whole database*
>
>▶️ ▶️  [Main Article: Proactive PostgreSQL Database(s) Performance Scanner](https://dev.to/dm8ry/proactive-postgresql-databases-performance-scanner-4cd9) 

>[!done]
>Beside the main scripting, I have make some research about MySQL and PostgreSQL in Azure Services and find out how to monitoring and doing statistic for queries. You can go and check it 
>
>▶️ ▶️  [Integration Performance Query for MySQL or PostgreSQL](https://hackmd.io/@XeusNguyen/ry_nbYBxh)

Down below is about script which contributed by Dmitry about tuning performance and monitoring queries with PostgreSQL

```bash
#!/bin/bash

##########################################################
#
# Proactive PostgreSQL DB Performance Scanner
#
# Purpose: Connect to the PostgreSQL DB instance
#          and run a set of queries
#          to find problematic performance patterns
# 
# Provide the output in the format:
#
# DateTime:
# Environment:
# Issue:
# Evidence:
# Recommendation:
#
# Date: 04-Jan-2023
#
# Author: Dmitry
#
###########################################################

mainProcessor()
{

inpHost="${1}"
inpPort="${2}"
inpDBusername="${3}"
inpDBname="${4}"
sql_query="${5}"
sql_query_extra="${6}"
probe="${7}"
the_environment="${8}"
issue="${9}"
recommendation="${10}"
the_line="${11}"

if [ -z "$inpHost" ] || [ -z "$inpPort" ] || [ -z "$inpDBusername" ] || [ -z "$inpDBname" ]
then
  echo "Error: not populated parameters!"
  exit 3
fi

answer=$(psql -h $inpHost -p $inpPort -U $inpDBusername -d $inpDBname -c "$sql_query")

nRowsReturned=`echo $answer | grep wvw | wc -l`

if [ -z "$sql_query_extra" ]
then
      evidence=""
else
      evidence=$(psql -h $inpHost -p $inpPort -U $inpDBusername -d $inpDBname -c "$sql_query_extra")
fi 

if [ "$nRowsReturned" -gt "0" ]; then

current_datetime=`date +"%Y%m%d_%H%M%S"`
echo " "
echo "$probe"
echo "DateTime: $current_datetime"
echo "Environment: $the_environment"
echo "Issue: $issue" 
echo "Details:"
echo "$answer"

if [ ! -z "$evidence" ]
then
  echo "Evidence:"
  echo "$evidence"
fi

echo "Recommendation: $recommendation"
echo " "
echo "$the_line"

fi

}

helpFunction()
{
   echo ""
   echo "Usage: $0 -h hostname -p port -U db_username -d db_name"
   echo -e "\t-h Postgres hostname"
   echo -e "\t-p Postgers port"
   echo -e "\t-U Postgres DB username"
   echo -e "\t-d Postgres DB name"
   echo -e " "
   exit 1 # Exit script after printing help
}

while getopts "h:p:U:d:" opt
do
   case "$opt" in
      h ) inpHost="$OPTARG" ;;
      p ) inpPort="$OPTARG" ;;
      U ) inpDBusername="$OPTARG" ;;
      d ) inpDBname="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$inpHost" ] || [ -z "$inpPort" ] || [ -z "$inpDBusername" ] || [ -z "$inpDBname" ] 
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

echo " "
echo "Proactive PG DB Performance Scanner"
echo " "

the_line=" === === === === === === === === === === === === === === === "

echo "$the_line"

query_lenght_to_print=2048

the_environment="Host:$inpHost; Port:$inpPort; DB_Username:$inpDBusername; DB_Name: $inpDBname"

DBVersion=$(psql -h $inpHost -p $inpPort -U $inpDBusername -d $inpDBname -t -c "select version(); ")

DBVersion_Num=`echo $DBVersion | awk ' { print $2 } '`

# Check that pg_stat_statements is enabled and populated

n_check=$(psql -h $inpHost -p $inpPort -U $inpDBusername -d $inpDBname -qtX << EOF
select count(1) from information_schema.tables where table_name = 'pg_stat_statements';
EOF
)

n_check=`echo $n_check | xargs`

if [ "$n_check" -eq "0" ]; then
    echo "The pg_stat_statements table does not exist. Please enable pg_stat_statements to be populated with recs."
    echo " "
    exit 1
fi

n_rows_pg_stat_statements=$(psql -h $inpHost -p $inpPort -U $inpDBusername -d $inpDBname -qtX << EOF
select count(1) n_rows_pg_stat_statements
  from pg_stat_statements
EOF
)

n_rows_pg_stat_statements=`echo $n_rows_pg_stat_statements | xargs`

if [ "$n_rows_pg_stat_statements" -eq "0" ]; then
    echo "The pg_stat_statements table is empty. Please enable pg_stat_statements. It should be populated with recs."
    echo " "
    exit 1
fi

#################################################################################################

############### probe 1

n_threshold=10

probe="Check the databases having more than $n_threshold active connections"
issue="It were found databases with the high number of active connections"
recommendation="Check why Customers open so many active connections. It may be wrong configuration or unusual application pattern."

sql_query="
select datname, count(1) num_of_active_connections, 'wvw' chk
from pg_stat_activity
where datname!='' and state!='idle'
group by datname
having count(1)>$n_threshold
order by 2 desc
"

sql_query_extra="
select datname, state, client_addr, client_hostname, substr(query, 1, $query_lenght_to_print) query
from pg_stat_activity
where state!='idle' and datname in (
select datname
from
 (
  select datname, count(1) num_of_active_sessions
    from pg_stat_activity
   where state!='idle' and datname!=''
   group by 1
  having count(1)>0
 ) M
)
order by 1, 5
"

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

############### probe 2

n_threshold=30

probe="Check DB queries that take more than $n_threshold seconds"
issue="Long-running queries"
recommendation="Check why the query/queries take so much time. It maybe it's heavy non-optimized query. Maybe it's unusual application pattern. "

sql_query="
select
    now()-query_start as runtime,
    pid as process_id,
    datname as db_name,
    client_addr,
    client_hostname,
    substr(query, 1, $query_lenght_to_print) query,
    'wvw' chk
from pg_stat_activity
where state!='idle' and datname!=''
and now() - query_start > '$n_threshold seconds'::interval
order by 1 desc;
"

sql_query_extra=""

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"


############### probe 3

n_threshold=2000

probe="Check in the pg_stat_statements DB queries that take more than $n_threshold ms"
issue="Long-running queries"
recommendation="Check why the query/queries take so much time. It may be it is a heavy non-optimized query. Maybe it's an unusual application pattern."

if [[ $DBVersion_Num == "11"*  || $DBVersion_Num == "12"* ]] ; then

sql_query="
SELECT
        pss.userid,
        pss.dbid,
        pd.datname as db_name,
        round(pss.total_time::numeric, 2) as total_time,
        pss.calls,
        round(pss.mean_time::numeric, 0) as mean,
        substr(pss.query, 1, $query_lenght_to_print) query,
        'wvw' chk
FROM pg_stat_statements pss, pg_database pd
WHERE pd.oid=pss.dbid
and round(pss.mean_time::numeric, 0) > $n_threshold
ORDER BY round(pss.mean_time::numeric, 0) desc
LIMIT 30;
"

else

sql_query="
SELECT
        pss.userid,
        pss.dbid,
        pd.datname as db_name,
        round((pss.total_exec_time + pss.total_plan_time)::numeric, 2) as total_time,
        pss.calls,
        round((pss.mean_exec_time+pss.mean_plan_time)::numeric, 0) as mean,
        substr(pss.query, 1, $query_lenght_to_print) query,
        'wvw' chk
FROM pg_stat_statements pss, pg_database pd
WHERE pd.oid=pss.dbid
and round((pss.mean_exec_time+pss.mean_plan_time)::numeric, 0) > $n_threshold
ORDER BY round((pss.mean_exec_time+pss.mean_plan_time)::numeric, 0) desc
LIMIT 30;
"

fi

sql_query_extra=""

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

############### probe 4

n_threshold=10

probe="Check the queries that occupy more than $n_threshold % of a CPU"
issue="Query/queries that utilize significant portion of CPU"
recommendation="Check why the query/queries take a significant portion of the CPU. Maybe it takes significant time. Maybe it's running too frequently. Try to analyze why this DB query takes a significant part of the CPU."

if [[ $DBVersion_Num == "11"*  || $DBVersion_Num == "12"* ]] ; then

sql_query="
select M.*, 'wvw' chk
from
(SELECT
        pss.userid,
        pss.dbid,
        pd.datname as db_name,
        round(pss.total_time::numeric, 2) as total_time,
        pss.calls,
        round(pss.mean_time::numeric, 2) as mean,
        round((100 * pss.total_time / sum(pss.total_time::numeric) OVER ())::numeric, 2) as cpu_portion_pctg,
        substr(pss.query, 1, $query_lenght_to_print) query
FROM pg_stat_statements pss, pg_database pd
WHERE pd.oid=pss.dbid
ORDER BY pss.total_time
DESC LIMIT 30) M
where cpu_portion_pctg > $n_threshold;
"

else

sql_query="
select M.*, 'wvw' chk
from
(SELECT
        pss.userid,
        pss.dbid,
        pd.datname as db_name,
        round((pss.total_exec_time + pss.total_plan_time)::numeric, 2) as total_time,
        pss.calls,
        round((pss.mean_exec_time+pss.mean_plan_time)::numeric, 2) as mean,
        round((100 * (pss.total_exec_time + pss.total_plan_time) / sum((pss.total_exec_time + pss.total_plan_time)::numeric) OVER ())::numeric, 2) as cpu_portion_pctg,
        substr(pss.query, 1, $query_lenght_to_print) query
FROM pg_stat_statements pss, pg_database pd
WHERE pd.oid=pss.dbid
ORDER BY (pss.total_exec_time + pss.total_plan_time)
DESC LIMIT 30) M
where cpu_portion_pctg > $n_threshold;
"

fi

sql_query_extra=""

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

############### probe 5

n_threshold=1000

probe="Check DB queries that run more than $n_threshold times per second"
issue="Too frequent DB queries"
recommendation="Check why the query/queries run so frequent. Maybe it's pointing to some abnormal pattern. "

sql_query="
select M.*, 'wvw' chk
from
(with
a as (select dbid, queryid, query, calls s from pg_stat_statements),
b as (select dbid, queryid, query, calls s from pg_stat_statements, pg_sleep(1))
select
        pd.datname as db_name,
        substr(a.query, 1, $query_lenght_to_print) as the_query,
        sum(b.s-a.s) as runs_per_second
from a, b, pg_database pd
where
  a.dbid= b.dbid
and
  a.queryid = b.queryid
and
  pd.oid=a.dbid
and
  pd.datname not in ('postgres')
group by 1, 2
having sum(b.s-a.s) > $n_threshold
order by 3 desc) M;
"

sql_query_extra=""

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

############### probe 6

n_threshold=5

probe="Actual connections to Max connections ratio (Threshold=$n_threshold)"
issue="Too high ratio of actual connections to max connections"
recommendation="Check that there is enough connection slots."

sql_query="
select  a connection_slots_occupied,
        b max_connections,
        round((a.actual_connections::float/nullif(b.max_connections::float,0))::numeric*100, 2) the_ratio,
        'wvw' chk
        from
        (select count(1) as actual_connections from pg_stat_activity) a,
        (select setting as max_connections from pg_settings where name='max_connections') b
 where round((a.actual_connections::float/nullif(b.max_connections::float,0))::numeric*100, 2) > $n_threshold;
"

sql_query_extra="
select datname, substr(query, 1, $query_lenght_to_print) query, count(1) num_of_allocated_connection_slots
  from pg_stat_activity
  group by 1, 2
  having count(1) > 5
  order by 3 desc;
"

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

############### probe 7

n_threshold=5

probe="The query/queries that allocates/allocate the most connection slots (Threshold=$n_threshold)"
issue="The most of connection slots are occupied by single query"
recommendation="It maybe configuration issue. It looks suspicious. because single query occupies the most connection slots of the DB instance"

sql_query="
select
  round((M.num_of_allocated_connection_slots_by_the_query::float/nullif(M.tot_allocated_slots::float,0))::numeric*100, 2) pctg,
  M.*
from
(select
      substr(query, 1, $query_lenght_to_print) query,
      count(1) num_of_allocated_connection_slots_by_the_query,
      (select count(1) as n from pg_stat_activity) tot_allocated_slots,
      'wvw' chk
  from
      pg_stat_activity
group by 1, 3
having count(1) > $n_threshold
order by 2 desc) M;
"

sql_query_extra=""

mainProcessor "$inpHost" "$inpPort" "$inpDBusername" "$inpDBname" "$sql_query" "$sql_query_extra" "$probe" \
              "$the_environment" "$issue" "$recommendation" "$the_line"

echo " "

######################################
#
# End
#
######################################
```
