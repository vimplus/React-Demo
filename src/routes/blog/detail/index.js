export default {
    path: 'detail/:id',
    getComponent: (nextState, callback) => {
        require.ensure([], (require) => {
            const Detail = require('./component').default;
            callback(null, Detail);
        })
    }
}
