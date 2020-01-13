import React from "react"
import {Image, Text, View} from "react-native"
import Constants from "expo-constants"
import {Button} from "native-base"
import GenericStyles from "../constants/Style"
import Colors from "../constants/Colors"

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: Colors.splashScreenColor }}
            >
                <View style={{ flex: 1, alignItems: 'center', marginLeft: 15, marginRight: 15}}>
                    <Image
                        style={{ height: 150, resizeMode: 'contain', marginTop: Constants.statusBarHeight + 10}}
                        source={require('../assets/images/icon_large.png')}
                    />
                    <Text style={{color: '#286064', fontSize: 27, fontWeight: '100', marginBottom: 10}}>
                        Groceries (Re)Cycle</Text>

                    <Text style={{color: Colors.counterTintColor, fontSize: 24, fontWeight: '100'}}>
                        Bienvenue, vous allez être guidé pour effectuer les étapes suivantes:</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionNumber}
                    >1</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionText}
                    >Remplissez votre frigitaire virtuel</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionNumber}
                    >2</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionText}
                    >Choississez parmi les recettes suggérées</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionNumber}
                    >3</Text>
                    <Text
                        style={GenericStyles.welcomeScreenInstructionText}
                    >Vérifier votre liste de courses</Text>
                    <Button
                        onPress={() => this.props.navigation.navigate('SearchIngredient', {origin: 'welcome'})}
                        style={{backgroundColor: '#5D9599', height: 50, marginTop: 15}}
                        full>
                        <Text style={{color:'#fff', fontSize: 22}}>
                            C'est parti !</Text>
                    </Button>
                    <Button
                        onPress={() => this.props.navigation.navigate('App')}
                        transparent>
                        <Text style={{color: Colors.counterTintColor, fontSize: 18}}>Passer ces étapes</Text>
                    </Button>
                </View>
            </View>
        )
    }
}