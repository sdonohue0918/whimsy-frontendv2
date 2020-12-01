import { useEffect, useRef, useState } from 'react'
import ArtworkCard from '../components/ArtworkCard'
import MuseumFilter from '../components/MuseumFilter'
import ArtworkShow from '../components/ArtworkShow'
import {Route, Switch, NavLink} from 'react-router-dom'
import { getSelectInput } from '../actions/actions'



const MuseumContainer = (props) => {
    
    const [objects, setObjects] = useState([])
    const [search, setSearch] = useState("")
    const fetchSuccess = useRef(false)
    const searchRef = useRef()
    const searchTimeout = useRef()
    
    
    
    

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
    

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${newSearchTerm}`, config).then(resp => resp.json()).then(data => setObjects(data)).catch(error => console.log(error))
       
            
    }
    

    useEffect(() => {
        searchRef.current = search
        
        
        if (searchRef.current === search) {
            searchTimeout.current = setTimeout(() => {
                if (searchRef.current) {
                    getMet()
            }
            }, 2000)

        }
        
        
        

        return (() => {
            clearTimeout(searchTimeout.current)
            fetchSuccess.current = true

        })
    
    }, [searchRef])


    console.log(search)
    console.log(fetchSuccess)
    console.log(objects)
    
    
    
    return (
        
        
        <div>
            <Switch>
                
                <Route path='/museum' render={() => {

                    return (
                    <div>
                        
                        
                        <input ref={searchRef} type="text" name="search" placeholder="Search for Art Here" value={search} onChange={(evt) => setSearch(evt.target.value)}></input>
                        {/* {works.length > 0 ? works.current.map(work => { return <ArtworkCard  details={work}/>}) : <h4>Search for Famous Pieces By Tag! The Findings Here Are Curated by Algorithms courtesy of the MET</h4>}
                        {/* {objects.length > 0 ? <button onClick={testGetMetObject}>See Curated Findings</button> : null} */}
                        {/* <button onClick={testGetMetObject}>See Curated Findings!</button>  */}
                        {objects !== [] ? <MuseumFilter objects={objects} postWork={props.postWork}/> : <div><h5>Search for Famous Pieces By Tag!</h5> </div> }
                       
                    </div>
                    )
                    
                    }}/>

                
            </Switch>
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