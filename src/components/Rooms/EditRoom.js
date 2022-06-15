import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar'

function EditRoom() {
    let params=useParams()
    let navigate=useNavigate()
    const [info, setInfo] = useState({
        title: undefined,
        price:undefined,
        maxPeople:undefined,
        desc:undefined
    });
    const [hotelId, setHotelId] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
            try {
                let editdata = await axios.get(`https://bookinghotelapi-app.herokuapp.com/getRoom/${params.id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('myhotelapp'),
                    },
                })
                setInfo({
                    title: editdata.data.title,
                    price:editdata.data.price,
                    maxPeople:editdata.data.maxPeople,
                    desc:editdata.data.desc
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
            await axios.put(`https://bookinghotelapi-app.herokuapp.com/updateRoom/${params.id}`, info, {
            headers: {
                Authorization: window.localStorage.getItem('myhotelapp'),
            },
        }).then(
            alert('Updated'),
            navigate("/rooms", { replace: true })
        )
       
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
            <Navbar/>
            <div className="container mx-auto mt-5">
                <div class="card-header py-3 mb-2 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">New Hotel Data</h6>
                </div>
                <div className='card-body'>
                    <form >
                        <div className="row user-row">
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6">
                                <input type="text" className="form-control" placeholder="Room Name" id="title" value={info.title} onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Price" id="price" value={info.price} onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="MaxPople" id="maxPeople" value={info.maxPeople} onChange={handleChange} />
                            </div>
                            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                                <input type="text" className="form-control" placeholder="Description" id="desc" value={info.desc} onChange={handleChange} />
                            </div>
                            {/* <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
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
                            </div> */}
                        </div>
                        <div className="col-4 mt-1">
                            <Link to={'/rooms'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                            <button className="btn btn-primary btn-sm" onClick={() => handleUpdate()}>Update</button>
                        </div>
                        {/* {error && <span>{error.message}</span>} */}
                    </form>
                </div >

            </div >
        </>
  )
}

export default EditRoom