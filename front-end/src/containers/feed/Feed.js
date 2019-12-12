import React from 'react';
import classes from './Feed.module.css'
import Card from '../../components/UI/Card/Card'

class Feed extends React.Component {
    render() {
        return <div className={classes.Feed}>
            <div className={classes.Cards}>
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
        </div>
    }
}

export default Feed;