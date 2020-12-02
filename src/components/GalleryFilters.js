import {useState, useEffect, useRef} from 'react'
import EiselCard from '../components/EiselCard'
import ArtworkCard from './ArtworkCard'


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
        if (selectValue !== "savedArtworks") {

            return filteredEisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
        } else {
            return filteredEisels.map(work => { return <ArtworkCard key={work.objectID} details={work}/>})
        }
    }
    
    
    
    return (
        <div>
            <div id="galleryFilterSelect">

            <select ref={selectRef} onChange={(evt) => setSelectValue(evt.target.value)} value={selectValue}>
                <option value="allEisels">All User Creations</option>
                <option value="userOnly" >My Eisels</option>
                <option value="likedEisels">My Liked Eisels</option>
                <option value="savedArtworks">My Saved Artworks</option>
            </select>
            </div>

            <div id="eiselContainer">
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

    // <Route path='/museum/:id' render={(routerProps) => {
    //     let work
    //     if (works.length > 0) {
    //         let id = parseInt(routerProps.match.params.id)
    //         work = works.find(work => work.objectID === id)
    //     }
    //     return (
    //         <div>
    //             {work ? <ArtworkShow details={work} postWork={props.postWork}/> : null}
    //         </div>
    //     )
    // }}/> 