import { useState, useEffect } from 'react'
import ArtworkCard from '../components/ArtworkCard'
import ArtworkShow from '../components/ArtworkShow'
import {Route, Switch, NavLink} from 'react-router-dom'
import { getSelectInput } from '../actions/actions'



const MuseumContainer = (props) => {
    
    const [objects, setObjects] = useState(null)
    const [works, setWorks] = useState(null)
    const [search, setSearch] = useState("")
    const [fetchObjectsSuccess, setFetchObjectsSuccess] = useState(false)
    const [fetchWorksSuccess, setFetchWorksSuccess] = useState(false)
    
    

    const renderArtworks = () => {
        
        if (works.length > 0) {
            return works.map(work => { return <ArtworkCard key={work.objectID} details={work} postWork={props.postWork}/>})
        } else {
            return (
                <div>
                    <h5>No Results Returned</h5>
                </div>
            )
        }
        
    }
    
    
    const fetchObjectsClick = () => {
            getMet()
    }

    const fetchWorksClick = () => {
        testGetMetObject()
    
    }

    const curationReset = () => {
        setFetchObjectsSuccess(false)
        setFetchWorksSuccess(false)
        setObjects(null)
        setWorks(null)
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
        setObjects(data)
        setFetchObjectsSuccess(prevFetchObjectsSuccess => !prevFetchObjectsSuccess)
    }).catch(error => console.log(error))
       
            
    }

    const testGetMetObject = () => {
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
                worksArray.push(data)
                
               })
            }
        }
        
        setWorks(worksArray)
        setFetchWorksSuccess(prevFetchWorksSuccess => !prevFetchWorksSuccess)
    }

    
    

    console.log(search)
    console.log(works)
    console.log(fetchObjectsSuccess)
    console.log(fetchWorksSuccess)
    console.log(objects)
    
    
    
    return (
        
        
        <div>
            
                
            




                
                

                    
                    
                    <div >
                    
                    
                    <div id='museumBackground'>
                        
                        <div id='museumTag'>
                            <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>
                        </div>
                        
                        <div id='museumSearchContainer'>
                        <input id='museumSearchInput'  type="text" name="search" placeholder="Search for Art Here" value={search} onChange={(evt) => setSearch(evt.target.value)}></input>

                        {!fetchObjectsSuccess ? <button id='museumSearchButton' onClick={fetchObjectsClick}>Get Curated Findings</button> : <button id='museumSearchButton' onClick={fetchWorksClick}>See Findings!</button>}
                        {fetchWorksSuccess ? <button onClick={curationReset}>X</button> : null}
                        </div>
                       
                        <div id='artworkCardWrapper'>
                       <div id='artworkCardContainer'>
                           {fetchWorksSuccess ? renderArtworks() : null}
                       </div>
                       </div>
                    </div>
                    
                    </div>
                    

                
           
        </div>
    )

    
}

export default MuseumContainer



