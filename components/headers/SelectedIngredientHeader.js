import React from "react"
import PropTypes from 'prop-types'
import { Left, Right, Header, Button, Icon } from "native-base"

import {Alert, Platform, ActivityIndicator} from "react-native"
import GenericStyles from "../../constants/Style"
import {NetworkConsumer} from "react-native-offline"

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
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                    <Button transparent
                            onPress={() => this.props.updateSelected()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                        />
                    </Button>
                </Left>
                <Right>
                    {
                        this.props.requestTransfer ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color='#fff' />
                            </Button>
                        ) : (
                        this.props.origin === 'shoppinglist' && (
                                <NetworkConsumer>
                                    {({ isConnected }) => (
                                    <Button
                                        transparent
                                        onPress={() => { isConnected ?
                                            this.props.transferItemsToFridge() :
                                            Alert.alert(
                                                'Serveur hors ligne',
                                                'Vous ne pouvez pas effectuer cette action',
                                            )
                                        }}>
                                        <Icon
                                            style={GenericStyles.headerIcon}
                                            name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
                                        />
                                    </Button>)}
                                </NetworkConsumer>))
                    }
                    {
                        this.props.origin === 'fridge' && (
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                <Button
                                    transparent
                                    onPress={() => { isConnected ?
                                        this.props.navigation.navigate('SearchRecipe', {ingredients: this.props.selectedIngredients}) :
                                        Alert.alert(
                                            'Serveur hors ligne',
                                            'Vous ne pouvez pas effectuer cette action',
                                        )
                                    }}
                                >
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
                                    />
                                </Button>)}
                            </NetworkConsumer>)
                    }
                    {
                        this.props.requestDelete ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color='#fff' />
                            </Button>
                        ) : (
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                <Button
                                    transparent
                                    onPress={() => { isConnected ?
                                        Alert.alert(
                                            'Confirmation',
                                            'Confirmez vous la suppression ?',
                                            [
                                                {text: 'Annuler', style: 'cancel'},
                                                {text: 'Oui', onPress: () => this.props.deleteSelectedIngredients()},
                                            ]) : Alert.alert(
                                            'Serveur hors ligne',
                                            'Vous ne pouvez pas effectuer cette action',
                                        )
                                    }}>
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                                    />
                                </Button>)}
                            </NetworkConsumer>
                        )
                    }
                </Right>
            </Header>
        )
    }
}

SelectedIngredientHeader.propTypes = {
    requestTransfer: PropTypes.bool,
    requestDelete: PropTypes.bool,
    origin: PropTypes.string,
    emptySelected: PropTypes.func,
    updateSelected: PropTypes.func,
    transferItemsToFridge: PropTypes.func,
    transferItemsToShoppingList: PropTypes.func,
    deleteSelectedIngredients: PropTypes.func,
    selectedIngredients: PropTypes.array
}