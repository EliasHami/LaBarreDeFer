export const state = () => ({
    shop_list: [] 
  })
  
  export const mutations = {
    add (state, shop_element) {
      state.shop_list.push(shop_element)
    },
    emptyList (state){
      state.shop_list = []
    }
  }
  
  export const getters = {
    get_shop_list: state => {
        return state.shop_list
    },
    get_shop_id: state => index => state.shop_list[index]
  
  }
  