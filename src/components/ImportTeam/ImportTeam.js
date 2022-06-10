import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { parse } from "papaparse";
import { useDispatch, useSelector } from 'react-redux';
import { savePlayers, storeCsvData, uploadCsvFile } from '../../Redux/dataSlice/dataSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: '70%', md: '60%', lg: 600 },
    bgcolor: '#2D2D2D',
    boxShadow: 24,
    height: '60%',
    p: 3,
    borderRadius: 2
};



const ImportTeam = ({ openModal, handleOpenModal, handleCloseModal }) => {



    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { allPlayer, csvData, selectedFiles } = useSelector(state => state.allData);
    const uploadButtonRef = useRef(null);
    const [error, setError] = useState('');

    //   upload csv file
    const uploadFile = () => {
        if (inputRef.current?.files?.length === 0) return;
        if (error !== '') return;
        parse(inputRef.current?.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                dispatch(storeCsvData(results.data));
            }
        })
    };



    // missing data indentify
    const missingDataFromFile = (files) => {
        parse(files[0], {
            header: true,
            complete: function (results) {
                // check is emty any property
                const isMissingData = results.data.filter(result => result?.Starter == '' || result?.Position == '' || result?.Weight == '' || result?.Height == '' || result['Player Name'] == '' || result['Player Image'] == '' || result['Jersey Number'] == '' || result['Nationality'] == '' || result['Flag Image'] == '' || result?.Appearances == '' || result['Minutes Played'] == '' || result['Goals '] == '' || result?.Assists == '' || result['Clean Sheets'] == '' || result['Saves'] == '');
                if (isMissingData.length > 0) {
                    setError('Your sheet is missing data. Please ensure all cells are filled filled out.');
                    uploadButtonRef.current.classList.add('errorFile');
                } else {
                    setError('');
                    uploadButtonRef.current.classList.remove('errorFile');
                }
            }
        })
    };


    // cout Goalkeepers, Defenders, Midilfilerds and Forwards
    const totalGoalkeppers = csvData.filter(player => player.Position === "Goalkeeper");
    const totalDefenders = csvData.filter(player => player.Position === "Defender");
    const totalMidilfilerds = csvData.filter(player => player.Position === "Midfielder");
    const totalForwards = csvData.filter(player => player.Position === "Forward");


    // style sheet
    const modalHeader = {
        color: "whitesmoke",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #494949',
        paddingBottom: '17px'
    };

    const uploadButton = {
        background: '#2D2D2D',
        boxShadow: 0,
        px: 5,
        border: error ? '1px solid #D23131' : '1px solid #494949',
        zIndex: -1,
        color: '#CBCBCB',
    };

    const title = {
        color: "#F8F8F8",
        paddingTop: '17px',
        display: 'block',
        fontWeight: 500,
        fontSize: 14
    }

    return (

        <>

            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <Box sx={modalHeader}>

                        <Typography variant="h6" component="h2">
                            Importer
                        </Typography>

                        <IconButton
                            onClick={handleCloseModal}
                            sx={{ color: 'whitesmoke' }}>
                            <CloseIcon />
                        </IconButton>

                    </Box>

                    <Typography variant='body' sx={title}>
                        Roster File
                    </Typography>

                    <Box sx={{ my: 2 }}>

                        <label htmlFor="contained-button-file">

                            <input
                                onChange={e => {
                                    dispatch(uploadCsvFile(e.target?.files));
                                    missingDataFromFile(e.target.files);
                                }}
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                accept='.csv'
                                ref={inputRef}
                                type="file"
                            />

                            <Button ref={uploadButtonRef} sx={uploadButton} variant="contained" component="span">
                                {
                                    selectedFiles[0] ? selectedFiles[0]?.name : 'No file Selected'
                                }

                            </Button>

                            <button ref={uploadButtonRef} onClick={uploadFile} className='selectButton' >
                                Select File
                            </button>

                        </label>

                    </Box>

                    {
                        error === '' &&
                        <Typography variant='body' sx={{ color: "#B7B7B7" }}>
                            File must be in .csv format
                        </Typography>

                    }

                    {
                        error !== '' &&

                        <>
                            <Typography variant='body' className='error_message'>
                                Error
                            </Typography>
                            <Typography variant='body' sx={{ color: "#999999" }}>
                                {error}
                            </Typography>
                        </>
                    }

                    {
                        csvData?.length !== 0 && error === '' &&

                        <Box sx={{ mt: 2 }}>

                            <Typography variant='body' sx={title}>
                                File Summary
                            </Typography>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>

                                <span>

                                    <Typography variant='body' sx={{ color: "#CBCBCB" }}>
                                        Total Players
                                    </Typography>

                                    <Typography variant='body' className='file-details'>
                                        {csvData?.length}
                                    </Typography>

                                </span>

                                <span>


                                    <Typography variant='body' sx={{ color: "#CBCBCB" }}>
                                        Goalkeepers
                                    </Typography>

                                    <Typography variant='body' className='file-details'>
                                        {totalGoalkeppers?.length}
                                    </Typography>

                                </span>

                                <span>


                                    <Typography variant='body' sx={{ color: "#CBCBCB" }}>
                                        Defenders
                                    </Typography>


                                    <Typography variant='body' className='file-details'>
                                        {totalDefenders?.length}
                                    </Typography>

                                </span>

                                <span>


                                    <Typography variant='body' sx={{ color: "#CBCBCB" }}>
                                        Midilfilerds
                                    </Typography>


                                    <Typography variant='body' className='file-details'>
                                        {totalMidilfilerds?.length}
                                    </Typography>

                                </span>

                                <span>

                                    <Typography variant='body' sx={{ color: "#CBCBCB" }}>
                                        Forwards
                                    </Typography>


                                    <Typography variant='body' className='file-details'>
                                        {totalForwards?.length}
                                    </Typography>

                                </span>

                            </Box>

                        </Box>
                    }

                    <Box sx={{ position: 'fixed', bottom: 30 }}>

                        {

                            csvData.length === 0 || error !== '' ?
                                <Typography variant='body' sx={{ color: "#B7B7B7" }}>
                                    Import
                                </Typography>
                                :
                                <Button
                                    onClick={() => {
                                        dispatch(savePlayers(csvData));
                                        handleCloseModal();
                                    }}
                                    sx={{
                                        background: '#FEA013',
                                        '&:hover': { background: '#FEA013' },
                                    }}
                                    variant='contained'
                                >
                                    {allPlayer.length > 0 ? " Re-Import Team" : "Import"}
                                </Button>

                        }

                    </Box>

                </Box>
            </Modal>

        </>

    );
};

export default ImportTeam;