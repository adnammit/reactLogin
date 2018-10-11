import React from 'react';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, doesUserExist } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage, doesUserExist } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} doesUserExist={doesUserExist} />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExist: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage, doesUserExist }) (SignupPage);
