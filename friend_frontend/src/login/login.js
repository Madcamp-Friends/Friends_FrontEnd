import React, {useState} from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const[password, setPassword]=useState("");
    const[username, setUsername]=useState("");
    const[errorMessage,setErrorMessage]=useState("");
    const[isModalOpen, setIsModalOpen]=useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!password.trim() || !username.trim()){
            setErrorMessage("Wrong username and password");
            return;
        }
        if(password.length<6){
            setErrorMessage("Password's too long!");
            return;
        }
        console.log("Login:", {username,password});
        setErrorMessage("");
        alert("Login successful");

    };
    const navigate=useNavigate();
    const handleCreateAccount=()=>{
        navigate("/create-account");
    };

    const openModal=()=>{
        setIsModalOpen(true);
    }

    const closeModal=()=>{
        setIsModalOpen(false);
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <button onClick={openModal}>Login</button>
            <button type="button" onClick={handleCreateAccount}>CreateAccount</button>
            {isModalOpen &&(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Login</h3>
                        {errorMessage && <p ClassName="error-message">{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <button type="submit">Login</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Login;