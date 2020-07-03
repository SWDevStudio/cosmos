// Подключение плагинов и библиотек
// import 'owl.carousel'
// import 'owl.carousel/dist/assets/owl.carousel.css';
import './fonts/fonts.sass'
// import 'bootstrap/dist/css/bootstrap.min.css';


function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// Подключать все компоненты
requireAll(require.context('./components', true, /\.(sass)$/));
requireAll(require.context('./components', true, /\.(jsx?)$/));
requireAll(require.context('./pages', true, /\.(jsx?)$/));
requireAll(require.context('./service', true, /\.(sass)$/));
