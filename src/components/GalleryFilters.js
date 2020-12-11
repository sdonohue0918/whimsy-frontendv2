import {useState, useEffect, useRef} from 'react'
import EiselCard from '../components/EiselCard'
import ArtworkCard from './ArtworkCard'
import React, { Component } from 'react'


class GalleryFilters extends Component {
    // const [selectValue, setSelectValue] = useState("userOnly")
    // const [filteredEisels, setFilteredEisels] = useState([])
    // const selectRef = useRef()


   
        
        
    // useEffect(() => {
    //     if (selectRef.current.value === selectValue) {
    //         setFilter()
    //     }
    // }, [selectRef, selectValue])
    
    state = {
        selectValue: "userOnly",
        filteredEisels: []
    }
    
    componentDidMount() {
        this.setFilter()
    }

    

    setFilter = () => {
            if (this.state.selectValue === "userOnly") {
                    let userEisels = this.props.eisels.filter(eisel => eisel.user_id === this.props.currentUser.id)
                    this.setState({filteredEisels: userEisels})
                 
                }  else if (this.state.selectValue === "savedArtworks") {
                    let userArtworks = this.props.artworks.filter(work => work.user_id === this.props.currentUser.id)
                    this.setState({filteredEisels: userArtworks})
                }
            }

            


                    
    

    
    renderEisels = () => {
        if (this.state.selectValue !== "savedArtworks") {

            return this.state.filteredEisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
        } else {
            return this.state.filteredEisels.map(work => { return <ArtworkCard key={work.objectID} details={work}/>})
        }
    }
    
    
    render() {

        return (
            <div>
            <div id='galleryFilterSelectTab'>

            <select id="galleryFilterSelect"  onChange={(evt) => this.setState({selectValue: evt.target.value})} value={this.state.selectValue}>
                <option value="userOnly" >My Eisels</option>
                <option value="savedArtworks">My Saved Artworks</option>
            </select>
            </div>

            <div id="eiselContainer">
                {this.renderEisels()}
            </div>

        </div>
    )
}
}



export default  GalleryFilters 
    

