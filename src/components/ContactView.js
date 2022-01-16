import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Alert, AlertTitle, Avatar, Box, Card, CardContent, CardActions, Button, IconButton, Tooltip, Stack, Paper, ToggleButton } from '@mui/material';
import AddContact from './AddContact';
import SearchContact from './SearchContact';
import DeleteIcon from '@mui/icons-material/Delete';
import EditContact from './EditContact';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RefreshIcon from '@mui/icons-material/Refresh';
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
    const [sortData, setSortData] = React.useState(true);

    const getContacts = () => {
        axios.get("http://localhost:3100/contacts")
            .then((res) => {
                setContactsData(res.data)
            })
            .catch((error) => {
                console.log("Error :", error)
            });
    }

    useEffect(() => {
        getContacts();
    }, []);

    const deleteContact = (id) => {
        axios.delete(`http://localhost:3100/contacts/${id}/`,)
            .then(res => {
                toast.success('Contact Deleted!', { position: toast.POSITION.TOP_RIGHT, autoClose: 8000 });
                getContacts();
            })
            .catch(error => {
                console.log("Error :", error)
            })

    }

    const editStatus = useCallback(event => {
        getContacts();
    }, []);

    const addStatus = useCallback(event => {
        getContacts();
    }, []);

    const searchText = useCallback(event => {
        setTimeout(() => {
            axios.get(`http://localhost:3100/contacts?q=${event}`)
                .then((res) => {
                    setContactsData(res.data)
                })
                .catch((error) => {
                    console.log("Error :", error)
                });
        }, 1000);
    }, []);

    const sortContacts = (sort) => {
        if (sort === true) {
            axios.get(`http://localhost:3100/contacts?_sort=firstName,lastName&_order=asc`)
                .then((res) => {
                    setContactsData(res.data)
                })
                .catch((error) => {
                    console.log("Error :", error)
                });
        } else {
            axios.get(`http://localhost:3100/contacts?_sort=firstName,lastName&_order=desc`)
                .then((res) => {
                    setContactsData(res.data)
                })
                .catch((error) => {
                    console.log("Error :", error)
                });
        }
    }

    const refreshData = () => {
        getContacts();
    }


    return (
        <>
            <Paper elevation={3} style={{ backgroundColor: '#b0bec5' }}>
                <div style={{ padding: '12px' }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={6}>
                        <AddContact addStatus={addStatus} />
                        <Tooltip title="Sort Contacts">
                            <ToggleButton
                                size='small'
                                value="check"
                                selected={sortData}
                                onChange={() => {
                                    setSortData(!sortData);
                                    sortContacts(!sortData)
                                }}
                            >
                                {sortData ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Refresh Contacts">
                            <IconButton aria-label="refresh" size="large" onClick={refreshData}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <SearchContact searchText={searchText} />
                    </Stack>
                </div>
            </Paper>
            {contactsData.length > 0 ?
                contactsData.map((data) => {
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
                }) :
                <div style={{ margin: '24px', textAlign: 'center' }}>
                    <Alert severity="error">
                        <AlertTitle>No Contacts Found</AlertTitle>
                        Add Contacts to View here!
                    </Alert>
                </div>
            }
        </>
    )
}

export default ContactView
