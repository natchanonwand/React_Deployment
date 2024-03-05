import './HomeComponent.css'
import React from 'react';
import videoBg4 from '../assets/videoBg4.mp4'
import Sidebar from './Sidebar/Sidebar';

function HomeComponent() {
    return (
    <div className="HomeComponent">
        <Sidebar/>
        <div className='wrapHome'>
            <div className="overlay"> </div>
            <video src={videoBg4} autoPlay loop muted/>
            <div className="content">
                <h1>Sony seinor project</h1>   
            </div>
        </div>
        
    </div>
    )
}
export default HomeComponent;