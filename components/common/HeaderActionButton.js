import React from 'react'
import {Alert, Platform} from "react-native"
import {Button, Icon} from "native-base"
import {NetworkConsumer} from "react-native-offline"
import PropTypes from 'prop-types'

import GenericStyles from "../../constants/Style"

export default class HeaderActionButton extends React.Component {
    render() {
        return (
            <NetworkConsumer>
                {({ isConnected }) => (
                    <Button
                        transparent
                        onPress={() => { isConnected ?
                            this.props.actionFunction() :
                            Alert.alert(
                                'Serveur hors ligne',
                                this.props.message ? this.props.message : 'Vous ne pouvez pas effectuer cette action',
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

HeaderActionButton.propTypes = {
    actionFunction: PropTypes.func,
    message: PropTypes.string,
    icon: PropTypes.string
}