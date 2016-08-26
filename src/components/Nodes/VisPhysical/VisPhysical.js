/**
 * Created by jance on 16/8/4.
 */
import React from 'react'
import classes from './VisPhysical.scss'
import _ from 'lodash'
import { Link } from 'react-router'
var TaskWrapper = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render () {
    var data = this.props.data,
      statusColor = data.DesiredState === 'ready' ? '#777' : 'rgba(255,255,255,.15)',
      statusStyle = {
        background: statusColor
      }
    return (
      <div className={classes.task} style={statusStyle}>
        <div>{data.Spec.ContainerSpec.Image}</div>
        <div>{data.Slot}</div>
      </div>
    )
  }
})
var NodeWrapper = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render () {
    var statusColor = this.props.data.Status.State === 'ready' ? 'green' : 'red',
      statusStyle = {
        backgroundColor: statusColor
      }, data = this.props.data
    return (
      <div className={classes.node + ' panel col-xs-2'}>
        <div className={classes.nodeHeader}>
          <div>
            <Link to={'/nodes/' + data.ID} activeClassName='active'>
               {data.Description.Hostname}
            </Link>
          </div>
          <div style={statusStyle} />
        </div>
        <div className={classes.nodeBody}>
          {data.tasks.map(function (task) {
            if (task.DesiredState !== 'shutdown') {
              return <TaskWrapper key={task.ID} data={task} />
            }
          })}
        </div>
      </div>
    )
  }
})
var SearchBar = React.createClass({
  propTypes: {
    onUserInput: React.PropTypes.func.isRequired,
    filterText: React.PropTypes.string.isRequired
  },
  handleChange () {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    )
  },
  render () {
    return (
      <form className={classes.searchFrom}>
        <input type='text' placeholder='输入节点名字' className='form-control'
          value={this.props.filterText} ref='filterTextInput'
          onChange={this.handleChange} />
      </form>
    )
  }
})
var Nodes = React.createClass({
  propTypes: {
    visPhysical: React.PropTypes.object.isRequired,
    filterText: React.PropTypes.string.isRequired
  },
  render () {
    var nodes = this.props.visPhysical.nodes, tasks = this.props.visPhysical.tasks, filterText = this.props.filterText
    return (
      <div>
        {nodes.map(function (node) {
          node.tasks = []
          if (node.Description.Hostname.indexOf(filterText) === -1 && filterText) {
            return
          }
          if (tasks.length > 0) {
            node.tasks = _.filter(tasks, {NodeID: node.ID})
          }
          return <NodeWrapper key={node.ID} data={node} />
        })}
      </div>
    )
  }
})
let GetNodeTimeout
var VisPhysical = React.createClass({
  propTypes: {
    visPhysical: React.PropTypes.object.isRequired,
    getAllTasks: React.PropTypes.func.isRequired,
    getAllNodes: React.PropTypes.func.isRequired
  },
  getInitialState () {
    this.props.getAllTasks()
    this.props.getAllNodes()
    return {
      filterText: ''
    }
  },
  handleUserInput (filterText) {
    this.setState({
      filterText: filterText
    })
  },
  componentDidMount () {
    let {getAllNodes, getAllTasks} = this.props
    function autoFetch () {
      getAllNodes()
      getAllTasks()
      GetNodeTimeout = setTimeout(function () {
        autoFetch()
      }, 10000)
    }
    autoFetch()
  },
  componentWillUnmount () {
    clearTimeout(GetNodeTimeout)
  },
  render () {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <Nodes visPhysical={this.props.visPhysical}
          filterText={this.state.filterText} />
      </div>
    )
  }
})

export default VisPhysical
