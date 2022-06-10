import { Modal, Box, Typography, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerDetails } from '../../Redux/dataSlice/dataSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', md: '60%', lg: '40%', xl: 500 },
    bgcolor: '#383838',
    // border: '2px solid #000',
    boxShadow: 24,
    // height: '50%',
    p: 3,
    borderRadius: 2
};



const EditPlayer = ({ openModal, handleOpenModal, handleCloseModal }) => {

    const { selectedPlayer, allPlayer } = useSelector(state => state.allData);
    const nameRef = useRef('');
    const jerseyRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const nationalityRef = useRef(null);
    const positionRef = useRef(null);
    const [starter, setStarter] = React.useState(selectedPlayer?.Starter);
    const dispatch = useDispatch();


    const handleChange = (event) => {
        setStarter(event.target.value);
    };

    const handleUpdatePlayer = () => {

        const updatedName = nameRef.current.value;
        const updateJerseyNum = jerseyRef.current.value;
        const updatedHeight = heightRef.current.value;
        const updatedWeight = weightRef.current.value;
        const updatedNationality = nationalityRef.current.value;
        const updatedPosition = positionRef.current.value;

        dispatch(updatePlayerDetails({ id: selectedPlayer['Minutes Played'], data: { updateJerseyNum, updatedName, updatedHeight, updatedNationality, updatedPosition, updatedWeight, starter } }));

        handleCloseModal();

    };



    // stylesheet
    const modalTitle = {
        fontSize: 18,
        color: "#F8F8F8",
        fontWeight: 600
    };

    const modalHeader = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
    };


    return (

        <>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id="edit_player_modal" sx={style}>

                    <Box sx={modalHeader}>

                        <Typography sx={modalTitle} variant='h6'>Edit Player</Typography>

                        <IconButton onClick={handleCloseModal} sx={{ color: "#F8F8F8" }}>
                            <CloseIcon />
                        </IconButton>

                    </Box>


                    <Grid container columnSpacing={4} rowSpacing={2.5}>

                        <Grid item xs={7}>
                            <label>Player Name</label>
                            <input
                                ref={nameRef}
                                defaultValue={selectedPlayer['Player Name']}
                                type='text'
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Jersey Number</label>
                            <input
                                ref={jerseyRef}
                                defaultValue={selectedPlayer['Jersey Number']}
                                type='number'
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <label>Height</label>
                            <input
                                ref={heightRef}
                                defaultValue={selectedPlayer['Height']}
                                type='number'
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <label>Weight</label>
                            <input
                                ref={weightRef}
                                defaultValue={selectedPlayer['Weight']}
                                type='number'
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <label>Nationality</label>

                            <input
                                ref={nationalityRef}
                                defaultValue={selectedPlayer?.Nationality}
                                type='text'
                            />


                        </Grid>

                        <Grid item xs={12}>

                            <label>Position</label>

                            <Box className="custom-select" style={{ width: '100%' }}>

                                <select ref={positionRef} className='select'>

                                    {selectedPlayer?.Position}

                                    <option className='select-option' value={selectedPlayer?.Position}>{selectedPlayer?.Position}</option>
                                    <option className='select-option' value="Goalkeeper">Goalkeeper</option>
                                    <option className='select-option' value="Defender">Defender</option>
                                    <option className='select-option' value="Midfielder">Midfielder</option>
                                    <option className='select-option' value="Forward">Forward</option>

                                </select>
                            </Box>
                        </Grid>


                        <Grid item xs={12}>

                            <label>Starter</label>

                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={starter === undefined ? selectedPlayer?.Starter : starter}
                                    onChange={handleChange}
                                >
                                    <Box sx={{ display: 'flex' }}>

                                        <FormControlLabel value="No" control={<Radio sx={{ color: '#5d5c5c' }} />} label="No" />

                                        <FormControlLabel value="Yes" control={<Radio sx={{ color: '#5d5c5c' }} />} label="Yes" />

                                    </Box>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>


                    <Box sx={{ float: 'right' }}>


                        <button
                            className='update-player-button'
                            onClick={handleUpdatePlayer}
                        >
                            Update Player
                        </button>


                    </Box>


                </Box>

            </Modal>

        </>

    );
};

export default EditPlayer;