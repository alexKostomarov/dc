import {perPage} from "~/config/settings";

export const namespaced = true;

export const state = () => ({
    list: [],
    loading: false,
    filters: {
        cityIds: [],
        search: ''
    },
    page: 1
});

export const getters = {

    filteredUsers(state) {

        const { cityIds, search } = state.filters;

        return state.list
            .filter(user => {
                return !(cityIds.length > 0 && !cityIds.includes(user.city.id));
            })
            .filter(user => {
                if(search.length === 0 || !search) return true;
                const q = search.toLowerCase();
                return user.name.toLowerCase().includes(q) || user.phone.toLowerCase().includes(q);
            }).sort((a, b) => {b.name.localeCompare(a.name);})
    },

    users(state, getters) {
        const start = (state.page - 1) * perPage;
        const end = start + perPage;

        return getters.filteredUsers.slice(start, end);
    },
    pageCount(state, getters) {
        return Math.ceil(getters.filteredUsers.length / perPage);
    },
    page(state) {
        return state.page;
    },
    cityIds(state) {
        return state.filters.cityIds;
    },
    search(state){
        return state.filters.search;
    }

};

export const actions = {

    async loadUsers({ commit }, { offset, limit }) {

        commit('setLoading', true);
        const users = await this.$api.users.list({ offset, limit })
        commit('appendUsers', users);
        commit('setLoading', false);
    }
};

export const mutations = {

    appendUsers(state, users) {
        state.list.push(...users)
    },
    setLoading(state, value) {
        state.loading = value;
    },
    setPage(state, page) {
        state.page = page;
    },
    setCityIds(state, ids) {
        state.filters.cityIds = ids;
    },
    appendCityId(state, id) {
        state.filters.cityIds.push(id);
    },
    setSearch(state, val) {
        state.filters.search = val;
    }
}