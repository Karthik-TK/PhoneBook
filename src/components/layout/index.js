import React from 'react';
import { Container, Typography } from '@mui/material';
import HeaderBar from './Header';
import ContactView from '../ContactView';


function LayoutView() {
    return (
        <div>
            <HeaderBar />
            <Container style={{ marginTop: "12px" }}>
                <Typography variant="h4" gutterBottom component="div" textAlign={"center"}>
                    Your Contacts
                </Typography>
                <ContactView />
            </Container>

        </div>
    )
}

export default LayoutView
