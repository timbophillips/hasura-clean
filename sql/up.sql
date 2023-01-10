SET
    check_function_bodies = false;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now(),
    role text DEFAULT 'user' :: text NOT NULL,
    password text DEFAULT 'cGFzc3dvcmQ=' :: text,
    roles text [],
    "group" text DEFAULT '' :: text
);

ALTER TABLE
    ONLY public.users
ADD
    CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE
    ONLY public.users
ADD
    CONSTRAINT users_username_key UNIQUE (username);

DROP TABLE IF EXISTS public.refresh_tokens;

CREATE TABLE public.refresh_tokens (
    token text NOT NULL,
    "user" integer NOT NULL,
    expires timestamp with time zone NOT NULL,
    ip text NOT NULL
);

ALTER TABLE
    ONLY public.refresh_tokens
ADD
    CONSTRAINT refresh_tokens_pkey PRIMARY KEY (token);

