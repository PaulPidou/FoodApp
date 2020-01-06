import {Platform, StyleSheet} from "react-native"
import Constants from 'expo-constants'

const GenericStyles = StyleSheet.create({
    header: {
        backgroundColor: "#3cff9a", // "#10ff82", // #fff
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
        color: "#bbb" // 007aff
    },
    headerIcon : {
        color: '#fff' // 007aff
    },
    tabIcon : {
        color: '#fff', // '#007aff'
        margin: 10
    },
    tabText: {
        fontFamily: (Platform.OS === 'ios' ? 'System' : 'Roboto_medium')
    },
    settingIcon: {
        backgroundColor: '#007AFF'
    },
    headerTitle: {
        color: '#fff' // 007aff
    },
    headerButton: {
        color: '#007aff',
        fontSize: 14,
        marginLeft: 0,
        alignSelf:'center'
    },
    formBlockButton: {
        margin: 10
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
        color: '#888'
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
    }
})

export default GenericStyles

