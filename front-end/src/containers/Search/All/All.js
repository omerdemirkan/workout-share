import React from 'react';
import axios from '../../../axios';
import Feed from '../../../components/feed/Feed';
import {Route} from 'react-router-dom'
import Inspect from '../../../containers/Inspect/Inspect'


class All extends React.Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0)
        
    }

    state = {
        workouts: null
    }

    componentDidMount() {
        axios.get('/workouts')
        .then(res => {
            console.log(res.data);
            this.setState = {
                workouts: res.data
            }
        })
        .catch(err => {
            
        });
    }

    render() {
        return <div>
            <Route path="/:id" exact component={Inspect}/>
            {this.state.workouts ? 
                <Feed history={this.props.history} darkTitles workouts={this.state.workouts}/>
            : null}
        </div>
    }
}

export default All;