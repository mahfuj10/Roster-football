import React, { useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import '../../App.css';
import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {


    const navigate = useNavigate();
    const [count, setCount] = useState(1);

    // stylesheet
    const sidebar = {
        width: 60,
        background: 'black',
        height: window.screen.availHeight,
        display: 'flex',
        justifyContent: 'center',
        pt: 5
    };

    const iconButton = {
        color: '#69563A',
        display: 'block',
        mt: 4,

    }

    return (

        <Box sx={sidebar}>


            <Box>

                <Avatar
                    onClick={() => navigate('/')}
                    sx={{ border: '2px solid #FEA013', height: 27, width: 27 }}
                    src="https://i.ibb.co/XJsYMQw/football-ball-png-image-5a20d1f313b5a6-1341847015121003390807-removebg-preview.png"
                    alt="footballlogo"
                />

                <IconButton
                    onClick={() => {
                        setCount(1);
                        navigate('/');
                    }}
                    className={count === 1 ? 'activeNav-link' : ''}
                    sx={iconButton}
                >
                    <MenuIcon sx={{
                        fontWeight: 900,
                        fontSize: 16
                    }} />
                </IconButton>

                <IconButton
                    onClick={() => {
                        setCount(2);
                        navigate('/teamoverview');
                    }}
                    className={count === 2 ? 'activeNav-link' : ''}
                    sx={iconButton}
                >
                    <GroupsIcon sx={{
                        fontWeight: 900,
                        fontSize: 16
                    }} />
                </IconButton>

            </Box>

        </Box >
    );
};

export default Sidebar;