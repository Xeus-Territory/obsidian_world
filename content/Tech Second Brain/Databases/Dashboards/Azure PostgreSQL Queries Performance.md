---
title: Azure PostgreSQL Queries Performance Dashboard
tags:
  - grafana-dashboards
  - postgresql
  - monitoring
---
>[!info]
>This dashboard template which i make for Grafana with purpose monitoring queries in PostgreSQL. To understanding about this, go and check [[PostgreSQL Cheatsheet#Monitoring Performance|Monitoring Performance of PostgreSQL]]

```json
{
  "__inputs": [
    {
      "name": "DS_POSTGRESQL",
      "label": "PostgreSQL",
      "description": "",
      "type": "datasource",
      "pluginId": "postgres",
      "pluginName": "PostgreSQL"
    }
  ],
  "__elements": {},
  "__requires": [
    {
      "type": "panel",
      "id": "barchart",
      "name": "Bar chart",
      "version": ""
    },
    {
      "type": "panel",
      "id": "bargauge",
      "name": "Bar gauge",
      "version": ""
    },
    {
      "type": "panel",
      "id": "gauge",
      "name": "Gauge",
      "version": ""
    },
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "9.1.7"
    },
    {
      "type": "panel",
      "id": "piechart",
      "name": "Pie chart",
      "version": ""
    },
    {
      "type": "datasource",
      "id": "postgres",
      "name": "PostgreSQL",
      "version": "1.0.0"
    },
    {
      "type": "panel",
      "id": "table",
      "name": "Table",
      "version": ""
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": null,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "collapsed": true,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 47,
      "panels": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "Long-running transactions can consume CPU resources that can lead to high CPU utilization.",
          "fieldConfig": {
            "defaults": {
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "filterable": true,
                "inspect": true
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 7,
            "w": 11,
            "x": 0,
            "y": 1
          },
          "id": 45,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "SELECT pid, usename, datname, query, now() - xact_start as duration \nFROM pg_stat_activity  \nWHERE pid <> pg_backend_pid() and state IN ('idle in transaction', 'active') \nORDER BY duration DESC;   ",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": "Long-running transactions",
          "transparent": true,
          "type": "table"
        },
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "Helps identify queries that consume I/O on the server",
          "fieldConfig": {
            "defaults": {
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "filterable": true,
                "inspect": true
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 7,
            "w": 13,
            "x": 11,
            "y": 1
          },
          "id": 53,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "SELECT userid::regrole, dbid, query, calls\nFROM pg_stat_statements \nORDER BY blk_read_time + blk_write_time desc  \nLIMIT 5;",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": " Identify high I/O utilization",
          "transparent": true,
          "type": "table"
        },
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "A large number of connections to the database is also another issue that might lead to increased CPU and memory utilization.\n\n",
          "fieldConfig": {
            "defaults": {
              "color": {
                "mode": "continuous-BlPu"
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 9,
            "w": 6,
            "x": 0,
            "y": 8
          },
          "id": 49,
          "options": {
            "displayMode": "gradient",
            "minVizHeight": 10,
            "minVizWidth": 0,
            "orientation": "horizontal",
            "reduceOptions": {
              "calcs": [],
              "fields": "",
              "values": true
            },
            "showUnfilled": true
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "SELECT state, count(*)  \nFROM  pg_stat_activity   \nWHERE pid <> pg_backend_pid()  \nGROUP BY 1 ORDER BY 1;",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": "Total number of connections and number connections by state",
          "transparent": true,
          "type": "bargauge"
        },
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "Keeping table statistics up to date helps improve query performance. Monitor whether regular autovacuuming is being carried out.",
          "fieldConfig": {
            "defaults": {
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "filterable": true,
                "inspect": true
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 9,
            "w": 18,
            "x": 6,
            "y": 8
          },
          "id": 51,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "select schemaname,relname,n_dead_tup,n_live_tup,last_vacuum,last_analyze,last_autovacuum,last_autoanalyze \nfrom pg_stat_all_tables where n_live_tup > 0;",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": "Monitoring vacuum and table stats",
          "transparent": true,
          "type": "table"
        },
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "It provides a resultset sorted by the mist CPU-intensive queries in descending order",
          "fieldConfig": {
            "defaults": {
              "color": {
                "mode": "thresholds"
              },
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "filterable": true,
                "inspect": true
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 10,
            "w": 24,
            "x": 0,
            "y": 17
          },
          "id": 55,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "Select pss.userid, pss.dbid, pd.datname as db_name, pss.total_time,\n        pss.calls,\n        pss.mean_time as mean,\n        round((100 * (pss.total_time) / sum ((pss.total_time)::numeric) OVER ()) :: numeric, 2) as cpu_portion_pctg, pss.query\nFrom pg_stat_statements as pss, pg_database as pd\nwhere pd.oid = pss.dbid\norder by pss.total_time\ndesc limit 30;",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": "How much each query in each database uses the CPU",
          "transparent": true,
          "type": "table"
        },
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "the top frequent PostgreSQL queries run the following SQL query ",
          "fieldConfig": {
            "defaults": {
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "filterable": true,
                "inspect": true
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 10,
            "w": 24,
            "x": 0,
            "y": 27
          },
          "id": 57,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true,
            "sortBy": [
              {
                "desc": true,
                "displayName": "runs_per_second"
              }
            ]
          },
          "pluginVersion": "9.1.7",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "with\na as (select dbid, queryid, query, calls s from pg_stat_statements),\nb as (select dbid, queryid, query, calls s from pg_stat_statements, pg_sleep(1))\nselect\n        pd.datname as db_name, \n        substr(a.query, 1, 2048) as the_query, \n        sum(b.s-a.s) as runs_per_second\nfrom a, b, pg_database pd\nwhere \n  a.dbid= b.dbid \nand \n  a.queryid = b.queryid \nand \n  pd.oid=a.dbid\ngroup by 1, 2\norder by 3 desc;",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": " Running frequent SQL queries",
          "transparent": true,
          "type": "table"
        }
      ],
      "title": "Identify root causes (Use if has accident)",
      "type": "row"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 1
      },
      "id": 29,
      "panels": [],
      "title": "Database Info and Special Info",
      "type": "row"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Provide the size of database postgreSQL in currently",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "MB"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 9,
        "x": 0,
        "y": 2
      },
      "id": 31,
      "options": {
        "displayMode": "lcd",
        "minVizHeight": 10,
        "minVizWidth": 0,
        "orientation": "horizontal",
        "reduceOptions": {
          "calcs": [],
          "fields": "",
          "values": true
        },
        "showUnfilled": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT\n  datname as database_name,\n  pg_database_size(datname)/1024/1024 as size\nFROM\n  pg_database\nWHERE\n  datistemplate = false;\n",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Size of a PostgreSQL Database",
      "transparent": true,
      "type": "bargauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "The PostgreSQL cache area is known as shared_buffers, which acts as the database layer cache on top of the cache provided by the operating system",
      "fieldConfig": {
        "defaults": {
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green",
                "value": null
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 15,
        "x": 9,
        "y": 2
      },
      "id": 33,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": false
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT\n  sum(heap_blks_read) as reads,\n  sum(heap_blks_hit) as hits,\n  ROUND(\n    sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)),\n    4\n  ) as hit_ratio\nFROM\n  pg_statio_user_tables;\n",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Database Cache-Hit Ratios",
      "transparent": true,
      "type": "gauge"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 11
      },
      "id": 2,
      "panels": [],
      "title": "Statistic Queries",
      "type": "row"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Total time of queries, There one queries give for running on whole system",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            }
          },
          "mappings": []
        },
        "overrides": [
          {
            "__systemRef": "hideSeriesFrom",
            "matcher": {
              "id": "byNames",
              "options": {
                "mode": "exclude",
                "names": [
                  "percent",
                  "total",
                  "calls",
                  "mean",
                  "stddev_time",
                  "UPDATE \"PlatformInboxEventBusMessage\" SET \"ConcurrencyUpdateToken\" = $1, \"ConsumeStatus\" = $2, \"ConsumerBy\" = $3, \"CreatedDate\" = $4, \"JsonMessage\" = $5, \"LastConsumeDate\" = $6, \"LastConsumeError\" = $7, \"MessageTypeFullName\" = $8, \"NextRetryProcessAfter\" = $9, \"ProduceFrom\" = $10, \"RetriedProcessCount\" = $11, \"RoutingKey\" = $12\nWHERE \"Id\" = $13 AND \"ConcurrencyUpdateToken\" = $14 percent",
                  "WITH \"s\" AS (\n            INSERT INTO \"hangfire\".\"state\" (\"jobid\", \"name\", \"reason\", \"createdat\", \"data\")\n            VALUES ($1, $2, $3, $4, $5) RETURNING \"id\"\n        )\n        UPDATE \"hangfire\".\"job\" \"j\"\n        SET \"stateid\" = s.\"id\", \"statename\" = $2\n        FROM \"s\"\n        WHERE \"j\".\"id\" = $6 percent",
                  "SELECT t0.\"Id\", t0.\"HasInactiveParent\", t0.\"HierarchyPath\", t0.\"Name\", t0.\"OrganizationStatus\", t0.\"ParentOrganizationalUnitId\", t0.\"RootId\", t1.\"Id\", t1.\"CompanyId\", t1.\"CreatedBy\", t1.\"CreatedDate\", t1.\"LastUpdatedBy\", t1.\"LastUpdatedDate\", t1.\"TimeZone\", t1.\"AutoLock_IsEnable\", t1.\"AutoLock_LastCheckToTriggerLockTimeSheetCycle\", t1.\"AutoLock_LockTime\", t1.\"AutoLock_SendAfterDays\", t1.\"CycleSetting_EndDay\", t1.\"CycleSetting_IsLastDay\", t1.\"CycleSetting_NumberOfDisplay\", t1.\"CycleSetting_StartDay\", t1.\"Notification_LockNotification\", t1.\"Notification_UnLockNotification\"\nFROM (\n    SELECT o.\"Id\", o.\"HasInactiveParent\", o.\"HierarchyPath\", o.\"Name\", o.\"OrganizationStatus\", o.\"ParentOrganizationalUnitId\", o.\"RootId\"\n    FROM (\n        SELECT NULL AS empty\n    ) AS e\n    LEFT JOIN \"OrganizationalUnit\" AS o ON TRUE\n    WHERE (o.\"Id\" = o.\"RootId\" OR ((o.\"Id\" IS NULL) AND (o.\"RootId\" IS NULL))) AND NOT (EXISTS (\n        SELECT 1\n        FROM \"TimeSheetCycle\" AS t\n        WHERE (o.\"Id\" IS NOT NULL) AND o.\"Id\" = t.\"CompanyId\" AND t.\"EndDate\" >= $1 AND t.\"StartDate\" <= $1))\n    ORDER BY o.\"Id\"\n    LIMIT $2\n) AS t0\nLEFT JOIN \"TimeSheetSetting\" AS t1 ON t0.\"Id\" = t1.\"CompanyId\"\nORDER BY t0.\"Id\", t1.\"Id\" total"
                ],
                "prefix": "All except:",
                "readOnly": true
              }
            },
            "properties": [
              {
                "id": "custom.hideFrom",
                "value": {
                  "legend": false,
                  "tooltip": false,
                  "viz": true
                }
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 10,
        "w": 9,
        "x": 0,
        "y": 12
      },
      "id": 12,
      "options": {
        "displayLabels": [
          "value"
        ],
        "legend": {
          "displayMode": "list",
          "placement": "right",
          "showLegend": false,
          "values": []
        },
        "pieType": "donut",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "/^total$/",
          "values": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "select       round(total_time::numeric, 2) as total,\n             calls,\n             round(mean_time::numeric, 2) as mean,\n             stddev_time,\n             query_sql_text as query\nfrom query_store.qs_view\nwhere (now() - start_time) <= interval '7 days'\nand query_sql_text not ilike '%query_store%'\norder by total_time DESC\nlimit 10;",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Top 10 most of time in total queries last 7 days",
      "transformations": [],
      "transparent": true,
      "type": "piechart"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Chart will show the top 10 of slowest queries last 7 days",
      "fieldConfig": {
        "defaults": {
          "custom": {
            "align": "auto",
            "displayMode": "auto",
            "filterable": true,
            "inspect": true
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 10,
        "w": 15,
        "x": 9,
        "y": 12
      },
      "id": 17,
      "options": {
        "footer": {
          "enablePagination": false,
          "fields": "",
          "reducer": [
            "sum"
          ],
          "show": false
        },
        "showHeader": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "select db_id as database_id, pd.datname, CASE\n           WHEN query_sql_text ILIKE 'SELECT%' OR query_sql_text ILIKE '%\\n%SELECT%' THEN 'SELECT'\n           WHEN query_sql_text ILIKE 'INSERT%' OR query_sql_text ILIKE '%\\n%INSERT%' THEN 'INSERT'\n           WHEN query_sql_text ILIKE 'UPDATE%' OR query_sql_text ILIKE '%\\n%UPDATE%' THEN 'UPDATE'\n           WHEN query_sql_text ILIKE 'DELETE%' OR query_sql_text ILIKE '%\\n%DELETE%' THEN 'DELETE'\n           ELSE 'OTHER'\n       END AS query_type, query_sql_text, calls, (total_time/calls)::integer AS avg_time_ms\nfrom query_store.qs_view, pg_database as pd\nwhere db_id = pd.oid and calls > 1000 and query_sql_text not ILIKE '%query_store%'\nand (now() - start_time) <= interval '7 days'\nORDER BY avg_time_ms DESC\nLIMIT 10;",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "The 10 slowest queries with over a 1000 calls last 7 days",
      "transparent": true,
      "type": "table"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Amounts of queries with running longer than 5 minutes last 7 days",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 9,
        "x": 0,
        "y": 22
      },
      "id": 27,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT count(*)\nFROM pg_stat_activity\nWHERE (now() - pg_stat_activity.query_start) > interval '5 seconds' \nAND (now() - pg_stat_activity.query_start) <= interval '7 days'\nAND datname NOT ILIKE 'azure_sys';",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Total queries running longer than 5 sec last 7 days",
      "transparent": true,
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "This chart tell us about what queries is running longer than 5 sec on all database.\n\n#### Please use the *query_type* filter on head of table for get type of queries you want.",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-GrYlRd"
          },
          "custom": {
            "align": "auto",
            "displayMode": "auto",
            "filterable": true,
            "inspect": true
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 15,
        "x": 9,
        "y": 22
      },
      "id": 14,
      "options": {
        "footer": {
          "enablePagination": false,
          "fields": "",
          "reducer": [
            "sum"
          ],
          "show": false
        },
        "showHeader": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT\n  pid,\n  datname as database,\n  user,\n       CASE\n           WHEN query ILIKE 'SELECT%' OR query ILIKE '%\\n%SELECT%' THEN 'SELECT'\n           WHEN query ILIKE 'INSERT%' OR query ILIKE '%\\n%INSERT%' THEN 'INSERT'\n           WHEN query ILIKE 'UPDATE%' OR query ILIKE '%\\n%UPDATE%' THEN 'UPDATE'\n           WHEN query ILIKE 'DELETE%' OR query ILIKE '%\\n%DELETE%' THEN 'DELETE'\n           ELSE 'OTHER'\n       END AS query_type,\n  pg_stat_activity.query_start,\n  now() - pg_stat_activity.query_start AS query_time,\n  query,\n  state,\n  wait_event_type,\n  wait_event\nFROM pg_stat_activity\nWHERE (now() - pg_stat_activity.query_start) > interval '5 seconds' \nAND (now() - pg_stat_activity.query_start) <= interval '7 days'\nAND datname NOT ILIKE 'azure_sys';",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Detail queries running longer than 5 sec on last 7 days",
      "transparent": true,
      "type": "table"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 31
      },
      "id": 6,
      "panels": [],
      "title": "Live Queries",
      "type": "row"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Querying to Check PostgreSQL Open Connections .You need to consider about:\n\n**backend_type** - *Type of current backend*. Possible types are: \n\n“Client backend\" is basically your normal connection from application. All other connections are special processes that “do stuff\":\n\n- archiver – runs archive_command (or it's equivalent in newer pgs)\n- autovacuum launcher – starts autovacuum workers when it's necessary to vacuum/analyze something\n- background writer – writes data to tables/indexes in the background\n- checkpointer handles checkpoints – basically every now and then writing all modified data to table/index files\n- logical replication launcher – manages processes related to logical replication\n- walwriter – writes changes in data to WAL\n\nAside from these you can also see:\n\n- autovacuum worker – actually does some vacuum/analyze work for autovacuum\n- logical replication worker – works on logical replication\n- parallel worker – special backend started by client backend where query is being processes in parallel\n- startup – applies WAL from somewhere, this is the process that is responsible for recovery and streaming/wal replication\n- walreceiver – receives wal stream from source in streaming replication setups\n- walsender – sends wal via stream to some replica\n\nYou can also see some other types if you use specialized extensions.\n\n*For more detail go to this [link](https://www.depesz.com/2022/07/05/understanding-pg_stat_activity/#:~:text=Last%20column%20is%20backend_type)*\n",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [
            {
              "options": {
                "": {
                  "color": "super-light-yellow",
                  "index": 0
                }
              },
              "type": "value"
            }
          ],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "none"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 7,
        "x": 0,
        "y": 32
      },
      "id": 8,
      "options": {
        "displayMode": "gradient",
        "minVizHeight": 10,
        "minVizWidth": 0,
        "orientation": "horizontal",
        "reduceOptions": {
          "calcs": [],
          "fields": "/^connections$/",
          "values": true
        },
        "showUnfilled": true,
        "text": {}
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT\n  COUNT(*) as connections,\n  backend_type\nFROM\n  pg_stat_activity\nGROUP BY\n  backend_type\nORDER BY\n  connections DESC",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Open Connections",
      "transformations": [],
      "transparent": true,
      "type": "bargauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 5,
        "x": 7,
        "y": 32
      },
      "id": 23,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT count(*)\n    FROM pg_stat_activity\n    WHERE query NOT ILIKE '%pg_stat_activity%' and datname NOT ILIKE '%azure_sys%' and application_name != '';",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Total processes of DB",
      "transparent": true,
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "This chart tell about the what active is current running. \nSome of information need to consider:\n\n**State** - *Current overall state of this backend*. Possible values are\n\n- active: The backend is executing a query.\n- idle: The backend is waiting for a new client command.\n- idle in transaction: The backend is in a transaction, but is not currently executing a query.\n- idle in transaction (aborted): This state is similar to idle in transaction, except one of the statements in the transaction caused an error.\n- fastpath function call: The backend is executing a fast-path function.\n- disabled: This state is reported if track_activities is disabled in this backend.\n\n*For more detail go to this [link](https://www.postgresql.org/docs/current/monitoring-stats.html#:~:text=Table%C2%A028.13.-,state,-text)*\n\n**Database** - 'some special db you have seen in table chart'\n- *postgres* - A default database you can connect to once your server is created.\n- *azure_maintenance* - This database is used to separate the processes that provide the managed service from user actions. You do not have access to this database.\n- *azure_sys* - A database for the Query Store. This database does not accumulate data when Query Store is off; this is the default setting. For more information, see the [Query Store overview](https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/postgresql/single-server/concepts-query-store.md).",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "custom": {
            "align": "auto",
            "displayMode": "auto",
            "filterable": true,
            "inspect": true,
            "minWidth": 50
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 32
      },
      "id": 10,
      "options": {
        "footer": {
          "enablePagination": true,
          "fields": "",
          "reducer": [
            "sum"
          ],
          "show": false
        },
        "showHeader": true,
        "sortBy": []
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT datname as Database, pid, application_name, state, query, backend_type\n    FROM pg_stat_activity\n    WHERE query NOT ILIKE '%pg_stat_activity%' and datname NOT ILIKE '%azure_sys%' and application_name != '';",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Process in currently of DB",
      "transparent": true,
      "type": "table"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Current infomation about state of process in DB",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "fillOpacity": 67,
            "gradientMode": "hue",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineWidth": 4,
            "scaleDistribution": {
              "type": "linear"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "short"
        },
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "count"
            },
            "properties": [
              {
                "id": "color",
                "value": {
                  "fixedColor": "blue",
                  "mode": "fixed"
                }
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 7,
        "w": 7,
        "x": 4,
        "y": 41
      },
      "id": 37,
      "options": {
        "barRadius": 0.25,
        "barWidth": 0.06,
        "groupWidth": 0.7,
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "orientation": "auto",
        "showValue": "never",
        "stacking": "none",
        "tooltip": {
          "mode": "single",
          "sort": "none"
        },
        "xField": "state",
        "xTickLabelRotation": 0,
        "xTickLabelSpacing": 100
      },
      "pluginVersion": "9.7.1",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT state, COUNT(*) FROM pg_stat_activity  \nWHERE pid <> pg_backend_pid() AND query NOT ILIKE '%pg_stat_activity%' and datname NOT ILIKE '%azure_sys%' and application_name != ''\nGROUP BY 1;",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "State of process in DB",
      "transparent": true,
      "type": "barchart"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Currently about the number of application_name in DB. Some situation about the chart:\n- If it not exist `application_name`. The `count` column will represent for it.\n- The chart will focus visuallize the `application_name` connect what database in `currently` process.",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlPu"
          },
          "mappings": [],
          "noValue": "Unknown",
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 7,
        "w": 9,
        "x": 12,
        "y": 41
      },
      "id": 39,
      "options": {
        "displayMode": "gradient",
        "minVizHeight": 10,
        "minVizWidth": 0,
        "orientation": "horizontal",
        "reduceOptions": {
          "calcs": [],
          "fields": "",
          "values": true
        },
        "showUnfilled": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT application_name, COUNT(*) FROM pg_stat_activity  \nWHERE pid <> pg_backend_pid() and query NOT ILIKE '%pg_stat_activity%' and datname NOT ILIKE '%azure_sys%' and application_name != ''\nGROUP BY 1 ORDER BY 1;",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Application_name on process in DB",
      "transparent": true,
      "type": "bargauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Number of connection have blocking by lock",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 8,
        "x": 0,
        "y": 48
      },
      "id": 35,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT count(distinct pid) FROM pg_locks WHERE granted = false;",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Connections waiting for a lock",
      "transparent": true,
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Lots of long-running queries can cause your database to be slow or non-responsive.",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 8,
        "x": 8,
        "y": 48
      },
      "id": 19,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT count(*) \nFROM pg_stat_activity \nWHERE state != 'idle' \nAND query_start < (NOW() - INTERVAL '60 seconds');",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Totals queries have been running for longer than a minute",
      "transparent": true,
      "type": "gauge"
    },
    {
      "datasource": {
        "type": "postgres",
        "uid": "${DS_POSTGRESQL}"
      },
      "description": "Too many write queries to the same (especially large) table can cause lock-contention.",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "continuous-BlYlRd"
          },
          "mappings": [],
          "thresholds": {
            "mode": "percentage",
            "steps": [
              {
                "color": "green"
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 8,
        "x": 16,
        "y": 48
      },
      "id": 21,
      "options": {
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "showThresholdLabels": false,
        "showThresholdMarkers": true
      },
      "pluginVersion": "9.1.7",
      "targets": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "format": "table",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": "SELECT count(*)  FROM pg_stat_activity\nWHERE state != 'idle'\nAND query NOT ILIKE '%SELECT%'\nAND query ILIKE '%some_big_table%'\nAND query NOT ILIKE '%pg_stat_activity%';",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "value"
                ],
                "type": "column"
              }
            ]
          ],
          "timeColumn": "time",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Total queries are currently writing to the same table",
      "transparent": true,
      "type": "gauge"
    },
    {
      "collapsed": true,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 56
      },
      "id": 43,
      "panels": [
        {
          "datasource": {
            "type": "postgres",
            "uid": "${DS_POSTGRESQL}"
          },
          "description": "Choose the ID in search box variable for get the query",
          "fieldConfig": {
            "defaults": {
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "inspect": false
              },
              "mappings": [],
              "thresholds": {
                "mode": "absolute",
                "steps": [
                  {
                    "color": "green"
                  },
                  {
                    "color": "red",
                    "value": 80
                  }
                ]
              }
            },
            "overrides": []
          },
          "gridPos": {
            "h": 9,
            "w": 24,
            "x": 0,
            "y": 56
          },
          "id": 41,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "9.7.1",
          "targets": [
            {
              "datasource": {
                "type": "postgres",
                "uid": "${DS_POSTGRESQL}"
              },
              "format": "table",
              "group": [],
              "metricColumn": "none",
              "rawQuery": true,
              "rawSql": "SELECT query_sql_text FROM query_store.query_texts_view WHERE query_text_id='$query_current_id';\n",
              "refId": "A",
              "select": [
                [
                  {
                    "params": [
                      "value"
                    ],
                    "type": "column"
                  }
                ]
              ],
              "timeColumn": "time",
              "where": [
                {
                  "name": "$__timeFilter",
                  "params": [],
                  "type": "macro"
                }
              ]
            }
          ],
          "title": "Get query from ID",
          "transparent": true,
          "type": "table"
        }
      ],
      "title": "Querry Searching",
      "type": "row"
    }
  ],
  "refresh": "1m",
  "schemaVersion": 37,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": [
      {
        "current": {
          "selected": false,
          "text": "",
          "value": ""
        },
        "description": "ID for select what query text",
        "hide": 0,
        "label": "Query ID",
        "name": "query_current_id",
        "options": [
          {
            "selected": true,
            "text": "",
            "value": ""
          }
        ],
        "query": "",
        "skipUrlSync": false,
        "type": "textbox"
      }
    ]
  },
  "time": {
    "from": "now-5m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "Azure PostgreSQL Queries",
  "uid": "arCsn36Vk",
  "version": 14,
  "weekStart": ""
}
```