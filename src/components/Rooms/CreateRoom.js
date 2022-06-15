import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar'

function CreateRoom() {
    let navigate=useNavigate()
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("https://bookinghotelapi-app.herokuapp.com/getallhotel");
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`https://bookinghotelapi-app.herokuapp.com/createRoom/${hotelId}`, { ...info, roomNumbers },{
                headers: {
                    Authorization: window.localStorage.getItem('myhotelapp'),
                },
            });
            navigate('/hotels')
            alert("Room Created in the Specific Hotel")
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-5">
                <div class="card-header py-3 mb-2 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">New Hotel Data</h6>
                </div>
                <div className='card-body'>
                    <form >
                        <div className="row user-row">
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6">
                                <input type="text" className="form-control" placeholder="Room Name" id="title" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Price" id="price" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="MaxPople" id="maxPeople" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Description" id="desc" onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <textarea rows={3}
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="Room Number(Give comma between room numbers.)"
                                />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <label>Select Hotel </label>
                                <select
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((hotel) => (
                                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-4 mt-1">
                            <Link to={'/hotels'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                            <button className="btn btn-primary btn-sm" onClick={handleClick}>Create</button>
                        </div>
                        {/* {error && <span>{error.message}</span>} */}
                    </form>
                </div >

            </div >
        </>
    )
}

export default CreateRoom