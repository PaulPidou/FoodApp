import React from 'react'
import {Button, Icon} from "native-base"

import GenericStyles from "../../constants/Style"

export default class MenuButton extends React.Component {
    render() {
        return (
            <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()} >
                <Icon
                    style={GenericStyles.headerIcon}
                    name='menu'
                    type="MaterialIcons"
                />
            </Button>)
    }
}