import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './AnimalForm.css'

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

const emptyAnimalObject = {
  species_name: '',
  class_id: null
};

class AnimalForm extends React.Component {
  state = emptyAnimalObject;

  addNewAnimal = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_ANIMAL', payload: this.state })
    this.props.dispatch({ type: 'ANIMAL_SNACK' });
    this.clearFields();
  }

  clearFields = () => {
    this.setState(emptyAnimalObject);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CLASSES' });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    let classesHtml = this.props.classReducer.map(classObj => <MenuItem key={classObj.id} value={classObj.id}>{classObj.class_name}</MenuItem>);
    return (
      <div>
        <h1>Add New Animal</h1>
        <div className="animal-form">
          <form onSubmit={this.addNewAnimal} className={classes.root} autoComplete="off">
            <TextField
              id="standard-name"
              label="Name"
              name="species_name"
              className={classes.textField}
              value={this.state.species_name}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="class-label-placeholder">
                Class
          </InputLabel>
              <Select
                value={this.state.class_id}
                onChange={this.handleChange}
                input={<Input name="class_id" id="class-label-placeholder" />}
                displayEmpty
                name="class_id"
                className={classes.selectEmpty}
              >
                {classesHtml}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              SUBMIT
          </Button>
          </form>
        </div>
      </div>
    );
  }
}

AnimalForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  classReducer: reduxState.classes,
});

export default connect(mapStateToProps)(withStyles(styles)(AnimalForm));
