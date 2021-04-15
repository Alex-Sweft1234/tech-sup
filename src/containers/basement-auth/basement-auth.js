import React from 'react';
import { withRouter} from 'react-router-dom'
import {makeStyles, Grid} from "@material-ui/core";
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MailIcon from '@material-ui/icons/Mail';
import BlurOnIcon from '@material-ui/icons/BlurOn';

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
        <div className={clsSt.footCls}>
            <Grid container spacing={0} style={{paddingTop: 20, paddingBottom: 12, paddingLeft: 80, textAlign: 'center'}}>
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
                    <div style={{fontSize: 15, position: 'relative', top: 12, paddingBottom: 20}}>
                        <BlurOnIcon fontSize="large"/>&ensp;2021 &copy; by TechSupport
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Footer);