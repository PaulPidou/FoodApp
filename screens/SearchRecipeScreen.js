import React from 'react'
import {connect} from "react-redux"
import {Container} from 'native-base'
import PropTypes from "prop-types"

import NoResultWarning from "../components/common/NoResultWarning"
import WelcomeProcessHeader from "../components/common/WelcomeProcessHeader"
import SearchRecipesHeader from "../components/headers/SearchRecipesHeader"
import RecipesList from '../components/contents/RecipesList'
import SearchRecipeModal from "../components/contents/SearchRecipeModal"
import AddRecipeFromUrlModal from "../components/contents/AddRecipeFromUrlModal"

import { getRecipesSummaryFromKeywords, getRecipesSummaryFromIngredients,
    getSeasonalRecipesSummaryFromKeywords, getSeasonalRecipesSummaryFromIngredients,
    getMostFamousRecipesSummary, getMostFamousSeasonalRecipesSummary } from '../store/api/public'

class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: null,
            recipes: [],
            firstSearch: true,
            displayWarning: false,
            ingredients: props.navigation.getParam('ingredients', null),
            origin: props.navigation.getParam('origin', null),
            isModalVisible: props.navigation.getParam('origin', null) === 'welcome',
            isAddRecipeModalVisible: false
        }
        this.handlePress = this.handlePress.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
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
                if(this.props.seasonalRecipes) {
                    getSeasonalRecipesSummaryFromIngredients(this.state.ingredients.map(item => item.ingredientID)).then(
                        recipes => {
                            if(recipes.length > 0) {
                                this.setState({ recipes, firstSearch: false })
                            } else {
                                this.setState({ displayWarning: true })
                                getRecipesSummaryFromIngredients(this.state.ingredients.map(item => item.ingredientID))
                                    .then(
                                        recipes => {
                                            this.setState({ recipes, firstSearch: false, displayWarning: false })
                                        })
                            }
                        })
                } else {
                    getRecipesSummaryFromIngredients(this.state.ingredients.map(item => item.ingredientID)).then(
                        recipes => {
                            this.setState({ recipes, firstSearch: false })
                        })
                }

            }
        }
    }

    handlePress(itemID) {
        this.props.navigation.navigate('RecipeDetails', {recipeId: itemID, origin: 'search'})
    }

    async handleSearch(keywords) {
        let recipes = []
        this.setState({ recipes: undefined })
        if(this.props.seasonalRecipes) {
            recipes = await getSeasonalRecipesSummaryFromKeywords(keywords)
            if(recipes.length === 0) {
                this.setState({ displayWarning: true })
                recipes = await getRecipesSummaryFromKeywords(keywords)
                this.setState({ displayWarning: false })
            }
        } else {
            recipes = await getRecipesSummaryFromKeywords(keywords)
        }
        this.setState({ recipes: recipes.sort((a, b) => b.score - a.score), firstSearch: false })
    }

    toggleAddRecipeModal() {
        this.setState({ isAddRecipeModalVisible: !this.state.isAddRecipeModalVisible })
    }

    render() {
        return (
            <Container>
                <SearchRecipesHeader
                    navigation={this.props.navigation}
                    ingredients={this.state.ingredients}
                    origin={this.state.origin}
                    handleSearch={this.handleSearch}
                    toggleModal={() => this.toggleAddRecipeModal()}
                />
                <SearchRecipeModal isModalVisible={this.state.isModalVisible} />
                <AddRecipeFromUrlModal
                    navigation={this.props.navigation}
                    isModalVisible={this.state.isAddRecipeModalVisible }
                    toggleModal={() => this.toggleAddRecipeModal()} />
                {
                    this.state.displayWarning && (<NoResultWarning
                            message={'Nouvelle recherche sans contrainte de saisons sur les ingrédients en cours...'} />)
                }
                {
                    this.state.origin === 'welcome' && (
                        <WelcomeProcessHeader
                            step={2}
                            buttonText={'Prochaine étape'}
                            onPress={() => {
                                this.props.navigation.navigate('ShoppingList', {origin: 'welcome'})
                            }}
                        />)
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
