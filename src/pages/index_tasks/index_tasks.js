import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from '../../containers/layout/layout.js';
import TaskList from '../../containers/task-list/task_list.js';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import ListTasks from '../../content/tasks.json';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 40,
    },
    containStyle: {
        paddingTop: 80
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
        opacity: .8,
        paddingLeft: 20,
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(16),
        opacity: .9,
        paddingLeft: 10,
        color: 'DarkSlateGray'
    }
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

export default function TaskIndex() {

    const cls = useStyles();
    const data = ListTasks;

    const [status, setStatus] = useState(0);
    const [term, setTerm] = useState('');
    const [rows, setRows] =  useState([]);

    const filterName = data.filter(e => e.taskname.toLowerCase().indexOf(term.toLowerCase()) > -1);
    const filterStatus = data.filter(e => e.status.toString()[0] === status.toString()[0]);

    const rowFiltered = () => {
        if (status === 0){
            return filterName
        }
        return filterName.filter(e => e.status.toString()[0] === status.toString()[0]);
    }

    const rowFilteredName = () => {
        if (term.lenght === 0){
            return filterStatus
        }
        return rowFiltered().filter(e => e.taskname.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeName = (event) => {
        setTerm(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState(new Date('2021-04-02T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(()=>{
        document.title = `TechSup | Мои задачи`;
        setRows(rowFiltered());
        setRows(rowFilteredName())
    }, [status, term])

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
                                Всего задач: {data.length}, выполненных: {data.filter(e => e.status === 2).length}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr/>
                    <Grid container spacing={2} style={{marginBottom: 10, textAlign: 'center'}}>
                        <Grid item xs={12} md={6}>
                            <FormControl className={cls.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Виды задач</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={status}
                                    onChange={handleChange}
                                >
                                    {
                                        typeTask.map(e => <MenuItem value={e.id} key={e.id}> {e.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        {/*<Grid item xs={12} md={4} style={{paddingTop: 16}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    id="date-picker-inline"
                                    label="По дате"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>*/}
                        <Grid item xs={12} md={6}>
                            <form className={cls.root} noValidate autoComplete="off">
                                <TextField
                                    id="standard-basic"
                                    label="Поиск по названию"
                                    value={term} onChange={handleChangeName}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
                <div style={{marginLeft: 40}}>
                    <TaskList 
                        data={rows}
                    />
                </div>
            </Container>
        </Layout>
    )
}