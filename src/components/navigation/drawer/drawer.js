import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
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
import BlurOnIcon from '@material-ui/icons/BlurOn';
import InfoIcon from '@material-ui/icons/Info';

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
        marginRight: 20,
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
    margin: {
        margin: theme.spacing(1),
        color: 'white'
    },
    rootIcon: {
        '& > *': {
            margin: theme.spacing(1),
        },
        color: 'white'
    },
    lnk: {
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
        "&:hover": {
            color: 'white',
            textDecoration: 'none',
        },
    }
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
        nameItem: 'О нашей компании',
        pathURL: `/info/`
    },
]

const menuListReg = [
    {
        id: 1,
        nameItem: 'Вход',
        pathURL: `/auth/`
    },
    {
        id: 2,
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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" noWrap>
                                <Link to={ `/tech-sup` } className={classes.lnk}>
                                    <BlurOnIcon fontSize="large" style={{position: 'relative', bottom: 3}}/>&nbsp;TechSupport
                                </Link>
                            </Typography>
                        </Grid>
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
                                { index === 0 ? <ContactsIcon /> : <InfoIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={item.nameItem} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    { menuListReg.map((item, index) => (
                        <ListItem button key={index} onClick={() => history.push(item.pathURL)}>
                            <ListItemIcon>
                                { index === 0 ? <InputIcon /> : <PersonAddIcon /> }
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