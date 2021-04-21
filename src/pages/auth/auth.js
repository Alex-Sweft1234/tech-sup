import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LayoutAuth from '../../containers/layout-auth/layout-auth.js';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15,
        minHeight: '68vh',
    },
    containStyle: {
        paddingTop: 80
    },
    hh: {
        opacity: .8,
        paddingLeft: 20,
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 30,
        opacity: .9,
        color: 'DarkSlateGray'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))



export default function Auth() {
    
    const cls = useStyles();

    useEffect(() => {
        document.title = `TechSup | Партнёры`;
    }, []);

    return(
        <LayoutAuth>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={10}>
                            <h3 className={cls.hh}>Вход в систему</h3>
                        </Grid>
                        {/*<Grid item xs={12} md={2}>
                            <Typography className={cls.valueTask}>Создание</Typography>
                        </Grid>*/}
                    </Grid>
                    <hr/>
                    
                </Paper>
            </Container>
        </LayoutAuth>
    )
}