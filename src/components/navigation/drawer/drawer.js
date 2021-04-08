import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactsIcon from '@material-ui/icons/Contacts';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    rootGrid: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        //мобильная
        width: 50,
        [theme.breakpoints.up('sm')]: {
            //десктопная
            width: theme.spacing(7),
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const menuListTask = [
    {
        id: 1,
        nameItem: 'Новая задача',
        pathURL: `/new-task/`
    },
    {
        id: 2,
        nameItem: 'Созданные задачи',
        pathURL: `/tech-sup/`
    }
]

const menuListInfo = [
    {
        id: 1,
        nameItem: 'Контакты',
        pathURL: `/contacts/`
    },
    {
        id: 2,
        nameItem: 'Вход',
        pathURL: `/auth/`
    },
    {
        id: 3,
        nameItem: 'Регистрация',
        pathURL: `/user-reg/`
    },
]

const MiniDrawer = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h6" noWrap>
                                TechSupport
                            </Typography>
                        </Grid>
                        {/*<Grid style={{fontSize: 18, color: 'Salmon'}} item xs={12} sm={2}>
                            <span>
                                techsup@support.com
                            </span>
                        </Grid>
                        <Grid style={{fontSize: 18, color: 'Salmon'}} item xs={12} sm={2}>
                            <span>
                                8(8636)30-04-11
                            </span>
                        </Grid>*/}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <span style={{opacity: .6}}>Сайт поддержки</span>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    { menuListTask.map((item, index) => (
                    <ListItem button key={index} onClick={() => history.push(item.pathURL)}>
                        <ListItemIcon>
                            {index === 0 ? <AddToPhotosIcon /> : <AssignmentIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item.nameItem} />
                    </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    { menuListInfo.map((item, index) => (
                        <ListItem button key={index} onClick={() => history.push(item.pathURL)}>
                            <ListItemIcon>
                                {index === 0 ? <ContactsIcon /> : index === 1 ? <InputIcon /> : <PersonAddIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.nameItem} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default withRouter(MiniDrawer);