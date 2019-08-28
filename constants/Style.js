import {Platform, StyleSheet} from "react-native"
import {Constants} from "expo"

const GenericStyles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        marginTop: Constants.statusBarHeight
    },
    headerTab: {
        backgroundColor: "#fff",
    },
    headerLeft: {
        flex: 0,
        width: 60
    },
    headerFoodListComponent: {
        flex: 1
    },
    icon : {
        color: '#007aff'
    },
    tabIcon : {
        color: '#007aff',
        margin: 10
    },
    tabText: {
        fontFamily: (Platform.OS === 'ios' ? 'System' : 'Roboto_medium')
    },
    settingIcon: {
        backgroundColor: '#007AFF'
    },
    headerTitle: {
        color: '#007aff'
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
    }
})

export default GenericStyles

