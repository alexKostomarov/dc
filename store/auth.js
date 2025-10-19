export const state = () => ({
    currentUser: {
        name: 'Михаил Макеев'
    }
})

export const mutations = {
    setUser(state, user) {
        state.currentUser = user
    }
}

export const getters = {
    user: state => state.currentUser,
    isAuthenticated: state => !!state.currentUser
}