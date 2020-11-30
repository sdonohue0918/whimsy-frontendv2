import {useState} from 'react'
import EiselCard from '../components/EiselCard'


const GalleryFilters = (props) => {
    const [selectValue, setSelectValue] = useState("none")


    const handleSelect = (evt) => {
        setSelectValue(evt.target.value)
        
    }

    const renderEisels = () => {
        return props.eisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
    }
    
    return (
        <div>
            
            <select onChange={handleSelect} value={selectValue}>
                <option value="allEisels">All User Creations</option>
                <option value="userOnly" >My Eisels</option>
                <option value="likedEisels">My Liked Eisels</option>
            </select>

            <div>
                {renderEisels()}
            </div>

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