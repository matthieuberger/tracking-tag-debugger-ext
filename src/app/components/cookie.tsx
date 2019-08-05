import * as React from 'react';

import { Checkbox, FormControlLabel, Grid, Paper, Theme, createStyles, withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ICookie } from '../../shared/types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface ICookieProps {
  classes: any;
  key: number;
  cookie: ICookie;
}


const styles = (theme: Theme) =>
  createStyles({
    panel: {
      margin: 0
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  });



class CookieComponent extends React.Component<ICookieProps> {

  public render() {
    const classes = this.props.classes;
    const cookie = this.props.cookie;
    return (
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Domain: {cookie.domain} </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>Name: {cookie.name} </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Value"
                  defaultValue="Hello World"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  multiline
                  fullWidth
                  value={cookie.value}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Expiration"
                  type="datetime-local"
                  defaultValue="Hello World"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={cookie.expirationDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Path"
                  defaultValue="Hello World"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={cookie.path}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value={cookie.hostOnly}
                  control={<Checkbox color="primary" />}
                  label="Host Only"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value={cookie.session}
                  control={<Checkbox color="primary" />}
                  label="Session"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value={cookie.secure}
                  control={<Checkbox color="primary" />}
                  label="Secure"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  value={cookie.httpOnly}
                  control={<Checkbox color="primary" />}
                  label="Http Only"
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(CookieComponent);

