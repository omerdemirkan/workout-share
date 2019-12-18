import React from 'react';
import axios from '../../../axios';
import Feed from '../../../components/feed/Feed';
import {Route} from 'react-router-dom'
import Inspect from '../../../containers/Inspect/Inspect'


class All extends React.Component {
    constructor(props) {
        super(props);
        // axios.get('/workouts')
        // .then(res => {
            // this.state = {

            // }
        // })
        // .catch(err => {
            
        // });
        window.scrollTo(0, 0)
    }

    state = {
        workouts: [
            {
                title: 'Boojie back workout 1',
                type: 'general',
                _id:'aolrlkaihgr',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 30
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 30
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    },
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    }
                ]
            },
            {
                title: 'Boojie back workout2',
                type: 'endurance',
                _id:'aolrlshtgsfhtg',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 0
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    }
                ]
            },
            {
                title: 'Boojie back workout3',
                type: 'weightlifting',
                _id:'aolardgfagdrtaihgr',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 0
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    }
                ]
            },
            {
                title: 'Boojie back workout4',
                type: 'crossfit',
                _id:'adsrgfargihgr',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 0
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    }
                ]
            },
            {
                title: 'Boojie back workout5',
                type: 'powerlifting',
                _id:'aagradrtgsaihgr',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 0
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    }
                ]
            },
            {
                title: 'Boojie back workout5',
                type: 'powerlifting',
                _id:'aagradrtgsaihgr',
                exercises: [
                    {
                        title: 'Pull ups',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Barbell row',
                        type: 'sets-reps',
                        sets: 4,
                        reps: 12
                    },
                    {
                        title: 'Running',
                        type: 'sets-min-sec',
                        sets: 4,
                        minutes: 12,
                        seconds: 0
                    },
                    {
                        title: 'Jumping jacks',
                        type: 'sets-min-sec',
                        sets: 2,
                        minutes: 3,
                        seconds: 0
                    }
                ]
            }
        ]
    }

    render() {
        return <div>
            <Route path="/:id" exact component={Inspect}/>
            <Feed darkTitles workouts={this.state.workouts}/>
        </div>
    }
}

export default All;