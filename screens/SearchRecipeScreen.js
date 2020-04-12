import React from 'react'
import {Platform, View} from 'react-native'
import {Container, Header, Left, Button, Icon, Input, Body, Text} from 'native-base'
import {connect} from "react-redux"

import BackButton from "../components/common/BackButton"
import RecipesList from '../components/contents/RecipesList'
import SearchRecipeModal from "../components/contents/SearchRecipeModal"

import { getRecipesSummaryFromKeywords, getRecipesSummaryFromIngredients,
    getMostFamousRecipesSummary, getMostFamousSeasonalRecipesSummary } from '../store/api/public'
import GenericStyles from '../constants/Style'
import Colors from "../constants/Colors"
import PropTypes from "prop-types"

class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: null,
            recipes: [],
            firstSearch: true,
            ingredients: props.navigation.getParam('ingredients', null),
            origin: props.navigation.getParam('origin', null),
            isModalVisible: props.navigation.getParam('origin', null) === 'welcome'
        }
        this.handlePress = this.handlePress.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        if (this.state.ingredients) {
            this.setState({ recipes: undefined })
            if(this.state.ingredients.length === 0) {
                if(this.props.seasonalRecipes) {
                    getMostFamousSeasonalRecipesSummary().then(
                        recipes => {
                            this.setState({ recipes, firstSearch: false })
                        }
                    )
                } else {
                    getMostFamousRecipesSummary().then(
                        recipes => {
                            this.setState({ recipes, firstSearch: false })
                        }
                    )
                }
            } else {
                getRecipesSummaryFromIngredients(this.state.ingredients.map(item => item.ingredientID)).then(
                    recipes => {
                        this.setState({ recipes, firstSearch: false })
                    })
            }
        }
    }

    handlePress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.props.navigation.navigate('RecipeDetails', {recipeId: itemID, origin: 'search'})
        }
    }

    async handleSearch(keywords) {
        this.setState({ recipes: undefined })
        const recipes = await getRecipesSummaryFromKeywords(keywords)
        this.setState({ recipes, firstSearch: false })
    }

    header() {
        return(
            <Header searchbar style={GenericStyles.header} >
                <Left style={GenericStyles.headerLeft}>
                    <BackButton
                        navigation={this.props.navigation}
                    />
                </Left>
                <Body>
                {
                    (!this.state.ingredients || this.state.origin === 'welcome') && (
                        <Input
                            style={GenericStyles.headerTitle}
                            autoFocus = {!this.state.inputText && this.state.origin !== 'welcome'}
                            placeholder={'Je recherche des recettes...'}
                            placeholderTextColor={Colors.counterTintColor}
                            returnKeyType = { "search" }
                            defaultValue={this.state.inputText}
                            onChangeText={(text) => this.setState({inputText: text})}
                            onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
                        />)
                }
                </Body>
            </Header>
        )
    }

    render() {
        return (
            <Container>
                {this.header()}
                <SearchRecipeModal isModalVisible={this.state.isModalVisible} />
                {
                    this.state.origin === 'welcome' && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={{marginTop: 5, marginBottom: 5}}>
                                <Text style={{color: Colors.tintColor}}>Frigidaire > </Text>
                                <Text style={{color: Colors.tintColor, textDecorationLine: 'underline'}}>Recettes</Text>
                                <Text style={{color: '#286064'}}> > Liste de courses</Text>
                            </Text>
                            <Button
                                style={{marginBottom: 5}}
                                onPress={() => {
                                    this.props.navigation.navigate('ShoppingList', {origin: 'welcome'})
                                }}
                                rounded success iconRight>
                                <Text>Prochaine étape</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </View>
                    )
                }
                <RecipesList
                    origin={'search'}
                    firstSearch={this.state.firstSearch}
                    recipes={this.state.recipes}
                    handlePress={this.handlePress}
                />
            </Container>
        )
    }
}

SearchRecipeScreen.propTypes = {
    seasonalRecipes: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        seasonalRecipes: state.settingsReducer.seasonalRecipes
    }
}

export default connect(mapStateToProps)(SearchRecipeScreen)
