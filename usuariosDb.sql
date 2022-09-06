create database usuariosDb;

use usuariosDb;

create table usuarios(
id int unsigned auto_increment not null primary key,
nombre varchar(50) not null,
apellido varchar(50) not null,
mail varchar(80) not null
    );
