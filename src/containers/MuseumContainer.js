import { useState} from 'react'
//import ArtworkCard from '../components/ArtworkCard'
import ArtworkMuseumCard from '../components/ArtworkMuseumCard'
import ArtworkMuseumShow from '../components/ArtworkMuseumShow'
import {Route, Switch} from 'react-router-dom'




const MuseumContainer = (props) => {
    
    
    const [works, setWorks] = useState(null)
    const [search, setSearch] = useState("")
    const [fetchLoading, setFetchLoading] = useState(null)
    
    

   

    const renderArtworks = () => {
        if (fetchLoading === 'success') {
            if (works.length > 0) {
                return works.map(work => { return <ArtworkMuseumCard key={work.objectID} details={work} postWork={props.postWork}/>})
            } else {
                return (
                    <div>
                        <h5>No Results Returned!</h5>
                    </div>
                )
            }

        } else {
            return (
                <div>
                    <h5>Search For Anything! The Curated Findings Will Be Displayed Here!</h5>
                </div>
            )
        }
        


        
    }
    
    
    const fetchObjectsClick = () => {
            getMet()
    }


    const curationReset = () => {
        
        setFetchLoading(false)
        setWorks(null)
        setSearch('')
    }
    

    const getMet = () => {
        
        let config = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        let newSearchTerm
        
        let searchTerm = search.split(' ')
        if (searchTerm.length === 1) {
            newSearchTerm = searchTerm.join(' ')
            
        } else {
            newSearchTerm = searchTerm.map(word => word + "+").join('').slice(0, -1)
            
        }
    

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${newSearchTerm}`, config).then(resp => resp.json()).then(data => { 
        
        console.log(data)
        setFetchLoading('loading')
        testGetMetObject(data)
    }).catch(error => console.log(error))
       
            
    }

    const testGetMetObject = (objects) => {
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
                console.log(data)
                worksArray.push(data)
                
               })
            }
        }
        
        setWorks(worksArray)
        setFetchLoading('success')
        
        
    }

    
    
    const fetchRender = () => {
        if (fetchLoading === 'loading') {
            return (
                <>
                <h3 style={{color: 'white'}}>Loading Results...</h3> 
                </>
            )
        } else if (fetchLoading === 'success') {
            return (
                <>
                <button onClick={curationReset}>X</button>
                </>
            )
        } else {
            return (
                <>
                <button id='museumSearchButton' onClick={fetchObjectsClick}>Get Curated Findings</button>
                </>
            )
        }
    }

    console.log(search)
    console.log(works)
    console.log(fetchLoading)
    
    
    
    
    
    return (
        
        
        <div>
            
                <Switch>
            
                    <Route path='/museum/:id' render={(routerProps) => {
                        let artwork;
                        if (fetchLoading === 'success') {
                            if (works.length > 0) {
                                let id = parseInt(routerProps.match.params.id)
                                artwork = works.find(work => work.objectID === id)
                            }

                        }

                        return (
                            <div>
                                { artwork ? <ArtworkMuseumShow currentUser={props.currentUser} details={artwork}/> : null }
                            </div>
                        )




                    }}/>



                
                

                    <Route path='/museum' render={() => {
                        return (
                            <div >
                    
                    
                                <div id='museumBackground'>
                        
                                <div id='museumTag'>
                                    <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>
                                </div>
                        
                                <div id='museumSearchContainer'>
                                <input id='museumSearchInput'  type="text" name="search" placeholder="Search for Art Here" value={search} onChange={(evt) => setSearch(evt.target.value)}></input>

                                {fetchRender()}
                                </div>
                       
                                <div id='artworkCardWrapper'>
                                <div id='artworkCardContainer'>
                                {renderArtworks()}
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

export default MuseumContainer



