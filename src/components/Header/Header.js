import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ImportTeam from '../ImportTeam/ImportTeam';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchPlayer, setTeamName } from '../../Redux/dataSlice/dataSlice';

const Header = ({ show }) => {


    // const [teamName, setTeamName] = useState('My Team');
    const inputRef = useRef(null);
    const [openModal, setOpenModal] = React.useState(false);
    const { allPlayer, teamName } = useSelector(state => state.allData);
    const dispatch = useDispatch();
    const editIconRef = useRef(null);
    const teamNameRef = useRef(null);
    const searchBtnRef = useRef(null);
    const searchRef = useRef(null);

    // modal open and close function
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // update name menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleAppendSearchBtn = e => {
        if (e.target?.value === '') {
            searchBtnRef.current.classList.remove('show-search-button');
        } else {
            searchBtnRef.current.classList.add('show-search-button');
        };
    };

    // open and colse menu function
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // set new new team name
    const handleUpdateName = () => {
        if (inputRef.current.value === '') return;
        dispatch(setTeamName(inputRef.current.value));
        handleClose();
    };

    useEffect(() => {
        if (teamNameRef.current?.innerText !== 'My Team') {
            editIconRef.current?.classList?.add('remove-icon');
        } else {
            editIconRef.current?.classList?.remove('remove-icon');
        }
    }, [teamName]);

    const showEditIcon = () => {
        if (teamNameRef.current?.innerText === 'My Team') return;
        editIconRef.current.classList?.remove('remove-icon');
    };
    const removeEditIcon = () => {
        if (teamNameRef.current?.innerText === 'My Team') return;
        editIconRef.current.classList?.add('remove-icon');
    };

    // style sheet
    const header = {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 4
    };


    return (

        <>
            <Box sx={header}>


                <Box>

                    <Typography
                        sx={{ color: '#FEA013', mb: 0, fontSize: 12, fontWeight: 500 }}
                        variant='caption'
                    >
                        {show ? "Roster Details" : "Formation Overview"}
                    </Typography>

                    <Typography onMouseOut={removeEditIcon}
                        onMouseOver={showEditIcon}
                        className='team_title'
                        variant='h5'
                    >

                        <span ref={teamNameRef}>{teamName}</span>

                        <IconButton ref={editIconRef} onClick={handleClick}>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Typography>

                </Box>

                {
                    show &&
                    <Box sx={{ mr: 4, mt: 1.5 }}>

                        <input
                            onChange={handleAppendSearchBtn}
                            id="search_field"
                            type="search"
                            ref={searchRef}
                            placeholder="Search..."
                            onKeyPress={(event) => {
                                event.key === "Enter" && dispatch(saveSearchPlayer(event.target.value));
                                searchBtnRef.current.classList?.remove('show-search-button');
                            }}
                            onKeyDown={(event) => {
                                event.key === "Escape" && dispatch(saveSearchPlayer(''));
                            }}
                        />

                        <button
                            onClick={() => {
                                dispatch(saveSearchPlayer(searchRef.current?.value));
                                searchBtnRef.current.classList?.remove('show-search-button');
                            }}
                            className='search-button'
                            ref={searchBtnRef}
                        >
                            search
                        </button>


                        <button
                            onClick={handleOpenModal}
                            style={{ backgroundColor: allPlayer.length > 0 ? '#212121' : '#FEA013' }}
                            className='import_button'
                        >
                            {allPlayer.length > 0 ? " Re-Import Team" : "Import Team"}
                        </button>
                    </Box>
                }

            </Box>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#202020"
                    }
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem>
                    <input
                        ref={inputRef}
                        type="text"
                        className='update-field'
                        placeholder={teamName}
                        onKeyPress={(event) => {
                            event.key === "Enter" && handleUpdateName();
                        }}
                    />
                </MenuItem>

                <MenuItem>
                    <button
                        onClick={handleUpdateName}
                        className='save-button'
                    >
                        SAVE
                    </button>
                </MenuItem>

            </Menu>


            {/* import team modal  */}

            <ImportTeam
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />

        </>

    );
};

export default Header;