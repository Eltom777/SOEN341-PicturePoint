import React, { Component } from 'react'

import { auth } from '../../Firebase/index'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = (event) => {
        const { passwordOne } = this.state

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }))
            })
            .catch((error) => {
                this.setState(byPropKey('error', error))
            })

        event.preventDefault()
    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state

        const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    name="PasswordOne"
                    value={passwordOne}
                    id="standard-secondary"
                    label="New Password"
                    color="primary"
                    onChange={(event) =>
                        this.setState(
                            byPropKey('passwordOne', event.target.value)
                        )
                    }
                    type="password"
                />
                <br />
                <br />
                <TextField
                    name="PasswordTwo"
                    value={passwordTwo}
                    id="standard-secondary"
                    label="Confirm Password"
                    color="primary"
                    onChange={(event) =>
                        this.setState(
                            byPropKey('passwordTwo', event.target.value)
                        )
                    }
                    type="password"
                />
                <br />
                <br />
                <Button
                    type="submit"
                    disabled={isInvalid}
                    variant="contained"
                    color="primary"
                >
                    Update Password
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

export default PasswordChangeForm
