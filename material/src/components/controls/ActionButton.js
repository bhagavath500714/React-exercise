import React from 'react'
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {  
        minWidth: '0 !important',
        margin: '0 !important',
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiSvgIcon-root': {
            color: '#ff7961 !important',
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))


// const useStyles = makeStyles(theme => ({
//     root: {  
//       minWidth: '0 !important',
//       margin: '4px !important',
//     },
//     secondary: {
//         backgroundColor: '#ff796114 !important',
//         '& .MuiSvgIcon-root': {
//             color: '#ff7961 !important',
//         }
//     },
//     primary: {
//         backgroundColor: theme.palette.primary.light,
//         '& .MuiButton-label': {
//             color: theme.palette.primary.main,
//         }
//     },
// }))

export default function ActionButton(props) {
    const {color, children, onClick } = props;
    const classes = useStyles();
    return (
        <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
            {children}
        </Button>
    )
}
