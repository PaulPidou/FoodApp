import React from "react";
import {Left, Right, Body, Content, ListItem, List, Spinner} from "native-base";

import {ScrollView, Text} from "react-native";
import {Avatar} from "react-native-elements";

export default class RecipesList extends React.Component {

    _renderList() {
        return this.props.recipes.map((item) => {
            const isSelected = this.props.selectedRecipes.includes(item._id)
            const title = isSelected ? null : item.title.charAt(0)
            const icon = isSelected ? {name: 'check'} : null
            return (
                <ListItem
                    avatar
                    key={item._id}
                    onPress={() => this.props.handlePress(item._id)}
                    onLongPress={() => this.props.handleLongPress(item._id)}
                >
                    <Left>
                        <Avatar
                            size="large"
                            rounded
                            title={title}
                            icon={icon}
                            activeOpacity={0.7}
                            onPress={() => this.props.handleLongPress(item._id)}
                        />
                    </Left>
                    <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{
                        item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)
                    }, {item.budget.charAt(0).toUpperCase() + item.budget.slice(1)}</Text>
                    </Body>
                    <Right>
                        <Text>{item.totalTime} min</Text>
                    </Right>
                </ListItem>
            )
        })
    }

    render() {
        let content;
        if (this.props.recipes === null) {
            content = (<Spinner color='#007aff' />)
        } else if (this.props.recipes.length === 0) {
            content = (
                <Text>{
                    this.props.origin === 'home' ?
                        'Votre liste de recettes est vide, commencez dès maintenant à rechercher et sauvegarder des recettes !' :
                        (this.props.firstSearch ? '': 'Aucun résultat, effectuez une nouvelle recherche !')
                }
                </Text>
            )
        } else {
            content = (
                <ScrollView>
                    <List>{this._renderList()}</List>
                </ScrollView>
            )
        }
        return (<Content>{content}</Content>)
    }
}