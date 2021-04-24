import React, { useState, useEffect } from 'react';
import Axios from '../../axios/axios.js';
import { Container, Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../containers/layout/layout.js';
import TaskList from '../../containers/task-list/task_list.js';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    containStyle: {
        paddingTop: 80,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            minWidth: 230
        },
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
        textAlign: 'left'
    },
    hh: {
        paddingLeft: 20,
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(16),
        paddingLeft: 20,
        color: 'DarkSlateGray'
    },
    margin: {
        margin: theme.spacing(1),
    },
    rootPagination: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        marginLeft: 50,
        position: 'relative',
        bottom: 0

    },
    rootSpiner: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        paddingLeft: '45%',
        paddingTop: 50,
    },
}))

const typeTask = [
    {
        id: 0,
        name: 'Все задачи'
    },
    {
        id: 1,
        name: 'Активные'
    },
    {
        id: 2,
        name: 'Завершенные'
    }
]

const filt = (status) => {
    if(status) {
        return status = 2
    } else return status = 1
}

export default function TaskIndex() {

    const cls = useStyles();

    //инициализация state
    const [status, setStatus] = useState(0);
    const [term, setTerm] = useState('');
    const [rows, setRows] =  useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dataTasks, setDataTasks] = useState([]);
    const [loader, setLoader] = useState(true);

    //загрузка данных с сервера
    const listTasks = async () => {
        try {
            const response = await Axios.get('/tasks.json');
            let dataset = [];
            Object.entries(response.data).forEach(([key, value]) => {
                dataset.push({
                    keytask: key,
                    id: value.id,
                    subject: value.subject,
                    dateStart: value.dateStart,
                    description: value.description,
                    status: value.status,
                    priority: value.priority
                })
            })
            //return console.log(dataset)
            setDataTasks(dataset);
            setLoader(false)
        } catch(e) {
            console.log(e)
        }
    }

    //условия фильтров
    const filterName = dataTasks.filter(e => e.subject.toLowerCase().indexOf(term.toLowerCase()) > -1);
    const filterStatus = dataTasks.filter(e => filt(e.status).toString()[0] === status.toString()[0]);

    //фильтры

    const rowFiltered = () => {
        if (status === 0){
            return filterName
        }
        return filterName.filter(e => filt(e.status).toString()[0] === status.toString()[0]);
    }

    const rowFilteredName = () => {
        if (term.lenght === 0){
            return filterStatus
        }
        return rowFiltered().filter(e => e.subject.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    //получение данных из объектов формы
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeName = (event) => {
        setTerm(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onDischarge = () => {
        setStatus(0);
        setTerm('');
        setSelectedDate();
    }

    useEffect(() => {
        document.title = `TechSup | Мои задачи`;
        setRows(rowFiltered());
        setRows(rowFilteredName());
        listTasks();
    }, [status, term, dataTasks])

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={9}>
                            <h3 className={cls.hh}>Мои задачи</h3>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography className={cls.valueTask}>
                                Всего задач: {dataTasks.length}, выполненных: {dataTasks.filter(e => e.status).length}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr/>
                    <Grid container spacing={1} style={{marginBottom: 10, textAlign: 'center'}}>
                        <Grid item xs={12} md={3}>
                            <FormControl className={cls.formControl}>
                                <InputLabel>Виды задач</InputLabel>
                                <Select
                                    value={status}
                                    onChange={handleChange}
                                >
                                    {
                                        typeTask.map(e => <MenuItem value={e.id} key={e.id}> {e.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} style={{paddingTop: 12}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    label="По дате"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{maxWidth: 230}}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <form className={cls.root} noValidate autoComplete="off">
                                <TextField
                                    label="Поиск по названию"
                                    value={term} onChange={handleChangeName}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} md={3} style={{paddingTop: 20}}>
                            <Button variant="contained" size="small" color="primary" className={cls.margin} onClick={onDischarge}>
                                Сбросить
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <div>
                    <TaskList
                        data={rows}
                    />
                </div>
                { loader ? 
                    <div className={cls.rootSpiner}>
                        <CircularProgress size={60}/>
                    </div> :
                    dataTasks.length > 10 ? 
                        <div className={cls.rootPagination}>
                            <Pagination count={10} color="primary" />
                        </div> :
                        null
                }
            </Container>
        </Layout>
    )
}