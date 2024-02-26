import  express, { request, response }  from "express";
import cors from 'cors'
import dotenv from "dotenv"
import pg from "pg"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

const PORT= "3369"
app.listen(PORT, () => {
    console.log(`server is running on : ${PORT}`)
})

app.get("/", (request, response) => {
    response.send("online!!")
})

// get gusts data
app.get("/gust", async(request, response) => {
    const result = await db.query("SELECT * FROM gust")
    response.json(result.rows)
})

//post new feedback
app.post("/gust", async (request,response) => {
    try {
        const {name, feedback} = request.body
        const newUser = await db.query("INSERT INTO gust (name, feedback) VALUES($1, $2) RETURNING *", [name, feedback]) 
        
        response.status(200).json(newUser.rows[0])
    } catch (err) {
        response.status(400).json({error: err.message})
    }
})

//delete gust table
app.delete("/gust/:id", async (request, response) => {
    try{
        const id = request.params.id
        const deleteFeedback = await db.query("DELETE FROM gust WHERE id = $1 RETURNING *", [id])
        response.status(200).json({recordDeleted: deleteFeedback.rows[0]})
    
    } catch(err) {
        response.status(500).json({error: err.message})
    }
})