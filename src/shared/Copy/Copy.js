import {useState} from 'react';
import "./Copy.css"
import {CopyOutlined, LogoutOutlined} from "@ant-design/icons";
import {Colors} from "../../const/const";
import {Button, message} from "antd";
import {resetService} from "../../services/resetService";
import {userService} from "../../services/userService";

const Copy = () => {

    const user = userService.getUser()

    const [isHovered, setIsHovered] = useState(false);

    const str = `https://schedule-app-three.vercel.app/university_${userService.getUser()?.universityCode ?? ''}_${userService.getUser()?.universityId ?? ''}`

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(str)
            .then(() => {
                // console.log('String copied to clipboard');
                message.info('Ссылка скопирована в буфер обмена');
            })
            .catch((error) => {
                console.error('Failed to copy string:', error);
            });

    };

    const containerStyle = {
        padding: "8px",
        borderRadius: "5px",
        color: '#ffffff',
        background: isHovered ? "rgba(97,153,173,0.99)" : Colors.Blue,
        cursor: "pointer"
    };

    return (
        <div>
            {user?.email !== 'superadmin@gmail.com' && <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px"}}>
                <div style={{padding: "10px", border: "1px solid grey", borderRadius: "5px", marginTop: "5px"}}>
                    {str}
                </div>
                <div
                    style={containerStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleCopyClick}
                >
                    <CopyOutlined style={{fontSize: "20px"}}/>
                </div>
            </div>}
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px"}}>
                    <Button
                        icon={<LogoutOutlined />}
                    onClick={() => resetService()}>
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Copy;
