
import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import GalleryFilters from '../components/GalleryFilters'
import EiselShow from '../components/EiselShow'
import ArtworkShow from '../components/ArtworkShow'





const EiselsContainer = (props) => {
    //const [filter, setFilter] = useState(null)
    
   
    // const renderNavBar = () => {
    //     return (
    //         <div >
    //             <ul className='NavBar'>
    //                 <li className='NavLink'><NavLink to='/gallery'>Home</NavLink></li>
    //                 <li className='NavLink'><NavLink to='/gallery/createeisel'>Create</NavLink></li>
    //                 <li className='NavLink'><NavLink to='/coloring'>Destressor</NavLink></li>
    //                 <li className='NavLink'><NavLink to='/museum'>Museum</NavLink></li>
    //             </ul>
    //         </div>
    //     )
    // }

   

   return (
        <div>
            
            <Switch>
                
                <Route path='/gallery/display/artwork/:workid' render={(routerProps) => {
                    let work
                    if (props.artworks.length > 0) {
                        let id = parseInt(routerProps.match.params.workid)
                        work = props.artworks.find(work => work.objectID === id)
                    }

                    return (
                        <div>
                            { work ? <ArtworkShow currentUser={props.currentUser} details={work}/> : null}
                        </div>
                    )
                }}/>
                
                
                
                
                
                
                
                
                <Route path='/gallery/display/:id' render={(routerProps) => {
                    let eisel
                    if (props.eisels.length > 0) {
                        let id = parseInt(routerProps.match.params.id)
                        eisel = props.eisels.find(eisel => eisel.id === id)
                    }
                    return (
                        <div>
                            {eisel ? <EiselShow postLike={props.postLike} deleteLike={props.deleteLike} deleteEisel={props.deleteEisel} currentUser={props.currentUser} eisel={eisel}/> : <h3>Loading</h3> }
                        </div>
                    )
                }}/>

                

                <Route path='/gallery/display' render={() => {
                    return (
                        <div>
                            <div id='eiselContainerBackground'>
                        {/* {renderNavBar()} */}
                        <GalleryFilters  eisels={props.eisels} artworks={props.artworks} currentUser={props.currentUser}/>
                            </div>
                        </div>
                        )
                }}/>
            </Switch>
            
            
        </div>
    )
    
     


}



export default EiselsContainer

