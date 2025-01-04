import React from "react";
import Login from "./login";
import CreateAccount from "./CreateAccount";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}
export default App;