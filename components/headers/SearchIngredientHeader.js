import React from "react"
import {Header, Left, Input, Right, Button, Icon} from 'native-base'
import PropTypes from 'prop-types'

import BackButton from "../common/BackButton"
import GenericStyles from '../../constants/Style'
import Colors from "../../constants/Colors"

export default class SearchIngredientHeader extends React.Component {
    render() {
        return (
            <Header searchbar style={GenericStyles.header} >
                <Left style={GenericStyles.headerLeft}>
                    {
                        this.props.origin !== 'welcome' && (
                            <BackButton
                                navigation={this.props.navigation}
                            />)
                    }
                </Left>
                <Input
                    style={GenericStyles.headerTitle}
                    placeholder={'Je recherche un ingrédient...'}
                    placeholderTextColor={Colors.counterTintColor}
                    returnKeyType = { "search" }
                    onChangeText={text => this.props.searchFilterFunction(text)}
                />
                <Right style={{flex: 0}}>
                    <Button
                        transparent
                        onPress={() => this.props.sortIngredients(!this.props.sortByFame)}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={this.props.sortByFame ? 'sort-by-alpha': 'sort' }
                            type='MaterialIcons'
                        />
                    </Button>
                </Right>
            </Header>)
    }
}

SearchIngredientHeader.propTypes = {
    origin: PropTypes.string,
    sortByFame: PropTypes.bool,
    searchFilterFunction: PropTypes.func,
    sortIngredients: PropTypes.func
}