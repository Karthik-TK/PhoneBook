import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Box, Card, CardContent, CardActions, Button, Grid, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditContact from './EditContact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function ContactView() {
    const [contactsData, setContactsData] = useState([]);

    const getContacts = () => {
        axios.get("http://localhost:3100/contacts")
            .then((res) => {
                setContactsData(res.data)
            })
            .catch((error) => {
                console.log("Error :", error)
            })
    }

    useEffect(() => {
        getContacts();
    }, [])

    const deleteContact = (id) => {
        axios.delete(`http://localhost:3100/contacts/${id}/`,)
            .then(res => {
                toast.success('Contact Deleted!', { position: toast.POSITION.TOP_RIGHT, autoClose: 8000 })
            })
            .catch(error => {
                console.log("Error :", error)
                toast.error('Error', { position: toast.POSITION.TOP_CENTER, autoClose: false })
            })
        getContacts();
    }

    const editStatus = useCallback(event => {
        getContacts();
    }, [])

    return (
        <>
            {contactsData.map((data) => {
                return (
                    <Card key={data.id} sx={{ display: 'flex' }} style={{ backgroundColor: '#e0e0e0', margin: '12px' }} elevation={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant="square" {...stringAvatar(data.firstName + ' ' + data.lastName)} />
                                    </ListItemAvatar>
                                    <ListItemText primary={data.firstName + ' ' + data.lastName} secondary={data.mobile} />
                                </ListItem>
                            </CardContent>
                            <CardActions style={{ marginLeft: '24px' }}>
                                <Stack direction="row" spacing={5}>
                                    <EditContact id={data.id} editStatus={editStatus} />
                                    <Button color="error" startIcon={<DeleteIcon />} onClick={() => deleteContact(data.id)}>Delete</Button>
                                </Stack>
                            </CardActions>
                        </Box>
                    </Card>
                )
            })}
        </>
    )
}

export default ContactView
