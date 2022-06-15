import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar';
import "./CreateHotel.css"

function CreateHotel() {
    let navigate=useNavigate()

    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("https://bookinghotelapi-app.herokuapp.com/getRooms");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

    const handleSelect = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const newhotel = {
                ...info,
                rooms
            };
            await axios.post("https://bookinghotelapi-app.herokuapp.com/createhotel", newhotel, {
                headers: {
                    Authorization: window.localStorage.getItem('myhotelapp'),
                },
            });
            navigate('/hotels');
            alert("Successfully created")
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <>
            <Navbar/>
            <div className="container mx-auto mt-5">
                <div class="card-header py-3 mb-2 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">New Hotel Data</h6>
                </div>
                <div className='card-body'>
                   
                        <div className="row user-row">
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6">
                                <input type="text" className="form-control" placeholder="Hotel Name" id="name" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Type(eg. hotel,resort,villa etc..,)" id="type" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="city" id="city" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Address" id="address" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Distance" id="distance" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Titile" id="title" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Description" id="desc" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Rating upto 10" id="rating" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Photo" id="photos" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Price" id="cheapestPrice" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <label className='me-2'>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="form-group col-12 select-room">
                                <label className='me-2'>Rooms</label>
                                <select className='select-css' id="rooms" multiple onChange={handleSelect}>
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((room) => (
                                            <option key={room._id} value={room._id}>
                                                {room.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-4 mt-1">
                            <Link to={'/hotels'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                            <button className="btn btn-primary btn-sm" type="button" disabled={loading} onClick={handleClick} >Create</button>
                        </div>
                        {error && <span>{error.message}</span>}
                </div >

            </div >
        </>
    )
}

export default CreateHotel