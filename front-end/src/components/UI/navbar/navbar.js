import React from 'react';
import classes from './navbar.module.css'
import {NavLink} from 'react-router-dom';

const navbar = props => {
    return <nav className={classes.Navbar}>
        <h2 className={classes.Logo}>Workout Hub</h2>
        <NavLink to="/yeet" className={classes.NavItem}>Create</NavLink>
    </nav>
}

export default navbar;