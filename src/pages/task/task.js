import React, { useState, useEffect } from 'react';
import Axios from '../../axios/axios.js';
import { withRouter, Link } from 'react-router-dom';
import { Container, Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../containers/layout/layout.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            marginLeft:theme.spacing(3),
        },
    },
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
    hhNumb: {
        paddingLeft: 40,
        color: 'DarkSlateGray',
    },
    hhTask: {
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 30,
        color: 'DarkSlateGray'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
        textAlign: 'left'
    },
    button: {
        margin: theme.spacing(1),
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
    lnk: {
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        "&:hover": {
            color: 'white',
            textDecoration: 'none',
        },
    },
    rootSpiner: {
        display: 'block',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}))


const Task = ({ history, match}) => {

    const [dataTask, setDataTask] = useState([]);
    const [statusTask, setStatusTask] = useState(false);
    const [loader, setLoader] = useState(true);
    const [decisionLog, setDecisionLog] = useState(true);
    const [decisionTarget, setDecisionTarget] = useState('');

    const downloadTask = async () => {
        try {
            const response = await Axios.get(`/tasks/${match.params.id}.json`)
            let dataset = response.data;
            setDataTask(dataset);
            setStatusTask(dataset.status);
            setDecisionLog(dataset.statusDecision);
            setDecisionTarget(dataset.decision);
            setLoader(false)
        } catch(e) {
            console.log(e)
        }
    }
    
    const cls = useStyles();

    const EndTask = async () => {
        setLoader(false);
        let dateStop = new Date().toLocaleDateString();
        let timeStop = new Date().toLocaleTimeString().slice(0,-3);
        let status = true;
        
        try {
            const response = await Axios.patch(`/tasks/${match.params.id}/.json`, {dateStop, timeStop, status})
        } catch (e) {
            console.log(e)
        }
        setStatusTask(status);
        setLoader(true);
    };

    const КediscoverTask = async () => {
        setLoader(false);
        let dateStop = "";
        let status = false;

        try {
            const response = await Axios.patch(`/tasks/${match.params.id}/.json`, {dateStop, status})
        } catch (e) {
            console.log(e)
        }
        setStatusTask(status);
        setLoader(true);
    }

    const targetDecision = event => {
        setDecisionTarget(event.target.value)
    }

    const saveDecision = async () => {
        
        let decision = decisionTarget;
        let statusDecision = true;
        try {
            const response = await Axios.patch(`/tasks/${match.params.id}/.json`, {decision, statusDecision});
            const responseServ = await Axios.get(`/tasks/${match.params.id}.json`)
            let dataset = responseServ.data;
            setDataTask(dataset)
        } catch (e) {
            console.log(e)
        }
        setDecisionLog(true);
    }

    const editDecision = async () => {
        setDecisionLog(false);
        let statusDecision = false;
        try {
            const response = await Axios.patch(`/tasks/${match.params.id}/.json`, {statusDecision})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        document.title = `TechSup | Задача #${dataTask.id}`;
        downloadTask();
    }, [statusTask]);

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    { loader ? 
                        <div className={cls.rootSpiner}>
                            <CircularProgress size={60} style={{position: 'absolute', top: '35%', left: '47%', marginRight: '-53%'}}/>
                        </div> :
                        <div>
                            <Grid container spacing={2} style={{paddingTop: 20}}>
                                <Grid item xs={12} md={9}>
                                    <h3 className={cls.hh}>
                                        { dataTask.subject }
                                    </h3>
                                    <h5 className={cls.hhNumb}>Мои задачи / Задача&nbsp;<span>#{dataTask.id}</span></h5>
                                </Grid>
                                <Grid item xs={12} md={3} style={{paddingLeft: 40, position: 'relative', bottom: 7}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={cls.button}
                                    >
                                        <Link to={ `/tech-sup` } className={cls.lnk}>Закрыть</Link>
                                    </Button>
                                    {
                                        statusTask ?
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={cls.button}
                                                onClick={КediscoverTask}
                                            >
                                                Переоткрыть
                                            </Button> :
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={cls.button}
                                                onClick={EndTask}
                                            >
                                                Завершить
                                            </Button>
                                    }
                                </Grid>
                            </Grid>
                            <hr/>
                            <form className={cls.root} noValidate autoComplete="off">
                                <div style={{marginBottom: 20}}>
                                    <h4 className={cls.hhTask}>Детали</h4>
                                    <Grid container spacing={2} style={{marginTop: 20}}>
                                        <Grid item xs={12} md={6}>
                                            <Typography>
                                                <div>
                                                    <span style={{opacity: .7}}>Приоритет:</span>
                                                    &nbsp;{ 
                                                        dataTask.priority === 0 ? 'Низкий' :
                                                            dataTask.priority === 1 ? 'Обычный' :
                                                                dataTask.priority === 2 ? 'Средний' :
                                                                    dataTask.priority === 3 ? 'Высокий' :
                                                                    'Критический'
                                                    }
                                                </div>
                                                <div>
                                                    <span style={{opacity: .7}}>Статус:</span>
                                                    &nbsp;{ statusTask === true ? 'Завершена' : 'В работе' }
                                                </div>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography>
                                                <div>
                                                    <span style={{opacity: .7}}>Дата создания:</span>
                                                    &nbsp;{ dataTask.dateStart }&nbsp;{ dataTask.timeStart }
                                                </div>
                                                { 
                                                    statusTask ?
                                                        <div>
                                                            <span style={{opacity: .7}}>Дата решения:</span>
                                                            &nbsp;{ dataTask.dateStop }&nbsp;{ dataTask.timeStop }
                                                        </div> :
                                                        null
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <hr/>
                                </div>
                                <div style={{marginBottom: 30}}>
                                    <h4 className={cls.hhTask}>Описание</h4>
                                    <Typography style={{marginBottom: 25}}>
                                        { dataTask.description }
                                    </Typography>
                                    <hr/>
                                </div>
                                
                                <Grid container spacing={1}>
                                        <Grid item xs={12} md={10} style={{paddingLeft: 0}}>
                                            <h4 className={cls.hhTask}>Решение</h4>
                                        </Grid>
                                        <Grid item xs={12} md={2} style={{position: 'relative', bottom: 5, paddingLeft: 0}}>
                                            { decisionLog ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={editDecision}
                                                >
                                                    Редактировать
                                                </Button> :
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={saveDecision}
                                                >
                                                    Добавить
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                <div>
                                    { decisionLog ?
                                        <Typography style={{marginBottom: 25}}>
                                            { dataTask.decision }
                                        </Typography> :
                                        <TextField
                                            label="Описание решения"
                                            fullWidth
                                            multiline
                                            rows={7}
                                            variant="outlined"
                                            value={decisionTarget}
                                            onChange={targetDecision}
                                        />
                                    }  
                                </div>
                            </form>
                        </div>
                    }
                </Paper>
            </Container>
        </Layout>
    )
}

export default withRouter(Task);