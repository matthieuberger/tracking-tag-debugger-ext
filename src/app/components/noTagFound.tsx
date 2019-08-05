import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {refreshPage} from '../../shared/actions';

interface INoTagFoundProps {
  classes: any;
  hasTag: boolean;
  refreshPage: typeof refreshPage;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      height: '100%',
      width: '100%'
    }
  });

class NoTagFound extends React.Component<INoTagFoundProps> {

  render() {

    const classes = this.props.classes;

    return (
      <div className={classes.root}>
      <Typography variant="h5" component="h3">
      No Tracking-Tag installed.
      </Typography>
      <Typography component="p">
      We have not found any tracking-tag module on this webiste. Please reload the page. 
      If you still see this message after reloading the tag, then it might not be installed.
      </Typography>
      <Button variant="contained" 
        color="primary" 
        className={classes.button}
        onClick={() => this.props.refreshPage()}>
        Refresh Page
        <Refresh className={classes.rightIcon} />
      </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasTag: state.tabs[state.currentTabId] ? state.tabs[state.currentTabId].hasTag : false,
  };
};

const mapDispatchToProps = (dispatch) => ({
  refreshPage: () => dispatch(refreshPage())
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NoTagFound));
