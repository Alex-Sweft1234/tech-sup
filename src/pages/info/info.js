import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../containers/layout/layout.js';
import Photo from '../../img/info-techsup.jpg';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15,
        marginLeft: 40,
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
        marginLeft: 40,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))



export default function Info() {
    
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
                            <h3 className={cls.hh}>О нашей компании</h3>
                        </Grid>
                    </Grid>
                    <hr/>
                    <img src={Photo} alt="Описание изображения..." style={{borderRadius: 5, width: '100%', height: 'auto'}}/>
                    <Typography style={{marginTop: 15, padding: 15}}>
                        <strong>Техническая поддержка</strong> пользователей остается одной из наиболее востребованных на рынке услуг ИТ аутсорсинга.
                        По мере развития отечественного бизнеса возрастает и роль квалифицированной помощи при возникновении проблем в процессе использования информационных сервисов, необходимой сотрудникам компаний, их партнерам и клиентам.
                        При этом особенно важно, чтобы эта помощь оказывалась специалистами, обладающими необходимыми компетенциями и способными быстро разрешить любой возникший во время эксплуатации информационной системы организации вопрос.
                    </Typography>
                </Paper>
            </Container>
        </Layout>
    )
}