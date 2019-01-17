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
    }
})

export default GenericStyles

