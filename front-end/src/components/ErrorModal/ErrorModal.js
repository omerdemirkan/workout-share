// Props: 
//     open: Boolean, should the error modal be open?
//     header: ...
//     close: handler method
//     list: array of error list
//     children: displayed if there is no list prop

import React from 'react';
import classes from './ErrorModal.module.css'

import Dialog from '@material-ui/core/Dialog';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const ErrorModal = props => {

    return <Dialog open={props.open}>
        
        <div style={{padding: '20px 40px'}}>
            <h2 className={classes.ErrorModalTitle}>{props.header}</h2>
            {props.list ?
                <ul className={classes.ErrorModalList}>
                    {props.list.map(item => {
                        return <li className={classes.ErrorModalMessage}><p style={{margin: '20px 0'}}>{item}</p></li>
                    })}
                </ul>
            : 
            props.children}
        </div>
        {props.close ? 
            <button className={classes.ErrorModalButton} onClick={props.close}><CloseRoundedIcon fontSize="large"/></button>
        : null}
    </Dialog>
}

export default ErrorModal;