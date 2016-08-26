import { connect } from 'react-redux'
import {getAllNodes, getAllTasks} from '../modules/visPhysical'

import VisPhysical from 'components/Nodes/VisPhysical'

const mapActionCreators = {
  getAllNodes,
  getAllTasks
}
const mapStateToProps = (state) => ({
  visPhysical: state.visPhysical
})

export default connect(mapStateToProps, mapActionCreators)(VisPhysical)
