import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordcheck, setCheck]=useState('');
    const navigate=useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        // Add logic to handle account creation here
        try{
            const response= await fetch('http://localhost:8080/api/auth/create-account', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: nickname,
                    email: email,
                    password: password,
                    passwordCheck: passwordcheck,
                }),
            });

            if(response.ok){
                const data= await response.text();
                alert(data);
                navigate("/")
            }else{
                const errorText=await response.text();
                alert(errorText);
            }
        }catch(error){
            alert('Please try again');
        }
    };
    const handleBackToLogin=()=>{
        navigate('/');
    };
    // const createempty=async(e)=>{
    //     e.preventDefault;
    //     try{
    //         const response=await fetch("http:://localhost:8080/brain/create",{
    //             method: 'POST',
    //             headers:{
    //                 ""
    //             }
    //         })
    //     }
    // }
    
    return (
        <div className="create-account">
            <h2>Create Account</h2>
            <form onSubmit={handleCreate}>
                <div className="input-field">
                    <label>닉네임:</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임 입력해주세요"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>이메일:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 입력해주세요"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력해주세요"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>비밀번호 확인:</label>
                    <input
                        type="password"
                        value={passwordcheck}
                        onChange={(e) => setCheck(e.target.value)}
                        placeholder="비밀번호 확인해주세요"
                        required
                    />
                </div>
                <button type="submit" onClick={handleCreate}>계정 만들기</button>
            </form>
            <button type="button" onClick={handleBackToLogin} className="back-to-login-button">
                로그인
            </button>
        </div>
    );
};

export default CreateAccount;