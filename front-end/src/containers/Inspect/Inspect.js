import React from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Inspect.module.css';
import routeToType from '../../helper/route-to-type';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class Inspect extends React.Component {
    state = {
        workout: null,
        workoutID: null,
        copied: false
    }

    closeInspectHandler = () => {
        this.props.onSetInspect(null, routeToType(this.props.history.location.pathname));
        this.props.history.push(this.props.history.location.pathname);
    }

    openCopyToClipboardAlertHandler = () => {
        this.setState({copied: true});
    }

    closeCopyToClipboardAlertHandler = () => {
        this.setState({copied: false});
    }

    render() {
        const workout = this.props[routeToType(this.props.history.location.pathname)];
        
        if (workout) {
            let shareURL = window.location.protocol + "//" + window.location.host + '/?id=' + workout._id;
            return <React.Fragment>
                <div className={classes.InspectBox}>
                    <button className={classes.CloseButton} onClick={this.closeInspectHandler}><CloseRoundedIcon fontSize='large'/></button>
                
                <React.Fragment>
                        {workout ?
                            <div className={classes.CardBox}>
                                <Card inspect darkTitle workout={workout}/>
                            </div>
                        : null}
                        <div className={classes.CopyToClipboardBox}>
                            <CopyToClipboard text={shareURL}
                                onCopy={this.openCopyToClipboardAlertHandler}>
                                <span><FileCopyIcon className={classes.CopyIcon}/></span>
                            </CopyToClipboard>
                            <p className={classes.ShareText}>Share</p>
                        </div>
                </React.Fragment>
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
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        all: state.inspect.all,
        powerlifting: state.inspect.powerlifting,
        bodybuilding: state.inspect.bodybuilding,
        weightlifting: state.inspect.weightlifting,
        endurance: state.inspect.endurance,
        crossfit: state.inspect.crossfit,
        myFavorites: state.inspect.myFavorites,
        myWorkouts: state.inspect.myWorkouts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);