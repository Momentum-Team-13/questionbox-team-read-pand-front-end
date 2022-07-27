import axios from 'axios'
import { useState } from 'react'

export const Login = ({setAuth, token }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)
    axios
      .post('https://drf-library-api.herokuapp.com/api/auth/token/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.auth_token
        setAuth(username, token)
      })
  }
  return (
    <>  <div className="wrap">
     <h2>Log In</h2>
     {error && <div className="error">{error}</div>}
     <form id="login-form" onSubmit={handleSubmit}>
       <div className="controls">
       <label htmlFor="username-field">username: </label>
       <input
            id="username-field"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
       </div>
       <div className="controls">
       <label htmlFor="password-field">password: </label>
          <input
            id="password-field"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
       </div>
       <div className="form-submit">
          <input type="submit" value="Log In" className="button" />
        </div>
     </form>
    </div>
    </>
  

  );
}


  
  
export default Login
  