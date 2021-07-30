import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function CreateToDoForm() {

    const CREATE_TODO_ENDPOINT = 'http://localhost:8000/todos/'

    const initialFormData = {
        title: ''
    }

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
            const response = await fetch(CREATE_TODO_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 201) {
                setFormData(initialFormData)
                alert('To Do Created!')
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
            <input type="submit" value="Add" />
        </form>
    )
}