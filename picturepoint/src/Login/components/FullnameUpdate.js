import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { doNickNameUpdate } from '../../Firebase/functions/auth'
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

const INITIAL_STATE = {
    fullname: '',
    error: null,
}

class FullnameUpdateform extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = (event) => {
        const { fullname } = this.state

        doNickNameUpdate(fullname)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }))
            })
            .catch((error) => {
                this.setState(byPropKey('error', error))
            })

        event.preventDefault()
    }

    render() {
        const { fullname, error } = this.state

        const isInvalid = fullname === ''

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    name="Fullname"
                    value={fullname}
                    id="standard-secondary"
                    label="New Nick Name"
                    color="primary"
                    onChange={(event) =>
                        this.setState(byPropKey('fullname', event.target.value))
                    }
                />
                <br />
                <Button
                    type="submit"
                    disabled={isInvalid}
                    variant="contained"
                    color="primary"
                >
                    Update Nick Name
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

export default FullnameUpdateform
