'use client'

import Link from 'next/link'
import React from 'react'
import { BiSolidHome } from 'react-icons/bi'
import { FaPizzaSlice, FaPowerOff, FaBowlFood } from "react-icons/fa6";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";
import { PiFarm } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { IoIosDocument } from "react-icons/io";
import classNames from 'classnames';
import './BottomNavigation.css';


export default function BottomNavigation() {
  const path = usePathname();

  return (
    <div className='fixed bottom-0 left-0 bg-bluish-200 text-white py-4 w-full m-auto'>
      <div className='flex gap-5 w-full overflow-x-scroll overflow-y-hidden px-5 scrollbar-none'>
        <Link title='Home' className={classNames('h-full m-auto p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35', {
          'bg-slate-400 border-slate-500 border-4': path === "/dashboard"
        })} href='/dashboard'>
          <BiSolidHome/>
        </Link>
        {/* https://sustainability.transjakarta.co.id/ */}
        <Link title='Transjakarta' className={classNames('inactive group m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-3xl flex justify-center items-center hover:text-white/35', {
          'bg-slate-400 border-slate-500 border-4': path === "/transjakarta"
        })} href='/transjakarta'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 61 65" fill="none">
            <path
              className='fill-white group-hover:fill-white/35'
              d="M8.92371 9.68698C0.705818 18.3427 -1.83189 30.7156 1.31823 41.6613L20.2917 21.6647C22.5309 19.3103 26.1671 19.3103 28.4101 21.6728C30.6531 24.0313 30.6531 27.8572 28.4178 30.2197L6.99076 52.7924C7.59552 53.5543 8.23091 54.3083 8.91988 55.0339C20.8046 67.5479 40.0767 67.5479 51.9652 55.0339C60.1831 46.3822 62.7132 34.0134 59.5707 23.0717L40.5666 43.0844C38.3236 45.4227 34.7065 45.4227 32.475 43.0683C30.2359 40.7098 30.2359 36.896 32.4521 34.5294H32.4482L53.8982 11.9326C53.2896 11.1706 52.6504 10.4167 51.9691 9.69101C46.0286 3.43403 38.2432 0.305542 30.4502 0.305542C22.6572 0.305542 14.868 3.43 8.92371 9.69101" />
          </svg>
        </Link>
        <Link title='The Sims' className='m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='/the-sims'>
          <BsFillSuitDiamondFill />
        </Link>
        <Link title='Farm Frenzy' className='inactive m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='#'>
          <PiFarm />
        </Link>
        <Link title='Hayday' className='m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='/hayday'>
          <CiWheat />
        </Link>
        <Link title='Pizza Frenzy' className='inactive m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='#'>
          <FaPizzaSlice />
        </Link>
        <Link title='Nasi goreng' className='inactive m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='#'>
          <FaBowlFood />
        </Link>
        <Link title='Home' className={classNames('h-full inactive m-auto p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35', {
          'bg-slate-400 border-slate-500 border-4': path === "/docs"
        })} href='/docs'>
          <IoIosDocument/>
        </Link>
        <Link title='Logout' className=' inactive m-auto h-full p-2 bg-bluish hover:bg-bluish/35 min-h-9 rounded-md text-2xl flex justify-center items-center hover:text-white/35' href='#'>
          <FaPowerOff />
        </Link>
      </div>
    </div>
  )
}
