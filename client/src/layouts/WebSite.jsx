import React from 'react'
import MainNav from '../component/Navs/MainNav'
import { Outlet } from 'react-router-dom'
import MainFooter from '../component/Footers/MainFooter'

const WebSite = () => {
    return (
        <div className=''>
            <div className="">
                <MainNav />
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                <MainFooter />
            </div>
        </div>
    )
}

export default WebSite