import React from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Inspect.module.css';
import axios from '../../axios'

import {CopyToClipboard} from 'react-copy-to-clipboard';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class Inspect extends React.Component {
    state = {
        workout: null,
        workoutID: null,
        copied: false
    }
    componentDidMount() {
        this.refreshSearchHandler();
    }

    componentDidUpdate() {
        if (this.props.id !== this.state.workoutID) {
            this.refreshSearchHandler();
        }
    }

    refreshSearchHandler = () => {
        axios.get('/workouts/' + this.props.id)
        .then(res => {
            this.setState({
                workout: res.data,
                workoutID: this.props.id
            })
        })
        .catch(err => {
            console.log(err)
        });
    }

    closeInspectHandler = () => {
        this.props.history.push(this.props.history.location.pathname);
    }

    openCopyToClipboardAlertHandler = () => {
        this.setState({copied: true});
    }

    closeCopyToClipboardAlertHandler = () => {
        this.setState({copied: false});
    }

    render() {
        return <React.Fragment>
            <div className={classes.InspectBox}>
                <button className={classes.CloseButton} onClick={this.closeInspectHandler}><CloseRoundedIcon fontSize='large'/></button>
            
            {this.state.workout ?
                <React.Fragment>
                    <div className={classes.CardBox}>
                        <Card darkTitle workout={this.state.workout}/>
                    </div>
                    <div className={classes.CopyToClipboardBox}>
                        <CopyToClipboard text={window.location.href}
                            onCopy={this.openCopyToClipboardAlertHandler}>
                            <span><FileCopyIcon className={classes.CopyIcon}/></span>
                        </CopyToClipboard>
                        <p className={classes.ShareText}>Share</p>
                    </div>

                    

                </React.Fragment>
                
            : <CircularProgress/>}
        </div>
        <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        open={this.state.copied}
        autoHideDuration={3000}
        onClose={this.closeCopyToClipboardAlertHandler}
        message={<span className={classes.TwoMoreModalText} id="message-id">Link copied to clipboard</span>}
        action={[
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={this.closeCopyToClipboardAlertHandler}
            >
                <CloseIcon />
            </IconButton>,
        ]}
        />
        </React.Fragment>
    }
}

export default Inspect;