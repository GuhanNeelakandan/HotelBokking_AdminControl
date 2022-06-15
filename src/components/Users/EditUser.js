import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar';

function EditUser() {
    let params=useParams()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        phone:undefined,
        email:undefined,
        isAdmin:undefined
    });
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value

        setCredentials((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }
    useEffect(() => {
        async function fetchData() {
            try {
                let editdata = await axios.get(`https://bookinghotelapi-app.herokuapp.com/getUser/${params.id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('myhotelapp'),
                    },
                })
                setCredentials({
                    username: editdata.data.username,
                    email:editdata.data.email,
                    isAdmin: editdata.data.isAdmin,
                   
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleUpdate = async () => {
        const updateData = await axios.put(`https://bookinghotelapi-app.herokuapp.com/updateUser/${params.id}`, credentials, {
            headers: {
                Authorization: window.localStorage.getItem('myhotelapp'),
            },
        }).then((res) => {
            alert('updated')
        }).catch((err) => {
            console.log(err)
        })
        navigate("/users", { replace: true });
    }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Update User</h6>
        </div>
        <div className='card-body'>
            <div className="row user-row">
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                    <input type="text" className="form-control" placeholder="username"  id="username" value={credentials.username} onChange={handleChange} />
                </div>
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <input type="text" className="form-control" placeholder="phone" id="phone" value={credentials.email}  onChange={handleChange}  />
                </div>
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Change To Admin (true/false) </label>
                    <input type="text" className="form-control" placeholder="isAdmin" id="isAdmin" value={credentials.isAdmin}  onChange={handleChange}  />
                </div>
                <div className="col-4 mt-5 ms-2">
                    <Link to={'/users'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                    <button className="btn btn-primary btn-sm" onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default EditUser