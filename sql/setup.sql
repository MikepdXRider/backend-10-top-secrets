-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users


CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
)


-- Notes table
-- note_id primary
-- user_id foreign
-- note_text


-- Users table
-- user_id primary
-- hash_password
-- user_email