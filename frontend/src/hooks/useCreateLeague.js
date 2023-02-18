import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const  useCreateLeague = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const {user} = useAuthContext()
    console.log("hfkshjdf")

    const create = async (name, number, score) => {
        setLoading(null)
        setError(null)

        const response = await fetch('/api/league/build', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({name, number, score})
        })

        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setLoading(false)
            window.location = "/"
        }
    }
    return {create, loading, error}
}
