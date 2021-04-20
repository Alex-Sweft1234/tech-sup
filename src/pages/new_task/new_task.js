import React, {useState, useEffect} from 'react';
import Axios from '../../axios/axios.js';
import { withRouter, Link } from 'react-router-dom';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../containers/layout/layout.js';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LensSharpIcon from '@material-ui/icons/LensSharp';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

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
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 30,
        opacity: .9,
        color: 'DarkSlateGray'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
        textAlign: 'left'
    },
    button: {
        margin: theme.spacing(1),
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

const priorityType = [
    {
        id: 0,
        name: 'Низкий',
        color: 'Green'
    },
    {
        id: 1,
        name: 'Обычный',
        color: 'Yellow'
    },
    {
        id: 2,
        name: 'Высокий',
        color: 'Orange'
    },
    {
        id: 3,
        name: 'Критический',
        color: 'Red'
    }
]

const NewTask = ({ history }) => {
    
    const cls = useStyles();

    const [status, setStatus] = useState(0);

    //Смена приоретета задачи
    const [priority, setPriority] = useState(0);
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };

    //Дата создания задачи
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //Описание задачи
    const [description, setDescription] = useState('');
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    //Тема задачи
    const [subject, setSubject] = useState('');
    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    };

    //Создание новой задачи
    const SubmitHandler = (event) => {
        event.preventDefault();
    }

    const finishTaskHandler = async event => {
        event.preventDefault()

        const taskItem = {
            status: 1,
            priority: priority,
            dateStart: selectedDate,
            subject: subject,
            description: description,
        }

        try {
            Axios.post('/tasks.json', taskItem)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        document.title = `TechSup | Новая задача`;
    }, [status, priority, selectedDate, subject, description]);

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2} style={{paddingTop: 20}}>
                        <Grid item xs={12} md={10}>
                            <h3 className={cls.hh}>Новая задача</h3>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography className={cls.valueTask}>Создание</Typography>
                        </Grid>
                    </Grid>
                    <hr/>
                    <form className={cls.root} onSubmit={SubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9} style={{paddingTop: 16}}>
                                <FormControl className={cls.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Приоритет</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={priority}
                                        onChange={handleChangePriority}
                                    >
                                        {
                                            priorityType.map(e => <MenuItem value={e.id} key={e.id}>
                                                <span style={{color: e.color, position: 'relative', bottom: 2}}>
                                                    &nbsp;<LensSharpIcon />
                                                </span> 
                                                    &emsp;{e.name}
                                            </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3} style={{paddingTop: 12}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker
                                        disableToolbar
                                        disabled
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        id="date-picker-inline"
                                        label="Дата создания"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{maxWidth: 220, marginLeft: 7}}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <div style={{marginBottom: 20}}>
                            <TextField
                                id="outlined-basic"
                                label="Тема задачи"
                                variant="outlined"
                                fullWidth
                                onChange={handleChangeSubject}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание задачи"
                                fullWidth
                                multiline
                                rows={7}
                                variant="outlined"
                                onChange={handleChangeDescription}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={cls.button}
                                startIcon={<SaveIcon />}
                                onClick={finishTaskHandler}
                            >
                                <Link to={ `/tech-sup` } className={cls.lnk}>Сохранить</Link>
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </Layout>
    )
}

export default withRouter(NewTask);