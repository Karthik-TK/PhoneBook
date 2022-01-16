import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import MockData from '../MockData.json'

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
                    <Card sx={{ display: 'flex' }} style={{ backgroundColor: '#e1f5fe', margin: '12px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant="square" {...stringAvatar(data.firstName + ' ' + data.lastName)} />
                                    </ListItemAvatar>
                                    <ListItemText primary={data.firstName + ' ' + data.lastName} secondary={data.mobile} />
                                    {/* <Typography component="div" variant="h5">
                                        {data.firstName + ' ' + data.lastName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {data.mobile}
                                    </Typography> */}
                                </ListItem>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Edit {data.id}</Button>
                            </CardActions> */}
                        </Box>
                    </Card>
                )
            })}
        </>
    )
}

export default ContactView
