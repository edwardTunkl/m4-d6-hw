import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (asin) => {

    // state = {
    //     comments: [], // comments will go here
    //     isLoading: false,
    //     isError: false
    // }
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        const fetchFunction = async (prevProps) => {
            if (prevProps.asin !== asin) {
                setIsLoading(true)
                }
                try {
                    let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                        headers: {
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjViYjJkNTI2MjAwMTViNmRjOTMiLCJpYXQiOjE2MjkyODc4NjcsImV4cCI6MTYzMDQ5NzQ2N30.HkhDkrIcH7q04AsuHParGAbLEKxc3bvsAnjh3DGfZIE"
                        }
                    })
                    console.log(response)
                    if (response.ok) {
                        let comments = await response.json()
                       setComments(comments)
                       setIsLoading(false)
                       setIsError(false)
                    } else {
                        console.log('error')
                        setIsLoading(false)
                        setIsError(true)
                    }
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                    setIsError(true)
                }
            }
        fetchFunction()
            
        },[asin]) 

        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
}
export default CommentArea