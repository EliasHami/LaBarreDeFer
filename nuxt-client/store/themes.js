export const state = () => ({
    theme_list: [2] 
  })
  
  export const mutations = {
    add (state, theme) {
      state.theme_list.push(theme)
    },
    emptyList (state){
      state.theme_list = []
    }
  }
  
  export const getters = {
    get_theme_list: state => {
        return state.theme_list
    },
    get_theme_id: state => theme_id => state.theme_list.find(theme => theme.id === theme_id)
  
  }
  