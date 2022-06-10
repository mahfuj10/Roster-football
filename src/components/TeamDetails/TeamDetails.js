import React from 'react';
import Header from '../Header/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import TeamPlayer from './TeamPlayer';
import { Box, Typography } from '@mui/material';
import ImportTeam from '../ImportTeam/ImportTeam';




const TeamDetails = () => {



    const { allPlayer, searchText } = useSelector(state => state.allData);
    const [openModal, setOpenModal] = React.useState(false);



    // modal open and close function
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    // match player by search
    const searchPlayer = allPlayer.filter(player => player['Player Name']?.toLowerCase().includes(searchText?.toLowerCase()) || player['Position']?.toLowerCase().includes(searchText?.toLowerCase()));

    // stylesheet
    const tableText = {
        border: '0px',
        color: "#CBCBCB"
    };

    const importModalTitle = {
        textAlign: 'center',
        color: "#FEA013",
        mt: 1,
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500
    };


    return (

        <>

            <Header show={true} />

            {/* table of team members */}


            {/* , height: window.screen.height - 150 */}
            <TableContainer sx={{ mt: 2, borderRadius: 3, width: '100%', background: '#2D2D2D', height: window?.screen?.height - 200 }} component={Paper}>

                <Table aria-label="simple table">

                    <TableHead>

                        <TableRow>
                            <TableCell sx={tableText}>Player Name </TableCell>
                            <TableCell sx={tableText} align="center">Jersey Number</TableCell>
                            <TableCell sx={tableText} align="center">Starter </TableCell>
                            <TableCell sx={tableText} align="center">Position</TableCell>
                            <TableCell sx={tableText} align="center">Height</TableCell>
                            <TableCell sx={tableText} align="center">Weight</TableCell>
                            <TableCell sx={tableText} align="center">Nationality</TableCell>
                            <TableCell sx={tableText} align="center">Appearances</TableCell>
                            <TableCell sx={tableText} align="center">Minutes Played</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {
                            searchPlayer.map((player, index) => <TeamPlayer
                                key={player['Player Name']}
                                player={player}
                            />
                            )
                        }
                    </TableBody>


                </Table>



                {
                    allPlayer?.length === 0 &&

                    <Box>

                        <Typography variant='h6' sx={{ textAlign: 'center', pt: 20, color: "#CBCBCB", fontSize: 14 }}>You do not have any players on the roster</Typography>

                        <Typography
                            onClick={handleOpenModal}
                            sx={importModalTitle}
                            variant='h6'
                        >
                            Import Team
                        </Typography>

                    </Box>
                }


            </TableContainer>


            {/* open import team modal */}
            <ImportTeam
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />

        </>
    );
};

export default TeamDetails;