import {useState} from 'react'
import {getSearchInput, getSelectInput} from '../actions/actions'


const GalleryFilters = (props) => {

    // const [searchInput, setSearchInput] = useState("")
    // const [selectInput, setSelectInput] = useState("none")

    const handleSearch = (evt) => {
        // setSearchInput(evt.target.value)
        props.setSearch(evt.target.value)
        
    }

    const handleSelect = (evt) => {
        // setSelectInput(evt.target.value)
        props.setSelect(evt.target.value)
        
        
    }
    
    return (
        <div>
            {/* <input type="text" name="searchInput" value={searchInput} onChange={handleSearch}></input> */}
            <select onChange={handleSelect} value={props.selectValue}>
                <option value="allEisels">All User Creations</option>
                <option value="userOnly" >My Eisels</option>
                <option value="likedEisels">My Liked Eisels</option>

            </select>

        </div>
    )
}



export default  GalleryFilters 
    

// const mapDispatchToProps = (dispatch) => {
    //     return {
    //         getSearchInput: (etv) => {
    //             dispatch(getSearchInput(etv))
    //         },
    //         getSelectInput: (etv) => {
    //             dispatch(getSelectInput(etv))
    //         }
    //     }
    // }