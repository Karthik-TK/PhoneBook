import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Drawer, Stack, TextField, Typography } from '@mui/material';

function AddContact() {

    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)} color='success' variant='contained' startIcon={<AddIcon />}>
                Add Contact
            </Button>
            <Drawer
                anchor={'right'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Container>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        style={{ margin: '12px' }}
                    >
                        <Stack spacing={4}>
                            <Typography variant="h4" gutterBottom component="div" textAlign={"center"}>
                                Add Contact
                            </Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="First Name"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Mobile"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                            <Button variant="outlined" color="success">
                                Add
                            </Button>
                            <Button variant="outlined" color="error" onClick={toggleDrawer(false)}>
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Drawer>
        </div>
    )
}

export default AddContact
