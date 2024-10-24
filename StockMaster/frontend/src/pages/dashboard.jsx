// src/pages/Dashboard.jsx
import React from 'react';


const Dashboard = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-lg">Welcome to your dashboard!</p>
            {/* Add more dashboard content here */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Overview</h3>
                <p>Your key metrics and insights will be displayed here.</p>
                {/* You can add charts, graphs, or other components here */}
            </div>
        </div>
    );
};

export default Dashboard;