import React from "react";
import Login from "./login/login.js";
import CreateAccount from "./login/CreateAccount";
import './App.css';
import Menu from "./menu_bar/menu"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import FriendList from './friend/friendList.js';
import Brain from "./brain/create_brain"
import MyPage from "./mypage/MyPage.js"
import MyInfo from "./mypage/MyInfo.js"
import MyFriendList from "./mypage/MyFriends.js"
import MyBrain from "./mypage/MyBrain.js"
import Settings from "./editinfo/EditInfo.js"
import Brain_Share from "./brain/brain_share.js";
import FloatingImage from "./homescreen/Crazyhome.js";

function ProtectedLayout(){
    return (
        <Menu>
            <Outlet />
        </Menu>
    );
}


function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/MakeBrain" element={<Brain />} />    
                   
            <Route element={<ProtectedLayout/>}>
                <Route path="/Home" element={<FloatingImage/>}/>    
                <Route path="/friends" element={<FriendList />} />
                <Route path="/MyInfo" element={<MyInfo />} />
                <Route path="/MyFriendList" element={<MyFriendList />} />
                <Route path="/share-brain" element={<Brain_Share />}/>
                <Route path="/MyBrain" element={<MyBrain />} />
                <Route path="/MyPage" element={<MyPage />} />
                <Route path="/MySetting" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );

}
export default App;