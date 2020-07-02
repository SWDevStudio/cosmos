// Подключение плагинов и библиотек
import 'owl.carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';




function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// Подключать все компоненты
requireAll(require.context('./components', true, /\.(scss)$/));
requireAll(require.context('./components', true, /\.(jsx?)$/));
requireAll(require.context('./pages', true, /\.(jsx?)$/));
requireAll(require.context('./service', true, /\.(scss)$/));
