import {useState} from "react";
import {useSignup} from "../hooks/useSignup";

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, loading, error} = useSignup()

    const SubmitHandler = async (e) => {
        e.preventDefault()

        console.log(username, email, password, 'dis')
        await signup(username, email, password)
    }

    return(
        <form className="signup" onSubmit={SubmitHandler}>
            <h3>Sign up</h3>

            <label>Username: </label>
            <input
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Email: </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={loading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup
