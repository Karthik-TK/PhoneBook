import React from 'react';
import { Container, Typography } from '@mui/material';
import HeaderBar from './Header';
import ContactView from '../ContactView';
import AddContact from '../AddContact';


function LayoutView() {
    return (
        <React.Fragment>
            <HeaderBar />
            <div className='App'>
                <Container style={{ marginTop: "12px" }}>
                    <Typography variant="h4" gutterBottom component="div">
                        Your Contacts
                    </Typography>
                    <hr />
                    <AddContact />
                    <br />
                    <ContactView />
                </Container>

            </div>
        </React.Fragment>
    )
}

export default LayoutView
