#!/bin/bash
psql -U $POSTGRESQL_USERNAME -c 'SELECT pg_wal_replay_pause();'
DBLIST=$(psql -p 5432 -U $POSTGRESQL_USERNAME -d $POSTGRESQL_DATABASE -q -t -c 'SELECT datname FROM pg_database WHERE datistemplate = false;')

for d in $DBLIST
do
    echo "db = $d"
    pg_dump -U $POSTGRESQL_USERNAME -Fc $d > "/backups/$(date "+%Y-%m-%d")/$d.dump"
done

psql -U $POSTGRESQL_USERNAME -c 'SELECT pg_wal_replay_resume();'
