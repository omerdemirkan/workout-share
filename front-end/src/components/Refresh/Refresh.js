import React from 'react';
import classes from './Refresh.module.css';

import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

const ReLoad = props => {
    return <div className={classes.ReLoad}>
        <button onClick={props.refresh} className={classes.ReLoadButton}><RefreshRoundedIcon/></button>
        <p onClick={props.refresh} className={classes.ReLoadText}>Refresh</p>
    </div>
}

export default ReLoad;