import React from 'react';
import classes from './Create.module.css'

class Create extends React.Component {
    state = {
        exercises: 0
    }
    render() {
        return <div className={classes.Create}>
            <div className={classes.InputBox}>
                <label>Title</label>
                <input/>
            </div>
            <div className={classes.InputBox}>
                <label>Category</label>
                <select>
                    <option>General</option>
                    <option>Powerlifting</option>
                    <option>Bodybuilding</option>
                    <option>Weightlifting</option>
                    <option>Endurance</option>
                    <option>Crossfit</option>
                </select>
            </div>
        </div>
    }
}

export default Create;