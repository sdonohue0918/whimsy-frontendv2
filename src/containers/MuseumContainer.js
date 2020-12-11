

import ArtworkMuseumCard from '../components/ArtworkMuseumCard'
import ArtworkMuseumShow from '../components/ArtworkMuseumShow'
import {Route, Switch} from 'react-router-dom'
import React, { Component } from 'react'





class MuseumContainer extends Component {
    
    
    // const [works, setWorks] = useState(null)
    // const [search, setSearch] = useState("")
    // const [fetchLoading, setFetchLoading] = useState(null)
    
    
    state = {
        works: [],
        search: "",
        fetchLoading: ""
    }
   

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.works !== this.state.works) {
    //         this.setState(this.state, () => { this.clearSearch() })
    //     }
    // }

    clearSearch = () => {
        this.setState({search: ""})
    }

    refresh = () => {
        this.setState(this.state)
    }
    
    renderArtworks = () => {
        if (this.state.fetchLoading === 'success') {
            if (this.state.works.length > 0) {
                return this.state.works.map(work => { return <ArtworkMuseumCard key={work.objectID} details={work} postWork={this.props.postWork}/>})
            } else {
                return (
                    <div >
                        {/* <h3 className='museumFlagError'>No Results Returned!</h3> */}
                        <button onClick={this.refresh}>Click To See Results!</button>
                    </div>
                )
            }

        } else {
            return (
                <div>
                    <h3 className='museumFlag'>Search For Anything! The Curated Findings Will Be Displayed Here!</h3>
                </div>
            )
        }
        


        
    }
    
    
     fetchObjectsClick = () => {
            this.getMet()
    }


     curationReset = () => {
        
        // setFetchLoading(false)
        // setWorks(null)
        // setSearch('')

        this.setState({
            works: [],
            search: "",
            fetchLoading: ""
        })
    }
    

     getMet = () => {
        
        let config = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        let newSearchTerm
        
        let searchTerm = this.state.search.split(' ')
        if (searchTerm.length === 1) {
            newSearchTerm = searchTerm.join(' ')
            
        } else {
            newSearchTerm = searchTerm.map(word => word + "+").join('').slice(0, -1)
            
        }
    

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${newSearchTerm}`, config).then(resp => resp.json()).then(data => { 
        
        //console.log(data)
        // setFetchLoading('loading')

        this.setState({fetchLoading: "loading"}, () => {this.testGetMetObject(data)})
        //testGetMetObject(data)
    }).catch(error => console.log(error))
       
            
    }

     testGetMetObject = (objects) => {
        let config = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        
        let idList = []
        
        for (let i = 0; i <= 20; i++) {
            idList.push(objects.objectIDs[Math.floor(Math.random() * objects.objectIDs.length)])
            
        }
        
        
        
        let worksArray = []
        
        if (idList.length === 21) {

            for (let i = 0; i < idList.length; i++) {
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${idList[i]}`, config).then(resp => resp.json()).then(data => {
                //console.log(data)
                worksArray.push(data)
                
               })
            }
        }
        
        // setWorks(worksArray)
        // setFetchLoading('success')

        this.setState({
            works: worksArray,
            fetchLoading: 'success'
            
        })
        
        
    }



    
    
     fetchRender = () => {
        if (this.state.fetchLoading === 'loading') {
            return (
                <>
                <h3 style={{color: 'white'}}>Loading Results...</h3> 
                </>
            )
        } else if (this.state.fetchLoading === 'success') {
            return (
                <>
                <button onClick={this.curationReset}>X</button>
                </>
            )
        } else {
            return (
                <>
                <button id='museumSearchButton' onClick={this.fetchObjectsClick}>Get Curated Findings</button>
                </>
            )
        }
    }

    
    
    
    
    render() {

        
        return (
            
            
            <div>
            
                <Switch>
            
                    <Route path='/gallery/museum/:id' render={(routerProps) => {
                        let artwork;
                        if (this.state.fetchLoading === 'success') {
                            if (this.state.works.length > 0) {
                                let id = parseInt(routerProps.match.params.id)
                                artwork = this.state.works.find(work => work.objectID === id)
                            }
                            
                        }
                        
                        return (
                            <div>
                                { artwork ? <ArtworkMuseumShow postWork={this.props.postWork} currentUser={this.props.currentUser} details={artwork}/> : null }
                            </div>
                        )
                        
                        
                        
                        
                    }}/>



                
                

                    <Route path='/gallery/museum' render={() => {
                        return (
                            <div >
                    
                    
                                <div id='museumBackground'>
                        
                                <div id='museumTag'>
                                    <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>
                                </div>
                        
                                <div id='museumSearchContainer'>
                                <input id='museumSearchInput'  type="text" name="search" placeholder="Search for Art Here" value={this.state.search} onChange={(evt) => this.setState({search: evt.target.value})}></input>

                                {this.fetchRender()}
                                </div>
                       
                                <div id='artworkCardWrapper'>
                                <div id='artworkCardContainer'>
                                {this.renderArtworks()}
                                </div>
                                </div>
                                </div>
                    
                            </div>

)
}}/>
                    
                    

                </Switch>
           
        </div>
    )
}

    
}

export default MuseumContainer



