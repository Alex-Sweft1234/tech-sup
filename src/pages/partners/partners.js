import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../containers/layout/layout.js';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15,
        minHeight: '68vh',
    },
    containStyle: {
        paddingTop: 80
    },
    hh: {
        paddingLeft: 20,
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 30,
        color: 'DarkSlateGray'
    },
}))



export default function Partners() {
    
    const cls = useStyles();

    useEffect(() => {
        document.title = `TechSup | Партнёры`;
    }, []);

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={10}>
                            <h3 className={cls.hh}>Наши партнёры</h3>
                        </Grid>
                        {/*<Grid item xs={12} md={2}>
                            <Typography className={cls.valueTask}>Создание</Typography>
                        </Grid>*/}
                    </Grid>
                    <hr/>
                    
                </Paper>
            </Container>
        </Layout>
    )
}