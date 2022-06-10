import { Box, Grid } from '@mui/material';
import React from 'react';
import FootballField from '../FootballField/FootballField';
import Header from '../Header/Header';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import Sidebar from '../Sidebar/Sidebar';

const TeamOverview = () => {


    return (

        <>

            <Grid container spacing={2}>

                <Grid item xs={2} lg={1}>
                    <Sidebar />
                </Grid>

                <Grid item xs={10} lg={11}>

                    <Box>
                        <Header show={false} />
                    </Box>

                    <Grid container sx={{ mt: 2, background: '#2D2D2D', overflow: 'hidden', pb: 5, borderRadius: 2 }} spacing={5} >

                        <Grid item xs={12} md={12} lg={8.5} >

                            <FootballField />

                        </Grid>


                        <Grid item md={3} lg={3.5}>


                            <PlayerDetails />

                        </Grid>



                    </Grid>




                </Grid>



            </Grid>

        </>


    );
};

export default TeamOverview;