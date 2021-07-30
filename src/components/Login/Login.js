import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

export default function Login( { _handleSetLogIn }) {

    const TOKEN_LOGIN_ENDPOINT = 'http://localhost:8000/token/login'

	const initialFormData = {
		email: '',
        password: ''
	};
	const history = useHistory();
	const [formData, setFormData] = useState(initialFormData);

	const _handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};

    const _handleLogin = async e => {
        e.preventDefault()
        console.log('you submitted a form')
        try {
            const response = await fetch(TOKEN_LOGIN_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                const token = await response.json()
                console.log(token)
                _handleSetLogIn(token.auth_token)
                history.push('/')
            } else {
                alert('invalid credentials')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={_handleLogin}>
            <label htmlFor="email"></label>
            <input 
                type="email" 
                id="email" 
                value={formData.email}
                required 
                autoFocus 
                onChange={_handleChange}
            />
            <label htmlFor="password"></label>
            <input 
                type="password" 
                id="password" 
                value={formData.password}
                required
                onChange={_handleChange}
            />
            <input type="submit" value="Login" />
            <Link to='/signup'>Sign Up</Link>
        </form>
    )
}