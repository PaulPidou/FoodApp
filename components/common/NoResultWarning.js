import React from 'react'
import {View} from "react-native"
import {Text} from "native-base"
import PropTypes from "prop-types"

import GenericStyles from "../../constants/Style"
import Colors from "../../constants/Colors"

export default class NoResultWarning extends React.Component {
    render() {
        return (
            <View style={GenericStyles.warningMessage}>
                <Text style={{color: Colors.noticeText}}>Aucun résultat</Text>
                <Text style={{color: Colors.noticeText}}>{this.props.message}</Text>
            </View>)
    }
}

NoResultWarning.propTypes = {
    message: PropTypes.string
}