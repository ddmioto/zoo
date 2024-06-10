PGUSER=ddmioto
DBNAME=zoboo
DUMPFILE=./dump_file.backup

all: create-db restore-db run-spring

create-db:
	psql -h localhost -U $(PGUSER) -d postgres -c "CREATE DATABASE $(DBNAME);"

restore-db:
	pg_restore -U $(PGUSER) -d $(DBNAME) -v $(DUMPFILE)

run-spring:
	cd back && mvn spring-boot:run

.PHONY: create-db restore-db run-spring all
