import React from "react"
import {Header, Left, Right, Input, Body} from 'native-base'
import PropTypes from 'prop-types'

import BackButton from "../common/BackButton"
import HeaderActionButton from "../common/HeaderActionButton"
import GenericStyles from '../../constants/Style'
import Colors from "../../constants/Colors"

export default class SearchRecipesHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: null
        }
    }

    render() {
        return (
            <Header searchbar style={GenericStyles.header} >
                <Left style={GenericStyles.headerLeft}>
                    <BackButton
                        navigation={this.props.navigation}
                    />
                </Left>
                <Body>
                    {
                        (!this.props.ingredients || this.props.origin === 'welcome') && (
                            <Input
                                style={GenericStyles.headerTitle}
                                autoFocus = {!this.state.inputText && this.props.origin !== 'welcome'}
                                placeholder={'Je recherche des recettes...'}
                                placeholderTextColor={Colors.counterTintColor}
                                returnKeyType = { "search" }
                                defaultValue={this.state.inputText}
                                onChangeText={(text) => this.setState({inputText: text})}
                                onSubmitEditing={(event) => this.props.handleSearch(event.nativeEvent.text)}
                            />)
                    }
                </Body>
                <Right style={{flex: 0}}>
                    <HeaderActionButton
                        actionFunction={() => this.props.toggleModal()}
                        icon={'add'}
                    />
                </Right>
            </Header>)
    }
}

SearchRecipesHeader.propTypes = {
    ingredients: PropTypes.array,
    origin: PropTypes.string,
    handleSearch: PropTypes.func,
    toggleModal: PropTypes.func
}