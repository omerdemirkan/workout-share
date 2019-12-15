import React from 'react';
import classes from './Card.module.css'

import { colorsByDisplay } from '../../../helper/colors-by-path'

const card = props => {

    const displayName = props.workout.type.charAt(0).toUpperCase() + props.workout.type.substring(1);

    return <div className={classes.Card}> 
        <div className={classes.CardHeader}>
            <h2 className={classes.CardTitle} style={{color: colorsByDisplay(displayName).darkColor}}>{props.workout.title}</h2>
        </div>

        <div className={classes.CardFooter}>
            
        </div>
    </div>
}

export default card;