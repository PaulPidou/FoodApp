import React from 'react'
import {Alert, Platform} from "react-native"
import {Button, Icon} from "native-base"
import {NetworkConsumer} from "react-native-offline"
import PropTypes from "prop-types"

import GenericStyles from "../../constants/Style"

export default class DeleteButton extends React.Component {
    render() {
        return (
            <NetworkConsumer>
                {({ isConnected }) => (
                    <Button
                        transparent
                        onPress={() => {
                            isConnected ? Alert.alert(
                                'Confirmation',
                                this.props.message,
                                [
                                    {text: 'Annuler', style: 'cancel'},
                                    {text: 'Oui', onPress: () => this.props.onPress()},
                                ]): Alert.alert(
                                'Serveur hors ligne',
                                'Vous ne pouvez pas effectuer cette action',
                            )
                        }}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-'.concat(this.props.icon) : 'md-'.concat(this.props.icon)}
                        />
                    </Button>)}
            </NetworkConsumer>)
    }
}

DeleteButton.propTypes = {
    onPress: PropTypes.func,
    message: PropTypes.string,
    icon: PropTypes.string
}