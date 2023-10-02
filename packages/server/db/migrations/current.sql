drop schema if exists public cascade;
create schema public;

-- Add migrations here
create table things (
	id uuid primary key default gen_random_uuid(),
	name text not null
);

