
/* La définition du schéma */
-- use db_country;

/* COUNTRY */
create table if not exists COUNTRY (
  id int auto_increment not null,
  name varchar(256) unique not null, 
  capital varchar(256) not null, 
  size int not null,
  population int not null, 
  primary key(id)
);