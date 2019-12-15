import React from 'react';
import classes from './navbar.module.css'
import './nav-hover.css';
import {NavLink, Link} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import {connect} from 'react-redux';

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
            {/* To position the 'More' links below the navbar links in the mobile sidebar */}
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
                {this.props.authorized ? 
                    <li key='/logout'><NavLink to="/logout" 
                    onClick={this.toggleSideDrawerHandler}  
                    className={classes.NavButton + ' signinButton'} activeStyle={{color: 'rgb(132, 132, 255)'}}>Logout</NavLink></li>
                : 
                    <li key='/signin'><NavLink to="/signin" onClick={this.toggleSideDrawerHandler}  
                    className={classes.NavButton + ' signinButton'}
                    activeStyle={{color: 'rgb(132, 132, 255)'}}>Sign in</NavLink></li>
                }
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
                <Link to="/"><h2 className={classes.Logo}>Workout Hub</h2></Link>
                <div className={classes.Options} style={this.state.sideDrawerOpen ? {transform: 'translate(-100%)'} : null}>
                 
                    {navList}
                </div>

                <div className={classes.DropdownBox}>
                    <button className={classes.MoreButton}>More</button>
                    <ul className={classes.MoreDropdown}>
                        <li><NavLink to="/create" className={classes.DesktopLink } activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink></li>
                        <li><NavLink to="/my-workouts" className={classes.DesktopLink} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Workouts</NavLink></li> 
                        <li><NavLink to="/my-favorites" className={classes.DesktopLink} activeStyle={{color: 'rgb(132, 132, 255)'}}>My Favorites</NavLink></li> 
                        {this.props.authorized ? 
                            <li key='/logout'><NavLink to="/logout" className={classes.DesktopLink } activeStyle={{color: 'rgb(132, 132, 255)'}}>Logout</NavLink></li>
                        : 
                            <li key='/signin'><NavLink to="/signin" className={classes.DesktopLink} activeStyle={{color: 'rgb(132, 132, 255)'}}>Sign in</NavLink></li>
                        }
                    </ul>
                </div>
                
                <div className={classes.Burger} onClick={this.toggleSideDrawerHandler}>
                    <div className={classes.Line1}></div>
                    <div className={classes.Line2}></div>
                    <div className={classes.Line3}></div>
                </div>
            </nav>
            {this.state.sideDrawerOpen ? <Backdrop clicked={this.toggleSideDrawerHandler}/> : null}
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        authorized: state.auth.authorized
    }
}

export default connect(mapStateToProps)(Navbar);