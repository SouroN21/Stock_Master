import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {

    const [token, setToken] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            setToken(token);

            if (token) {
                try {
                    const response = await axios.get('http://localhost:5001/api/user/profile', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                  //  alert("Failed to fetch user profile!");
                }
            }
        };

        fetchUserProfile();
    }, []);

    
    return (
    <div className=''>
        <div className="p-10 bg-white">
            <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
            <p className="text-lg">Welcome to your dashboard!</p>
          <p>
            
          </p>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Overview</h3>
                <p>YourYour key metrics and insights will be displayed here.Your key metrics and insights will be displayed here.Your key metrics and insights will be displayed here.Your key metrics and insights will be displayed here.Your key metrics and insights will be displayed here.Your key metrics and insights will be displayed here.Your key metrics and insights will be displayed here. key metrics and insights will be displayed here.</p>
                <div>
                        <h4 className="text-lg font-semibold">User Profile:</h4>
                        {userProfile ? (
                <>
                    <span>{userProfile.first_name}</span>
                    <span>{userProfile.last_name}</span>
                    <span>{userProfile.email}</span>
                </>
            ) : (
                <p>Loading user profile...</p>
            )}
                    </div>
            </div>
        </div>
    </div>
        
    );
};

export default Dashboard;