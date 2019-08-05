import * as React from 'react';
import * as actions from '../../shared/actions';

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core';

import CookieComponent from './cookie';
import { ICookie } from '../../shared/types';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    container: {
      marginTop: 10,
      flexGrow: 1,
      overflow: 'auto',
      maxHeight: 460
    }
  });

interface ICookiesContainerProps extends WithStyles {
  cookies: ICookie[];
  getCookies: typeof actions.getCookies;
  updateCookie: typeof actions.updateCookie;
  removeCookie: typeof actions.removeCookie;
}

interface ICookiesContainerState {
  cookies: ICookie[];
}

class CookiesContainer extends React.Component<ICookiesContainerProps, ICookiesContainerState> {

  state = {
    cookies: []
  }

  constructor(props: ICookiesContainerProps) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getCookies();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Update state with: ", nextProps)
    if (prevState.cookies !== nextProps.cookies) {
      return { cookies: nextProps.cookies };
    }

    return null;
  }

  createCookiesList() {
    var cookiesComponents = [];
    this.state.cookies.map((value, index) => {
      cookiesComponents.push(<CookieComponent 
        key={index} 
        cookie={value}
        updateCookie={(cookie) => this.props.updateCookie(cookie)}
        removeCookie={(cookie) => this.props.removeCookie(cookie)}
      />);
    });
    return cookiesComponents;
  }

  public render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
          <Typography variant="h5" component="h3">
            CS Cookies
          </Typography>
        <div className={classes.container}>
          {this.createCookiesList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    cookies: state.tabs[state.currentTabId] ? state.tabs[state.currentTabId].cookies : []
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCookies: () => dispatch(actions.getCookies()),
  updateCookie: (cookie: ICookie) => dispatch(actions.updateCookie(cookie)),
  removeCookie: (cookie: ICookie) => dispatch(actions.removeCookie(cookie))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CookiesContainer));
