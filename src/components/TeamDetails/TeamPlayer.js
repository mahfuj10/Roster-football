import { Avatar, Box, IconButton, Modal, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPlayer from '../EditPlayer/EditPlayer';
import { useDispatch } from 'react-redux';
import { deletePlayer, setSelectPlayer } from '../../Redux/dataSlice/dataSlice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2D2D2D',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: 2
};

const TeamPlayer = ({ player }) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleOpenDeleteModal = (selectPlayer) => {
        setOpenDeleteModal(true);
        setSelectedPlayer(selectPlayer);
    };

    // modal open and close function
    const handleOpenModal = selectedPlayer => {
        setOpenModal(true);
        dispatch(setSelectPlayer(selectedPlayer));
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        dispatch(setSelectPlayer({}));
    };



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // stylesheet
    const tableText = {
        border: '0px',
        color: "#CBCBCB"
    };


    return (

        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell sx={tableText} style={{ display: 'flex', alignItems: 'center', gap: 10 }} component="th" scope="rows">
                    <Avatar
                        src={player['Flag Image']}
                        alt={`${player['Jersey Number']} image`}
                    />
                    {player['Player Name']}
                </TableCell>

                <TableCell sx={tableText} align="center">{player['Jersey Number']}</TableCell>
                <TableCell sx={tableText} align="center">{player.Starter}</TableCell>
                <TableCell sx={tableText} align="center">{player.Position}</TableCell>
                <TableCell sx={tableText} align="center">{player.Height} m</TableCell>
                <TableCell sx={tableText} align="center">{player.Weight} kg</TableCell>
                <TableCell sx={tableText} align="center">{player.Nationality}</TableCell>
                <TableCell sx={tableText} align="center">{player.Appearances}</TableCell>
                <TableCell sx={tableText} align="center">{player['Minutes Played']}</TableCell>
                <TableCell sx={tableText} >
                    <IconButton onClick={handleClick} sx={tableText}><MoreHorizIcon /></IconButton>
                </TableCell>


            </TableRow>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#2D2D2D"
                    },
                }}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 18,
                            width: 14,
                            height: 14,
                            bgcolor: '#2D2D2D',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem sx={{ display: 'flex', gap: 10, color: "#fff" }}>
                    <Typography variant='h6'>Actions</Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{ color: '#F8F8F8' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </MenuItem>

                <MenuItem onClick={() => handleOpenModal(player)} sx={{ color: "#CBCBCB", mb: 2 }}>
                    <EditIcon sx={{ mr: 2 }} />  Edit Player
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteModal(player)} sx={{ color: "#CBCBCB" }}>
                    <DeleteIcon sx={{ mr: 2 }} /> Delete Player
                </MenuItem>

            </Menu>


            {/* open edit modal  */}
            <EditPlayer
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />

            {/* delete alert modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id="delete-popup" sx={style}>

                    <Box id="alert-header">

                        <Typography variant='h6'>Are your sure?</Typography>

                        <IconButton
                            onClick={handleCloseDeleteModal}
                            sx={{ color: "#F8F8F8" }}
                        >
                            <CloseIcon />
                        </IconButton>

                    </Box>

                    <Typography variant='body'>This action can't be undone.</Typography>

                    <Box id="action-btn" >
                        <button onClick={handleCloseDeleteModal} className='cancel-btn'>Cancel</button>
                        <button
                            onClick={() => {
                                dispatch(deletePlayer(selectedPlayer['Player Name']));
                                handleCloseDeleteModal();
                            }}
                            className='delete-btn'
                        >
                            Delete
                        </button>
                    </Box>

                </Box>
            </Modal>

        </>

    );
};

export default TeamPlayer;