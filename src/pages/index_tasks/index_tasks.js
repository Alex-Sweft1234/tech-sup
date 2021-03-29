import React, {useState, useEffect} from 'react';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from '../../containers/layout/layout.js';
import TaskList from '../../containers/task/task_list.js';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15,
        marginLeft: 60
    },
    containStyle: {
        paddingTop: 80
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 235,
    },
    grid: {
        
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
        name: 'Закрытые'
    }
]

export default function TaskIndex() {

    const cls = useStyles();

    const [department, setDepartment] = useState(0);
    const [rows, setRows] =  useState([]);

    const rowFiltered = () => {
        if (department === 0){
            return typeTask
        }
        return typeTask.filter(e => e.id.toString()[0] === department.toString()[0] )
    }
    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    useEffect(()=>{
        setRows(rowFiltered())
    }, [department])

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <FormControl className={cls.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Виды задач</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={department}
                                    onChange={handleChange}
                                >
                                    {
                                        typeTask.map(e => <MenuItem value={e.id} key={e.id}> {e.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <form className={cls.root} noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Поиск по названию" />
                            </form>
                        </Grid>
                    </Grid>
                    
                    {/*<div style={{ width: '100%' }}>
                        <Box display="flex" p={1}>
                            <Box p={1} flexGrow={1}>
                                <FormControl className={cls.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Виды задач</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={department}
                                        onChange={handleChange}
                                    >
                                        {
                                            typeTask.map(e => <MenuItem value={e.id} key={e.id}> {e.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box p={1}>
                                <form className={cls.root} noValidate autoComplete="off">
                                    <TextField id="standard-basic" label="Поиск по названию" />
                                </form>
                            </Box>
                        </Box>
                    </div>*/}
                    <TaskList />
                </Paper>
            </Container>
        </Layout>
    )
}