import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, profile }) => {
    useEffect(() => {
        getCurrentProfile()
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
