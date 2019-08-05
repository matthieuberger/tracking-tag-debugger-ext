import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface INoTagFoundProps {
  classes: any;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    }
  });

class NoTagFound extends React.Component<INoTagFoundProps> {

  render() {

    const classes = this.props.classes;

    return (
      <div>
      <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
      No Tracking-Tag installed.
      </Typography>
      <Typography component="p">
      We have not found any tracking-tag module on this webiste. Please reload the page. 
      If you still see this message after reloading the tag, then it might not be installed.
      </Typography>
      </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(NoTagFound);
