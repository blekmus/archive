## Setup

Install MariaDB and run the initial setup script. Default port is `3306`.

``` bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```

## Useful Commands

### Creating

``` sql
-- create db
CREATE DATABASE <db-name>;

-- create user
CREATE USER '<username>'@localhost IDENTIFIED BY '<password>';

-- grant privileges
GRANT ALL PRIVILEGES ON <db-name>.* TO '<username>'@localhost;

-- save grant changes
FLUSH PRIVILEGES;
```

``` sql
-- select db
USE <db-name>;

-- create table
CREATE table <table-name> (
    id int NOT NULL AUTO_INCREMENT,
    first int NOT NULL,
    second varchar(191) NOT NULL,
    PRIMARY KEY (id)
);
```

### Deleting

``` sql
-- drop user
DROP USER '<user-name>'@localhost;

-- drop database
DROP DATABASE <db-name>;
```

### Displaying

``` sql
-- display users
SELECT User FROM mysql.user;

-- display databases
SHOW DATABASES;

-- display tables
USE <db-name>;
SHOW TABLES;
```

``` sql
-- display privileges of user
SHOW GRANTS FOR '<username>'@localhost;
```

``` sql
-- display table columns
DESC <db-name>.<table-name>;
SHOW COLUMNS FROM <db-name>.<table-name>;

-- display table columns of selected table
DESC <table-name>;
SHOW COLUMNS FROM <table-name>;
```

### Display Formats

``` sql
-- display vertically
SHOW DATABASES \G;
SELECT col FROM db \G;
```

### Altering

``` sql
-- alter column type
-- doesn't replace unless values in colums are compatible
use <db-name>;
alter table <tablename> modify column <columname> <typename>;
```

## Backing Up

There's two types of backups.

- Logical Backup
- Physical Backup

### Physical

This is basically copying the base sql directory after stopping sql.

### Logical

To backup;

``` bash
# scripts
mysqldump -u <username> -p"<pass>" <db-name> > /path/to/file.sql

# shell
mysqldump -u <username> -p <db-name> > /path/to/file.sql

# full db backup
mysqldump -u root -p --all-databases > ./mariadb.dump
```

!!! warning ""
    Try not to use the root user as much as possible. Except when making full db backups. Use a user who has deligated access to the database that is to be backed up.


To import;

``` bash
# first create db in mysql
# then import data to it

mysql <db-name> < /path/to/file.sql
```

## MongoDB

!!! error ""
    `pymongo.errors.ServerSelectionTimeoutError`

    If you get this, check if the current ip address is allowed in the dashboard.
    [Source](https://pythonexamples.org/pymongo-errors-serverselectiontimeouterror/)
