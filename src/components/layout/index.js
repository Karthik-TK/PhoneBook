import React from 'react';
import { Container, Divider, Stack, Typography } from '@mui/material';
import HeaderBar from './Header';
import ContactView from '../ContactView';
import AddContact from '../AddContact';
import SearchContact from '../SearchContact';


function LayoutView() {
    return (
        <React.Fragment>
            <HeaderBar />
            <div className='App'>
                <Container style={{ marginTop: "12px" }}>
                    <Typography variant="h4" gutterBottom component="div">
                        Your Contacts
                    </Typography>
                    <Divider />
                    <div style={{ margin: '16px' }}>
                        <Stack direction="row" justifyContent="center" spacing={12}>
                            <AddContact />
                            <SearchContact />
                        </Stack>
                    </div>
                    <ContactView />
                </Container>

            </div>
        </React.Fragment>
    )
}

export default LayoutView
