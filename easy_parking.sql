CREATE TABLE "Users" ( 
  "id" serial NOT NULL,
  "first_name" VARCHAR(255) NOT NULL, 
  "last_name" VARCHAR(255) NOT NULL, 
  "email" VARCHAR(255) NOT NULL, 
  "password" VARCHAR(255) NOT NULL, 
  "id_role" integer NOT NULL, 
  CONSTRAINT "Users_pk" PRIMARY KEY ("id") 
  ) WITH (
  OIDS=FALSE 
);

CREATE TABLE "Roles" (
  "id" serial NOT NULL, 
  "name" VARCHAR(255) NOT NULL, 
  "description" VARCHAR(255) NOT NULL, 
  CONSTRAINT "Roles_pk" PRIMARY KEY ("id") 
  ) WITH (
  OIDS=FALSE 
);

CREATE TABLE "ParkingSpace" (
  "id" serial NOT NULL, 
  "status" VARCHAR(255) NOT NULL, 
  "id_user" integer, 
  "expired_time" TIMESTAMP NOT NULL, 
  "locationid" integer NOT NULL, 
  CONSTRAINT "ParkingSpace_pk" PRIMARY KEY ("id") 
  ) WITH ( 
  OIDS=FALSE 
);

CREATE TABLE "Locations" ( 
  "id" integer NOT NULL 
  ) WITH (
  OIDS=FALSE 
);

ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("id_role") REFERENCES "Roles"("id");

ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_fk0" FOREIGN KEY ("id_user") REFERENCES "Users"("id");

