import React from "react"
import {ScrollView, Text, Image, TouchableOpacity} from "react-native"
import PropTypes from 'prop-types'

import {Right, Body, Content, H2, List, Spinner, Card, CardItem, Icon} from "native-base"

export default class RecipesList extends React.Component {

    _renderList() {
        return this.props.recipes.map((item) => {
            return (
                <TouchableOpacity
                    key={this.props.origin + item._id}
                    onPress={() => this.props.handlePress(item._id)}
                >
                    <Card
                        style={{marginLeft: 15, marginRight: 15, marginTop: 10}}
                    >
                        <CardItem cardBody>
                            <Image source={require('../../assets/images/cooking-icon.png')}
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
    selectedRecipes: PropTypes.array,
    handlePress: PropTypes.func,
    handleLongPress: PropTypes.func,
    origin: PropTypes.string,
    firstSearch: PropTypes.bool
}