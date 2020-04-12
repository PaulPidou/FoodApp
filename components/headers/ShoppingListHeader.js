import React from 'react'
import {Alert, Platform} from "react-native"
import {Button, Header, Icon, Left, Right} from "native-base"
import {NetworkConsumer} from "react-native-offline"
import PropTypes from 'prop-types'

import SelectionButton from "../common/SelectionButton"
import HeaderActionButton from "../common/HeaderActionButton"
import GenericStyles from "../../constants/Style"

export default class ShoppingListHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <SelectionButton
                        onPress={() => this.props.emptyChecked()}
                        isSelector={false}
                    />
                    <SelectionButton
                        onPress={() => this.props.updateChecked()}
                        isSelector={true}
                    />
                </Left>
                <Right>
                    <NetworkConsumer>
                        {({ isConnected }) => (
                            <Button
                                transparent
                                onPress={() => { isConnected ? this.props.handleIngredientsManagement() : Alert.alert(
                                    'Serveur hors ligne',
                                    'Les aliments seront conservés dans la liste de courses',
                                    [
                                        {text: 'Annuler', style: 'cancel'},
                                        {text: 'Ok', onPress: () => this.props.keepIngredientsInShoppingList()},
                                    ]
                                )
                                }}
                            >
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'}
                                />
                            </Button>)}
                    </NetworkConsumer>
                    <HeaderActionButton
                        actionFunction={() => this.props.navigation.navigate('SearchIngredient',
                            {origin: 'shoppinglist'})}
                        icon={'add'}
                    />
                </Right>
            </Header>
        )
    }
}

ShoppingListHeader.propTypes = {
    emptyChecked: PropTypes.func,
    updateChecked: PropTypes.func,
    handleIngredientsManagement: PropTypes.func,
    keepIngredientsInShoppingList: PropTypes.func
}