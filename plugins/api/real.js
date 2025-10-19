const users = {

    list: async function({ offset = 0, limit = 100 }) {
         return [];
    },
    get: async function(id) {
        await new Promise((r) => setTimeout(r, 500));
        return {};
    }
};


export default ({ app }, inject) => {

    inject('api', { users });
};