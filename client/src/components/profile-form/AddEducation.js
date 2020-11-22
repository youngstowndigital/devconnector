import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ history, addEducation }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school, degree, fieldofstudy, from, to, current, description
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any education or boot camp experience
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" placeholder="* Degree" value={degree} onChange={onChange} name="degree" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* School" value={school} onChange={onChange} name="school" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field of Study" value={fieldofstudy} onChange={onChange} name="fieldofstudy" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                }} />{' '}Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description}
                    onChange={onChange}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

addEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
