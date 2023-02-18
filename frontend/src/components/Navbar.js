import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    console.log(user, 'navbar')

    const clickHandle = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Its the ISL</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.cred} </span>
                            <Link to="/fantasy">Fantasy Swimming</Link>
                            <button onClick={clickHandle}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
