import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar';

function AllRoom() {
    let navigate = useNavigate()
    const { data, loading, error } = useFetch(`https://bookinghotelapi-app.herokuapp.com/getRooms`);
    console.log(data)
  return (
    <>
    <Navbar/>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Rooms</h1>
    </div>
    
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Rooms Details</h6>
            <Link to={"/create-room"}><button className='btn btn-primary btn-sm'>Create Room</button></Link>
        </div>
        <div class="card-body">
            <div class="table-responsive">
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
                        {data.map((room) => {
                            return <tr>
                                <td>{room.title}</td>
                                <td>{room.price}</td>
                                <td>{room.maxPeople}</td>
                                <td>{room.desc}</td>
                                <td>
                                    <Link to={`/edit-room/${room._id}`}><button class="btn btn-outline-warning btn-sm ms-2"  data-toggle="tooltip" data-placement="bottom" title="delete">Edit</button></Link></td>
                            </tr>
                        })
                        }
                    </tbody>
                    <Link to={'/dashboard'}><button className="btn btn-primary btn-sm">Back</button></Link>
                </table>
            </div>
        </div>
    </div>
</>
  )
}

export default AllRoom