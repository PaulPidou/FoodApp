import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import {Tab, TabHeading, Icon, Tabs, Spinner, H1, List, ListItem, Left, Right, Body, Badge} from 'native-base'

import {Platform, ScrollView, Text, View} from 'react-native'
import GenericStyles from '../../constants/Style'
import {Avatar} from 'react-native-elements'

export default class RecipeTabs extends React.Component {

    renderRecipe() {
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
                    <Image
                        source={ !recipe.picture ? null : { uri: recipe.picture }}
                        style={ !recipe.picture ? {height: 0} : {height: 150, width: null, flex: 1, resizeMode: 'cover'}} />
                    <H1 style={{textAlign: 'center', marginTop: 5, color: '#888'}}>{recipe.title}</H1>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                        {
                            recipe.tags.map((tag) => {
                                return(
                                    <Badge
                                        key={tag}
                                        style={{margin: 5, backgroundColor: "#33ffb1"}}
                                    >
                                        <Text style={GenericStyles.headerTitle}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Text>
                                    </Badge>
                            )})
                        }
                    </View>
                    <List>
                        { recipe.author && (
                            <ListItem icon key={'author'}>
                                <Left>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name='person'
                                        type="MaterialIcons" />
                                </Left>
                                <Body>
                                    <Text>{recipe.author}</Text>
                                </Body>
                            </ListItem>)
                        }
                        { recipe.difficulty && (
                            <ListItem icon key={'difficulty'}>
                                <Left>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name={Platform.OS === 'ios' ? 'ios-podium' : 'md-podium'} />
                                </Left>
                                <Body>
                                <Text>{recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</Text>
                                </Body>
                            </ListItem>)
                        }
                        { recipe.budget && (
                            <ListItem icon key={'budget'}>
                                <Left>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} />
                                </Left>
                                <Body>
                                <Text>{recipe.budget.charAt(0).toUpperCase() + recipe.budget.slice(1)}</Text>
                                </Body>
                            </ListItem>)
                        }
                    </List>
                    <List>
                        <ListItem itemDivider key={'time_header'}>
                            <Text>Temps total de préparation: {recipe.totalTime} min</Text>
                        </ListItem>
                        <ListItem
                            key={'time'}
                            style={{flex: 3, flexDirection: 'row'}}
                        >
                            <View
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-hand' : 'md-hand'} />
                                <Text style={{marginLeft: 5}}>{recipe.timingDetails.preparation} min</Text>
                            </View>
                            <View
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'} />
                                <Text style={{marginLeft: 5}} >{recipe.timingDetails.cooking} min</Text>
                            </View>
                            <View
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
                            >
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-timer' : 'md-timer'} />
                                <Text style={{marginLeft: 5}} >{recipe.timingDetails.rest} min</Text>
                            </View>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem itemDivider key={0}>
                            <Text>Recette {recipe.recipeQuantity && (
                                'pour '.concat(recipe.recipeQuantity.value,' ', recipe.recipeQuantity.unit)
                            )}</Text>
                        </ListItem>
                        {this.renderRecipe()}
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
                                            title={item.ingredientName.charAt(0).toUpperCase()}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.display}</Text>
                                    </Body>
                                    <Right>
                                        {
                                            this.props.commonIngredientsWithFridge.includes(item.ingredientID) ? (
                                                <View style={GenericStyles.commonIngredientsCircle}/>
                                            ) : (
                                                <View style={GenericStyles.missingIngredientsCircle}/>
                                            )
                                        }
                                    </Right>
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
                                    key={item.utensilName}
                                >
                                    <Left style={{height: 30}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={this._getUtensilAvatarTitle(item.utensilName)}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.utensilName}</Text>
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
                tabBarUnderlineStyle={{backgroundColor: '#fff'}}
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
    recipe: PropTypes.object,
    commonIngredientsWithFridge: PropTypes.array
}