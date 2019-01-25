import React from "react"
import PropTypes from 'prop-types'
import {Left, Right, Header, Button, Icon, Spinner} from "native-base"

import {Alert, Platform, ActivityIndicator} from "react-native"
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
                        this.props.requestTransfer ? (
                            <Button transparent>
                            <ActivityIndicator size="small" color='#007aff' />
                            </Button>
                        ) : (
                        this.props.origin === 'shoppinglist' ? (
                            <Button
                                transparent
                                onPress={() => {
                                    this.props.transferItemsToFridge()
                                }}>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
                                />
                            </Button>) : (
                            <Button
                                transparent
                                onPress={() => {
                                    this.props.transferItemsToShoppingList()
                                }}
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>))
                    }
                    <Button
                        transparent
                    >
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
                                    {text: 'Oui', onPress: () => this.props.deleteSelectedIngredients()},
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
    requestTransfer: PropTypes.bool,
    origin: PropTypes.string,
    emptySelected: PropTypes.func,
    updateSelected: PropTypes.func,
    transferItemsToFridge: PropTypes.func,
    transferItemsToShoppingList: PropTypes.func,
    deleteSelectedIngredients: PropTypes.func
}