import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp';
import CreateToDoForm from './components/CreateToDoForm/CreateToDoForm';
import UpdateToDoForm from './components/UpdateToDoFrom/UpdateToDoForm';

import './App.css';

function App() {

  const history = useHistory()

  const TOKEN_LOGOUT_ENDPOINT = 'http://localhost:8000/token/logout'
  const TOKEN_ME_ENDPOINT = 'http://localhost:8000/users/me'

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)

  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    try {
      const response = await fetch(TOKEN_ME_ENDPOINT, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setUserInfo(data)
    } catch (error) {
      console.error(error)
    }
  }

  const _handleLogOut = async e => {
    // send post to /token/logout
    try {
        const response = await fetch(TOKEN_LOGOUT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 204) {
            localStorage.removeItem('token')
            setLoggedIn(false)
            setUserInfo(null)
        }
    } catch (error) {
        console.error(error)
    }
  }

  const _handleSetLogIn = (authToken) => {
    setLoggedIn(true)
    localStorage.setItem('token', authToken)
  }

  useEffect(() => {
    console.log('LOGGED IN:', loggedIn)
		if (loggedIn) {
			getUserInfo();
		} else {
      history.push('/login')
    }
	}, [loggedIn, history]);

  return (
    <div className="app flex-container">
      <Switch>
        <Route path='/todos/:id' component={UpdateToDoForm} />
        <Route path='/create-todo' render={() => <CreateToDoForm />} />
        <Route path='/signup' render={() => <SignUp />} />
        <Route path='/login' render={() => <Login _handleSetLogIn={_handleSetLogIn} />} />
        <Route path='/' >
          {
            userInfo && <Home userInfo={userInfo} setUserInfo={setUserInfo} />
          } 
        </Route>
      </Switch>
      {
        loggedIn && <button onClick={_handleLogOut} >Sign Out</button>
      }
    </div>
  );
}

export default App;
