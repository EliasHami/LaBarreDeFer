export const state = () => ({
  list: [] 
})

export const mutations = {
  add (state, blogpost) {
    state.list.push(blogpost)
  },
  emptyList (state){
    state.list = []
  }
}

export const getters = {
  list_getter: state => {
      return state.list
  }
}
