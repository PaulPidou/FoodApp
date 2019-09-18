import React from "react"
import PropTypes from 'prop-types'
import {Button, Header, Icon, Left, Right, Title, Body} from 'native-base'

import GenericStyles from '../../constants/Style'
import {Platform} from "react-native"

export default class FoodListHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()} >
                        <Icon
                            style={GenericStyles.icon}
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
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>) : (
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.props.navigation.navigate('SearchRecipe', {ingredients: this.props.ingredients})
                                    }}>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
                                    />
                                </Button>)
                    }

                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('SearchIngredient', {origin: this.props.origin})} >
                        <Icon
                            style={GenericStyles.icon}
                            name='add'
                            type="MaterialIcons"
                        />
                    </Button>
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