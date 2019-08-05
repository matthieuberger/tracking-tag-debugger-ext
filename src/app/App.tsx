import './App.scss';

import * as React from 'react';

import { Link, Route, withRouter } from "react-router-dom";
import { Switch, createStyles, withStyles } from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import CookiesContainer from './components/cookiesContainer';
import DesktopWindows from '@material-ui/icons/DesktopWindows';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { ITabData } from '../shared/types';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NoTagFound from './components/noTagFound';
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { connect } from 'react-redux';
import routes from './routes';

interface IAppProps extends ITabData {
  tabId: number;
  classes: any;
  location: {
    pathname: string;
  }
  history: Array<string>;
}

interface IAppState {
  open: boolean;
  currentTabId: number;
  currentUrl: string;
  hasTag: boolean;
  activeRoute: string;
}

const drawerWidth: number = 240;

const styles = (theme: Theme) => createStyles({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    height: '100%',
    width: '100%',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerMenuList: {
    color: 'black'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
});

class App extends React.Component<IAppProps, IAppState> {

  state = {
    open: false,
    currentTabId: null,
    currentUrl: null,
    hasTag: false,
    activeRoute: '/'
  }

  constructor(props: IAppProps) {
    super(props);
    this.activeRoute = this.activeRoute.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== "/no-tag") {
      if (prevState.currentTabId !== nextProps.currentTabId) {
        return { currentTabId: nextProps.currentTabId, hasTag: nextProps.hasTag, tab: nextProps.tab };
      }

      if (prevState.hasTag !== nextProps.hasTag) {
        return { currentTabId: nextProps.currentTabId, hasTag: nextProps.hasTag };
      }
    }
    return null;
  }

  activeRoute(path: string) {
    return this.props.location.pathname.indexOf(path) > -1 ? true : false;
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  closePopup() {
    window.close();
  }

  render() {

    const open = this.state.open;
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Tracking-Tag Debugger</Typography>
            <div className={classes.toolbarButtons}>
              <IconButton color="inherit" aria-label="Edit">
                <DesktopWindows />
              </IconButton>
              <IconButton aria-label="Close" onClick={this.closePopup} color="inherit">
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            {routes.map((prop, key) => {
              return (
                <Link color="inherit" to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                  <MenuItem selected={this.activeRoute(prop.path)}>
                    <ListItemIcon>
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path='/' component={CookiesContainer} />
            <Route path='/no-tag' component={NoTagFound} />
            <Route path='/cookies' component={CookiesContainer} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    currentTabId: state.currentTabId,
    hasTag: state.tabs[state.currentTabId] ? state.tabs[state.currentTabId].hasTag : false,
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(App)));
