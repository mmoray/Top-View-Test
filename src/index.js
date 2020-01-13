import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBicycle, faCartPlus, faCheckCircle, faExclamationCircle, faQuestionCircle, faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './components/App.vue'

window._ = require('lodash');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faBicycle);
library.add(faCartPlus);
library.add(faCheckCircle);
library.add(faExclamationCircle);
library.add(faQuestionCircle);
library.add(faShoppingCart);
library.add(faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
