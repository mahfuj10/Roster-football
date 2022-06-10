import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useEffect } from 'react';
import { selectPlayerForDetails } from '../../Redux/dataSlice/dataSlice';

const ErrorField = ({ condition }) => {

    const { allPlayer } = useSelector(state => state.allData);
    const starterPlayers = allPlayer.filter(player => player.Starter === "Yes");
    const goalkeepers = starterPlayers.filter(player => player.Position === 'Goalkeeper');
    const defenders = starterPlayers.filter(player => player.Position === 'Defender');
    const midfielders = starterPlayers.filter(player => player.Position === 'Midfielder');
    const forwards = starterPlayers.filter(player => player.Position === 'Forward');
    const dispatch = useDispatch();

    useEffect(() => {
        if (condition) return;
        dispatch(selectPlayerForDetails({}));
    }, [condition]);


    return (

        <Box>

            {
                allPlayer?.length === 0 &&

                <Paper className='emty-data-box' elevation={10}>

                    <Typography variant='h6' >
                        <WarningIcon sx={{ color: "#FEA013" }} />
                        No player data found
                    </Typography>

                    <Typography variant='body'>
                        Please importter your roster first.
                    </Typography>

                </Paper>
            }

            {
                starterPlayers?.length < 11 && starterPlayers?.length !== 0 &&

                <Paper className='emty-data-box' elevation={10}>

                    <Typography variant='h6'>
                        <WarningIcon sx={{ color: "#FEA013" }} />
                        Not enough starters
                    </Typography>

                    <Typography variant='body'>
                        Your team doesn't have enough starters for one or more of the positions in the 4-3-3 formation.
                    </Typography>

                </Paper>
            }

            {
                starterPlayers?.length > 11 && starterPlayers?.length !== 0 &&

                <Paper className='emty-data-box' elevation={10}>

                    <Typography variant='h6'>
                        <WarningIcon sx={{ color: "#FEA013" }} />
                        There are too many starters
                    </Typography>

                    <Typography variant='body'>
                        Your team has too many starters for one or more of the positions in the 4-3-3 formation.
                    </Typography>

                </Paper>
            }

            {
                !condition && allPlayer?.length > 0 && starterPlayers?.length === 11 ?

                    <Paper className='emty-data-box' elevation={10}>

                        <Typography variant='h6'>
                            <WarningIcon sx={{ color: "#FEA013" }} />
                            Team manage problem
                        </Typography>

                        <Typography variant='body'>
                            Your select {goalkeepers?.length} goalkeepers, {forwards?.length} forwards, {defenders?.length} defenders and {midfielders?.length} midilfilerds players.
                        </Typography>

                        <Typography variant='body'>
                            Goalkeeper must be 1 , Defender must be 4, Midfielder must be 3 and  Forward must be 3.
                        </Typography>





                    </Paper>
                    :
                    ""

            }


        </Box>

    );
};

export default ErrorField;