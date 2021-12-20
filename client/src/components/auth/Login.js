import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Login</p>
            <form className="form" action="create-profile.html">
                <div className="form-group">
                <input 
                    onChange={onChange}
                    value={email}
                    type="email" 
                    placeholder="Email Address" 
                    name="email" />
                </div>
                <div className="form-group">
                <input
                    onChange={onChange}
                    value={password}
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Need an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    );
}

export default Login;
