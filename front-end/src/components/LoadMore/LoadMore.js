import React from 'react';
import classes from './LoadMore.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import AutorenewRoundedIcon from '@material-ui/icons/AutorenewRounded';


const loadMore = props => {
    if (props.display) {
        return <div className={classes.LoadMore}>
            {props.loading ? 
                <CircularProgress/>
            :
                <React.Fragment>
                    <p className={classes.LoadMoreText}>Load More</p>
                    <button onClick={props.loadPosts} className={classes.LoadMoreButton}><AutorenewRoundedIcon fontSize='large'/></button>
                </React.Fragment>
            }
            
        </div>
    } else {
        return null;
    }
    
}

export default loadMore;