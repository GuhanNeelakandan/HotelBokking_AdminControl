import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar';

function EditHotel() {
    let params=useParams()
    let navigate=useNavigate()
    const [rooms, setRooms] = useState([]);
    const { data, loading, error }=useFetch("https://bookinghotelapi-app.herokuapp.com/getallhotel")
    const [info, setInfo] = useState({
        name: undefined,
        type:undefined,
        city:undefined,
        address:undefined,
        distance:undefined,
        desc:undefined,
        title:undefined,
        rating:undefined,
        cheapestPrice:undefined,
    });
    useEffect(() => {
        async function fetchData() {
            try {
                let editdata = await axios.get(`https://bookinghotelapi-app.herokuapp.com/gethotel/${params.id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('myhotelapp'),
                    },
                })
                setInfo({
                    name: editdata.data.name,
                    type:editdata.data.type,
                    city:editdata.data.city,
                    address:editdata.data.address,
                    distance:editdata.data.distance,
                    title:editdata.data.title,
                    desc:editdata.data.desc,
                    rating:editdata.data.rating,
                    cheapestPrice:editdata.data.cheapestPrice,
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value

        setInfo((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`https://bookinghotelapi-app.herokuapp.com/updatehotel/${params.id}`, info, {
            headers: {
                Authorization: window.localStorage.getItem('myhotelapp'),
            },
        }).then(
            alert('Updated'),
            navigate("/hotels", { replace: true })
        )
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Edit Hotel</h6>
        </div>
        <div className='card-body'>
            <form>
                <div className="row user-row">
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Hotel Name" id="name" value={info.name} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Type</label>
                        <input type="text" className="form-control" placeholder="Type(eg. hotel,resort,villa etc..,)" id="type" value={info.type} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>City</label>
                        <input type="text" className="form-control" placeholder="city" id="city" value={info.city} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" id="address" value={info.address} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Distance</label>
                        <input type="text" className="form-control" placeholder="Distance" id="distance" value={info.distance} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Title</label>
                        <input type="text" className="form-control" placeholder="Titile" id="title" value={info.title} onChange={handleChange} />
                    </div><div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Description</label>
                        <input type="text" className="form-control" placeholder="Description" id="desc" value={info.desc} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Rating</label>
                        <input type="text" className="form-control" placeholder="Rating upto 10" id="rating" value={info.rating} onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>CheapestPrice</label>
                        <input type="text" className="form-control" placeholder="Price" id="cheapestPrice" value={info.cheapestPrice} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4 mt-1">
                    <Link to={'/hotels'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                    <button className="btn btn-primary btn-sm" type="button" disabled={loading}  onClick={() => handleUpdate()}>Update</button>
                </div>
                {error && <span>{error.message}</span>}
            </form>
        </div >

    </div >
</>
  )
}

export default EditHotel