export const state = () => ({
    darkMode: false
})

export const mutations = {
    toggleTheme(state) {
        state.darkMode = !state.darkMode
    },
    setTheme(state, value) {
        state.darkMode = value
    }
}

export const getters = {
    isDark: state => state.darkMode
}