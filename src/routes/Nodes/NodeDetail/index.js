/**
 * Created by jance on 16/8/24.
 */
export default((store) => ({
  path: ':id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NodeDetail = require('./components/nodeDetailView').default
      cb(null, NodeDetail)
    })
  }
}))
