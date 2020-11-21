import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';

const Dashboard = ({ 
    getCurrentProfile, 
    profile: { profile, loading }, 
    auth: { user } 
}) => {
    useEffect(() => {
        getCurrentProfile()
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
            Dashboard
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        <DashboardActions />
        <Experience experience={profile.experience}/>
        { profile !== null ? 
            <Fragment>
                has
            </Fragment> 
            : 
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment> 
        }
    </Fragment>;
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
