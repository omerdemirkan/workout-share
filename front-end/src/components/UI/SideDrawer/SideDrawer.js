import React, {useState, useEffect} from 'react';
import classes from './SideDrawer.module.css';

import { NavLink } from 'react-router-dom';
import colorsByPath from '../../../helper/colors-by-path';

import {motion} from 'framer-motion';

export default function SideDrawer(props) {

    // Determines whether or not to animate, makes it so that the sidedrawer close animation
    // doesn't play immediately.
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

    useEffect(() => {
        if (!sideDrawerOpened && props.open) {
            setSideDrawerOpened(true)
        }
    }, [props.open]);

    return <motion.div
    initial={sideDrawerOpened ? {x: props.open ? '110%' : '10%'}: {x: '110%'}}
    animate={{
        x: props.open ? '10%' : '110%'
    }}
    transition={{
        type: "spring",
        stiffness: 350,
        damping: 25
    }}
    className={classes.SideDrawer}>

        <ul className={classes.NavList}>
            {/* Because React Router doesn't allow CSS in JS styling for pseudoselectors, special hover classnames are given */}
            <li>
                <NavLink exact to='/' activeStyle={{color: colorsByPath('/').idleColor}} onClick={props.close}>All</NavLink>
            </li>
            <li>
                <NavLink exact to='/powerlifting' activeStyle={{color: colorsByPath('/powerlifting').idleColor}} onClick={props.close}>Powerlifting</NavLink>
            </li>
            <li>
                <NavLink exact to='/bodybuilding' activeStyle={{color: colorsByPath('/bodybuilding').idleColor}} onClick={props.close}>Bodybuilding</NavLink>
            </li>
            <li>
                <NavLink exact to='/weightlifting' activeStyle={{color: colorsByPath('/weightlifting').idleColor}} onClick={props.close}>Weightlifting</NavLink>
            </li>
            <li>
                <NavLink exact to='/endurance' activeStyle={{color: colorsByPath('/endurance').idleColor}} onClick={props.close}>Endurance</NavLink>
            </li>
            <li>
                <NavLink exact to='/crossfit' activeStyle={{color: colorsByPath('/crossfit').idleColor}} onClick={props.close}>Crossfit</NavLink>
            </li>
        </ul>

        <hr/>

        <li key='/create'>
            <NavLink to="/create"
            onClick={props.close} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink>
        </li> 

        <li key='/my-workouts'>
            <NavLink to="/my-workouts"
            onClick={props.close} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>My Workouts</NavLink>
        </li> 
        <li key='/my-favorites'>
            <NavLink to="/my-favorites"
            onClick={props.close} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>My Favorites</NavLink>
        </li>
    </motion.div>
}
