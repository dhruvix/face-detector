import React from 'react';
import Tilt from 'react-tilt';
import logoface from './logoface.png';
import './Logo.css';

function Logo() {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55}} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img style={{ paddingTop: '3px'}} alt='logo' src={logoface} />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;