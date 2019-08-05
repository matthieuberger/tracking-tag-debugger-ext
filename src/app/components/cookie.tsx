import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core';
import { removeCookie, updateCookie } from '../../shared/actions';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { ICookie } from '../../shared/types';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface ICookieComponentProps {
  classes: any;
  key: number;
  cookie: ICookie;

  // Functions
  updateCookie: typeof updateCookie;
  removeCookie: typeof removeCookie;
}

interface ICookieComponentState {
  modified: boolean;
  cookie: ICookie;
}


const styles = (theme: Theme) =>
  createStyles({
    noMargin: {
      margin: '0px',
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
    smallColumn: {
      flexBasis: '10%',
    },
    column: {
      padding: 10,
      flexBasis: '45%',
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
    labelRoot: {
      fontSize: 20,
      color: 'black',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  });



class CookieComponent extends React.Component<ICookieComponentProps, ICookieComponentState> {

  state = {
    modified: false,
    cookie: {
      path: "",
      domain: "",
      name: "",
      value: "",
      expirationDate: 0,
      secure: false,
      httpOnly: false,
      session: false,
      hostOnly: false,
      sameSite: "",
      storeId: "",
    }
  }

  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.modified && prevState.cookie !== nextProps.cookie) {
      return { cookie: nextProps.cookie, modified: false };
    }
    return null;
  }

  onChangeField(event) {
    const name = event.target.name;
    var value = event.target.value;

    if (name === "expirationDate" && typeof value === "string") {
      value = this.stringDateToTimestamp(value);
      console.log("New val:", value);
    }

    this.setState({
      modified: true,
      cookie: {
        ...this.state.cookie,
        [name]: value
      }
    });
  }

  handleCancel() {
    this.setState({
      modified: false,
      cookie: this.props.cookie
    });
  }

  handleSave() {
    const cookie = this.state.cookie;
    this.props.updateCookie(cookie);
  }

  handleRemove(event) {
    // Use to stop opening panel
    event.stopPropagation();
    const cookie = this.state.cookie;
    this.props.removeCookie(cookie);
  }

  timeStampToStringDate(timeStamp: number): string {
    const date = new Date(timeStamp * 1000).toISOString();
    return date.split('T')[0];
  }

  stringDateToTimestamp(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getTime() / 1000;
  }

  public render() {
    const classes = this.props.classes;
    const disableSave = !this.state.modified;
    const cookie = this.state.cookie;
    const expirationDate = this.timeStampToStringDate(cookie.expirationDate);
    return (
      <ExpansionPanel className={classes.noMargin}>
        <ExpansionPanelSummary
          classes={{content: classes.noMargin}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.smallColumn}><IconButton aria-label="delete" className={classes.margin} onClick={this.handleRemove}>
                <DeleteIcon fontSize="small" />
              </IconButton></div>
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
                className={classes.textField}
                InputLabelProps={{ classes: { root: classes.labelRoot } }}
                margin="normal"
                multiline
                fullWidth
                onChange={this.onChangeField}
                name="value"
                value={cookie.value}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                type="date"
                label="Expiration Date"
                className={classes.textField}
                InputLabelProps={{ classes: { root: classes.labelRoot } }}
                margin="normal"
                fullWidth
                name="expirationDate"
                onChange={this.onChangeField}
                value={expirationDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Path"
                className={classes.textField}
                margin="normal"
                InputLabelProps={{ classes: { root: classes.labelRoot } }}
                fullWidth
                name="path"
                onChange={this.onChangeField}
                value={cookie.path}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={cookie.hostOnly}
                name="hostOnly"
                control={<Checkbox color="primary" />}
                label="Host Only"
                onChange={this.onChangeField}
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={cookie.session}
                name="session"
                control={<Checkbox color="primary" />}
                onChange={this.onChangeField}
                label="Session"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={cookie.secure}
                name="secure"
                control={<Checkbox color="primary" />}
                onChange={this.onChangeField}
                label="Secure"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={cookie.httpOnly}
                name="httpOnly"
                control={<Checkbox color="primary" />}
                onChange={this.onChangeField}
                label="Http Only"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleSave} disabled={disableSave} size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(CookieComponent);

