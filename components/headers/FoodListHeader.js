import React from "react"
import {Platform} from "react-native"
import PropTypes from 'prop-types'
import {Button, Header, Icon, Left, Right, Title, Body} from 'native-base'

import MenuButton from "../common/MenuButton"
import HeaderActionButton from "../common/HeaderActionButton"
import GenericStyles from '../../constants/Style'

export default class FoodListHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <MenuButton
                        navigation={this.props.navigation}
                    />
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
                                onPress={() => this.props.startShopping() }
                            >
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                />
                            </Button>) : (
                            <HeaderActionButton
                                actionFunction={() => this.props.navigation.navigate('SearchRecipe',
                                    {ingredients: this.props.ingredients})}
                                icon={'bookmarks'}
                            />)
                    }
                    <HeaderActionButton
                        actionFunction={() => this.props.navigation.navigate('SearchIngredient', {origin: this.props.origin})}
                        icon={'add'}
                    />
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