import { useState, useImperativeHandle, forwardRef } from "react"

const LoginForm = forwardRef(({
  handleLogin
}, ref) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password
    })
  }

  const clearForm = () => {
    setUsername("")
    setPassword("")
  }

  useImperativeHandle(ref, () => {
    return {
      clearForm
    }
  })

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            id="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            id="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
