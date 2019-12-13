import React from 'react';
import classes from './Main.module.css'

const Main = props => {
    return <div className={classes.Main}>
        {props.children}
    </div>
}

export default Main;