import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";
import Navbar from "./components/Navbar"
import First from "./pages/First";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Fantasy from "./pages/Leagues/Fantasy";
import CreateLeague from "./pages/Leagues/CreateLeague";
import JoinLeague from "./pages/Leagues/JoinLeague";
import Drafting from "./pages/drafting";

function App() {
    const {user} = useAuthContext()

    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={<First />}
                        />
                        <Route
                            path="/signup"
                            element={user ? <Navigate to="/" />: <Signup />}
                        />
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : <Login />}
                        />
                        <Route
                            path="/fantasy"
                            element={user ? <Fantasy /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/fantasy/create"
                            element={user ? <CreateLeague /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/fantasy/join"
                            element={user ? <JoinLeague /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/fantasy/draft"
                            element={user ? <Drafting /> : <Navigate to="/" />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
