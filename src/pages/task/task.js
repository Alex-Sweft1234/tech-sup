import React, {useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../containers/layout/layout.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            marginLeft:theme.spacing(3),
        },
    },
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
    hhNumb: {
        opacity: .8,
        paddingLeft: 40,
        color: 'DarkSlateGray',
    },
    hhTask: {
        opacity: .8,
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 30,
        opacity: .9,
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
}))

const Task = ({ history }) => {
    
    const cls = useStyles();

    const [statusTask, setStatusTask] = useState(false);

    const handleChangeTask = () => {
        setStatusTask(!false);
    };

    useEffect(() => {
        document.title = `TechSup | Задача #1`;
    }, [statusTask]);

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={9}>
                            <h3 className={cls.hh}>
                                Ошибка реестра ОМС
                                {/*&nbsp;
                                {
                                    statusTask === true ?
                                        <CheckBoxRoundedIcon className={cls.statusCompleted}/> :
                                        <WatchLaterRoundedIcon className={cls.statusNotCompleted}/>
                                }*/}
                            </h3>
                            <h5 className={cls.hhNumb}>Мои задачи / Задача&nbsp;<span>#1</span></h5>
                        </Grid>
                        <Grid item xs={12} md={3} style={{paddingLeft: 40, position: 'relative', bottom: 7}}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={cls.button}
                                //startIcon={<SaveIcon />}
                            >
                                <Link to={ `/tech-sup` } className={cls.lnk}>Закрыть</Link>
                            </Button>
                            {
                                    statusTask === true ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={cls.button}
                                            //startIcon={<SaveIcon />}
                                        >
                                            Переоткрыть
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={cls.button}
                                            onClick={handleChangeTask}
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
                                        <p>
                                            <span style={{opacity: .7}}>Приоритет:</span>
                                            &nbsp;Обычный
                                        </p>
                                        <p>
                                            <span style={{opacity: .7}}>Статус:</span>
                                            &nbsp;{ statusTask === true ? 'Завершена' : 'В работе' }
                                        </p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography>
                                        <p>
                                            <span style={{opacity: .7}}>Дата создания:</span>
                                            &nbsp;11:30 28/03/2021
                                        </p>
                                        { 
                                            statusTask === false ? null :
                                            <p>
                                                <span style={{opacity: .7}}>Дата решения:</span>
                                                &nbsp;09:47 29/03/2021
                                            </p>
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr/>
                        </div>
                        <div style={{marginBottom: 30}}>
                            <h4 className={cls.hhTask}>Описание</h4>
                            <Typography style={{marginBottom: 25}}>
                                При загрузке ответа от фонда в ошибках имеется большое количество стат. карт со следующей ошибкой: 
                                Код КСЛП {4} отсутствует в перечне действующих кодов в классификаторе КСЛП, файл выгрузки прилагаю к задаче. 
                                Посодействуйте срочно в решении данной ошибки.
                            </Typography>
                            <hr/>
                        </div>
                        
                        <Grid container spacing={2}>
                                <Grid item xs={12} md={10}>
                                    <h4 className={cls.hhTask}>Решение</h4>
                                </Grid>
                                <Grid item xs={12} md={2} style={{position: 'relative', bottom: 5}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        //startIcon={<SaveIcon />}
                                    >
                                        Добавить
                                    </Button>
                                </Grid>
                            </Grid>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание решения"
                                fullWidth
                                multiline
                                rows={7}
                                //defaultValue="Тестовый текст"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            
                        </div>
                    </form>
                </Paper>
            </Container>
        </Layout>
    )
}

export default withRouter(Task);