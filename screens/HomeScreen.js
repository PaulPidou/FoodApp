import React from 'react'
import { Container, Left, Body, Right, Button, Icon, Header, Title } from 'native-base'
import { connect } from 'react-redux'
import { NetworkConsumer } from 'react-native-offline'

import RecipesList from '../components/contents/RecipesList'
import GenericStyles from "../constants/Style"
import PropTypes from "prop-types"

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.handlePress = this.handlePress.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    handlePress(itemID) {
        this.props.navigation.navigate('RecipeDetails', { recipeId: itemID, origin: 'home' })
    }

    header() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            style={GenericStyles.icon}
                            name='menu'
                            type="MaterialIcons"
                        />
                    </Button>
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>Recettes</Title>
                </Body>
                <Right>
                    <NetworkConsumer>
                        {({ isConnected }) => (
                            isConnected && (
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.navigate("SearchRecipe")}>
                                    <Icon
                                        style={GenericStyles.icon}
                                        name='search'
                                        type='MaterialIcons'
                                    />
                                </Button>
                            )
                        )}
                    </NetworkConsumer>
                </Right>
            </Header>
        )
    }

  render() {
      return (
          <Container>
              {this.header()}
              <RecipesList
                  origin={'home'}
                  recipes={this.props.savedRecipes}
                  handlePress={this.handlePress}
              />
          </Container>
      )
  }
}

HomeScreen.propTypes = {
    savedRecipes: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.generalReducer.savedRecipes
    }
}

export default connect(mapStateToProps)(HomeScreen)