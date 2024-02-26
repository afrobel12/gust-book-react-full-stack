import { useState, useEffect } from "react";
import LikeBtn from "./LikeBtn";


export default function MainPage() {
    const [formData, setFormData] = 
    useState({
        name: '',
        feedback:''
    })
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsersDb()
    }, [])

    let usersDetails = users.map((input) => (
        
        <div key={input.id}>
            <h1>{input.name}</h1>
            <p>{input.feedback}</p>
            <button onClick={() => handleDelete(input.id)}>Delete</button>
            
        </div>
    ))


    function handleChange (e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })

    }
    async function getUsersDb() {
        let data = await fetch(`http://localhost:3369/gust` )
        let result = await data.json()
        setUsers(result)
    }
    async function handlSubmit(e) {
        e.preventDefault()
        let result = await fetch(`http://localhost:3369/gust` ,{
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (result.ok) {
       getUsersDb()
        }
    }
    async function handleDelete(id) {
        let result = await fetch (`http://localhost:3369/gust/${id}` ,{
            method: 'DELETE'
        })
         console.log(result)
         if (result.ok) {
            getUsersDb ()
         }
    }



    return(
        <div className="main-page">
            <form onSubmit={handlSubmit}>
                <h1>Gust Book</h1>
                <label >user name:</label>
                <input placeholder="enter your user name" name="name" type="text" onChange={handleChange} value={formData.name} />
                <label>Feedback:</label>
                <textarea className="feedback" placeholder=" type your feedback" name='feedback' type="text" onChange={handleChange} value={formData.feedback} />
                <button type="submit">submit</button>
             </form>
             <div className="new-container">
            {usersDetails }
            
           
        </div>
    
        </div>
    )
}
