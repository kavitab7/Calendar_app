import React from 'react'
import { NavLink } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className="home-page">
                <div className="container-home">
                    <p className='text-center' >Ready to take control of your schedule and streamline your communication management?
                    </p>
                    <NavLink to='/user' >  <button className="btn btn-danger btn-sm" role="button"><span className="text">Lets go!</span></button></NavLink>
                </div>
            </div>
        </>
    )
}

export default Home