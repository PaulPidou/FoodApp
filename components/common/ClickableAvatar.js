import React from 'react'
import {Avatar} from 'react-native-elements'
import PropTypes from 'prop-types'

export default class ClickableAvatar extends React.Component {
    render() {
        return (<Avatar
            size="small"
            rounded
            activeOpacity={0.7}
            title={this.props.isSelect ? null : this.props.title}
            icon={this.props.isSelect ? {name: 'check'} : null}
            onPress={() => this.props.onPress()}
        />)
    }
}

ClickableAvatar.propTypes = {
    title: PropTypes.string,
    isSelect: PropTypes.bool,
    onPress: PropTypes.func
}