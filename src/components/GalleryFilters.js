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
                 
                }  else if (selectValue === "savedArtworks") {
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
            <div id='galleryFilterSelectTab'>

            <select id="galleryFilterSelect" ref={selectRef} onChange={(evt) => setSelectValue(evt.target.value)} value={selectValue}>
                <option value="userOnly" >My Eisels</option>
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
    

