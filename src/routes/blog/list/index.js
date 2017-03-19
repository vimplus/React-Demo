/**
 * @overview: List Page
 * @author: txBoy
 * @created: 2017-03-19.
 */
export default {
    path: 'list',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            const List = require('./component').default;
            callback(null, List);
        })
    }
};
