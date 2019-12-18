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

class Inspect extends React.Component {
    state = {
        workout: null,
        copied: false
    }
    componentDidMount() {
        axios.get('/workouts/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                workout: res.data
            })
        })
        .catch(err => {
            console.log(err)
        });
        console.log(window.location.href);
    }

    openCopyToClipboardAlertHandler = () => {
        this.setState({copied: true});
    }

    closeCopyToClipboardAlertHandler = () => {
        this.setState({copied: false});
    }

    render() {
        return <div className={classes.InspectBox}>
            
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
                
            : <CircularProgress/>}
            

        </div>
    }
}

export default Inspect;