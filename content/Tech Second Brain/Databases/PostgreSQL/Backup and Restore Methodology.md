---
title: Backup and Restore Methodology
tags:
  - postgresql
  - database
  - backup-restore
---
# Backup database

>[!info]
>PostgreSQL offer for us to using multiple way backup database inside, manipulate the output backup, moreover

Documentation: [PostgreSQL official - Chapter 26. Backup and Restore](https://www.postgresql.org/docs/current/backup.html)

## Use `pg_dump` for backup the database

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

## Archive File System for backup

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

# Restore database

>[!info]
>Mapping backup and restore methods will have appropriate and corresponding methods

## Basic usage

On this situation, your backup is raw SQL file. You just use `pgsql` for restoring, but before that removing and create a new database again

```bash
pgsql -c "DROP DATABASE <name>;"
pgsql -c "CREATE DATABSE <name>;"

pgsql -d <name> < /var/backup/file

# OR you can use pipe for migrate from host1 -> host2
pg_dump -h host1 dbname | psql -h host2 dbname
```

## Manipulate compress situation

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

# Conclusion

![[meme-backup-restore.png]]

>[!quote]
>Through the post, you will learn some about methodology which use to backup, restore PostgreSQL and how to manipulate compression when huge database come in. Stay safe and feel free to expand more !!! 😄😄😄




