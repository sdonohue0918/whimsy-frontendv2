
import EiselTest from '../components/EiselTest'
import EiselsContainer from '../containers/EiselsContainerTest'
import MuseumContainer from '../containers/MuseumContainer'
import {Switch, Route, useHistory} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'

const GalleryContainer = (props) => {
    const history = useHistory()
    const [eisels, setAllEisels] = useState([])
    const [artworks, setAllArtworks] = useState([])
    const artworksDidUpdate = useRef(false)
    const eiselsDidUpdate = useRef(false)
    

    useEffect(() => {
        fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => setAllEisels(data))
        fetch('http://localhost:3000/artworks').then(resp => resp.json()).then(data => setAllArtworks(data))
        
    }, [])

    // useEffect(() => {
    //     if (!initialFetch.current) {
    //         fetchEisels()
    //         fetchArtworks()
    //     } else {
    //         initialFetch.current = true
    //     }
    // }, [initialFetch])


    // useEffect(() => {
    //     if (!artworksDidUpdate.current) {
    //         return
    //     } else {
    //         fetchArtworks()
    //     }

    //     return () => {
    //         artworksDidUpdate.current = false
    //     }
    // }, [artworksDidUpdate])

    // useEffect(() => {
    //     if (!eiselsDidUpdate.current) {
    //         return
    //     } else {
    //         fetchEisels()
    //     }

    //     return () =>{
    //         eiselsDidUpdate.current = false
    //     }
    // }, [eiselsDidUpdate])
    
    
    
    // const fetchEisels = () => {
    //     fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => setAllEisels(data))
        
    // }

    // const fetchArtworks = () => {
    //     fetch('http://localhost:3000/artworks').then(resp => resp.json()).then(data => setAllArtworks(data))
    // }


    const postArtworkToAPI = (workObj) => {
        //console.log(workObj)
        let data = new FormData()
          data.append('artwork[user_id]', props.currentUser.id)
          data.append('artwork[objectID]', workObj.objectID)
          data.append('artwork[title]', workObj.title)
          data.append('artwork[primaryImage]', workObj.primaryImage)
          data.append('artwork[artistDisplayName]', workObj.artistDisplayName)
          data.append('artwork[objectDate]', workObj.objectDate)
          data.append('artwork[medium]', workObj.medium)
          data.append('artwork[country_of_origin]', workObj.country)
          data.append('artwork[region]', workObj.region)
          data.append('artwork[kind]', workObj.objectName)
    
    
        let config = {
          method: "POST",
          body: data
        }
    
    
        fetch('http://localhost:3000/artworks', config).then(resp => resp.json()).then(data => {
          if (artworks.length > 0) {
            setAllArtworks([...artworks, data])
          } else {
            setAllArtworks([data])
          }
        
       
        })
      
      }

      const postEiselToAPI = (eiselObj) => {
    
        let config = {
          method: "POST",
          body: eiselObj
        }
        fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => {
        //   setAllEisels([...eisels, data])
        //   history.push('/gallery/display')

        eiselsDidUpdate.current = true
        history.push('/gallery/display')
        })
        
        
      }


      const deleteEisel = (eiselObj) => {
        
      
        let config = {
          method: "DELETE",
          headers: {
            "content-type":"application/json"
          }
        }
      
        fetch(`http://localhost:3000/eisels/${eiselObj.id}`, config).then(resp => resp.json()).then(data => {
        // let eiselsAfterDelete = eisels.filter(eisel => eisel.id !== data.id)
        // setAllEisels(eiselsAfterDelete)

        eiselsDidUpdate.current = true
        history.push('/gallery/display')
        

        })
        
      }


      



    console.log(artworks)
    console.log(eisels)

   
    return (
        
        <div>
            <Switch>
            
            <Route path="/gallery/createeisel" render={() => {
                return (
                    <div>

                        <EiselTest currentUser={props.currentUser}
                        postEisel={postEiselToAPI}/>
                    </div>
                )

            }}/>
            
            
            <Route path="/gallery/display" render={() => {

                return (
                    <div >

                <EiselsContainer currentUser={props.currentUser}
                eisels={eisels}
                artworks={artworks}
                deleteEisel={deleteEisel} 
                />
                
                </div>

                )}
                }/>

            <Route path='/museum' render={() => {
                return (
                  <div>
                    <MuseumContainer postWork={postArtworkToAPI} />
                  </div>
                )
              }}/>

                    
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