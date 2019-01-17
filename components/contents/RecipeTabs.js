import React from 'react'
import PropTypes from 'prop-types'
import {Tab, TabHeading, Icon, Tabs, Spinner, H1, List, ListItem, Left, Body} from 'native-base'

import {Platform, ScrollView, Text} from 'react-native'
import GenericStyles from '../../constants/Style'
import {Avatar} from 'react-native-elements'

export default class RecipeTabs extends React.Component {
    renderList() {
        const recipe = this.props.recipe
        let i = 0
        return recipe.recipe.map((item) => {
            i++
            return (
                <ListItem
                    avatar
                    key={i}
                >
                    <Left>
                        <Avatar
                            size="large"
                            rounded
                            title={i.toString()}
                            activeOpacity={0.7}
                        />
                    </Left>
                    <Body>
                        <Text>{item}</Text>
                    </Body>
                </ListItem>
            )
        })
    }

    recipe() {
        const recipe = this.props.recipe
        let content
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <H1 style={{textAlign: 'center', marginTop: 5, color: '#007aff'}}>{recipe.title}</H1>
                    <List>
                        { recipe.author && (
                            <ListItem icon key={'author'}>
                                <Left>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name='person' />
                                </Left>
                                <Body>
                                    <Text>{recipe.author}</Text>
                                </Body>
                            </ListItem>)
                        }
                        <ListItem icon key={'difficulty'}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-podium' : 'md-podium'} />
                            </Left>
                            <Body>
                                <Text>{recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon key={'budget'}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} />
                            </Left>
                            <Body>
                                <Text>{recipe.budget.charAt(0).toUpperCase() + recipe.budget.slice(1)}</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider key={0}>
                            <Text>Recette</Text>
                        </ListItem>
                        {this.renderList()}
                    </List>
                </ScrollView>)
        }
        return content
    }

    ingredients() {
        const recipe = this.props.recipe
        let content
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <List>{
                        recipe.ingredients.map((item) => {
                            return (
                                <ListItem
                                    icon
                                    avatar
                                    key={item.ingredientID}
                                >
                                    <Left style={{height: 30}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={item.ingredient.charAt(0).toUpperCase()}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.display}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    }</List>
                </ScrollView>)
        }
        return content
    }

    utensils() {
        const recipe = this.props.recipe
        let content
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <List>{
                        recipe.utensils.map((item) => {
                            return (
                                <ListItem
                                    icon
                                    avatar
                                    key={item.utensil}
                                >
                                    <Left style={{height: 30}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={this._getUtensilAvatarTitle(item.utensil)}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.utensil}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    }</List>
                </ScrollView>)
        }
        return content
    }

    _getUtensilAvatarTitle(utensil) {
        if(isNaN(utensil.charAt(0))) {
            return utensil.charAt(0).toUpperCase()
        } else {
            const utensilArray = utensil.split(' ')
            return utensilArray.length > 1 ? utensilArray[1].charAt(0).toUpperCase() : ''
        }
    }

    render() {
        return (
            <Tabs
                key={'tabs'}
                tabBarUnderlineStyle={{backgroundColor: '#007AFF'}}
                tabContainerStyle={{elevation: 0}}
            >
                <Tab
                    heading={
                        <TabHeading style={GenericStyles.headerTab}>
                            <Icon
                                style={GenericStyles.tabIcon}
                                name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'} />
                            <Text style={GenericStyles.tabText}>Recette</Text>
                        </TabHeading>}>
                    {this.recipe()}
                </Tab>
                <Tab
                    heading={
                        <TabHeading style={GenericStyles.headerTab}>
                            <Icon
                                style={GenericStyles.tabIcon}
                                name={Platform.OS === 'ios' ? 'ios-nutrition' : 'md-nutrition'} />
                            <Text style={GenericStyles.tabText}>Ingrédients</Text>
                        </TabHeading>}>
                    {this.ingredients()}
                </Tab>
                <Tab heading={
                    <TabHeading
                        style={GenericStyles.headerTab}
                    >
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'} />
                        <Text style={GenericStyles.tabText}>Ustensiles</Text>
                    </TabHeading>}>
                    {this.utensils()}
                </Tab>
            </Tabs>
        )
    }
}

RecipeTabs.propTypes = {
    recipe: PropTypes.object
}