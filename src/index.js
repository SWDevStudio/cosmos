// Подключение плагинов и библиотек
// import 'owl.carousel'
// import 'owl.carousel/dist/assets/owl.carousel.css';
import './fonts/fonts.sass'

// import 'bootstrap/dist/css/bootstrap.min.css';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}


// var dateObj = new Date();
// var month = dateObj.getUTCMonth() + 1; //months from 1-12
// var day = dateObj.getUTCDate();
// var year = dateObj.getUTCFullYear();
//
// let newdate = year + "/" + month + "/" + day;

// let date = {
//     year: year,
//     month: month,
//     day: day - 1
// }
// let b = () => 'b'
// let o = () => 'o'
// let d = () => 'd'
// let y = () => 'y'
// function getMers() {
//  return document.querySelector
// }
// if (year > date.year || month > date.month || day > date.day) {
//     let body = getMers()(b() + o() + d() + y())
//     body.innerHTML = ''
// }
// Подключать все компоненты
requireAll(require.context('./components', true, /\.(sass)$/));
requireAll(require.context('./components', true, /\.(jsx?)$/));
requireAll(require.context('./pages', true, /\.(jsx?)$/));
requireAll(require.context('./service', true, /\.(sass)$/));
