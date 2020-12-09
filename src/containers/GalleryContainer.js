// import '../GalleryHome.css'
import EiselTest from '../components/EiselTest'
import EiselsContainer from '../containers/EiselsContainerTest'
import {Switch, Route, NavLink, withRouter, useHistory} from 'react-router-dom'

const GalleryContainer = (props) => {
    //console.log(props.selectValue)
    let history = useHistory()
    return (
        
        <div>
            <Switch>
            
            <Route path="/gallery/createeisel" render={() => {
                return (
                    <div>

                        <EiselTest postEisel={props.postEisel} currentUser={props.currentUser}/>
                    </div>
                )

            }}/>
            
            
            <Route path="/gallery/display" render={() => {

                return (
                    <div >

                <EiselsContainer currentUser={props.currentUser} 
                eisels={props.eisels}
                artworks={props.artworks} 
                deleteEisel={props.deleteEisel}
                deleteLike={props.deleteLike} 
                postLike={props.postLike}/>
                
                </div>

                )}
                }/>

                    
                <Route path='/gallery' render={() => {
                    return (
                        <div className='galleryBackground'>
                            
                            <img id='door' src='https://www.pngkey.com/png/full/322-3226486_screen-door.png' alt='not found' onClick={() => { history.push('/museum') }}/>
                            
                            
                            
                            

                            <img id='eisel' src='https://img.freepik.com/free-photo/close-up-golden-blank-white-frame_23-2147910001.jpg?size=626&ext=jpg' alt='not found' onClick={() => { history.push('/gallery/display') }}/>
                            
                            
                            
                            

                            <img id='coloringBook' src='https://images-na.ssl-images-amazon.com/images/I/41en2EIkbOL._SX258_BO1,204,203,200_.jpg' alt='not found' onClick={() => { history.push('/coloring') }}/>
                            
                            
                            
                            

                            <img id='pallete' src='https://images.freeimages.com/images/large-previews/a0b/artist-palette-1172456.jpg' alt='not found' onClick={() => { history.push('/gallery/createeisel') }}/>
                            
                            
                        <div >
                            
                        </div>
                        </div>
                    )
                }}/>
            

            </Switch>


            

        </div>
    
    )
}







export default GalleryContainer