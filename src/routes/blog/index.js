/**
 * @overview: blog index
 * @author: txBoy
 * @created: 2017-03-19.
 */
export default {
    path: 'blog',
    childRoutes: [
        require('./list').default,
        require('./detail').default
    ]
};
