import { Link } from 'react-router-dom'

import ToDo from "../ToDo/ToDo";

export default function ToDoList({ getToDos, userInfo }) {
    return (
        <div>
            <h1>{userInfo.username}'s To Dos</h1>
            <div>
                {   
                    userInfo.userToDos.map(toDo => {
                        return <ToDo key={toDo.id} getToDos={getToDos} toDo={toDo} />
                    })
                }
            </div>
            <Link to='/create-todo'>Add</Link>
        </div>
    )
}