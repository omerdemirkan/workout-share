import React from 'react';
import classes from './Feed.module.css';
import Card from '../../components/UI/Card/Card';
import axios from '../../axios';

class Feed extends React.Component {

    componentDidMount() {
        //request sent from here
    }
    
    render() {
        return <div className={classes.Cards}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
                
        </div>
    }
}

export default Feed;