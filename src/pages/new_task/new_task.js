import React, {useState, useEffect} from 'react';
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
        minWidth: 230,
        textAlign: 'left'
    },
    button: {
        margin: theme.spacing(1),
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


export default function NewTask() {
    
    const cls = useStyles();

    const [status, setStatus] = useState(0);
    const [rows, setRows] =  useState([]);

    /*const rowFiltered = () => {
        if (status === 0){
            return data
        }
        return data.filter(e => e.status.toString()[0] === status.toString()[0]);
    */

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState(new Date('2021-04-02T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        document.title = `TechSup | Новая задача`;
        //setRows(rowFiltered());
    }, [status]);

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
                    <form className={cls.root} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9} style={{paddingTop: 16}}>
                                <FormControl className={cls.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Приоритет</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={status}
                                        onChange={handleChange}
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
                            {/*<Grid item xs={12} md={3} style={{paddingTop: 16}}>
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
                        </Grid>
                        <div style={{marginBottom: 20}}>
                            <TextField id="outlined-basic" label="Тема задачи" variant="outlined" fullWidth/>
                        </div>
                        <div >
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание задачи"
                                fullWidth
                                multiline
                                rows={7}
                                //defaultValue="Тестовый текст"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={cls.button}
                                startIcon={<SaveIcon />}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </Layout>
    )
}