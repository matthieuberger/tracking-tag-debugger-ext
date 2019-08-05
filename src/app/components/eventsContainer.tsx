import * as React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 0
    }
  });


interface IEventsContainerProps {
  classes: any;
}

class EventsContainer extends React.Component<IEventsContainerProps> {

  public render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h3">
            CS Cookies
        </Typography>
        <Typography component="p">
            Here will be display a form with CS Cookies
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(EventsContainer);

