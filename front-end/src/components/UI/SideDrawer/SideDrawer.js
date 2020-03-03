import React from 'react';
import classes from './SideDrawer.module.css';

import {motion} from 'framer-motion';

export default function SideDrawer() {
    return <motion.div>
        <hr style={{width: '90%', marginLeft: '-10%', border: 'none', borderTop: '1px solid rgb(180, 180, 180)'}}/>

        <li key='/create'>
            <NavLink to="/create"
            onClick={this.toggleSideDrawerHandler} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink>
        </li> 

        <li key='/my-workouts'>
            <NavLink to="/my-workouts"
            onClick={this.toggleSideDrawerHandler} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>My Workouts</NavLink>
        </li> 
        <li key='/my-favorites'>
            <NavLink to="/my-favorites"
            onClick={this.toggleSideDrawerHandler} 
            activeStyle={{color: 'rgb(132, 132, 255)'}}>My Favorites</NavLink>
        </li>
    </motion.div>
}
