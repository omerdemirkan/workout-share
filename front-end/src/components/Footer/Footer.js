import React from 'react';
import classes from './Footer.module.css'

// Material UI
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const footer = () => {
    return <div className={classes.Footer}>
        <h3 className={classes.Header}>Omer Demirkan, {new Date().getFullYear()}</h3>
        <div className={classes.LinkBox}>
            <a href="https://www.linkedin.com/in/omer-demirkan" target="_blank"><LinkedInIcon className={classes.LinkIcon}/></a>
            <a href="https://github.com/omerdemirkan" target="_blank"><GitHubIcon className={classes.LinkIcon}/></a>
            <a href="mailto:omerfarukpiano@gmail.com"><MailOutlineIcon className={classes.LinkIcon}/></a>
        </div>
    </div>
}

export default footer;