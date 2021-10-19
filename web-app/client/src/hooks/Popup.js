import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>title goes here</div>
            </DialogTitle>
            <DialogContent>
                <div>dialog...</div>
            </DialogContent>
        </Dialog>
    )
}
