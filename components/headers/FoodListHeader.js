import React from "react"
import {Alert, Platform} from "react-native"
import PropTypes from 'prop-types'
import {Button, Header, Icon, Left, Right, Title, Body} from 'native-base'

import GenericStyles from '../../constants/Style'
import {NetworkConsumer} from "react-native-offline"

export default class FoodListHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()} >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name='menu'
                            type="MaterialIcons"
                        />
                    </Button>
                </Left>
                <Body style={{flex: 3, justifyContent: 'center'}}>
                <Title style={GenericStyles.headerTitle}>
                    {this.props.name}
                </Title>
                </Body>
                <Right style={GenericStyles.headerFoodListComponent}>
                    {
                        this.props.origin === 'shoppinglist' ? (
                            <Button
                                transparent
                                onPress={() => {
                                    this.props.startShopping()
                                }}
                            >
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>) : (
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                    <Button
                                        transparent
                                        onPress={() => { isConnected ?
                                            this.props.navigation.navigate('SearchRecipe', {ingredients: this.props.ingredients}) :
                                            Alert.alert(
                                                'Serveur hors ligne',
                                                'Vous ne pouvez pas effectuer cette action',
                                            )
                                        }}>
                                        <Icon
                                            style={GenericStyles.headerIcon}
                                            name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
                                        />
                                    </Button>)}
                            </NetworkConsumer>)
                    }
                    <NetworkConsumer>
                        {({ isConnected }) => (
                        <Button
                            transparent
                            onPress={() => {isConnected ?
                                this.props.navigation.navigate('SearchIngredient', {origin: this.props.origin}) :
                                Alert.alert(
                                    'Serveur hors ligne',
                                    'Vous ne pouvez pas effectuer cette action',
                                )}}>
                            <Icon
                                style={GenericStyles.headerIcon}
                                name='add'
                                type="MaterialIcons"
                            />
                        </Button>)}
                    </NetworkConsumer>
                </Right>
            </Header>
        )
    }
}

FoodListHeader.propTypes = {
    name: PropTypes.string,
    origin: PropTypes.string,
    startShopping: PropTypes.func,
    ingredients: PropTypes.array
}