import React from 'react'
import {Button, Icon} from "native-base"

import GenericStyles from "../../constants/Style"
import {Platform} from "react-native"

export default class BackButton extends React.Component {
    render() {
        return (
            <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                    style={GenericStyles.headerIcon}
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                />
            </Button>)
    }
}