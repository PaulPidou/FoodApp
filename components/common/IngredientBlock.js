import React from 'react'
import {TouchableOpacity, View} from "react-native"
import {Text} from "native-base"
import {Avatar} from 'react-native-elements'
import PropTypes from 'prop-types'

import GenericStyles from "../../constants/Style"

export default class IngredientBlock extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={.4}
                onPress={() => this.props.onPress(this.props.item._id)}>
                <View style={[GenericStyles.ingredientBlock,
                    this.props.isSelect ?
                        GenericStyles.selectedIngredientBlock : GenericStyles.unselectedIngredientBlock]}>
                    <Avatar
                        large
                        rounded
                        title={this.props.item.name.charAt(0).toUpperCase()}
                        source={{ uri: this.props.item.picture }}
                        activeOpacity={0.7}
                    />
                    <Text style={{marginTop: 10}}>
                        {this.props.item.name.charAt(0).toUpperCase() + this.props.item.name.slice(1)}
                    </Text>
                </View>
            </TouchableOpacity>)
    }
}

IngredientBlock.propTypes = {
    item: PropTypes.object,
    isSelect: PropTypes.bool,
    onPress: PropTypes.func
}