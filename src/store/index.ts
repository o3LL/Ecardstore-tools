import { createStore } from "vuex";

interface State {
  messages: {
    status: BigInteger;
    text: string;
  }[];
}

export default createStore<State>({
  state: {
    messages: [],
  },
  mutations: {
    addMessage(state, message: State["messages"][0]) {
      state.messages.push(message);
    },
  },
  actions: {
    addMessage({ commit }, message: string) {
      commit("addMessage", message);
    },
  },
  getters: {
    getMessages(state): State["messages"] {
      return state.messages;
    },
  },
});
