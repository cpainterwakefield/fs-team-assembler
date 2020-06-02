# cursed bash script to start up postgres, must be run as superuser
mkdir /run/postgresql
chown postgres /run/postgresql
su postgres
postgres -D /var/lib/postgresql/data
