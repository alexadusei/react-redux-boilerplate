import React, {PropTypes, Component} from 'react'
import {container, innerContainer} from './styles.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as exampleActionCreators from 'redux/modules/example'

class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isExample: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  exampleId: PropTypes.string.isRequired, 
}

function mapStateToProps ({example}) {
  return {
    isExample: example.isExample,
    error: example.error,
    exampleId: example.exampleId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(exampleActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)