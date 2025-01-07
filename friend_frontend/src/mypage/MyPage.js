import React, { useState } from 'react';
import '../mypage/MyPage.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const logout=async (e)=>{
    e.preventDefault();
        // Add logic to handle account creation here
        try{
            const response= await fetch('http://localhost:8080/api/auth/logout', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const data= await response.text();
                alert(data);
                navigate('/');
            }else{
                const errorText=await response.text();
                alert(errorText);
            }
        }catch(error){
            alert('Please try again');
        }
  };

    return (
        <div className="app">
          
    

        <div className="MyMenuAll">
          <nav className="Mymenu">
            <ul>
              <li> <Link to="/MySetting">나의 정보</Link>  </li>
              <li> <Link to="/MyBrain">나의 뇌</Link>  </li>
              <li> <Link to="/MyfriendList">친구 신청 관리</Link> </li>
            </ul>
          </nav>
        </div>
        
        <div className="imageAndText">
        <p>나의 정보를 수정해주세요~!!</p>
        <img src = "/assets/뇌진구.png" className="brain_friendLOGO"></img>
        
        </div>
        
          
      </div>
    );
};
export default MyPage;