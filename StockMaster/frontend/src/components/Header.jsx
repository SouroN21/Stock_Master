import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import img from "../assets/user-interface.png"
const Header=()=>{

    const [currentTime,setCurrentTime] = useState(new Date().toLocaleDateString());
    
    useEffect(()=>{
        const time =setInterval(()=>{
            setCurrentTime(new Date().toLocaleDateString())
        },1000);
        return ()=>clearInterval(time);
    },[])

    return(
        
        <header className="flex justify-end rounded-xl h-16 items-center font-sans p-2  bg-cyan-500 text-white shadow-md">
            <div className="w-0.5 bg-gray-600 h-10 mr-4"></div> 
                
            <div className="text-xl cursor-pointer">{currentTime}</div>
            
            <div className="w-0.5 bg-gray-600 h-10 ml-4 mr-4"></div> 
         
            <div className="mr-5 flex">
                <span className="mt-2">Naveen</span>
                
                    <img 
                        src={img} 
                        alt="profile" 
                        className="w-10 ml-5 rounded-full border border-black "
                    />  
            </div>
        </header>
    );
};

export default Header;
