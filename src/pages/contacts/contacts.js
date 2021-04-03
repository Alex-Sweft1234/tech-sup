import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../containers/layout/layout.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HouseIcon from '@material-ui/icons/House';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15,
        marginLeft: 60,
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
    valueNumber: {
        fontSize: theme.typography.pxToRem(15),
        paddingLeft: 15,
    },
    clsInfo: {
        fontSize: 18,
        paddingTop: 2,
        paddingBottom: 2,
        opacity: .8,
    },
    clsText: {
        position: 'relative',
        bottom: 5
    },
    root: {
        margin: 10,
        textAlign: 'center'
    },
    labelHref: {
        color: 'black',
        opacity: .9,
        textDecoration: 'none',
        "&:hover": {
            opacity: .7,
            textDecoration: 'none'
        },
    },
    iconStyle: {
        fontSize: theme.typography.pxToRem(27),
        position: 'relative',
        bottom: 2,
        color: 'DarkSlateGray'
    },
    iconStyleLabel: {
        fontSize: theme.typography.pxToRem(27),
        position: 'relative',
        bottom: 7,
        color: 'DarkSlateGray'
    }
}))

const loadScript = (src, onLoad) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    script.onload = onLoad;
};

const init = () => {
    const myMap = new window.ymaps.Map("map", {
        center: [47.709326, 40.215239],
        zoom: 16
    });

    myMap.geoObjects.add(new window.ymaps.Placemark([47.709326, 40.215239], {
        balloonContent: 'ООО "TechSupport"<br />Телефон: 8 (8636) 30-04-11'
    }, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    }))
};

export default function Contacts() {
    
    const cls = useStyles();

    useEffect(() => {
        document.title = `TechSup | Контакты`;
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU", () => {
            window.ymaps.ready(init);
        });
    }, []);

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={9}>
                            <h3 className={cls.hh}>Контакты</h3>
                        </Grid>
                        {/*<Grid item xs={12} md={3}>
                            <Typography className={cls.valueNumber}></Typography>
                        </Grid>*/}
                    </Grid>
                    <hr/>
                    <div>
                        <div id="map" style={{ width: '100%', height: 300, padding: 10}} />
                    </div>
                    <Card className={cls.root}>
                            <CardContent style={{backgroundColor: '#fafbfc'}}>
                                <div className={cls.clsInfo}>
                                    <address className={cls.clsText}>
                                        <strong>ООО "TechSupport"</strong>
                                        <br/><HouseIcon className={cls.iconStyle}/>&nbsp;Адрес: 346500, Ростовская область, город Шахты, площадь В. И. Ленина, дом 1
                                    </address>
                                </div>
                                <Typography style={{marginBottom: 15}}>
                                    <a href="#" className={cls.labelHref}>
                                        <PhoneInTalkIcon className={cls.iconStyleLabel}/>
                                        <span className={cls.clsText}>&nbsp;Телефон: 8 (8636) 30-04-11</span>
                                    </a>
                                </Typography>
                                <Typography>
                                    <a href="#" className={cls.labelHref}>
                                        <EmailIcon className={cls.iconStyleLabel}/>
                                        <span className={cls.clsText}>&nbsp;E-mail: techsup@support.ru</span>
                                    </a>
                                </Typography>
                            </CardContent>
                            </Card>
                </Paper>
            </Container>
        </Layout>
    )
}