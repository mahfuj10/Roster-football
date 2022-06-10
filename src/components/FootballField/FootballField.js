import React, { useEffect } from 'react';
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorField from './ErrorField';
import { selectPlayerForDetails, setCondition } from '../../Redux/dataSlice/dataSlice';

const FootballField = () => {

    const { allPlayer, playerDetails } = useSelector(state => state.allData);


    const starterPlayers = allPlayer?.filter(player => player.Starter === "Yes");
    const goalkeepers = starterPlayers?.filter(player => player.Position === 'Goalkeeper');
    const defenders = starterPlayers?.filter(player => player.Position === 'Defender');
    const midfielders = starterPlayers?.filter(player => player.Position === 'Midfielder');
    const forwards = starterPlayers?.filter(player => player.Position === 'Forward');
    const condition = goalkeepers.length === 1 && defenders.length === 4 && forwards.length === 3 && starterPlayers.length === 11;
    const dispatch = useDispatch();

    // set inital detials
    useEffect(() => {
        if (playerDetails?.Position) return;
        if (!condition) return;
        dispatch(selectPlayerForDetails(goalkeepers[0]));
        dispatch(setCondition(condition));
    }, [starterPlayers]);

    // handle select user ofr details
    const handleSelectUser = (player) => {
        dispatch(selectPlayerForDetails(player))
    };

    // stylehseet
    const box = {
        position: 'relative',
        top: '100px',
        left: '40px',
        zIndex: 999
    };

    const midilfielderContainer = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 13,
        mt: -26,
        ml: 2
    };

    return (

        <Box className="container">

            <div className="line">

            </div>
            <div className="half">

            </div>

            <div className="panelty left">
                {
                    condition &&
                    <Box sx={box}>
                        <IconButton
                            onClick={() => handleSelectUser(goalkeepers[0])}
                            className={playerDetails['Player Name'] === goalkeepers[0]['Player Name'] ? 'active-player' : 'inactive-player'}
                        >
                            {goalkeepers[0]['Jersey Number']}
                        </IconButton>
                        <Typography variant='h6'>{goalkeepers[0]['Player Name']}</Typography>
                    </Box>
                }
            </div>

            <div className="panelty right">

                {
                    condition && <Box sx={{ position: 'relative', right: 50, mt: -3 }}>
                        {
                            forwards.map((forward, index) => <Box key={forward['Player Name']} sx={{ mb: 8, pl: index === 1 ? 2 : 0 }}>
                                <IconButton
                                    onClick={() => handleSelectUser(forward)}
                                    className={playerDetails['Player Name'] === forward['Player Name'] ? 'active-player' : 'inactive-player'}
                                >
                                    {forward['Jersey Number']}
                                </IconButton>
                                <Typography variant='h6'   >{forward['Player Name']}</Typography>
                            </Box>)
                        }
                    </Box>
                }

            </div>

            {
                condition && <Box sx={{ marginLeft: '20%', pt: 3 }}>
                    {
                        defenders?.map((defender, index) => <Box key={defender['Jersey Number']} sx={{ mb: 9.5, pl: index === 0 || index === 3 ? 2.5 : 0 }}>
                            <IconButton
                                onClick={() => handleSelectUser(defender)}
                                className={playerDetails['Player Name'] === defender['Player Name'] ? 'active-player' : 'inactive-player'}
                            >
                                {defender['Jersey Number']}
                            </IconButton>
                            <Typography variant='h6'   >{defender['Player Name']}</Typography>
                        </Box>)
                    }
                </Box>
            }

            <div className="p-spot left">&nbsp;</div>
            <div className="p-spot right">&nbsp;</div>

            <div className="center">

                {
                    condition && <Box sx={midilfielderContainer}>
                        {
                            midfielders?.map(player => <Box key={player['Jersey Number']} sx={box}>
                                <IconButton
                                    onClick={() => handleSelectUser(player)}
                                    className={playerDetails['Player Name'] === player['Player Name'] ? 'active-player' : 'inactive-player'}

                                >
                                    {goalkeepers[0]['Jersey Number']}
                                </IconButton>
                                <Typography variant='h6'   >{goalkeepers[0]['Player Name']}</Typography>
                            </Box>)
                        }
                    </Box>
                }
            </div>

            <div className="p-place left"></div>
            <div className="p-place right"> </div>


            {/* team management error */}
            <ErrorField condition={condition} />

        </Box>

    );
};

export default FootballField;