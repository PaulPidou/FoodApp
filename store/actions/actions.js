import { Toast } from 'native-base'
import { FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR } from './types'
import store from '../reducers/index'

const api_ip = 'http://192.168.43.163:3000/api'

export const fetchSavedRecipes = function(userToken) {
    store.dispatch({ type: FETCH_RECIPES_PENDING })

    fetch(`${api_ip}/user/savedrecipes`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' }
    }).then((response) => response.json())
        .then((responseJSON) => {
        store.dispatch({
            type: FETCH_RECIPES_SUCCESS,
            savedRecipes: responseJSON
        })
    }).catch(() => {
        Toast.show({
            text: 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok',
            duration: 3000,
        })
        store.dispatch({ type: FETCH_RECIPES_ERROR })
    })
}