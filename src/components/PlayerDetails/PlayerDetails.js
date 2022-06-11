import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const PlayerDetails = () => {

    const { playerDetails } = useSelector(state => state.allData);


    return (

        <>

            {
                !playerDetails?.Position ? <Box className='player-details-container' sx={{ height: '100%' }}>
                    <hr className='hr' />
                </Box>

                    :

                    <Box className='player-details-container'>

                        <Box sx={{ pl: 2 }}>
                            <Typography variant='h1'>{playerDetails['Jersey Number']}</Typography>
                            <Typography className='jersey-number' variant='h6'>{playerDetails['Jersey Number']}
                            </Typography>
                        </Box>


                        <Box className='player-image'>
                            <img src={playerDetails['Player Image']} alt="" />
                        </Box>

                        <Box className='player-title'>
                            <Typography variant='h5'>{[playerDetails['Player Name']]}</Typography>
                            <Typography variant='h6'>{[playerDetails?.Position]}</Typography>
                        </Box>

                        <Box className='personal-details'>
                            <span>
                                <small>Height</small>
                                <h6>{playerDetails?.Height} m</h6>
                            </span>
                            <span>
                                <small>Weight</small>
                                <h6>{playerDetails?.Weight} kg</h6>
                            </span>
                            <span>
                                <small>Nationality</small>
                                <h6 style={{ display: 'flex', alignItems: 'center', columnGap: 5 }}>
                                    <Avatar
                                        alt='countryimage'
                                        src={playerDetails['Flag Image']}
                                        sx={{ width: 16, height: 16 }}
                                    />
                                    {playerDetails?.Nationality}
                                </h6>
                            </span>
                        </Box>


                        <Box className='team-details'>

                            <span>
                                <Typography variant='h5'>{playerDetails?.Appearances}</Typography>
                                <Typography variant='h6'>Appearances</Typography>
                            </span>

                            <span>
                                <Typography variant='h5'>{playerDetails['Minutes Played']}</Typography>
                                <Typography variant='h6'>Minutes Played</Typography>
                            </span>

                            {
                                playerDetails?.Position === 'Goalkeeper' &&
                                <span>
                                    <Typography variant='h5'>{playerDetails['Clean Sheets']}</Typography>
                                    <Typography variant='h6'>Clean Sheets</Typography>
                                </span>
                            }

                            {
                                playerDetails?.Position === 'Goalkeeper' &&
                                <span>
                                    <Typography variant='h5'>{playerDetails?.Saves}</Typography>
                                    <Typography variant='h6'>Saves</Typography>
                                </span>
                            }

                            {
                                playerDetails?.Position !== 'Goalkeeper' &&
                                <span>
                                    <Typography variant='h5'>{playerDetails['Goals ']}</Typography>
                                    <Typography variant='h6'>Goals</Typography>
                                </span>
                            }

                            {
                                playerDetails?.Position !== 'Goalkeeper' &&
                                <span>
                                    <Typography variant='h5'>{playerDetails?.Assists}</Typography>
                                    <Typography variant='h6'>Assists</Typography>
                                </span>
                            }

                        </Box>

                    </Box>

            }
        </>

    );
};

export default PlayerDetails;