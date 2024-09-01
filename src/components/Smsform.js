import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        transform: 'scale(1.05)', 
    },
    transition: 'transform 0.2s ease-in-out', 
}));

const SmsForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/send-sms', { phoneNumber, message });
            alert('SMS sent successfully!');
        } catch (error) {
            console.error('Error sending SMS:', error.response ? error.response.data : error.message);
            alert('Failed to send SMS: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={6}
                sx={{
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '7px 6px 5px 5px rgba(0, 0, 0, 0.3)',
                    // transition: 'box-shadow 0.3s ease-in-out', 
                    // '&:hover': {
                    //     boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                    // },
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Send SMS
                    </Typography>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        margin="normal"
                    />
                    <CustomButton type="submit" variant="contained" sx={{ mt: 3, width: '100%' }}>
                        Send SMS
                    </CustomButton>
                </Box>
            </Paper>
        </Container>
    );
};

export default SmsForm;
