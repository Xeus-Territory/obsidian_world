---
title: Monitoring PostgreSQL Performance
tags:
  - collections
  - postgresql
  - database
  - monitoring
---
*Thanks for [Dmitry Romanoff](https://dev.to/dm8ry) who posted this article, which help me optimize the effort to find out the way to doing statistic jobs for PostgreSQL queries and make it to dashboard for monitoring for whole database  ▶️ ▶️  [Main Article: Proactive PostgreSQL Database(s) Performance Scanner](https://dev.to/dm8ry/proactive-postgresql-databases-performance-scanner-4cd9)* 

Beside the main scripting, I have make some research about MySQL and PostgreSQL in Azure Services and find out how to monitoring and doing statistic for queries. You can go and check it  ▶️ ▶️  [Integration Performance Query for MySQL or PostgreSQL](https://hackmd.io/@XeusNguyen/ry_nbYBxh)

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

