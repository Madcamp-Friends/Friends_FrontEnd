import React, {useState} from "react";
const Login=()=>{
    const[password, setPassword]=useState("");
    const[username, setUsername]=useState("");
    const[errorMessage,setErrorMessage]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!password || !username){
            setErrorMessage("Wrong username and password");
            return;
        }
        console.log("Login:", {username,password});
        setErrorMessage("");
        alert("Login successful");
    };
    return (
        <div className="login">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>username:</label>
                    <input
                    type="username"
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
                    required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default Login;