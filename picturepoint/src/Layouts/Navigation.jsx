//React
import React from 'react'
import { Route } from 'react-router-dom'

//Authentication
import AuthUserContext from '../Login/components/AuthUserContext'

//Layouts
import Header from '../Layouts/Header'
import AuthHeader from '../Layouts/AuthHeader'

//Pages
import Login from '../Login/Login'
import UserProfile from '../UserProfile/UserProfile'

//Routes
import * as routes from '../Routes/routes'

//Determines if user is logged in (authenticated)
const Navigation = () => {
    return (
        <AuthUserContext.Consumer>
            {(authUser) =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    )
}

//Authenticated loads user profile
const NavigationAuth = () => (
    <div>
        <AuthHeader />
        <Route path={routes.HOME} component={UserProfile} />
    </div>
)

//Non authenticated loads sign-in
const NavigationNonAuth = () => (
    <div>
        <Header />
        <Route path={routes.SIGN_IN} component={Login} />
    </div>
)

export default Navigation
