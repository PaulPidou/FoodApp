import React from "react"
import PropTypes from 'prop-types'
import {Left, Right, Header, Button, Icon} from "native-base"

import {Alert, Platform} from "react-native"
import GenericStyles from "../../constants/Style"

export default class SelectedIngredientHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.props.emptySelected()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                    <Button transparent
                            onPress={() => this.props.updateSelected()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                        />
                    </Button>
                </Left>
                <Right>
                    {
                        this.props.origin === 'shoppinglist' ? (
                            <Button transparent>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
                                />
                            </Button>) : (
                            <Button transparent>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>)
                    }
                    <Button transparent>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
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
                            )}}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        />
                    </Button>
                </Right>
            </Header>
        )
    }
}

SelectedIngredientHeader.propTypes = {
    origin: PropTypes.string,
    emptySelected: PropTypes.func,
    updateSelected: PropTypes.func
}