-- Active: 1745157422028@@localhost@3336@nestjs_project@public
-- Active: 1745157422028@@localhost@3336@nestjs_project@public27689@@127.0.0.1@3306
select * from users

update users set username = 'admin', email = 'admin@gmail.com', password = 'admin', role = 'admin' where id = 1

update users set username = 'area_manager', email = 'area_manager@gmail.com', password = 'area_manager',
 role = 'area_manager' where id = 2

 select * from users

 SELECT * FROM migrations;

DROP Table users

DROP TYPE IF EXISTS "public"."users_role_enum";

DELETE FROM migrations;
