import React from 'react'
import {useState, useEffect } from 'react'
import logo from '../assets/logo.png'
const Navbar = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className='flex items-center p-4 bg-[#F1F5F9] h-20 w-full  justify-between border border-solid border-[#E2E8F0] border-1'>
        <img src={logo} alt="Logo" className='w-45 mr-' />
        <div className="date-time border bg-amber-200 border-gray-50 px-3 py-1 flex items-center justify-center gap-3 font-family-sans"> 
        <span className="text-[#64748B] text-sm mt-1.5 font-semibold ">{formattedDate}</span>
        <span className="text-[#2563EB] text-sm mt-1.5 font-semibold">{formattedTime}</span>
      </div>
    </div>
  )
}

export default Navbar
