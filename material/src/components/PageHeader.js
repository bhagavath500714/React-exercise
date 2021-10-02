import React from 'react';
import { Paper, Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff !important'
    },
    PageHeader: {
        padding: theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'flex',
        padding:theme.spacing(2),
        color:'#3c44b1 !important'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: 0.6
        }
    }
}))

const PageHeader = (props) => {
    const { title, subTitle, icon } = props;
    const classes = useStyles();
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.PageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography variant="h6" component="div">{title}</Typography>
                    <Typography variant="subtitle2" component="div">{subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}

export default PageHeader;
