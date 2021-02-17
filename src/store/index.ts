import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export interface State {
  linkBonusLevels: { [name: string]: number };
  numberOfPeople: number;
  numberOfActive: number[];
  selectedMember: number;
}

export default new Vuex.Store({
  state: {
    linkBonusLevels: {},
    numberOfPeople: 5,
    numberOfActive: [3, 4, 5, 6],
    selectedMember: 0,
  },
  mutations: {
    setLinkBonusLevel: (
      state: State,
      payload: { key: string; value: number }
    ) => {
      state.linkBonusLevels[payload.key] = payload.value;
    },
    setNumberOfPeople: (state: State, payload: number) => {
      state.numberOfPeople = payload;
    },
    setNumberOfActive: (state: State, payload: number[]) => {
      state.numberOfActive = payload;
    },
    setSelectedMember: (state: State, payload: number) => {
      state.selectedMember = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
