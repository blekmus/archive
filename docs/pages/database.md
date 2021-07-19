## Setup

Install MariaDB and run the initial setup script[^1]

``` bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```

## Usual Process

Create db and give the `<username>` user access to the `<db-name>` db[^1].

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

## Useful Commands

### Deleting

``` sql
-- drop user
DROP USER '<user-name>'@localhost;

-- drop database
DROP DATABASE <db-name>
```

### Checking

``` sql
-- display users
SELECT User FROM mysql.user;

-- display privileges
SHOW GRANTS FOR '<username>'@localhost;

-- display databases
SHOW DATABASES;

-- display columns of table
DESC db.table;
SHOW COLUMNS FROM db.table;
```

### Displaying

``` sql
-- display vertically
SHOW DATABASES \G;
SELECT col FROM db \G;
```

### Altering

``` sql
-- alter column type
-- doesn't replace unless type incompatible
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


[^1]: https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04