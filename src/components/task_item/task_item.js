import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: 5,
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        //flexBasis: '45%',
        //flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    statusCompleted: {
        fontSize: theme.typography.pxToRem(27),
        position: 'relative',
        bottom: 4,
        color: 'Teal'
    },
    statusNotCompleted: {
        fontSize: theme.typography.pxToRem(27),
        position: 'relative',
        bottom: 4,
        color: 'DarkOrange'
    },
    accordSumText: {
        fontSize: theme.typography.pxToRem(16),
    },
    margin: {
        margin: theme.spacing(1),
    },
    accordHover: {
        "&:hover": {
            borderRadius: 5,
            backgroundColor: 'AliceBlue',
        },
    },
    numberItem: {
        fontSize: theme.typography.pxToRem(14),
        backgroundColor: 'LightSlateGray',
        color: 'white',
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 1,
        paddingTop: 1,
        borderRadius: 3,
        position: 'relative',
        bottom: 3,
    },
    lnk: {
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        "&:hover": {
            color: 'white',
            textDecoration: 'none',
        },
    },
}));

const TaskItem = ({ history, status, id, taskname, date, descript }) => {
    const cls = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={cls.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={cls.accordHover}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Typography className={cls.heading}>
                                {status === 2 ? <CheckBoxRoundedIcon className={cls.statusCompleted}/> : <WatchLaterRoundedIcon className={cls.statusNotCompleted}/>}
                                &emsp;
                                <span className={cls.numberItem}>#{id}</span>&nbsp;{taskname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={cls.secondaryHeading}>{date}</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10} style={{padding: 15}}>
                            <Typography className={cls.accordSumText}>{descript}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button variant="contained" size="small" color="primary" className={cls.margin}>
                                <Link to={ `/task` } className={cls.lnk}>Подробнее</Link>
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default withRouter(TaskItem);