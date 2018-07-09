import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import axios from 'axios';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            timezone: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        // return axios.post('/api/users', { user: this.state });

        // const foo = this.props.userSignupRequest(this.state)
        //
        // if(foo) {
        //     foo ( () => {},
        //     ({ data }) => this.setState({ errors: data })
        //     );
        // }


        this.props.userSignupRequest(this.state).then(
            () => {},
            ({ data }) => this.setState({ errors: data, isLoading: false })
        );
    }

    render () {
        const options = map(timezones, (val,key) =>
            <option key={val} value={val}>{key}</option>
        );
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Martian Community!</h1>

                <div className={classnames("form-group", { 'has-error': errors.username })}>
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className={classnames("form-group", { 'has-error': errors.email })}>
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>

                <div className={classnames("form-group", { 'has-error': errors.password })}>
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                {errors.password && <span className="help-block">{errors.password}</span>}
                </div>

                <div className={classnames("form-group", { 'has-error': errors.passwordConfirm })}>
                    <label className="control-label">Confirm Password</label>
                    <input
                        value={this.state.passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirm"
                        className="form-control"
                    />
                {errors.passwordConfirm && <span className="help-block">{errors.passwordConfirm}</span>}
                </div>

                <div className={classnames("form-group", { 'has-error': errors.timezone })}>
                    <label className="control-label">Time Zone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Choose Your Time Zone</option>
                        {options}
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Sign Up!
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};

export default SignupForm;
