import React from "react"
import {Text} from "native-base"
import PropTypes from "prop-types"

import GenericStyles from "../../constants/Style"

export default class SubText extends React.Component {
    render() {
        return (
            <Text
                numberOfLines={1}
                style={GenericStyles.subText}>
                {this.props.value}
            </Text>
        )
    }
}

SubText.propTypes = {
    value: PropTypes.string
}