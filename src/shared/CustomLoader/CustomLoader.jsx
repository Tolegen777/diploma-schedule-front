import React from 'react';
import "./index.css"

const CustomLoader = () => {
    return (
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                // transform: 'translate(-50%, -50%)',
            }}>
                <div className="book">
                    <div className="book__pg-shadow"></div>
                    <div className="book__pg"></div>
                    <div className="book__pg book__pg--2"></div>
                    <div className="book__pg book__pg--3"></div>
                    <div className="book__pg book__pg--4"></div>
                    <div className="book__pg book__pg--5"></div>
                </div>
            </div>
    );
};

export default CustomLoader;