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
        //console.log(props.objects)
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
                        <NavLink to='/gallery'>Home</NavLink>
                        <div id='museumTag'>
                            <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>
                        </div>
                        
                        <div id='museumSearchContainer'>
                        <input id='museumSearchInput'  type="text" name="search" placeholder="Search for Art Here" value={search} onChange={(evt) => setSearch(evt.target.value)}></input>
                        {/* {works.length > 0 ? works.current.map(work => { return <ArtworkCard  details={work}/>}) : <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>}
                        {/* {objects.length > 0 ? <button onClick={testGetMetObject}>See Curated Findings</button> : null} */}
                        {/* <button onClick={testGetMetObject}>See Curated Findings!</button>  */}
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



// const clientObj = (function() {
        
//     let clientID = 'bdc5d6185fbc8b22f718'
//     let  clientSecret = '1c1ca19c173aed8cbfd06bfbcd94077c'
//     let apiUrl = 'https://api.artsy.net/api/tokens/xapp_token?client_id=bdc5d6185fbc8b22f718&client_secret=1c1ca19c173aed8cbfd06bfbcd94077c'
//     return {
        
//         url: apiUrl,

//     }
// })()

// const seedArtwork = () => {
    //     let geneUrl = 'https://api.artsy.net/api/artworks?gene_id=5064a04377539e0002000585'
    //     let config = {
    //         method: "GET",
    //         headers: {
    //             "content-type": "application/json",
    //             'X-Xapp-Token': token
    //         }
    //     }
    //     fetch(geneUrl, config).then(resp => resp.json()).then(data => console.log(data)).catch(error => console.log(error))
    // }
    
    // const getArtwork = () => {
    //     let config = {
    //         method: "GET",
    //         headers: {
    //             "content-type": "application/json",
    //             'X-Xapp-Token': token
    //         }
    //     }
    //     fetch('https://api.artsy.net/api/artworks/4d8b92eb4eb68a1b2c000968', config).then(resp => resp.json()).then(data => setImgUrl(data.additional_information.slice(15, -1))).catch(error => console.log(error))
    // }

    // const getToken = () => {
    //     let url = clientObj.url
    //     let config = {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //             }
    //     }

    //     fetch(url, config).then(resp => resp.json()).then(data => setToken(data.token))
    // }

    /// const renderTestFunctions = () => {
        //     return (
        //         <div>
        //             <button onClick={getMet}>GET MET F()</button>
        //             <button onClick={testGetMetObject}>TEST GET</button>
                    
        //         </div>
        //     )
        // }