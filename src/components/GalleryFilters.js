import {useState, useEffect, useRef} from 'react'
import EiselCard from '../components/EiselCard'


const GalleryFilters = (props) => {
    const [selectValue, setSelectValue] = useState("userOnly")
    const [filteredEisels, setFilteredEisels] = useState([])
    const selectRef = useRef()


   
        
        
    useEffect(() => {
        if (selectRef.current.value === selectValue) {
            setFilter()
        }
    }, [selectRef, selectValue])
    
    
    
    const setFilter = () => {
            if (selectValue === "userOnly") {
                    let userEisels = props.eisels.filter(eisel => eisel.user_id === props.currentUser.id)
                    setFilteredEisels(userEisels)
                } else if (selectValue === "allEisels") {
                    let allEisels = props.eisels.filter(eisel => eisel)
                    setFilteredEisels(allEisels)
                } else if (selectValue === "likedEisels") {
                    let likedEisels = props.eisels.filter(eisel => eisel.user_id !== props.currentUser.id)
                    let userLikes = likedEisels.filter(eisel => eisel.likes.some(like => like.user_id === props.currentUser.id))
                    setFilteredEisels(userLikes)
                } else if (selectValue === "savedArtworks") {
                    let userArtworks = props.artworks.filter(work => work.user_id === props.currentUser.id)
                    setFilteredEisels(userArtworks)
                }
            }

            


                    
    

    
    const renderEisels = () => {
        return filteredEisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
    }
    
    console.log(selectValue)
    console.log(filteredEisels)
    
    return (
        <div>
            
            <select ref={selectRef} onChange={(evt) => setSelectValue(evt.target.value)} value={selectValue}>
                <option value="allEisels">All User Creations</option>
                <option value="userOnly" >My Eisels</option>
                <option value="likedEisels">My Liked Eisels</option>
                <option value="savedArtworks">My Saved Artworks</option>
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