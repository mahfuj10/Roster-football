import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TeamDetails from '../TeamDetails/TeamDetails';

const Layout = () => {

    return (

        <Grid container spacing={5}>

            <Grid item xs={2} lg={0.8}>
                <Sidebar />
            </Grid>

            <Grid item xs={10} lg={11}>
                <TeamDetails />
            </Grid>

        </Grid>


    );
};

export default Layout;