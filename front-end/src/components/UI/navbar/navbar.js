import React from 'react';
import classes from './navbar.module.css';
import './nav-hover.css';
import {NavLink, Link} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';

import colorsByPath from '../../../helper/colors-by-path';

class Navbar extends React.Component {
    state = {
        sideDrawerOpen: false,
        sideDrawerMoved: false,
        links: [
            {display: 'All', path: '/'},
            {display: 'Powerlifting', path: '/powerlifting'},
            {display: 'Bodybuilding', path: '/bodybuilding'},
            {display: 'Weightlifting', path: '/weightlifting'},
            {display: 'Endurance', path: '/endurance'},
            {display: 'Crossfit', path: '/crossfit'}
        ]
    }

    toggleSideDrawerHandler = () => {
        const newSideDrawerOpen = !this.state.sideDrawerOpen;
        this.setState({
            sideDrawerOpen: newSideDrawerOpen,
            sideDrawerMoved: true
        });
    }

    render() {
        let navList = <React.Fragment>
            {/* To position the 'More' dropdown links below the navbar links in the mobile sidebar, because the dropdown doesn't exist on mobile */}

            {this.state.sideDrawerMoved ? <ul style={{top: '295px'}} className="MoreNavButtonsBox">
                <hr style={{width: '90%', marginLeft: '-10%', border: 'none', borderTop: '1px solid rgb(180, 180, 180)'}}/>

                <li key='/create'><NavLink to="/create"
                onClick={this.toggleSideDrawerHandler} 
                className={classes.NavButton + ' createNavButton'} activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink></li> 
                <li key='/my-workouts'><NavLink to="/my-workouts"
                onClick={this.toggleSideDrawerHandler} 
                className={classes.NavButton + ' myWorkoutsNavButton'} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Workouts</NavLink></li> 
                <li key='/my-favorites'><NavLink to="/my-favorites"
                onClick={this.toggleSideDrawerHandler} 
                className={classes.NavButton + ' myFavoritesNavButton'} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Favorites</NavLink></li>
            </ul>
            : null}

            <ul>
            {this.state.links.map(link => {
                return <li key={link.path}>

                    <NavLink onClick={this.state.sideDrawerOpen ? this.toggleSideDrawerHandler : null} 
                    exact={link.display === "All" ? true : false} 
                    to={link.path} 
                    activeStyle={{color: colorsByPath(link.path).idleColor}}
                    className={classes.NavButton + ' ' + link.display}>
                        {link.display}
                    </NavLink>
                </li>
            })}
            </ul>
        </React.Fragment>
        

        return <React.Fragment>
            <nav className={classes.Navbar}>
                <Link to="/"><h2 className={classes.Logo} style={this.state.sideDrawerOpen ? {left: '35%', transition: '0.3s ease'}: {}}>Workout Hub</h2></Link>
                <div className={classes.Options} style={this.state.sideDrawerOpen ? {transform: 'translate(-100%)'} : null}>
                 
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
                
                <div className={classes.Burger} onClick={this.toggleSideDrawerHandler}>
                    <div className={this.state.sideDrawerOpen ? classes.Line1 : null}></div>
                    <div className={this.state.sideDrawerOpen ? classes.Line2 : null}></div>
                    <div className={this.state.sideDrawerOpen ? classes.Line3 : null}></div>
                </div>
            </nav>
            {this.state.sideDrawerOpen ? <Backdrop clicked={this.toggleSideDrawerHandler}/> : null}
        </React.Fragment>
    }
}

export default Navbar;