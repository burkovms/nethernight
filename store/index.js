import axios from 'axios'

export const state = () => ({
  packages: [],
  totalResults: 0,
  query: '',
})

export const getters = {}

export const mutations = {
  SET_PACKAGES(state, data) {
    state.packages = data
  },
  SET_TOTAL_RESULTS(state, data) {
    state.totalResults = data
  },
  CLEAR_PACKAGES(state) {
    state.packages = []
  },
  SET_QUERY(state, data) {
    state.query = data
  },
}

export const actions = {
  async fetchPackages({ commit, state }, page) {
    try {
      const queryToSearch = state.query.length ? state.query : 'html'
      const response = await axios.get(
        `https://registry.npmjs.com/-/v1/search?text=${queryToSearch}&size=10&from=${page}`
      )
      const packageObject = response.data.objects.map((item) => item.package)
      commit('SET_PACKAGES', packageObject)
      commit('SET_TOTAL_RESULTS', response.data.total)
    } catch (error) {
      console.log(error)
    }
  },
}
