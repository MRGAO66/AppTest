import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList:[],
    showContent: false,
    size:5,
    sideGoodsList:[],
    goodstype:'',
    counterMap:{}
  },
  mutations: {
    storageChange(state, { id, value }) {
      if(state.counterMap[id]) {
        if((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state: {
        state.sideList = list;
      }
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodList(state, list) {
      state.sideGoodsList = [...state.sideGoodsList, ...list];
    },
    resetGoodList(state) {
      state.sideGoodsList = []
    },
    setGoodType(state,type) {
      state.goodstype = type
    }
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
    },
    async getGoodList({ state,commit }, options) {
      const { page, sortType } = options;
      const type = options.type || state.goodstype;
      const { list, total } = await api.getGoodlist(type, page, state.size, sortType);
      commit('setGoodList', list);
      commit('setGoodType', type);
      if (total > state.sideGoodsList.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  modules: {
  },
});
