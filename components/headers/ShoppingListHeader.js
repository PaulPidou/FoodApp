import React from 'react'
import PropTypes from 'prop-types'
import {Button, Header, Icon, Left, Right} from "native-base"
import GenericStyles from "../../constants/Style"
import {Alert, Platform} from "react-native"
import {NetworkConsumer} from "react-native-offline"

export default class ShoppingListHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.props.emptyChecked()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                    <Button transparent
                            onPress={() => this.props.updateChecked()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                        />
                    </Button>
                </Left>
                <NetworkConsumer>
                    {({ isConnected }) => (
                        <Right>
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
                            </Button>
                            <Button
                                transparent
                                onPress={() => { isConnected ?
                                    this.props.navigation.navigate('SearchIngredient', {origin: 'shoppinglist'}) :
                                    Alert.alert(
                                        'Serveur hors ligne',
                                        'Vous ne pouvez pas effectuer cette action',
                                    )
                                }} >
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name='add'
                                    type="MaterialIcons"
                                />
                            </Button>
                        </Right>)}
                </NetworkConsumer>
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