import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../Navbar/Navbar'
import '../Users/CreateUser.css'

function CreateUser() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        phone:undefined,
        email:undefined,
        password: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://bookinghotelapi-app.herokuapp.com/register", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            alert("Successfully Register")
            navigate('/users')
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-5">
                <div class="card-header py-3 mb-2 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Users Details</h6>
                </div>
                <div className='card-body'>
                <form >
                    <div className="row user-row">
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                            <input type="text" className="form-control" placeholder="username"  id="username" onChange={handleChange} />
                        </div>
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                            <input type="text" className="form-control" placeholder="phone" id="phone" onChange={handleChange}  />
                        </div>
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                            <input type="email" className="form-control" placeholder="email" id="email" onChange={handleChange}  />
                        </div>
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                            <input type="password" className="form-control" placeholder="password" id="password"   onChange={handleChange}  />
                        </div>
                        <div className="col-4 mt-5 ms-2">
                            <Link to={'/users'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                            <button className="btn btn-primary btn-sm" disabled={loading}  onClick={handleClick} >Create</button>
                        </div>
                    </div>
                    {error && <span>{error.message}</span>}
                </form>
                </div>
                

            </div>
        </>
    )
}

export default CreateUser