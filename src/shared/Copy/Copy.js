import { useState } from 'react';
import "./Copy.css"
import {CopyOutlined} from "@ant-design/icons";

const Copy = () => {
    const [isActive, setIsActive] = useState(false);

    const handleCopyClick = () => {
        const input = document.querySelector('.text');
        input.select();
        document.execCommand('copy');
        setIsActive(true);
        window.getSelection().removeAllRanges();
        setTimeout(() => {
            setIsActive(false);
        }, 2500);
    };

    return (
        <div className="container">
            <div className="label">E-mail address</div>
            <div className={`copy-text ${isActive ? 'active' : ''}`}>
                <input type="text" className="text" value={"dscsdcsdcsdcsdc"} />

                <CopyOutlined onClick={handleCopyClick}/>
            </div>
        </div>
    );
};

export default Copy;
