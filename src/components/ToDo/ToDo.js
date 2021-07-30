import { Link, useHistory } from "react-router-dom"

export default function ToDo({ getToDos, toDo }) {

    const history = useHistory()

    const _handleDelete = async e => {
        const DELETE_TODO_ENDPOINT = `http://localhost:8000/todos/${toDo.id}`
        try {
            const response = await fetch(DELETE_TODO_ENDPOINT, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 204) {
                getToDos()
            }
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h2>{toDo.title}</h2>
            <Link to={`/todos/${toDo.id}`} >Update</Link>
            <button onClick={_handleDelete}>Delete</button>
        </div>
    )
}
