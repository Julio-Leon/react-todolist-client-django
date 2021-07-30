import { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { Alert } from 'react-bootstrap'

export default function SignUp() {

    const CREATE_USER_ENDPOINT = 'http://localhost:8000/users/'

    const initialFormData = {
        email: '',
        username: '',
		password: '',
		re_password: '',
    }

    const history = useHistory()
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(false);
    const [errorStr, setErrorStr] = useState(false)
    const [success, setSuccess] = useState(false);

    const _handleChange = e => {
        setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
    }

    const _handlePasswordMatch = (event) => {
		if (formData.password !== formData.re_password) {
			setError(true);
		} else {
			setError(false);
		}
	};

    const _handleSignUp = async e => {
        e.preventDefault();
        try {
            const response = await fetch(CREATE_USER_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 201) {
                setSuccess(true)
                setTimeout(() => {
                    history.push('/login')
                }, 3000)
            } else {
                const data = await response.json()
                setErrorStr(data.password[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={_handleSignUp}>
            <label htmlFor="username"></label>
            <input 
                type="text" 
                id="username" 
                value={formData.username}
                required 
                autoFocus 
                onChange={_handleChange}
            />
            <label htmlFor="email"></label>
            <input 
                type="email" 
                id="email" 
                value={formData.email}
                required 
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
            <label htmlFor="re_password"></label>
            <input 
                type="password" 
                id="re_password" 
                value={formData.re_password}
                required
                onChange={_handleChange}
                onBlur={_handlePasswordMatch}
            />
            <input type="submit" value="Sign Up" />
            {error && <Alert variant='danger'>Passwords must match!</Alert>}
                {errorStr && <Alert variant='danger'>{errorStr}</Alert>}
				{success && (
					<Alert variant='success'>
						User successfully created! You will be redirected to log in. If you
						are not automatically redirected, please click{' '}
						{<Link to='login'>here</Link>}.
					</Alert>
				)}
        </form>
    )
}