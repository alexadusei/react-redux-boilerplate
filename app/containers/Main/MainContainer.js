import React, {PropTypes} from 'react'
import {container, innerContainer} from './styles.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as exampleActionCreators from 'redux/modules/example'

const MainContainer = React.createClass({
  propTypes: {
    isExample: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    exampleId: PropTypes.string.isRequired,
  },
  render () {
    return (
      <div className={container}>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

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