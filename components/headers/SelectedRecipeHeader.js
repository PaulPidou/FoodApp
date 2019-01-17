import React from "react"
import PropTypes from "prop-types"
import {Left, Right, Header, Button, Icon} from "native-base"

import {Alert, Platform} from "react-native"
import GenericStyles from "../../constants/Style"

export default class SelectedRecipeHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.emptySelected()}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                </Left>
                {
                    this.props.origin === 'home' ?
                        (<Right>
                            <Button
                                transparent
                                onPress={() => console.log("Add ingredients to cart")}>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>
                            <Button
                                transparent
                                onPress={() => {
                                    Alert.alert(
                                        'Confirmation',
                                        'Confirmez vous la suppression ?',
                                        [
                                            {text: 'Annuler', style: 'cancel'},
                                            {text: 'Oui', onPress: () => console.log('OK Pressed')},
                                        ]
                                    )}}
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                                />
                            </Button>
                        </Right>) :
                        (<Right>
                            <Button
                                transparent
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                                />
                            </Button>
                        </Right>)
                }
            </Header>
        )
    }
}

SelectedRecipeHeader.propTypes = {
    emptySelected: PropTypes.func
}