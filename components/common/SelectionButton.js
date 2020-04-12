import React from 'react'
import {Platform} from "react-native"
import {Button, Icon} from "native-base"
import PropTypes from "prop-types"

import GenericStyles from "../../constants/Style"

export default class SelectionButton extends React.Component {
    render() {
        return (
            <Button transparent
                    onPress={() => this.props.onPress()}
                    style={{flex: 0}}
            >
                <Icon
                    style={GenericStyles.headerIcon}
                    name={this.props.isSelector ?
                            (Platform.OS === 'ios' ? 'ios-filing' : 'md-filing') :
                            (Platform.OS === 'ios' ? 'ios-close' : 'md-close')}
                />
            </Button>)
    }
}

SelectionButton.propTypes = {
    onPress: PropTypes.func,
    isSelector: PropTypes.bool
}