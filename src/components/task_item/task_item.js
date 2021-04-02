import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import SpeakerNotesSharpIcon from '@material-ui/icons/SpeakerNotesSharp';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    accordSum: {
        position: 'relative',
        top: 1,
        opacity: .6
    },
    accordSumText: {
        fontSize: theme.typography.pxToRem(16),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function TaskItem(props) {
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
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Typography className={cls.heading}>
                                <SpeakerNotesSharpIcon className={cls.accordSum}/>&emsp;
                                #{props.id}&nbsp;{props.taskname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={cls.secondaryHeading}>{props.date}</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10} style={{padding: 15}}>
                            <Typography className={cls.accordSumText}>{props.descript}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button variant="contained" size="small" color="primary" className={cls.margin}>
                                Подробнее
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}