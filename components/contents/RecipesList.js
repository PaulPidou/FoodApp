import React from "react"
import {View, ScrollView, Image, TouchableOpacity, Platform, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'

import {Right, Body, Content, H2, List, Spinner, Card, CardItem, Icon, Button, Text} from 'native-base'
import { connect } from 'react-redux'
import { saveRecipes, deleteSavedRecipes } from '../../store/api/user'
import GenericStyles from '../../constants/Style'
import Colors from '../../constants/Colors'

class RecipesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestActionOnRecipes: [],
            selectedRecipes: props.selectedRecipes === undefined ? [] : props.selectedRecipes
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            selectedRecipes: nextProps.selectedRecipes === undefined ? [] : nextProps.selectedRecipes,
        }
    }

    _getCommonIngredients(recipeIngredients) {
        if(this.props.fridge === undefined) return undefined
        const ingredients = recipeIngredients.map(ingredient => ingredient.ingredientID)
        return this.props.fridge.filter(value => ingredients.includes(value))
    }

    async _saveRecipe(recipeID) {
        const currentState = this.state.requestActionOnRecipes
        this.setState({requestActionOnRecipes: [...currentState, recipeID]})
        await saveRecipes([recipeID])
        this.setState({requestActionOnRecipes: [...currentState]})
    }

    async _deleteRecipe(recipeID) {
        const currentState = this.state.requestActionOnRecipes
        this.setState({requestActionOnRecipes: [...currentState, recipeID]})
        await deleteSavedRecipes([recipeID])
        this.setState({requestActionOnRecipes: [...currentState]})
    }

    _renderList() {
        return this.props.recipes.map((item) => {
            const commonIngredients = this._getCommonIngredients(item.ingredients)
            return (
                <TouchableOpacity
                    key={this.props.origin + item._id}
                    onPress={this.state.selectedRecipes.length === 0 ?
                        () => this.props.handlePress(item._id) : () => this.props.handleLongPress(item._id)}
                    onLongPress={this.props.origin === 'home' ?
                        () => this.props.handleLongPress(item._id) : () => this.props.handlePress(item._id)
                    }
                >
                    <Card
                        style={[{marginLeft: 15, marginRight: 15, marginTop: 10},
                            this.state.selectedRecipes.includes(item._id) && {borderColor: Colors.tintColor,
                                borderWidth: 0, backgroundColor: Colors.tintColor}]}
                    >
                        <CardItem cardBody>
                            <Image
                                    source={ !item.picture ?
                                        require('../../assets/images/cooking-icon.png') : { uri: item.picture }}
                                    style={{height: 120, width: null, flex: 1, resizeMode: 'cover'}} />
                        </CardItem>
                        <CardItem style={this.state.selectedRecipes.includes(item._id) ?
                            {backgroundColor: Colors.tintColor} : this.props.origin === 'search' ? {paddingBottom: 2} : {}}>
                            <Body><H2 style={this.state.selectedRecipes.includes(item._id) ?
                                {color: Colors.counterTintColor} : GenericStyles.recipeTitle}>{item.title}</H2></Body>
                            <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon
                                    name='timer'
                                    type='MaterialIcons'
                                    style={[{paddingRight: 5}, this.state.selectedRecipes.includes(item._id) &&
                                        {color: Colors.counterTintColor}]}
                                />
                                <Text style={this.state.selectedRecipes.includes(item._id) ?
                                    {color: Colors.counterTintColor} : GenericStyles.recipeTitle}>
                                    {item.totalTime} min</Text>
                            </Right>
                        </CardItem>
                        {
                            this.props.origin === 'search' && (
                                <CardItem style={{marginTop: 0, paddingTop: 0}}>
                                    {
                                        commonIngredients !== undefined && (
                                            commonIngredients.length > 0 && (
                                                <>
                                                    <View style={GenericStyles.commonIngredientsCircle}/>
                                                    <Text>{commonIngredients.length} {
                                                        commonIngredients.length > 1 ? "ingrédients" : "ingrédient"
                                                    }</Text>
                                                </>
                                        ))
                                    }
                                    {
                                        commonIngredients !== undefined && (
                                            (item.ingredients.length - commonIngredients.length) > 0 && (
                                                <>
                                                    <View style={GenericStyles.missingIngredientsCircle}/>
                                                    <Text>{item.ingredients.length - commonIngredients.length} {
                                                        (item.ingredients.length - commonIngredients.length) > 1 ? "ingrédients" : "ingrédient"
                                                    }</Text>
                                                </>
                                        ))
                                    }
                                </CardItem>)
                        }
                        {
                            this.props.origin === 'search' && (
                                    this.state.requestActionOnRecipes.includes(item._id) || this.props.savedRecipes === undefined ? (
                                            <Button transparent
                                                    style={{
                                                        alignSelf: 'center',
                                                        bottom: 10,
                                                    }}
                                            >
                                                <ActivityIndicator size="small" color={Colors.tintColor}/>
                                            </Button>
                                        ) : (
                                        this.props.savedRecipes.includes(item._id) ? (
                                            <Button iconLeft rounded
                                                    style={{
                                                        alignSelf: 'center',
                                                        marginTop: 2,
                                                        bottom: 10,
                                                        height: 35,
                                                        backgroundColor: '#5D9599'
                                                    }}
                                                    onPress={() => this._deleteRecipe(item._id)}
                                            >
                                                <Icon
                                                    name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                                                />
                                                <Text style={{color: Colors.counterTintColor, textTransform: 'capitalize'}}>Retirer</Text>
                                            </Button>
                                        ) : (
                                            <Button iconLeft rounded
                                                    style={{
                                                        alignSelf: 'center',
                                                        marginTop: 2,
                                                        bottom: 10,
                                                        height: 35,
                                                        backgroundColor: Colors.tintColor
                                                    }}
                                                    onPress={() => this._saveRecipe(item._id)}
                                            >
                                                <Icon
                                                    name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
                                                />
                                                <Text style={{color: Colors.counterTintColor, textTransform: 'capitalize'}}>Sauvegarder</Text>
                                            </Button>
                                        )))
                        }
                    </Card>
                </TouchableOpacity>
            )
        })
    }

    render() {
        let content
        if (this.props.recipes === undefined) {
            content = (<Spinner color={Colors.tintColor} />)
        } else if (this.props.recipes.length === 0) {
            content = (
                <Text
                    style={{margin: 10, textAlign: 'center'}}
                >{
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

RecipesList.propTypes = {
    recipes: PropTypes.array,
    savedRecipes: PropTypes.array,
    fridge: PropTypes.array,
    handlePress: PropTypes.func,
    handleLongPress: PropTypes.func,
    selectedRecipes: PropTypes.array,
    origin: PropTypes.string,
    firstSearch: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.generalReducer.savedRecipes !== undefined ?
            state.generalReducer.savedRecipes.map(recipe => recipe._id) : undefined,
        fridge: state.generalReducer.fridge === undefined ? undefined :
            state.generalReducer.fridge.map(ingredient => ingredient.ingredientID)
    }
}

export default connect(mapStateToProps)(RecipesList)