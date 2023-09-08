/* On supprime notre base pour chaque test, afin de recommoncer à zero */
drop database IF EXISTS db_country_test;

/* On recrée la base */
create database IF NOT EXISTS db_country_test;

/* Créer l'utilisateur API */
create user IF NOT EXISTS 'api-test'@'%.%.%.%' identified by 'testpassword';
grant select, update, insert, delete on db_country_test.* to 'api-test'@'%.%.%.%';
flush privileges;