import React from 'react'
import {Alert, Platform} from 'react-native'
import {Container, Left, Right, Button, Icon, Header} from 'native-base'

import GenericStyles from '../constants/Style'
import RecipeTabs from '../components/contents/RecipeTabs'
import {getRecipeFromId} from '../api_calls/public'

export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', 'NO-ID'),
            recipe: null
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null
                this.setState({recipe})
            }
        )
    }

    header() {
        const rightButton = this.props.navigation.state.params.origin === 'search' ?
            (
                <Button
                    transparent
                    onPress={() => console.log("Recipe delete")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                    />
                </Button>
            ) : ([
                <Button
                    key={'cart'}
                    transparent
                    onPress={() => console.log("Add ingredients to cart")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                    />
                </Button>,
                <Button
                    key={'trash'}
                    transparent
                    onPress={() => {
                        Alert.alert(
                            'Confirmation',
                            'Confirmez vous la suppression ?',
                            [
                                {text: 'Annuler', style: 'cancel'},
                                {text: 'Oui', onPress: () => console.log('OK Pressed')}
                            ]
                        )}}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    />
                </Button>
            ])
        return (
            <Header
                style={GenericStyles.header}
                hasTabs
            >
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Right>{rightButton}</Right>
            </Header>)
    }

    render() {
        return (
            <Container>
                {this.header()}
                <RecipeTabs
                    recipe={this.state.recipe}
                />
            </Container>
        )
    }
}
