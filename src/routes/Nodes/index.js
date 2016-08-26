/**
 * Created by jance on 16/8/25.
 */
import React from 'react'
import NodeDetail from './NodeDetail'
import VisPhysical from './VisPhysical'

export const NodeView = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
)

NodeView.propTypes = {
  children: React.PropTypes.element.isRequired
}
export default (store) => ({
  path: 'nodes',
  indexRoute: VisPhysical(store),
  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        VisPhysical(store),
        NodeDetail(store)
      ])
    })
  },
  getComponent (nextState, cb) {
    cb(null, NodeView)
  }
})
