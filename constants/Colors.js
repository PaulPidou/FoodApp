const tintColor = '#3cff9a' // #2f95dc

export default {
  tintColor,
  splashScreenColor: '#36FF9B',
  tabIconDefault: '#dedede',
  tabIconSelected: '#fff',
  tabBar: '#fefefe',
  getNutriscoreColor(nutriGrade) {return getNutriscoreColor(nutriGrade)},
  errorBackground: 'red',
  counterTintColor: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
}

const getNutriscoreColor = (nutriGrade) => {
  switch(nutriGrade) {
    case 'a':
      return "#008a40"
    case 'b':
      return "#70c623"
    case 'c':
      return "#ffcf00"
    case 'd':
      return "#fc7900"
    case 'e':
      return "#f80000"
    default:
      return "#fff"
  }
}

const getNovaColor = (novaGroup) => {
  switch(novaGroup) {
    case 1:
      return "#0a0"
    case 2:
      return "#fc0"
    case 3:
      return "#f60"
    case 4:
      return "#f00"
    default:
      return "#fff"
  }
}