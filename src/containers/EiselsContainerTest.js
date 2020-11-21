

import {connect} from 'react-redux'
import { useState, useEffect } from 'react'
import EiselCard from '../components/EiselCard'



const EiselsContainer = (props) => {
    
    const [eiselNo, setEiselNo] = useState(0)
    


    useEffect(() => {
        let eiselNumber = props.stages.stages[0].length
        setEiselNo(eiselNumber)
    }, [])



    
    const renderEisels = () => {
        return props.stages.stages[0].map( eisel => { return <EiselCard  key={eisel.id} eisel={eisel}></EiselCard> })
    }
    
    console.log(eiselNo)
    
    return(
        <div>
            
            {eiselNo !== 0 ? renderEisels() : console.log('error')}
        </div>
    )
    
     


}

const mapStateToProps = (state) => {
    const { stages } = state
    const { searchInput } = state
    const { stage } = state
    const {selectInput } = state
    return {
        stages,
        searchInput,
        stage,
        selectInput
    }
    // return {
    // stages: state.stages,
    // stage: state.stage,
    // searchInput: state.searchInput,
    // selectInput: state.selectInput
    // }
}


export default connect(mapStateToProps)(EiselsContainer)