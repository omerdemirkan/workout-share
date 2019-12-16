import React from 'react';
import axios from '../../../axios';
import Feed from '../../../components/feed/Feed';


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
    }

    state = {
        workouts: [
            {
                title: 'Boojie back workout 1',
                type: 'general',
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
                    }
                ]
            },
            {
                title: 'Boojie back workout2',
                type: 'endurance',
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
            <Feed workouts={this.state.workouts}/>
        </div>
    }
}

export default All;