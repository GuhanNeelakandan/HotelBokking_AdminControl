import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css'
import Admin from "./admin.gif"
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://bookinghotelapi-app.herokuapp.com/login", credentials);
            console.log(res.data)
            if(res.data.isAdmin){
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                window.localStorage.setItem('myhotelapp', res.data.token);
                navigate("/dashboard")
            }else{
                dispatch({ type: "LOGIN_FAILURE", payload: {message:"You are not allowed"}});
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    return (
        <div className="login">
            <div className="lContainer">
                <h4 className='lheading'>Welcome Admin</h4>
                <div className='admin'><img src={Admin} className='admin-img'/></div>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                <div className='crediential'>Username: test</div>
                <div className='crediential'>Password: 12345678</div>
                {error && <span className='error-msg'>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login