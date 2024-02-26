import { useState } from "react"

export default function LikeBtn ()  {
    const [likeCount, setLikeCount] = useState(0)
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1)
    }
    return (
        <div className="like-btn">
        <button onClick={handleLikeClick}>👍</button>
        <span>{likeCount}</span>
        </div>
    )
   
}
