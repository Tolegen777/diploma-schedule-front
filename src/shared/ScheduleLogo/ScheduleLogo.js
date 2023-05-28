import React from 'react';
import "./ScheduleLogo.css"

const ScheduleLogo = () => {
    return (
        <div className="logo-calendar-icon">
            <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <defs></defs>
                <title>Calendar-Alt</title>
                <path id="bottom-left" className="logo-a"
                      d="M7.62,16H6.34A1.21,1.21,0,0,0,5,17v1a1.21,1.21,0,0,0,1.34,1H7.73A1.1,1.1,0,0,0,9,18.05L9,17A1.21,1.21,0,0,0,7.62,16Z"/>
                <path id="top-middle" className="logo-a"
                      d="M11,14h2a0.9,0.9,0,0,0,1-.88V12a1,1,0,0,0-1-1H11a1,1,0,0,0-1,1v1.12A0.9,0.9,0,0,0,11,14Z"/>
                <rect id="top-left" className="logo-a" x="5" y="11" width="4" height="3" rx="1" ry="1"/>
                <rect id="top-right" className="logo-a" x="15" y="11" width="4" height="3" rx="1" ry="1"/>
                <path id="bottom-middle" className="logo-a"
                      d="M12.66,16H11.38A1.21,1.21,0,0,0,10,17l0.07,1a1.21,1.21,0,0,0,1.34,1h1.28A1.1,1.1,0,0,0,14,18.05V17A1.21,1.21,0,0,0,12.66,16Z"/>
                <path className="logo-container"
                      d="M21.5,3H17V1.06a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1V3H10V1A1,1,0,0,0,9,0H8A1,1,0,0,0,7,1V3H2.5A2.5,2.5,0,0,0,0,5.5v16A2.5,2.5,0,0,0,2.5,24h19A2.5,2.5,0,0,0,24,21.5V5.5A2.5,2.5,0,0,0,21.5,3ZM21,21.13H3V5.94H7v1a1,1,0,0,0,1,1H9a1,1,0,0,0,1-1v-1h4V7a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1V5.94h4V21.13Z"/>
                <rect id="bottom-right" className="logo-a" x="15.05" y="16" width="3.95" height="3" rx="1" ry="1"/>
            </svg>
        </div>
    );
};

export default ScheduleLogo;