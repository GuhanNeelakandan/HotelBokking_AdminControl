
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import Users from './components/Users/Users';
import Hotel from './components/Hotel/Hotel';
import Room from './components/Rooms/Room';
import CreateUser from './components/Users/CreateUser';
import Navbar from './components/Navbar/Navbar';
import CreateHotel from './components/Hotel/CreateHotel';
import CreateRoom from './components/Rooms/CreateRoom';
import EditUser from './components/Users/EditUser';
import AllRoom from './components/Rooms/AllRoom';
import EditRoom from './components/Rooms/EditRoom';
import EditHotel from './components/Hotel/EditHotel';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>
      <Route path="/create-user" element={<ProtectedRoute><CreateUser/></ProtectedRoute>}/>
      <Route path="/edit-user/:id" element={<ProtectedRoute><EditUser/></ProtectedRoute>}/>
      <Route path="/hotels" element={<ProtectedRoute><Hotel/></ProtectedRoute>}/>
      <Route path="/create-hotel" element={<CreateHotel/>}/>
      <Route path="/edit-hotel/:id" element={<ProtectedRoute><EditHotel/></ProtectedRoute>}/>
      <Route path="/rooms/:id" element={<ProtectedRoute><Room/></ProtectedRoute>}/>
      <Route path="/rooms" element={<ProtectedRoute><AllRoom/></ProtectedRoute>}/>
      <Route path="/edit-room/:id" element={<ProtectedRoute><EditRoom/></ProtectedRoute>}/>
      <Route path="/create-room" element={<ProtectedRoute><CreateRoom/></ProtectedRoute>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
