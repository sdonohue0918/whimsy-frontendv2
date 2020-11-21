import {useState} from 'react'
import {getSearchInput, getSelectInput} from '../actions/actions'
import {connect} from 'react-redux'

const GalleryFilters = () => {

    const [searchInput, setSearchInput] = useState("")
    const [selectInput, setSelectInput] = useState("")

    const searchHandler = (e) => {
        setSearchInput(e.target.value)
        this.props.getSearchInput(e.target.value)
    }

    const selectHandler = (e) => {
        setSelectInput(e.target.value)
        this.props.getSelectInput(e.target.value)
    }

    // const onSelectToggle = (e) => {
    //     this.props.getSelectInput(e.target.value)
    // }

    // const onSearchToggle = (e) => {
    //     this.props.getSearchInput(e.target.value)
    // }
    
    
        return (
        <div>
            <input type="text" name="searchInput" value={searchInput} onChange={searchHandler}></input>
            <select onChange={selectHandler} value={selectInput}>
                <option value="abstract"></option>
                <option value="modern"></option>
                <option value="realism"></option>

            </select>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchInput: (etv) => {
            dispatch(getSearchInput(etv))
        },
        getSelectInput: (etv) => {
            dispatch(getSelectInput(etv))
        }
    }
}


export default connect(null, mapDispatchToProps)(GalleryFilters)