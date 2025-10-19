export default ({ store }) => {
    if (process.server){
        store.commit('screen/setWidth', 980);
    }


    if (process.client) {
        const update = () => {
            store.commit('screen/setWidth', screen.width);
        }

        update()
        window.addEventListener('resize', update)
    }
}