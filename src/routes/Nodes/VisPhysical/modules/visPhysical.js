// ------------------------------------
// Constants
// ------------------------------------
import _ from 'lodash'
import request from 'superagent'
export const VISPHYSICAL_GETALLNODES = 'VISPHYSICAL_GETALLNODES'
export const VISPHYSICAL_GETALLCONTAINERS = 'VISPHYSICAL_GETALLCONTAINERS'
export const VISPHYSICAL_GETALLTASKS = 'VISPHYSICAL_GETALLTASKS'

// ------------------------------------
// Actions
// ------------------------------------

function asPromise (fn) {
  return new Promise((resolve, reject) => fn((err, res) => err ? reject(err) : resolve(res)))
}
function asPromiseAndJSON (fn) {
  return asPromise(fn).then((res) => res.body)
}
function createAgent (uri) {
  var agent = request
    .get(uri)
    .set('Accept', 'application/json')
  _.bindAll(agent, ['end'])
  return agent
}
export function getUri (uri) {
  return asPromiseAndJSON(createAgent(uri).end)
}

export function getAllNodes () {
  return (dispatch) => {
    getUri('apis/nodes').then(function (callback) {
      dispatch({
        type: VISPHYSICAL_GETALLNODES,
        payload: callback
      })
    })
  }
}
export function getAllContainers () {
  return (dispatch) => {
    getUri('apis/containers/json').then(function (callback) {
      dispatch({
        type: VISPHYSICAL_GETALLCONTAINERS,
        payload: callback
      })
    })
  }
}
export function getAllTasks () {
  return (dispatch) => {
    return getUri('apis/tasks').then(function (callback) {
      dispatch({
        type: VISPHYSICAL_GETALLTASKS,
        payload: callback
      })
    })
  }
}

const ACTION_HANDLERS = {
  [VISPHYSICAL_GETALLNODES]: function (state, action) {
    return {...state, nodes: action.payload}
  },
  [VISPHYSICAL_GETALLCONTAINERS]: function (state, action) {
    return {...state, containers: action.payload}
  },
  [VISPHYSICAL_GETALLTASKS]: function (state, action) {
    return {...state, tasks: action.payload}
  }
}

const initialState = {nodes: [], containers: [], tasks: []}
export default function visPhysicalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
