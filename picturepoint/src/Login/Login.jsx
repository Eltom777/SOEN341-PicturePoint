//React
import React from 'react'
import { Route } from 'react-router-dom'

//Routes
import * as routes from '../Routes/routes'

//Pages
import SignUpPage from './components/SignUp'
import SignInPage from './components/SignIn'
import PasswordForgetPage from './components/PasswordForget'

function Login() {
    return (
        <div>
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route
                exact
                path={routes.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
        </div>
    )
}
export default Login
