import axios from 'axios'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


export const NewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const navigateTo = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)
    axios
      .post('https://red-panda-question-box.herokuapp.com/api/auth/users/', {
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        navigateTo('/login')
      })
  }

  return (
    <>  <div className="wrap">
     <h2>Create an Account</h2>
     {error && <div className="error">{error}</div>}
     <form id="new-user-form" onSubmit={handleSubmit}>
     <div className="controls">
       <label htmlFor="email-field" className="userLabel">email:&nbsp;</label>
       <input
            id="email-field"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
       </div>
       <div className="controls">
       <label htmlFor="username-field" className="userLabel">username:&nbsp;&nbsp;</label>
       <input
            id="username-field"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
       </div>
       <div className="controls">
       <label htmlFor="password-field" className="userLabel">password:&nbsp;</label>
          <input
            id="password-field"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
       </div>
       <div className="form-submit">
          <input type="submit" value="Create Account" className="button" />
        </div>
     </form>
    </div>
    </>
  

  );
}


  
  
export default NewUser
  