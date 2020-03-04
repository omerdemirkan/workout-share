import React, { useState } from 'react';
import classes from './navbar.module.css';
import './nav-hover.css';
import {NavLink, Link} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import colorsByPath from '../../../helper/colors-by-path';

// Change to functional component
function Navbar() {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const toggleSideDrawerHandler = () => setSideDrawerOpen(!sideDrawerOpen);

    const mobileScreen = useMediaQuery('(max-width: 768px)');
    console.log(sideDrawerOpen);
    {/* To position the 'More' dropdown links below the navbar links in the mobile sidebar, because the dropdown doesn't exist on mobile */}

    let navList = <ul>
        {/* Because React Router doesn't allow CSS in JS styling for pseudoselectors, special hover classnames are given */}
        <li><NavLink exact to='/' activeStyle={{color: colorsByPath('/').idleColor}} className={classes.NavButton + ' All'}>All</NavLink></li>
        <li><NavLink exact to='/powerlifting' activeStyle={{color: colorsByPath('/powerlifting').idleColor}} className={classes.NavButton + ' Powerlifting'}>Powerlifting</NavLink></li>
        <li><NavLink exact to='/bodybuilding' activeStyle={{color: colorsByPath('/bodybuilding').idleColor}} className={classes.NavButton + ' Bodybuilding'}>Bodybuilding</NavLink></li>
        <li><NavLink exact to='/weightlifting' activeStyle={{color: colorsByPath('/weightlifting').idleColor}} className={classes.NavButton + ' Weightlifting'}>Weightlifting</NavLink></li>
        <li><NavLink exact to='/endurance' activeStyle={{color: colorsByPath('/endurance').idleColor}} className={classes.NavButton + ' Endurance'}>Endurance</NavLink></li>
        <li><NavLink exact to='/crossfit' activeStyle={{color: colorsByPath('/crossfit').idleColor}} className={classes.NavButton + ' Crossfit'}>Crossfit</NavLink></li>
    </ul>
        

    console.log(mobileScreen);
    return <>
        <nav className={classes.Navbar}>
            <Link to="/"><h2 className={classes.Logo} style={mobileScreen && sideDrawerOpen ? {left: '35%', transition: '0.3s ease'}: {}}>Workout Share</h2></Link>
            <div className={classes.Options}>
                
                {navList}
            </div>

            <div className={classes.DropdownBox}>
                <button className={classes.MoreButton}>More</button>
                <ul className={classes.MoreDropdown}>
                    <li key={"/create"}><NavLink to={"/create"} className={classes.DesktopLink } activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink></li>
                    <li key={"/my-workouts"}><NavLink to="/my-workouts" className={classes.DesktopLink} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Workouts</NavLink></li> 
                    <li key={"/my-favorites"}><NavLink to="/my-favorites" className={classes.DesktopLink} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Favorites</NavLink></li>
                </ul>
            </div>
            
            <div className={classes.Burger} onClick={toggleSideDrawerHandler}>
                <div className={sideDrawerOpen ? classes.Line1 : null}></div>
                <div className={sideDrawerOpen ? classes.Line2 : null}></div>
                <div className={sideDrawerOpen ? classes.Line3 : null}></div>
            </div>
        </nav>
        {mobileScreen ?
            <>
                <Backdrop open={sideDrawerOpen} onClick={toggleSideDrawerHandler} style={{zIndex: '4'}}/>
                <SideDrawer 
                open={sideDrawerOpen} 
                close={toggleSideDrawerHandler}/>
            </>
        : null}
        
    </>
}

export default Navbar;