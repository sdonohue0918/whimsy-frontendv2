import EiselTest from '../components/EiselTest'
import EiselsContainer from '../containers/EiselsContainerTest'
import GalleryFilters from '../components/GalleryFilters'
import GalleryNav from '../components/GalleryNav'
import {fetchStages, getStages} from '../actions/actions'
import {connect} from 'react-redux'
import {useEffect} from 'react'

const GalleryContainer = (props) => {


    useEffect(() => {
        props.fetchStages()
    }, [])

    console.log(props)
    return (
        <div>
            <EiselsContainer/>
            <GalleryFilters/>
            <GalleryNav/>
        </div>
    )
}





const mapDispatchToProps = (dispatch) => {
    return {
        fetchStages: () => {
            dispatch(fetchStages())
        }
    }
}

export default connect(null, mapDispatchToProps)(GalleryContainer)