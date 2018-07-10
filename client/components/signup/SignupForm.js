import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


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

    isValid() {
        const { errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state).then(
                () => {},
                ({ data }) => this.setState({ errors: data, isLoading: false })
            );
        }
    }

    render () {
        const options = map(timezones, (val,key) =>
            <option key={val} value={val}>{key}</option>
        );
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Martian Community!</h1>

                <TextFieldGroup
                    field="username"
                    value={this.state.username}
                    label="Username"
                    error={errors.username}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="email"
                    value={this.state.email}
                    label="email"
                    error={errors.email}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="password"
                    value={this.state.password}
                    label="Password"
                    error={errors.password}
                    type="password"
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="passwordConfirm"
                    value={this.state.passwordConfirm}
                    label="Confirm Password"
                    error={errors.passwordConfirm}
                    type="password"
                    onChange={this.onChange}
                />


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
