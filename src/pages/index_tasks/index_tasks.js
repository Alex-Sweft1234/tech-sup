import React from 'react';
import TaskItem from '../../components/task_item/task_item.js';
import {Container, Paper, Grid} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from '../../containers/layout/layout.js';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 15
    },
    containStyle: {
        paddingTop: 80
    },
}))

export default function TaskList() {

    const cls = useStyles();

    return(
        <Layout>
            <Container maxWidth={"lg"} className={cls.containStyle}>
                <Paper className={cls.paperStyle}>
                    <TaskItem />
                </Paper>
            </Container>
        </Layout>
    )
}