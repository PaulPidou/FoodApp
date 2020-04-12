import React from "react"
import {Alert, Platform, ActivityIndicator} from "react-native"
import { Left, Right, Header, Button, Icon } from "native-base"
import {NetworkConsumer} from "react-native-offline"
import PropTypes from 'prop-types'

import SelectionButton from "../common/SelectionButton"
import DeleteButton from "../common/DeleteButton"
import GenericStyles from "../../constants/Style"

export default class SelectedIngredientHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <SelectionButton
                        onPress={() => this.props.emptySelected()}
                        isSelector={false}
                    />
                    <SelectionButton
                        onPress={() => this.props.updateSelected()}
                        isSelector={true}
                    />
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
                            <DeleteButton
                                onPress={() => this.props.deleteSelectedIngredients()}
                                message={'Confirmez vous la suppression ?'}
                                icon={'trash'}
                            />
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