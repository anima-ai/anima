-- CreateEnum
CREATE TYPE "chunking_type" AS ENUM ('PATTERN', 'TOKENS');

-- CreateEnum
CREATE TYPE "gpt3_models" AS ENUM ('text-davinci-002', 'text-curie-001', 'text-babbage-001', 'text-ada-001', 'text-davinci-001', 'davinci-instruct-beta', 'davinci', 'curie-instruct-beta', 'curie', 'babbage', 'ada');

-- CreateEnum
CREATE TYPE "node_type" AS ENUM ('INPUT', 'PROMPT', 'COMMENT');

-- CreateTable
CREATE TABLE "flows" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_nodes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "label" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "result" TEXT NOT NULL DEFAULT '',
    "prompt_settings" JSON NOT NULL DEFAULT '{     "model": "text-davinci-002",     "temperature": 0,     "max_tokens": 500,     "top_p": 1,     "best_of": 1,     "frequency_penalty": 0,     "presence_penalty": 0,     "stop": [] }',
    "chunks_range" SMALLINT[] DEFAULT ARRAY[0, 0]::SMALLINT[],
    "position" DECIMAL[] DEFAULT ARRAY[0, 0]::DECIMAL[],
    "contents" JSON NOT NULL DEFAULT '{ "ops": [] }',
    "flow_id" BIGINT,

    CONSTRAINT "prompt_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_nodes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "chunk_size" SMALLINT NOT NULL DEFAULT 500,
    "chunk_overlap" SMALLINT NOT NULL DEFAULT 0,
    "chunk_pattern" TEXT NOT NULL DEFAULT '',
    "file" TEXT,
    "label" TEXT NOT NULL DEFAULT 'Input',
    "position" DECIMAL[] DEFAULT ARRAY[0, 0]::DECIMAL[],
    "chunking_type" "chunking_type" NOT NULL DEFAULT 'TOKENS',
    "flow_id" BIGINT,

    CONSTRAINT "input_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_nodes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "contents" JSON DEFAULT '{ "ops": [] }',
    "position" DECIMAL[] DEFAULT ARRAY[0, 0]::DECIMAL[],
    "flow_id" BIGINT,

    CONSTRAINT "comment_nodes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prompt_nodes" ADD CONSTRAINT "prompt_nodes_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "input_nodes" ADD CONSTRAINT "input_nodes_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment_nodes" ADD CONSTRAINT "comment_nodes_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


-- drop position column from prompt_nodes
ALTER TABLE "prompt_nodes" DROP COLUMN "position";