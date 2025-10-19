import cities from '~/assets/data/cities.json';
import {delay} from "../../config/settings";

const generateUser = (id) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    return {
        id: `user-${id}`,
        balance: Math.floor(Math.random() * 1000),
        cashbackPercent: Math.floor(Math.random() * 20),
        city: { id: city.id,  title: city.title },
        isBlocked: false,
        lastSave: Date.now() - Math.random() * 10000000,
        lastSpend: Date.now() - Math.random() * 10000000,
        lastVisit: Date.now() - Math.random() * 10000000,
        name: `Пользователь ${id}`,
        phone: `+79*****${String(id).padStart(4, '0')}`,
        role: 'customer',
        saveCount: Math.floor(Math.random() * 100),
        saveTotal: Math.floor(Math.random() * 1000),
        spendCount: Math.floor(Math.random() * 100),
        spendTotal: Math.floor(Math.random() * 1000),
        updatedAt: Date.now(),
    };
};

const users = {

    list: async function({ offset = 0, limit = 100 }) {

        await new Promise((r) => setTimeout(r, delay));

        const result = [];

        for (let i = 0; i < limit; i++) {

            const id = offset + i;

            result.push(generateUser(id));
        }
        return result;
    },

    get: async function(id) {
        await new Promise((r) => setTimeout(r, 500));
        return generateUser(id);
    }
};


export default ({ app }, inject) => {

    inject('api', { users });
};