import React from 'react';
import classes from './NotFound.module.css'
import Empty from '../../../images/404.svg'

const NotFound = () => {
    return <div className={classes.NotFound}>
         <h1 className={classes.MainHeader}>404</h1>
         <h1 className={classes.SecondaryHeader}>Not Found</h1>
         <img className={classes.Image} src={Empty}/>
    </div>
}

export default NotFound;
