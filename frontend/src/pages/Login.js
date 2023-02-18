import {useState} from "react";
import {useLogin} from "../hooks/useLogin";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, loading, error} = useLogin()

    const SubmitHandler = async (e) => {
        e.preventDefault()

        console.log(username, password)
        await login(username, password)
    }

    return(
        <form className="login" onSubmit={SubmitHandler}>
            <h3>Log in</h3>

            <label>Email or username: </label>
            <input
                type="Email or Username: "
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={loading}>Log in</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default Login
