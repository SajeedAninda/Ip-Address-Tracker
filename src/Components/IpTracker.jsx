import React from 'react';
import "./ip.css"
import arrowIcon from "../assets/icon-arrow.svg"


const IpTracker = () => {
    return (
        <div>
            <div className='upperDiv h-[45vh] py-8 flex justify-center items-center flex-col'>
                <h1 className='text-white font-bold text-[32px]'>
                    Ip Address Tracker
                </h1>

                <form className='w-full flex justify-center items-center mt-4'>
                    <input className='bg-white py-5 px-4 rounded-l-2xl w-[40%] h-[65px]' type="text" id="ip-address" name="ip-address" placeholder='Search for any IP Address or Domain' />
                    <button className='text-white py-4 px-5 rounded-r-2xl bg-black h-[65px]' type='submit'>
                        <img className='w-[15px]' src={arrowIcon} alt="" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IpTracker;