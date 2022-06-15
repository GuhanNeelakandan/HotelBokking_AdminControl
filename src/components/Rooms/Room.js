import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar'

function Room() {
    let params=useParams()
    let navigate = useNavigate()
    const [hotelData,setHotelData]=useState([])
    function fetchData() {
        if (!localStorage.getItem("myhotelapp")) {
            navigate("/");
        }
    }
    useEffect(() => {
        axios.get(`https://bookinghotelapi-app.herokuapp.com/gethotelRoom/${params.id}`, {
            headers: {
                Authorization: window.localStorage.getItem('myhotelapp'),
            },
        }).then((res) => {
            setHotelData(res.data)
        })
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    })

    let handleDelete = async (id) => {
        try {
            let ask = window.confirm(
                'Are you sure, do you want to delete this Room?'
            );
            if (ask) {
                await axios.delete(`https://bookinghotelapi-app.herokuapp.com/deleteRoom/${id}/${params.id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('myhotelapp'),
                    },
                });
                alert('Removed');
                window.location.reload(false)
            }

        } catch (error) {
            alert('Something went wrong');
        }
    };
    return (
        <>
            <Navbar />
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Rooms</h1>
            </div>
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Rooms Details</h6>
                    <Link to={"/create-room"}><button className='btn btn-primary btn-sm'>Create Room</button></Link>
                </div>
                <div class="card-body">
                    <div class="table-responsive table-scroll">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Max-people</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelData.map((room) => {
                                    return <tr>
                                        <td>{room.title}</td>
                                        <td>{room.price}</td>
                                        <td>{room.maxPeople}</td>
                                        <td>{room.desc}</td>
                                        <td>
                                            <button class="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDelete(room._id)} data-toggle="tooltip" data-placement="bottom" title="delete">Remove</button></td>
                                    </tr>
                                })
                                }
                            </tbody>
                            <Link to={'/hotels'}><button className="btn btn-primary btn-sm">Back</button></Link>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room