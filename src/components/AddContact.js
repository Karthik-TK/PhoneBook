import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Drawer, Stack, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure()

function AddContact({ addStatus }) {

    const [drawerStatus, setDrawerStatus] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerStatus(open);
    };

    const handleAddData = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
        const newFormData = { "id": uuidv4(), ...formData }

        await axios.post(`http://localhost:3100/contacts/`, newFormData)
            .then(res => {
                setDrawerStatus(false)
                addStatus(true)
                toast.success('New Contact Added!', { position: toast.POSITION.TOP_CENTER, autoClose: 8000 })
            })
            .catch(error => {
                console.log("Error :", error)
            })
    }

    return (
        <div>
            <Button onClick={toggleDrawer(true)} color='success' variant='contained' startIcon={<AddIcon />}>
                Add Contact
            </Button>
            <Drawer
                anchor={'right'}
                open={drawerStatus}
                onClose={toggleDrawer(false)}
            >
                <Container>
                    <Box style={{ margin: '24px', width: '50ch' }}>
                        <Stack spacing={6}>
                            <Typography variant="h4" gutterBottom component="div" textAlign={"center"}>
                                Add Contact
                            </Typography>
                            <form className="root" noValidate autoComplete="off" onSubmit={handleAddData}>
                                <Stack spacing={4}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        onChange={(e) => setBtnDisabled(!e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        onChange={(e) => setBtnDisabled(!e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="mobile"
                                        name="mobile"
                                        label="Mobile"
                                        onChange={(e) => setBtnDisabled(!e.target.value)}
                                    />
                                    <Button variant="outlined" color="success" type="submit" disabled={btnDisabled}>
                                        Add
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={toggleDrawer(false)}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Container>
            </Drawer>
        </div>
    )
}

export default AddContact
