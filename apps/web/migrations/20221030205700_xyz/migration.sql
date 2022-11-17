/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "prompt_nodes" ALTER COLUMN "chunks_range" SET DEFAULT ARRAY[0, 0]::SMALLINT[];

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification_token";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- alter workspaces to have a one to many relationship with flows and cascade on delete
alter table workspaces add column flow_id text references flows(id) on delete cascade;


-- make one to one relationship between flows and workspaces
alter table workspaces drop column flow_id;
alter table workspaces add column flow_id text references flows(id) on delete cascade unique;


-- create a type named gpt3_prompt_settings
create type gpt3_prompt_settings as (
  model gpt3_models,
  temperature numeric,
  max_tokens integer,
  top_p numeric,
  best_of smallint,
  frequency_penalty numeric,
  presence_penalty numeric,
  stops text[]
);

-- alter the prompt_nodes table to have a gpt3_prompt_settings column with default values in postgres sql
alter table prompt_nodes add column gpt3_prompt_settings gpt3_prompt_settings default ('davinci', 0.4, 500, 1, 1, 0, 0, ARRAY[]::text[]);



create or replace function public.handle_new_workspace() 
returns trigger as $$
begin
  insert into public.flows (workspace_id)
  values (new.id);
  insert into storage.buckets (id, name)
  -- cast new.id to string
  values (new.id::text, new.name);
  -- values (new.id, concat('workspace', new.id));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_workspaces_created
  after insert on public.workspaces
  for each row execute procedure public.handle_new_workspace();

  -- delete on_workspaces_created trigger
  drop trigger on_workspaces_created on public.workspaces; 


create policy "Restricted Access"
on storage.objects for select
using (
  bucket_id like 'workspaces-%'
  and auth.role() = 'authenticated'
);


-- create a chunks_range type of type {start: integer, end: integer} and set default value to {start: 0, end: 0}
create type chunks_range as (start integer, end integer);
alter table prompt_nodes alter column chunks_range set default (0, 0);

-- add OUTPUT to NodeTypes type
alter type node_type add value 'OUTPUT';

-- create key value type
create type key_value as (key text, value text);
-- set default value to empty array
alter table output_nodes alter column headers set default ARRAY[]::key_value[];

-- cascade delete edges on delete flow
alter table edges drop constraint edges_flow_id_fkey;

-- revert the previous action
alter table edges add constraint edges_flow_id_fkey foreign key (flow_id) references flows(id) on delete cascade;

-- add flow_id to edges table and make it a foreign key and delete on cascade
alter table edges add column flow_id bigint references flows(id) on delete cascade;