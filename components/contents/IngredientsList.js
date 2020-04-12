import React from "react"
import {Platform, ScrollView} from "react-native"
import {Body, Button, Icon, Left, List, ListItem, Right, Text} from "native-base"
import {Badge} from "react-native-elements"
import moment from "moment"
import PropTypes from "prop-types"

import ClickableAvatar from "../common/ClickableAvatar"
import SubText from "../common/SubText"
import Colors from "../../constants/Colors"

export default class IngredientsList extends React.Component {
    render() {
        return (
            <ScrollView>
                <List>{
                    this.props.ingredients.map((item) => {
                        const isSelected = this.props.selectedIngredients.includes(item.ingredientID)
                        const isChecked = this.props.checkedIngredients ?
                            this.props.checkedIngredients.includes(item.ingredientID) : false
                        const iconLeft = isChecked ?
                            (Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox-outline') :
                            (Platform.OS === 'ios' ? 'ios-square-outline' : 'md-square-outline')
                        return (
                            <ListItem
                                icon
                                avatar
                                key={item.ingredientID}
                                onPress={() => this.props.handlePress(item)}
                                onLongPress={() => this.props.handleLongPress(item.ingredientID)}
                            >
                                <Left style={{height: 30}}>
                                    {
                                        this.props.shoppingMode ? (
                                            <Button
                                                transparent
                                                onPress={() => this.props.handlePress(item)}
                                            >
                                                <Icon name={iconLeft} style={{color: Colors.shoppingCheckbox}} />
                                            </Button>) : (
                                            <ClickableAvatar
                                                title={item.ingredientName.charAt(0).toUpperCase()}
                                                isSelect={isSelected}
                                                onPress={() => this.props.handleLongPress(item.ingredientID)}
                                            />)
                                    }
                                </Left>
                                <Body>
                                    <Text
                                        style={isChecked ? {textDecorationLine: 'line-through'} : {}}
                                    >{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}</Text>
                                    {
                                        item.associatedProduct && (
                                            <SubText
                                                value={`${item.associatedProduct.name} - ${item.associatedProduct.brand}`}
                                            />
                                        )
                                    }
                                    {
                                        item.expirationDate && (
                                            <SubText
                                                value={"Périme le ".concat(moment(item.expirationDate).format('DD/MM/YYYY'))}
                                            />
                                        )
                                    }
                                </Body>
                                <Right>
                                    {
                                        item.associatedProduct && item.associatedProduct.nutriscore && (
                                            <Badge
                                                containerStyle={{
                                                    backgroundColor: Colors.getNutriscoreColor(item.associatedProduct.nutriscore)}}>
                                                <Text
                                                    style={{color: "#fff", fontWeight: 'bold'}}
                                                >{item.associatedProduct.nutriscore.toUpperCase()}</Text>
                                            </Badge>)
                                    }
                                </Right>
                            </ListItem>
                        )
                    })
                }</List>
            </ScrollView>
        )
    }
}

IngredientsList.propTypes = {
    handlePress: PropTypes.func,
    handleLongPress: PropTypes.func,
    ingredients: PropTypes.array,
    selectedIngredients: PropTypes.array,
    checkedIngredients: PropTypes.array,
    shoppingMode: PropTypes.bool,
    displayBadge: PropTypes.bool
}