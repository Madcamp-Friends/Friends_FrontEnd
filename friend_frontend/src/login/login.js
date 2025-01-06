import React, { useState, useEffect } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogoAnimation, setShowLogoAnimation]=useState(false);
    const [showButtons, setShowButtons]=useState(false);

    const navigate = useNavigate();
    // eslint-disable-next-line no-undef
    useEffect(()=>{
        setTimeout(()=>setShowLogoAnimation(true),500);
        setTimeout(()=>setShowButtons(true),2500);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password.trim() || !username.trim()) {
            setErrorMessage("Wrong username and password");
            return;
        }
        try{
            const response=await fetch("http://localhost:8080/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    nickname: username,
                    password: password,
                }),
                credentials:"include",
            });
            if(response.ok){
                const data=await response.text();
                alert(data);
                setIsModalOpen(false);
                navigate("/Home");
            }else{
                const errorText=await response.text();
                setErrorMessage(errorText||"Invalid username or password");
            }
        } catch(error){
            setErrorMessage("wrong");
            console.error("Error:", error);
        }
    };

    const handleCreateAccount = () => {
        navigate("/create-account");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`Login ${showLogoAnimation ? "show-logo" : ""}`}>
            <div className="logo-container">
                <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="logo"
                />
                <h1 className="website-name">되어줘</h1>
                <h1 className="sub-name">뇌 친구~</h1>
            </div>
            {showButtons&&(
                <div className="button-container">
                    <button onClick={openModal}>Login</button>
                    <button type="button" onClick={handleCreateAccount}>Create Account</button>
                </div>
            )}

        {/* Modal for login form */}
        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Login</h3>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <label>사용자 이름:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="input-field">
                            <label>비밀번호:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button type="submit">로그인</button>
                        <button type="button" onClick={closeModal}>취소</button>
                    </form>
                </div>
            </div>
        )}
    </div>
    );
};

export default Login;
