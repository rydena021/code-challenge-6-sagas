import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './ClassForm.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ClassForm extends React.Component {
  state = {
    class_name: ''
  };

  addNewClass = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_CLASS', payload: this.state });
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      class_name: ''
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Add New Class</h1>
        <div className="class-form">
          <form onSubmit={this.addNewClass} className={classes.root} autoComplete="off">
            <TextField
              id="standard-name"
              label="Class Name"
              name="class_name"
              className={classes.textField}
              value={this.state.class_name}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              ADD
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

ClassForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  classReducer: reduxState.classes,
});

export default connect(mapStateToProps)(withStyles(styles)(ClassForm));
