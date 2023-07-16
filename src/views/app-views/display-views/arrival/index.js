import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContainerTailwind from "../../../../components/layout-components/ContainerTailwind";
function ArrivalPage(props){
    return (
        <ContainerTailwind>
            <p>testing</p>
            <p>testing</p>
            <p>testing</p>
            <p>testing</p>
            <p>testing</p>
            <p>testing</p>
        </ContainerTailwind>
    )
}

ArrivalPage.propTypes = {}
ArrivalPage.defaultProps = {}

export default connect(()=> {
    return {}
},{})(React.memo(ArrivalPage))