import {Platform, StyleSheet} from "react-native"
import Constants from 'expo-constants'
import Colors from "./Colors"

const GenericStyles = StyleSheet.create({
    activityIndicator: {
        color: "#3cff9a"
    },
    header: {
        backgroundColor: "#3cff9a",
        marginTop: Constants.statusBarHeight
    },
    headerTab: {
        backgroundColor: "#3cff9a",
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
        backgroundColor: '#3cff9a'
    },
    headerTitle: {
        color: '#fff'
    },
    headerButton: {
        color: '#007aff',
        fontSize: 14,
        marginLeft: 0,
        alignSelf:'center'
    },
    loginContainer: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: Colors.splashScreenColor
    },
    loginContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop: 15
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
        backgroundColor: '#5D9599'
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
        color: '#286064'
    },
    welcomeScreenInstructionText: {
        fontSize: 20,
        color: '#286064',
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
    }
})

export default GenericStyles

