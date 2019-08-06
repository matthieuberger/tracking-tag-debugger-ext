import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Refresh from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { refreshPage } from '../../shared/actions';

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
      width: '100%',
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    title: {
      paddingBottom: 20,
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
    },
    button: {
      margin: 20,
    }
  });

class NoTagFound extends React.Component<INoTagFoundProps> {

  render() {

    const classes = this.props.classes;

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
          <Typography variant="h3" component="h3" className={classes.title}>
            Tracking-Tag not found
          </Typography>
          <Typography component="p" className={classes.text}>
            We have not found any tracking-tag module on this webiste. Please reload the page.
            If you still see this message after reloading the tag, then it might not be installed.
          </Typography>
          <Button variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.props.refreshPage()}>
            Refresh Page
            <Refresh/>
          </Button>
      </Grid>
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
