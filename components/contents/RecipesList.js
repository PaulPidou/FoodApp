import React from "react"
import {View, ScrollView, Text, Image, TouchableOpacity, Dimensions, Platform} from 'react-native'
import PropTypes from 'prop-types'

import {Right, Body, Content, H2, List, Spinner, Card, CardItem, Icon, Button} from 'native-base'
import { connect } from 'react-redux'
import GenericStyles from '../../constants/Style'

class RecipesList extends React.Component {
    _getCommonIngredients(recipeIngredients) {
        const ingredients = recipeIngredients.map(ingredient => ingredient.ingredientID)
        return this.props.fridge.filter(value => ingredients.includes(value))
    }

    _renderList() {
        return this.props.recipes.map((item) => {
            const commonIngredients = this._getCommonIngredients(item.ingredients)
            return (
                <TouchableOpacity
                    key={this.props.origin + item._id}
                    onPress={() => this.props.handlePress(item._id)}
                >
                    <Card
                        style={{marginLeft: 15, marginRight: 15, marginTop: 10}}
                    >
                        <CardItem cardBody>
                            <Image
                                    //source={{ uri: item.picture }}
                                    source={require('../../assets/images/cooking-icon.png')}
                                    style={{height: 120, width: null, flex: 1, resizeMode: 'contain'}} />
                        </CardItem>
                        <CardItem>
                            <Body><H2>{item.title}</H2></Body>
                            <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon
                                    name='timer'
                                    type='MaterialIcons'
                                    style={{paddingRight: 5}}
                                />
                                <Text>{item.totalTime} min</Text>
                            </Right>
                        </CardItem>

                                <CardItem style={{marginTop: 0, paddingTop: 0}}>
                                    {
                                        (commonIngredients.length > 0) && (
                                            <>
                                                <View style={GenericStyles.commonIngredientsCircle}/>
                                                <Text>{commonIngredients.length} ingrédient(s)</Text>
                                            </>
                                        )
                                    }
                                    {
                                        (item.ingredients.length - commonIngredients.length) > 0 && (
                                            <>
                                                <View style={GenericStyles.missingIngredientsCircle}/>
                                                <Text>{item.ingredients.length - commonIngredients.length} ingrédient(s)</Text>
                                            </>
                                        )
                                    }
                                </CardItem>
                                {
                                    this.props.savedRecipes.includes(item._id) ? (
                                        <Button iconLeft rounded
                                                style={{
                                                    alignSelf: 'center',
                                                    width: 120,
                                                    bottom: 10,
                                                    backgroundColor: '#5D9599'
                                                }}
                                        >
                                            <Icon
                                                style={{marginLeft: 20}}
                                                name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                                            />
                                            <Text style={{color: '#fff', marginLeft: 15}}>Retirer</Text>
                                        </Button>
                                    ) : (
                                        <Button iconLeft rounded success
                                                style={{
                                                    alignSelf: 'center',
                                                    width: 150,
                                                    bottom: 10
                                                }}
                                        >
                                            <Icon
                                                style={{marginLeft: 20}}
                                                name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
                                            />
                                            <Text style={{color: '#fff', marginLeft: 15}}>Sauvegarder</Text>
                                        </Button>
                                    )
                                }


                    </Card>
                </TouchableOpacity>
            )
        })
    }

    render() {
        let content
        if (this.props.recipes === undefined) {
            content = (<Spinner color='#007aff' />)
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
    origin: PropTypes.string,
    firstSearch: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.generalReducer.savedRecipes.map(recipe => recipe._id),
        fridge: state.generalReducer.fridge.map(ingredient => ingredient.ingredientID)
    }

    /* {
                            this.props.origin === 'search' && (  */
}

export default connect(mapStateToProps)(RecipesList)