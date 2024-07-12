import React from 'react';
import "./ip.css"
import arrowIcon from "../assets/icon-arrow.svg"


const IpTracker = () => {
    return (
        <div>
            <div className='upperDiv h-[40vh] flex py-8 items-center flex-col'>
                <h1 className='text-white font-bold text-[32px]'>
                    Ip Address Tracker
                </h1>

                <form className='w-full flex justify-center items-center mt-4'>
                    <input className='bg-white py-5 px-4 rounded-l-2xl w-[40%] h-[65px] focus:border-none' type="text" id="ip-address" name="ip-address" placeholder='Search for any IP Address or Domain' />
                    <button className='text-white py-4 px-5 rounded-r-2xl bg-black h-[65px] hover:bg-[#2B2B2B]' type='submit'>
                        <img className='w-[15px]' src={arrowIcon} alt="" />
                    </button>
                </form>

                <div className='bg-white w-[80%] rounded-2xl py-16 px-8 mt-2 flex justify-between absolute top-44 shadow-2xl'>
                    <div className='info-section'>
                        <p className='text-[13px] font-bold text-[#969696]'>IP ADDRESS</p>
                        <h4 className='text-[24px] font-bold text-[#2B2B2B]'>103.217.111.134</h4>
                    </div>

                    <div className='info-section'>
                        <p className='text-[13px] font-bold text-[#969696]'>LOCATION</p>
                        <h4 className='text-[24px] font-bold text-[#2B2B2B]'>Bangladesh, Paltan 1212</h4>
                    </div>

                    <div className='info-section'>
                        <p className='text-[13px] font-bold text-[#969696]'>TIMEZONE</p>
                        <h4 className='text-[24px] font-bold text-[#2B2B2B]'>UTC 6</h4>
                    </div>

                    <div className='info-section'>
                        <p className='text-[13px] font-bold text-[#969696]'>ISP</p>
                        <h4 className='text-[24px] font-bold text-[#2B2B2B]'>Dot Internet</h4>
                    </div>
                </div>
            </div>

            <div className='h-[100vh] '>

            </div>
        </div>
    );
};

export default IpTracker;