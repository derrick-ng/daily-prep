"use client"

import { FormEvent } from 'react'
import axios from 'axios'

const LoginForm = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }

    try {
      const response = await axios.post("../../api/auth/login", data)
      
      console.log("login response: ", response)
      //get token, create cookies??(dont want to login every time)

    } catch (error) {
      console.error("login error: ", error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" name='username'/>
        <br />

        <label htmlFor="password">password</label>
        <input type="password" name='password'/>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm