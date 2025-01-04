import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
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
                }),
            });

            if(response.ok){
                const data= await response.text();
                alert(data);
                navigate('/Home');
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

    return (
        <div className="create-account">
            <h2>Create Account</h2>
            <form onSubmit={handleCreate}>
                <div className="input-field">
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button type="submit" onClick={handleCreate}>Create Account</button>
            </form>
            <button type="button" onClick={handleBackToLogin} className="back-to-login-button">
                Back to Login
            </button>
        </div>
    );
};

export default CreateAccount;