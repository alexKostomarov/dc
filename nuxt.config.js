export default {
    ssr: true,
    target: 'server',
    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/scss/main.scss'
    ],
    modules: ['@nuxtjs/vuetify'],
    vuetify: {
        customVariables: ['~/assets/scss/variables.scss'],
        treeShake: true,
        defaultAssets: {
            icons: 'mdi'
        },
        icons: {
            iconfont: 'mdi'
        },
        theme: {
            dark: false
        }
    },
    build: {
        loaders: {
            scss: {
                implementation: require('sass'),
            },
        },
    },
    plugins: [
        '~/plugins/api.js',
        { src: '~/plugins/screen.js', mode: 'client' }
    ],
    head: {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css'
            }
        ]
    },
    env: {
        USE_MOCK: process.env.USE_MOCK || 'true',
    },
}