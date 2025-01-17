import React from 'react'
import PropTypes from "prop-types"
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }
}

TabBarIcon.propTypes = {
    name: PropTypes.string,
    focused: PropTypes.bool
}