import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import {makeStyles, Grid} from "@material-ui/core";
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import InfoIcon from '@material-ui/icons/Info';
import ExploreIcon from '@material-ui/icons/Explore';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';

const cls = makeStyles((theme) => ({
    footCls: {
        left: 0,
        bottom: 0,
        width: '100%',
        color: 'white',
        backgroundColor: theme.palette.primary.light,
        fontSize: 14,
    },
    labelCls: {
        fontSize: 14,
    },
    aHref: {
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        "&:hover": {
            opacity: .7,
            color: 'DarkSlateGray',
            textDecoration: 'none',
        },
    },
    labelInfo: {
        fontSize: 15,
        position: 'relative',
        top: 1
    }
}));

const Footer = ({ history }) => {

    const clsSt = cls();

    return(
        <div className={clsSt.footCls} style={{paddingBottom: 30}}>
            <Grid container spacing={0} style={{paddingTop: 30, textAlign: 'center'}}>
                <Grid item xs={12} md={1}>
                    {/*<p>
                        &ensp;2021 &copy; by TechSupport
                    </p>*/}
                </Grid>
                <Grid style={{paddingLeft: 90}} item xs={12} md={3}>
                    <p style={{fontSize: 18}}>
                        Контакты
                    </p>
                    <p>
                        <a href="#" className={clsSt.aHref}>
                            <LocalPhoneIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>8(8636)30-04-11</span>
                        </a>
                    </p>
                    <p>
                        <a href="#" className={clsSt.aHref} target="_blank">
                            <MailIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>techsup@support.ru</span>
                        </a>
                    </p>
                </Grid>
                <Grid style={{paddingLeft: 90}} item xs={12} md={3}>
                    <p style={{fontSize: 18}}>
                        Задачи
                    </p>
                    <p>
                        <Link to={ `/new-task` } className={clsSt.aHref}>
                            <AddToPhotosIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Создать задачу</span>
                        </Link>
                    </p>
                    <p>
                        <a href="#" className={clsSt.aHref}>
                            <AssignmentIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Активные задачи</span>
                        </a>
                    </p>
                    <p>
                        <a href="#" className={clsSt.aHref}>
                            <AssignmentTurnedInIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Архив задач</span>
                        </a>
                    </p>
                </Grid>
                <Grid style={{paddingLeft: 90}} item xs={12} md={3}>
                    <p style={{fontSize: 18}}>
                        О нас
                    </p>
                    <p>
                        <a href="#" className={clsSt.aHref}>
                            <InfoIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Общие сведения</span>
                        </a>
                    </p>
                    <p>
                        <Link to={ `/contacts` } className={clsSt.aHref}>
                            <ExploreIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Как нас найти</span>
                        </Link>
                    </p>
                    <p>
                        <Link to={ `/partners` } className={clsSt.aHref}>
                            <GroupIcon style={{fontSize: 20}}/>&nbsp;
                            <span className={clsSt.labelInfo}>Наши партнёры</span>
                        </Link>
                    </p>
                </Grid>
                <Grid item xs={12} md={2} style={{textAlign: 'center'}}>
                    {/*<p>
                        &ensp;2021 &copy; by TechSupport
                    </p>*/}
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Footer);