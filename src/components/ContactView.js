import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Box, Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MockData from '../mockData.json';
import EditContact from './EditContact';

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
    return (
        <>
            {MockData.map((data) => {
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
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <EditContact id={data.id} />
                                    </Grid>
                                    <Grid item xs>
                                        <Button color="error" size="small" startIcon={<DeleteIcon />} >Delete</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Box>
                    </Card>
                )
            })}
        </>
    )
}

export default ContactView
