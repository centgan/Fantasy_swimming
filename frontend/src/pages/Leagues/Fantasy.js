import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";

const Fantasy = () => {
    const {user} = useAuthContext();
    const [Swimmer, setSwimmer] = useState(null);
    const [League, setLeague] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch_data() {
            const response_league = await fetch('/api/league/get', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json_league = await response_league.json()

            if (response_league.ok) {
                setLeague(json_league)
            }
        }
        if (user) {
            fetch_data();
        }
    }, [user])

    const buttonHandler = id => () => {
        localStorage.setItem("league", id);
        navigate("/fantasy/draft");
    }

    return (
        <div>
            <Link to="/fantasy/create">Create a league</Link>
            <br />
            <Link to="/fantasy/join">Join a league</Link>
            <br/>
            {/*<Link to="/fantasy/draft">Draft your team</Link>*/}
            {/*<br/>*/}

            {/*<div>*/}
            {/*    {Swimmer && Swimmer.map((item) => (*/}
            {/*        <p key={item._id}>{item.name}</p>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div>
                {League && League.map((item) => {
                    return (
                        <div key={item._id}>
                            <p>{item.name}</p>
                            <button onClick={buttonHandler(item._id)}>draft your team</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Fantasy
