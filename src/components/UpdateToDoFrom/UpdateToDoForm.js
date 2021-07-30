import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function UpdateToDoForm(props) {
    
    const TODO_ENDPOINT = `http://localhost:8000/todos/${props.match.params.id}`

    const initialFormData = {
        title: ''
    }

    const getToDo = async () => {
        try {
            const response = await fetch(TODO_ENDPOINT)
            const data = await response.json()
            console.log(data)
            initialFormData.title = data.title
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getToDo()
    }, [])

    const history = useHistory()
    const [formData, setFormData] = useState(initialFormData)

    const _handleChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

    const _handleCreateToDo = async e => {
        e.preventDefault()
        try {
            const response = await fetch(TODO_ENDPOINT, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                alert('To Do Updated!')
                history.push('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={_handleCreateToDo}>
            <label htmlFor="title"></label>
            <input 
                type="text" 
                id="title" 
                value={formData.title}
                autoFocus
                required
                onChange={_handleChange}
            />
            <input type="submit" value="Update" />
        </form>
    )
}