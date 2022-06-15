import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    let navigate=useNavigate()
    let handleLogout = () => {
        window.localStorage.removeItem('myhotelapp');
        navigate('/');
      };
    return (
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <Link to={'/dashboard'} className='heading-home'>HotelBooking Admin</Link>
            <Link to={'/users'}><button className="btn btn-primary m-2">Users</button></Link>
            <Link to={'/hotels'}><button className="btn btn-warning m-2">Hotels</button></Link>
            <Link to={'/rooms'}><button className="btn btn-success m-2">Rooms</button></Link>
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </nav>
    )
}

export default Navbar