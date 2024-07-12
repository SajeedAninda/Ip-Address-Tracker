import React, { useEffect, useState } from 'react';
import "./ip.css";
import arrowIcon from "../assets/icon-arrow.svg";

const IpTracker = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [ipData, setIpData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearchValue = (e) => {
        e.preventDefault();
        setIpAddress(e.target.ip_address.value);
    };

    useEffect(() => {
        if (ipAddress) {
            fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_UxSYSWneFGFGUCK2Qxh1G4Onr7KwP&ipAddress=${ipAddress}`)
                .then(response => response.json())
                .then(json => {
                    if (json.code) {
                        setError(json.messages);
                        setIpData(null);
                    } else {
                        setIpData(json);
                        setError(null);
                    }
                })
                .catch(err => {
                    setError("Failed to fetch IP information.");
                    setIpData(null);
                });
        }
    }, [ipAddress]);

    return (
        <div>
            <div className='upperDiv h-[40vh] flex py-8 items-center flex-col'>
                <h1 className='text-white font-bold text-[32px]'>
                    IP Address Tracker
                </h1>

                <form onSubmit={handleSearchValue} className='w-full flex justify-center items-center mt-4'>
                    <input className='bg-white py-5 px-4 rounded-l-2xl w-[40%] h-[65px] focus:border-none' type="text" id="ip_address" name="ip_address" placeholder='Search for any IP Address or Domain' />
                    <button className='text-white py-4 px-5 rounded-r-2xl bg-black h-[65px] hover:bg-[#2B2B2B]' type='submit'>
                        <img className='w-[15px]' src={arrowIcon} alt="" />
                    </button>
                </form>

                <div className='bg-white w-[80%] rounded-2xl py-16 px-8 mt-2 flex justify-between absolute top-44 shadow-2xl'>
                    {error ? (
                        <div className='text-red-500'>
                            {error}
                        </div>
                    ) : ipData ? (
                        <>
                            <div className='info-section'>
                                <p className='text-[13px] font-bold text-[#969696]'>IP ADDRESS</p>
                                <h4 className='text-[24px] font-bold text-[#2B2B2B]'>{ipData.ip}</h4>
                            </div>

                            <div className='info-section pl-4'>
                                <p className='text-[13px] font-bold text-[#969696]'>LOCATION</p>
                                <h4 className='text-[24px] font-bold text-[#2B2B2B]'>{`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}</h4>
                            </div>

                            <div className='info-section pl-4'>
                                <p className='text-[13px] font-bold text-[#969696]'>TIMEZONE</p>
                                <h4 className='text-[24px] font-bold text-[#2B2B2B]'>{ipData.location.timezone}</h4>
                            </div>

                            <div className='info-section pl-4'>
                                <p className='text-[13px] font-bold text-[#969696]'>ISP</p>
                                <h4 className='text-[24px] font-bold text-[#2B2B2B]'>{ipData.isp}</h4>
                            </div>
                        </>
                    ) : (
                        <div className='text-gray-500'>
                            Enter an IP address to get information.
                        </div>
                    )}
                </div>
            </div>

            <div className='h-[100vh] '>
                {/* Other content */}
            </div>
        </div>
    );
};

export default IpTracker;
