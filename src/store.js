import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        depositStation: [],
        collections: [],
    }
});

export default store;