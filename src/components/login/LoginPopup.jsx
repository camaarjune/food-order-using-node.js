import { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const onChangeHandle = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const handleAuth = async (event) => {
    event.preventDefault()
    const { name, email, password } = data

    if (!email) {
      setError("Please enter your email")
      return
    }
    if (!password) {
      setError("Please enter a password")
      return
    }
    if (currState === "Sign Up" && !name) {
      setError("Please enter your name")
      return
    }

    setError("")

    try {
      let response
      if (currState === "Login") {
        response = await axios.post("http://localhost:1000/user/login", {
          email,
          password
        })
      } else {
        response = await axios.post("http://localhost:1000/user/ccount", {
          name,
          email,
          password
        })
      }

      if (response.data.error) {
        alert(response.data.message || "An error occurred")
      } else {
        alert(`${currState} successful.`)
        localStorage.setItem("user", JSON.stringify(response.data))
        setShowLogin(false)
      }
    } catch (error) {
      console.error("Error during authentication:", error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={handleAuth} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && <input name='name' onChange={onChangeHandle} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandle} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandle} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit' className='login-popup-button'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-popup-footer">
          {currState === "Login"
            ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>click here</span></p>
            : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
