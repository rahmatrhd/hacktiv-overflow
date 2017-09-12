import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
const $http = Axios.create({
  baseURL: 'https://hacktiv-overflow-rhd.appspot.com/'
})

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') !== null,
    user: {},
    questions: []
  },
  mutations: {
    updateLoginState (state, response) {
      state.isLoggedIn = response.status === 'connected'
    },

    deleteUser (state) {
      state.user = {}
    },

    updateUser (state, payload) {
      state.user = payload
    },

    updateToken (state) {
      state.token = localStorage.getItem('token')
    },

    addQuestion (state, payload) {
      state.questions = Object.assign({}, state.questions, {
        [payload._id]: payload
      })
    },

    removeAQuestion (state, payload) {
      delete state.questions[payload] // not reactive
      state.questions = Object.assign({}, state.questions) // biar reactive
    },

    updateQuestion (state, payload) {
      state.questions[payload.id].title = payload.title
      state.questions[payload.id].body = payload.body
    },

    updateQuestions (state, payload) {
      state.questions = payload
    },

    voteQuestion (state, payload) {
      state.questions[payload.id][`${payload.val}Votes`] = payload.votes
    },

    addAnswer (state, payload) {
      state.questions[payload.id].answers.push(payload.data)
    },

    removeAnswer (state, payload) {
      state.questions[payload.id].answers.splice(state.questions[payload.id].answers.indexOf(payload.data), 1)
    }
  },
  actions: {
    checkLoginState (context) {
      context.commit('updateLoginState', {
        status: localStorage.getItem('token') !== null ? 'connected' : 'logout'
      })
    },

    getQuestions (context) {
      $http.get('/question')
      .then(({data}) => {
        let asObject = Object.assign(...data.map(item => ({[item._id]: item})))
        context.commit('updateQuestions', asObject)
      })
      .catch(err => console.log(err))
    },

    getUser (context) {
      $http.get('user/me', {
        headers: {
          token: context.state.token
        }
      })
      .then(({data}) => {
        context.commit('updateUser', data)
      })
      .catch(err => console.log(err))
    }
  },
  getters: {
    questionsAsArray (state) {
      // return Object.keys(state.questions).map(key => (state.questions[key]))
      let x = []
      for (var key in state.questions) {
        x.push(state.questions[key])
      }
      return x
    },
    newestQuestion (state, getters) {
      let x = [...getters.questionsAsArray]
      return x.sort((a, b) => {
        let aDate = new Date(a.updatedAt !== null ? a.updatedAt : a.createdAt).getTime()
        let bDate = new Date(b.updatedAt !== null ? b.updatedAt : b.createdAt).getTime()
        return aDate < bDate ? 1 : aDate === bDate ? 0 : -1
      })
    },
    topQuestions (state, getters) {
      let x = [...getters.questionsAsArray]
      return x.sort((a, b) => {
        return (a.upVotes.length - a.downVotes.length) < (b.upVotes.length - b.downVotes.length) ? 1 : (a.upVotes.length - a.downVotes.length) === (b.upVotes.length - b.downVotes.length) ? 0 : -1
      })
    }
  }
})

export default store
