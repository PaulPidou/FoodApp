import React from 'react'
import {Alert} from "react-native"
import PropTypes from "prop-types"

import HeaderActionButton from "./HeaderActionButton"

export default class DeleteButton extends React.Component {
    render() {
        return (
            <HeaderActionButton
                actionFunction={() => Alert.alert('Confirmation',
                    this.props.message,
                    [
                        {text: 'Annuler', style: 'cancel'},
                        {text: 'Oui', onPress: () => this.props.onPress()},
                    ])}
                icon={this.props.icon}
            />)
    }
}

DeleteButton.propTypes = {
    onPress: PropTypes.func,
    message: PropTypes.string,
    icon: PropTypes.string
}