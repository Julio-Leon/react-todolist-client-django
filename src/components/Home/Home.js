import { useEffect } from "react"

import ToDoList from '../ToDoList/ToDoList'

export default function Home({ getUserInfo, userInfo, setUserInfo }) {

    const TODOS_ENDPOINT = 'http://localhost:8000/todos'

    const getToDos = async () => {    
        try {
            const response = await fetch(TODOS_ENDPOINT)
            const data = await response.json()
            
            const userToDos = data.filter(toDo => toDo.owner === userInfo.username)

            setUserInfo({...userInfo, userToDos})
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getToDos()
    }, [])

    console.log(userInfo)

    return (
        <div className='home'>
            {
                userInfo.userToDos ? <ToDoList getToDos={getToDos} userInfo={userInfo} /> : <h1>Searching...</h1>
            }
        </div>
    )
}