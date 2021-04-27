import React, {useState, useEffect} from 'react';
import Axios from '../../axios/axios.js';
import { withRouter, Link } from 'react-router-dom';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            marginLeft: theme.spacing(3),
        },
    },
    paperStyle: {
        padding: 15,
    },
    containStyle: {
        paddingTop: 80
    },
    hh: {
        padding: '20px 0px 10px 25px',
        color: 'DarkSlateGray'
    },
    valueTask: {
        fontSize: theme.typography.pxToRem(17),
        paddingLeft: 40,
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
    const [priority, setPriority] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');

    //Смена приоретета задачи
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };

    //Дата создания задачи
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //Описание задачи
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    //Тема задачи
    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    };

    //Отмена стандартного поведения формы
    const SubmitHandler = (event) => {
        event.preventDefault();
    }
    //Создание новой задачи
    const finishTaskHandler = async event => {
        event.preventDefault()
        let dateСurrent = new Date().toLocaleDateString();
        let timeСurrent = new Date().toLocaleTimeString().slice(0,-3);

        const response = await Axios.get('/tasks.json');
        const taskItem = {
            id: Object.values(response.data).length + 1,
            status: false,
            statusDecision: false,
            priority: priority,
            dateStart: dateСurrent,
            timeStart: timeСurrent,
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
                    <h3 className={cls.hh}>Новая задача (создание)</h3>
                    <hr/>
                    <Grid container spacing={1} style={{paddingLeft: 30}}>
                            <Grid item xs={12} md={9} style={{paddingTop: 16}}>
                                <FormControl className={cls.formControl}>
                                    <InputLabel>Приоритет</InputLabel>
                                    <Select
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
                                        format="dd.MM.yyyy"
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
                    <form className={cls.root} onSubmit={SubmitHandler}>
                        <div style={{marginBottom: 20}}>
                            <TextField
                                label="Тема задачи"
                                variant="outlined"
                                fullWidth
                                onChange={handleChangeSubject}
                            />
                        </div>
                        <div>
                            <TextField
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