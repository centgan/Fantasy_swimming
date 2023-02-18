import {useState} from "react";
import {useCreateLeague} from "../../hooks/useCreateLeague";

const CreateLeague = () => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [score, setScore] = useState('')
    const {create, loading, error} = useCreateLeague()

    const SubmitHandler = async (e) => {
        e.preventDefault()

        await create(name, number, score)
    }

    return (
        <form className="createLeague" onSubmit={SubmitHandler}>
            <h1>create your own league</h1>

            <label>Name of your league</label>
            <input
                type="Username"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br/>
            <label>Number of players</label>
            <input
                type="number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
            />
            <br/>
            <label>Scoring method</label>
            {/*make a drop-down menu for the score*/}
            <input
                type="Username"
                onChange={(e) => setScore(e.target.value)}
                value={score}
            />
            <button disabled={loading}>create</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default CreateLeague
