import React from 'react';
import classes from './Create.module.css'

class Create extends React.Component {
    render() {
        return <div className={classes.Create}>
            <label>Title</label>
            <input/>
            <label>Category</label>
        </div>
    }
}

export default Create;