//dotenv setup
import dotenv from "dotenv"
dotenv.config()

//pg setup
import pg from "pg"
export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

//create table for users
db.query(`CREATE TABLE IF NOT EXISTS gust (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    feedback VARCHAR(255)
)`)

//insert data to users table
db.query(`INSERT INTO gust (name, feedback)
VALUES
('Tom', 'I like the service'),
('Mike', 'clean rooms'),
('Jhon', 'will visit again soon')
`)
