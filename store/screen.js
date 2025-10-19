export const namespaced = true;

export const state = () => ({
    width:  null
})

export const mutations = {
    setWidth(state, width) {
        state.width = width
    }
}

export const getters = {
    isMobile: state => {
        return state.width < 640
    },
    width: state => state.width
}
