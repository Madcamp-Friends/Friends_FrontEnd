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
                createBrain();
                navigate('/CreateBrain');
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
    const createBrain = async () => {
        // Add logic to handle account creation here
        try{
            const response= await fetch('http://localhost:8080/api/auth/brain', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                navigate('/MakeBrain')
            }else{
                const errorText=await response.text();
                alert(errorText);
            }
        }catch(error){
            alert('Please try again');
        }
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
                <div className="input-field">
                    <label>PasswordCheck:</label>
                    <input
                        type="passwordcheck"
                        value={passwordcheck}
                        onChange={(e) => setCheck(e.target.value)}
                        placeholder="Enter passwordcheck"
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