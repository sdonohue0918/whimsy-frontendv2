
import EiselCard from '../components/EiselCard'
import ArtworkCard from './ArtworkCard'
import React, { Component } from 'react'


class GalleryFilters extends Component {
    
    
    state = {
        selectValue: "default",
        
    }
    
    


    renderCardsFilter = () => {
        if (this.state.selectValue === "savedArtworks") {
            //return this.props.artworks.map(work => { return <ArtworkCard key={work.id} details={work}/>})
            let userArtworks = this.props.artworks.filter(work => work.user_id === this.props.currentUser.id)
            return userArtworks.map(work => { return <ArtworkCard key={work.id} details={work}/>})
        } else if (this.state.selectValue === "userOnly") {
            //return this.props.eisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
            let userEisels = this.props.eisels.filter(eisel => eisel.user_id === this.props.currentUser.id)
            return userEisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
        } else  {
            return (
                <div>
                    <h3 style={{fontFamily: 'Marker Felt', marginTop: '100px', marginLeft:'700px'}}> Use Select Bar To Choose A Filter</h3>
                </div>
            )
        }
    }
    
    
    render() {

        return (
            <div>
            <div id='galleryFilterSelectTab'>

            <select id="galleryFilterSelect"  onChange={(evt) => this.setState({selectValue: evt.target.value})} value={this.state.selectValue}>
                <option value='default'>Select Filter</option>
                <option value="userOnly">My Eisels</option>
                <option value="savedArtworks">My Saved Artworks</option>
            </select>
            </div>

            <div id="eiselContainer">
                {this.renderCardsFilter()}
            </div>

        </div>
    )
}
}



export default  GalleryFilters 
    

