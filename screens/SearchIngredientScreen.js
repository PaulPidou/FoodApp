import React from 'react'
import { Container, Content, List, ListItem, Input, Button, Text, Header, Left, Icon, Spinner } from 'native-base'
import { Platform, ScrollView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { getAllIngredients } from '../store/api/public'
import GenericStyles from '../constants/Style'

export default class SearchIngredientScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: undefined,
            ingredientsCache: undefined
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        getAllIngredients().then(
            ingredientsCache => {
                this.setState({ ingredientsCache, ingredients: ingredientsCache })
            })
    }

    searchFilterFunction(text) {
        const filteredIngredients = this.state.ingredientsCache.filter(item => {
            return item.name.startsWith(text.toLowerCase())
        })
        this.setState({ ingredients: filteredIngredients })
    }

    renderList_old() {
        let new_letter = true
        let current_letter = null

        return this.state.ingredients.map((item) => {
            if(current_letter !== item.name.charAt(0)) {
                new_letter = true
                current_letter = item.name.charAt(0)
            }

            if (new_letter) {
                new_letter = false
                return (
                    [
                        <ListItem key={item.name.charAt(0)} itemDivider>
                            <Text>{item.name.charAt(0).toUpperCase()}</Text>
                        </ListItem>,
                        <ListItem
                            key={item._id}
                            onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item,
                                origin: this.props.navigation.state.params.origin})}
                        >
                            <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                        </ListItem>
                    ]
                )
            } else {
                return (
                    <ListItem
                        key={item._id}
                        onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item,
                            origin: this.props.navigation.state.params.origin})}
                    >
                        <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                    </ListItem>
                )
            }
        })
    }

    renderList() {
        let view = []
        for (let i = 0; i < this.state.ingredients.length; i+=2) {
            const item1 = this.state.ingredients[i].name
            let row = null

            if (i+1 <= this.state.ingredients.length-1) {
                const item2 = this.state.ingredients[i+1].name

                row = (<View
                    key={i}
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: 150, height: 150, margin: 10, justifyContent: 'center',
                        alignItems: 'center', borderColor: '#eee', borderWidth: 1, borderRadius: 5}}>
                        <Avatar
                            large
                            rounded
                            title={item1.charAt(0).toUpperCase()}
                            activeOpacity={0.7}
                        />
                        <Text style={{marginTop: 10}}>{item1.charAt(0).toUpperCase() + item1.slice(1)}</Text>
                    </View>
                    <View style={{width: 150, height: 150, margin: 10, justifyContent: 'center',
                        alignItems: 'center', borderColor: '#eee', borderWidth: 1, borderRadius: 5}}>
                        <Avatar
                            large
                            rounded
                            title={item2.charAt(0).toUpperCase()}
                            activeOpacity={0.7}
                        />
                        <Text style={{marginTop: 10}}>{item2.charAt(0).toUpperCase() + item2.slice(1)}</Text>
                    </View>
                </View>)
            } else {
                row = (<View
                    key={i}
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: 150, height: 150, margin: 10, justifyContent: 'center',
                        alignItems: 'center', borderColor: '#eee', borderWidth: 1, borderRadius: 5}}>
                        <Avatar
                            large
                            rounded
                            title={item1.charAt(0).toUpperCase()}
                            activeOpacity={0.7}
                        />
                        <Text style={{marginTop: 10}}>{item1.charAt(0).toUpperCase() + item1.slice(1)}</Text>
                    </View>
                    <View style={{width: 150, height: 150, margin: 10}} />
                </View>)
            }
            view.push(row)
        }
        return view
    }

    render() {
        return (
            <Container>
                <Header searchbar style={GenericStyles.header} >
                    <Left style={GenericStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()} >
                            <Icon
                                style={GenericStyles.icon}
                                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                            />
                        </Button>
                    </Left>
                    <Input
                        placeholder={'Je recherche un ingrédient...'}
                        returnKeyType = { "search" }
                        onChangeText={text => this.searchFilterFunction(text)}
                    />
                </Header>
                <Content>
                    {
                        this.state.ingredientsCache === undefined ? (<Spinner color='#007aff' />) : (
                            <ScrollView>
                                {this.renderList()}
                            </ScrollView>
                        )
                    }
                </Content>
            </Container>
        )
    }
}