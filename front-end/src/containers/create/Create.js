import React from 'react';
import axios from '../../axios';
import { connect } from 'react-redux'
import { colorsByDisplay } from '../../helper/colors-by-path';

import classes from './Create.module.css';

// Material UI

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        500: grey[900],
        backgroundColor: grey[100]
    }
  }
});

class Create extends React.Component {
    state = {
        exercises: [],
        title: '',
        select: 'General'
    }

    titleChangeHandler = event => {
        this.setState({
            title: event.target.value
        });
    }

    onSelectHandler = event => {
        this.setState({
            select: event.target.value
        });
    }

    render() {
        console.log(this.state.title);
        return <div className={classes.Create}>
            <ThemeProvider theme={theme}>
                <TextField 
                    color='primary' 
                    id="standard-basic" 
                    label="Title" 
                    placeholder="e.g. Heavy Chest Day"
                    autoComplete="off"
                    style={{width: '100%', height: '40px', fontSize: '1.5rem', color: 'rgb(71, 71, 71)'}}
                    className={classes.TitleInput}
                    onClick={this.titleChangeHandler}
                />
                <div className={classes.SelectBox}>
                    <h2 className={classes.SelectPreview}>A <span className={classes.SelectPreviewInput} style={{borderColor: colorsByDisplay(this.state.select).activeColor}}>{this.state.select}</span> Workout</h2>
                    <Select
                    labelId="demo-simple-select-placeholder-label-label"                    id="demo-simple-select-placeholder-label"
                    value={this.state.select}
                    onChange={this.onSelectHandler}
                    displayEmpty
                    color='primary'
                    className={classes.SelectInput}
                    style={{width: '100%', height: '40px', color: 'rgb(71, 71, 71)'}}
                    >
                        <MenuItem value={'General'} selected>General</MenuItem>
                        <MenuItem value={'Powerlifting'} selected>Powerlifting</MenuItem>
                        <MenuItem value={'Bodybuilding'} selected>Bodybuilding</MenuItem>
                        <MenuItem value={'Weightlifting'} selected>Weightlifting</MenuItem>
                        <MenuItem value={'Endurance'} selected>Endurance</MenuItem>
                        <MenuItem value={'Crossfit'} selected>Crossfit</MenuItem>
                    </Select>
                </div>
            
            <h2 style={{color: 'rgb(71, 71, 71)'}}>Exercises</h2>
            <div className={classes.NewExerciseBox}>
                <TextField 
                    color='primary' 
                    id="standard-basic" 
                    label="Title" 
                    placeholder="e.g. Heavy Chest Day"
                    autoComplete="off"
                    style={{width: '100%', height: '40px', fontSize: '1.5rem', color: 'rgb(71, 71, 71)'}}
                    className={classes.TitleInput}
                />
            </div>
            </ThemeProvider>
        </div>
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default Create;