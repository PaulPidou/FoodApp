import React from 'react'
import {ActivityIndicator, View} from "react-native"
import {Button, Icon, Text} from "native-base"
import PropTypes from 'prop-types'

import Colors from "../../constants/Colors"

export default class WelcomeProcessHeader extends React.Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={this.props.step === 1 ?
                        ({color: Colors.tintColor, textDecorationLine: 'underline'}) :
                        ({color: Colors.tintColor})}>
                        Frigidaire
                    </Text>
                    <Text style={this.props.step === 1 ? ({color: '#286064'}) : ({color: Colors.tintColor})}> > </Text>
                    <Text style={this.props.step === 2 ?
                        ({color: Colors.tintColor, textDecorationLine: 'underline'}) :
                        (this.props.step === 1 ? ({color: '#286064'}) : ({color: Colors.tintColor}))}>
                        Recettes
                    </Text>
                    <Text style={this.props.step === 3 ? ({color: Colors.tintColor}) : ({color: '#286064'})}> > </Text>
                    <Text style={this.props.step === 3 ?
                        ({color: Colors.tintColor, textDecorationLine: 'underline'}) :
                        ({color: '#286064'})}>
                        Liste de courses
                    </Text>
                </Text>
                {
                    this.props.requestOnGoing ? (
                        <Button transparent
                                style={{ alignSelf: 'center', bottom: 10 }} >
                            <ActivityIndicator size="small" color={Colors.tintColor}/>
                        </Button>) :
                        (<Button
                                style={{marginBottom: 5}}
                                onPress={() => this.props.onPress()}
                                rounded success iconRight>
                                <Text>{this.props.buttonText}</Text>
                                <Icon name='arrow-forward' />
                        </Button>
                        )}
            </View>)
    }
}

WelcomeProcessHeader.propTypes = {
    step: PropTypes.number,
    buttonText: PropTypes.string,
    requestOnGoing: PropTypes.bool,
    onPress: PropTypes.func,
}