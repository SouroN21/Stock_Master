import React, { useEffect, useState } from "react";
import img from "../assets/user-interface.png";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UserModal from './UserModal'; 

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleDateString());
    const [token, setToken] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate=useNavigate();

    useEffect(() => {
        const time = setInterval(() => {
            setCurrentTime(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(time);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);

        const fetchUserProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5001/api/user/profile', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);
                } catch (error) {                
                    alert("Session Expired!");
                    navigate('/login');
                    return;
                }
            }
        };
        fetchUserProfile();
    }, [token]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <header className="flex items-center justify-end h-16 p-2 font-sans text-white transition duration-300 ease-in-out transform rounded-md shadow-lg bg-gradient-to-r from-cyan-600 to-teal-400 hover:from-teal-400 hover:to-cyan-600 ">
                <div className="w-0.5 bg-gray-600 h-10 mr-4"></div>
                <div className="text-xl cursor-default">{currentTime}</div>
                <div className="w-0.5 bg-gray-600 h-10 ml-4 mr-4"></div>
                <div className="flex mr-5">
                    {userProfile ? (
                        <>
                            <span className="mt-2 cursor-pointer" onClick={handleOpenModal}>{userProfile.first_name}</span>
                            <img 
                                src={img} 
                                alt="profile" 
                                className="w-10 ml-5 border border-black rounded-full cursor-pointer"
                                onClick={handleOpenModal} 
                            />
                        </>
                    ) : (
                        <span className="mt-2">Loading...</span>
                    )}
                </div>     
            </header>
            {isModalOpen && userProfile && (
                <UserModal userProfile={userProfile} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Header;