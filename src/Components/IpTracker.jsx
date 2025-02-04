import React, { useEffect, useState, useRef } from 'react';
import "./ip.css";
import arrowIcon from "../assets/icon-arrow.svg";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const IpTracker = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [ipData, setIpData] = useState(null);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState([23.803812370457035, 90.36396237828326]);

    const mapRef = useRef();

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setIpAddress(data.ip);
            })
            .catch(err => {
                setError("Failed to fetch current IP address.");
            });
    }, []);

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
                        setMapCenter([json.location.lat, json.location.lng]);
                        setError(null);
                    }
                })
                .catch(err => {
                    setError("Failed to fetch IP information.");
                    setIpData(null);
                });
        }
    }, [ipAddress]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(mapCenter, 13);
        }
    }, [mapCenter]);

    const handleSearchValue = (e) => {
        e.preventDefault();
        setIpAddress(e.target.ip_address.value);
    };

    return (
        <div className='relative'>
            <div className='upperDiv h-[40vh] flex py-8 items-center flex-col z-10'>
                <h1 className='text-white font-bold text-[32px]'>
                    IP Address Tracker
                </h1>

                <form onSubmit={handleSearchValue} className='w-full flex justify-center items-center mt-4'>
                    <input
                        className='bg-white py-5 px-4 rounded-l-2xl w-[80%] md:[w-[60%] lg:w-[40%] h-[65px] focus:border-none'
                        type="text"
                        id="ip_address"
                        name="ip_address"
                        placeholder='Search for any IP Address or Domain'
                    />
                    <button
                        className='text-white py-4 px-5 rounded-r-2xl bg-black h-[65px] hover:bg-[#2B2B2B]'
                        type='submit'>
                        <img className='w-[15px]' src={arrowIcon} alt="arrow icon" />
                    </button>
                </form>

                <div className='infoDiv bg-white w-[80%] rounded-2xl py-4 lg:py-16 px-8 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 absolute top-44 shadow-2xl h-fit lg:h-[200px] z-10'>
                    {error ? (
                        <div className='text-red-500'>
                            {error}
                        </div>
                    ) : ipData ? (
                        <>
                            <div className='info-section border-none lg:border-r-2 border-slate-200 pl-4 lg:pl-0'>
                                <p className='text-[8px] lg:text-[13px] font-bold text-[#969696]'>IP ADDRESS</p>
                                <h4 className='text-[12px] lg:text-[24px] font-bold text-[#2B2B2B]'>{ipData.ip}</h4>
                            </div>

                            <div className='info-section pl-4 border-none lg:border-r-2 border-slate-200'>
                                <p className='text-[8px] lg:text-[13px] font-bold text-[#969696]'>LOCATION</p>
                                <h4 className='text-[12px] lg:text-[24px] font-bold text-[#2B2B2B]'>{`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}</h4>
                            </div>

                            <div className='info-section pl-4 border-none lg:border-r-2 border-slate-200'>
                                <p className='text-[8px] lg:text-[13px] font-bold text-[#969696]'>TIMEZONE</p>
                                <h4 className='text-[12px] lg:text-[24px] font-bold text-[#2B2B2B]'>UTC {ipData.location.timezone}</h4>
                            </div>

                            <div className='info-section pl-4'>
                                <p className='text-[8px] lg:text-[13px] font-bold text-[#969696]'>ISP</p>
                                <h4 className='text-[12px] lg:text-[24px] font-bold text-[#2B2B2B]'>{ipData.isp}</h4>
                            </div>
                        </>
                    ) : (
                        <div className='text-gray-500'>
                            Enter an IP address to get information.
                        </div>
                    )}
                </div>
            </div>

            <div className='mapDiv h-[100vh] w-full'>
                <MapContainer center={mapCenter} zoom={20} scrollWheelZoom={true} style={{ height: "100vh", width: "100%", zIndex: "1" }} ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {ipData && (
                        <Marker position={mapCenter}>
                            <Popup>
                                {ipData.location.city}, {ipData.location.region}, {ipData.location.country}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default IpTracker;
