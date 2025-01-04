import React from "react";
import Login from "./login/login.js";
import CreateAccount from "./login/CreateAccount";
import './App.css';
import Menu from "./menu_bar/menu"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FriendList from './friend/friendList';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/Home" element={<Menu />} />
                <Route path="/friends" element={<FriendList />} />
            </Routes>
        </Router>
    );
}
export default App;