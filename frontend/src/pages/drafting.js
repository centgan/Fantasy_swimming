import {useEffect, useState} from "react";
import {useWebSocket} from "../hooks/useWebSocket";
import {useAuthContext} from "../hooks/useAuthContext";
import {useWebFunctions} from "../hooks/useWebFunctions";

const drafting = () => {
    const [Swimmer, setSwimmer] = useState(null);
    const [League, setLeague] = useState(null);
    const [Picked, setPicked] = useState(false);
    const [current_picking, setCurrent_picking] = useState([]);
    const league_id = localStorage.getItem("league");
    const [drafting_order, setDrafting_order] = useState([]);
    const {user} = useAuthContext();
    const {Opening} = useWebSocket();
    const {send_message} = useWebFunctions()
    const [Use, SetUse] = useState(null);
    const [Socket, SetSocket] = useState(null);
    const [UUID, setUUID] = useState(null);

    const socket = sessionStorage.getItem('socket');

    const [Timer, setTimer] = useState(30);
    let countDownDate = new Date().getSeconds();
    // console.log(countDownDate+30);

    const get_swimmer_data = async () => {
            const response_swim = await fetch('/api/swimmer/fetch', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response_swim.json();

            if (response_swim.ok) {
                setSwimmer(json);
            }
    }

    const get_league_data = async () => {
            const response_league = await fetch(`/api/league/get/${league_id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response_league.json();
            if (response_league.ok) {
                setLeague(json);
                // console.log(League, 'thiss is the leagaaa')
            }
    }
    useEffect(() => {
        // async function get_swimmer_data() {
        //     const response_swim = await fetch('/api/swimmer/fetch', {
        //         headers: {
        //             'Authorization': `Bearer ${user.token}`
        //         }
        //     })
        //     const json = await response_swim.json();
        //
        //     if (response_swim.ok) {
        //         setSwimmer(json);
        //     }
        // }
        //
        // async function get_league_data() {
        //     const response_league = await fetch(`/api/league/get/${league_id}`, {
        //         headers: {
        //             'Authorization': `Bearer ${user.token}`
        //         }
        //     })
        //     const json = await response_league.json();
        //     if (response_league.ok) {
        //         setLeague(json);
        //         // console.log(League, 'thiss is the leagaaa')
        //     }
        // }
        if (user) {
            get_swimmer_data();
            get_league_data();
        }
    }, [user])

    useEffect(() => {
        if (socket === null){
            sessionStorage.setItem('socket', 'true');
            const result = Opening()
            SetSocket(result[0]);
            setUUID(result[1]);
        }
        // if (!Use) {
        //     SetSocket(Opening());
        // }
        // SetUse(true);
        // socket.addEventListener('open', function (event) {
        //     console.log('connected');
        //     socket.send('something on client')
        // });
        // socket.onmessage = ({ data }) => console.log(data)
    }, [])

    const swimmerButtonHandler = item => async () => {
        if (user._id === current_picking[1].toString()) {
            await send_message(JSON.stringify([UUID, 'button', user._id, item._id, league_id]), Socket);
            await get_swimmer_data();
            await get_league_data();
            console.log('is this working shit ')
            Socket.onmessage = ({data}) => {
                const message = JSON.parse(data);
                console.log(message)
                setCurrent_picking(message);
            }
            // console.log(Use, 'first use')
            //
            // if (Use) {
            //     console.log('in here for the false side')
            //     SetUse(false);
            // } else {
            //     console.log('in here for the true side')
            //     SetUse(true);
            // }
            // console.log(Use, 'next use')
            // setCurrent_picking(current_picking+1);
            //
            // item.picked = true;
            // let index_of_swimmer = Swimmer[Swimmer.indexOf(item)];
            //
            // console.log()
        } else {
            alert("You are not the current picker")
        }
    }

    const order = choice => async () => {
        send_message(JSON.stringify([UUID, 'order', choice, league_id]), Socket);
        if (choice === 'randomize') {
            let message;
            Socket.onmessage = ({data}) => {
                message = JSON.parse(data);
                console.log(message, 'this is the earlier message');
                setCurrent_picking(message);
            }

            setPicked(true);
        }
    }

    const pick_order = () => {
        return (
            <div>
                <p>Which would you like</p>
                <button onClick={order('randomize')}>randomize</button>
                <button onClick={order('pick')}>pick your order</button>
            </div>
        )
    }

    const map_handler = (item) => {
        if (item.picked !== true) {
            return (
                <button key={item._id} onClick={swimmerButtonHandler(item)}>{item.name}</button>
            )
        } else {
            return (
                <p key={item._id}>{item.name}</p>
            )
        }
    }

    const league_order_picked = () => {
        let x = setInterval(function () {
            if (Timer > 0) {
                setTimer((Timer) => Timer-1);
            } else {
                setTimer(30);
            }
        }, 1000);
        return (
            <div>
                {/*<p>{Timer}</p>*/}
                <p>Person picking: </p>
                <p>{current_picking[0]}</p>
                {Swimmer && Swimmer.map((item) => map_handler(item))}
            </div>

        )
    }

    // console.log(Swimmer, "aasdf")
    return (
        <div>
            {/*{league_order_picked()}*/}
            {Picked ? league_order_picked(): pick_order()}
        </div>
    )
}

export default drafting
