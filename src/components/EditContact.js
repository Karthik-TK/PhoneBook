import React, { useState } from 'react';
import { Box, Button, Container, Drawer, Stack, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure()

const EditContact = ({ id, editStatus }) => {
    const [drawerStatus, setDrawerStatus] = useState(false);
    const [contactID, setContactID] = useState({});

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerStatus(open);
    };

    const editContact = async (key) => {
        await axios.get(`http://localhost:3100/contacts/${key}`)
            .then((res) => {
                setContactID(res.data)
            })
            .catch((error) => {
                console.log("Error :", error)
            })
        setDrawerStatus(true)
    }

    const handleEditData = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        axios.patch(`http://localhost:3100/contacts/${contactID.id}`, formData)
            .then(res => {
                setDrawerStatus(false)
                editStatus(true)
                toast.success(`Edited ${contactID.id}`, { position: toast.POSITION.TOP_RIGHT, autoClose: 8000 });
            })
            .catch(error => {
                console.log("Error :", error)
            })
    }

    return (
        <div>
            <Button color="primary" startIcon={<EditIcon />} onClick={() => {
                editContact(id);
            }}>
                Edit
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
                                Edit Contact - {contactID.id}
                            </Typography>
                            <form className="root" noValidate autoComplete="off" onSubmit={handleEditData}>
                                <Stack spacing={4}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        defaultValue={contactID.firstName}
                                    />
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        defaultValue={contactID.lastName}
                                    />
                                    <TextField
                                        required
                                        id="mobile"
                                        name="mobile"
                                        label="Mobile"
                                        defaultValue={contactID.mobile}
                                    />
                                    <Button variant="outlined" color="success" type='submit'>
                                        Edit
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

export default EditContact
