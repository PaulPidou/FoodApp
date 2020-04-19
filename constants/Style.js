import {Platform, StyleSheet} from "react-native"
import Constants from 'expo-constants'
import Colors from "./Colors"

const GenericStyles = StyleSheet.create({
    activityIndicator: {
        color: Colors.tintColor
    },
    header: {
        backgroundColor: Colors.tintColor,
        //marginTop: Constants.statusBarHeight
    },
    headerTab: {
        backgroundColor: Colors.tintColor,
    },
    headerLeft: {
        flex: 0,
        width: 60
    },
    headerFoodListComponent: {
        flex: 1
    },
    icon : {
        color: "#ddd"
    },
    headerIcon : {
        color: '#fff'
    },
    tabIcon : {
        color: '#fff',
        margin: 10
    },
    tabText: {
        fontFamily: (Platform.OS === 'ios' ? 'System' : 'Roboto_medium'),
        color: '#fff'
    },
    settingIcon: {
        backgroundColor: '#2ba55d'
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Showlove_Regular',
        fontSize: 26
    },
    loginContainer: {
        //marginTop: Constants.statusBarHeight,
        backgroundColor: Colors.splashScreenColor
    },
    loginContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight
    },
    loginImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop: 20
    },
    loginTitle: {
        color: Colors.counterTintColor,
        fontSize: 32,
        fontWeight: '100',
        marginBottom: 10
    },
    loginFormItem: {
        backgroundColor: Colors.counterTintColor,
        width: 350,
        marginTop: 10
    },
    formBlockButton: {
        marginTop: 15,
        width: 350,
        alignSelf:'center',
        backgroundColor: '#1A4242'
    },
    ingredientBlock: {
        width: 150,
        height: 150,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5
    },
    unselectedIngredientBlock: {
        borderColor: '#eee',
    },
    selectedIngredientBlock: {
        borderColor: '#79ffb6',
        backgroundColor: '#b3ffde'
    },
    recipeTitle: {
        color: '#555'
    },
    commonIngredientsCircle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: '#5CD327',
        margin: 5
    },
    missingIngredientsCircle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: '#D3275C',
        margin: 5
    },
    welcomeScreenInstructionNumber: {
        fontSize: 35,
        color: '#1A4242'
    },
    welcomeScreenInstructionText: {
        fontSize: 20,
        color: '#1A4242',
        marginBottom: 5
    },
    modalText: {
        color: '#286064',
        fontSize: 20,
        marginLeft: 15
    },
    modalTextBold: {
        color: '#286064',
        fontSize: 20,
        fontWeight: 'bold'
    },
    commonIngredientsCircleModal: {
        width: 12,
        height: 12,
        borderRadius: 12/2,
        backgroundColor: '#5CD327',
        marginTop: 35
    },
    missingIngredientsCircleModal: {
        width: 12,
        height: 12,
        borderRadius: 12/2,
        backgroundColor: '#D3275C',
        marginTop: 35
    },
    subText: {
        color: '#808080',
        fontSize: 12
    },
    warningMessage: {
        alignItems: 'center',
        backgroundColor: '#880000',
        padding: 10
    }
})

export default GenericStyles

