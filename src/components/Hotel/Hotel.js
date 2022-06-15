import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Hotel() {
    const [hotelData,setHotelData]=useState([])
    let navigate =useNavigate()
    function fetchData() {
        if (!localStorage.getItem("myhotelapp")) {
            navigate("/");
        }
    }
    useEffect(() => {
        axios.get('https://bookinghotelapi-app.herokuapp.com/getallhotel', {
            headers: {
                Authorization: window.localStorage.getItem('myhotelapp'),
            },
        }).then((res) => {
            setHotelData(res.data)
            console.log(res.data)
        })
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    })

    let handleDelete = async (id) => {
        try {
            let ask = window.confirm(
                'Are you sure, do you want to delete this Hotel?'
              );
              if(ask){
                await axios.delete(`https://bookinghotelapi-app.herokuapp.com/deletehotel/${id}`, {
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
    <Navbar/>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Hotels</h1>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Hotel Details</h6>
                   <Link to={'/create-hotel'}><button className='btn btn-primary btn-sm'>Create Hotel</button></Link>
                </div>
                <div class="card-body">
                    <div class="table-responsive table-scroll">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>CheapestPrice</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelData.map((hotel) => {
                                    return <tr>
                                        <td>{hotel.name}</td>
                                        <td>{hotel.city}</td>
                                        <td>{hotel.address}</td>
                                        <td>{hotel.cheapestPrice}</td>
                                        <td>
                                        <Link to={`/edit-hotel/${hotel._id}`}><button class="btn btn-outline-warning btn-sm ms-2" data-toggle="tooltip" data-placement="bottom" title="Edit">Edit</button></Link>
                                            <button class="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDelete(hotel._id)} data-toggle="tooltip" data-placement="bottom" title="Remove">Remove</button>
                                            <Link to={`/rooms/${hotel._id}`}><button class="btn btn-outline-primary btn-sm ms-2" data-toggle="tooltip" data-placement="bottom" title="Rooms">Rooms</button></Link></td>
                                    </tr>
                                })
                                }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                <Link to={'/dashboard'}><button className="btn btn-primary btn-sm m-3">back</button></Link>
            </div>
        </>
  )
}

export default Hotel