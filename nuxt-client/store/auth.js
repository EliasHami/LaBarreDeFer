import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
    setUser(state, user) {
      state.user = user
      Cookies.set('user', user)
    },
    logout(state) {
      state.user = null
      Cookies.set('user', null)
    }
  }

export const getters = {
  username: state => {
    return state.user && state.user.username
  },
  email: state => {
    return state.user && state.user.email
  },
  password: state => {
    return state.user && state.user.password
  },
  user_id: state => {
    return state.user && state.user.id
  },
  adresse: state => {
    return state.user && state.user.adresse
  },
  code_postal: state => {
    return state.user && state.user.code_postal
  },
  ville: state => {
    return state.user && state.user.ville
  },
  pays: state => {
    return state.user && state.user.pays
  },
  complement_adresse: state => {
    return state.user && state.user.complement_adresse
  },
  civilite: state => {
    return state.user && state.user.Civilite
  },
  nom: state => {
    return state.user && state.user.nom
  },
  prenom: state => {
    return state.user && state.user.prenom
  }
}