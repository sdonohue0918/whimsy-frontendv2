import React, {Component} from 'react'
import EiselTest from '../components/EiselTest'
import EiselsContainer from '../containers/EiselsContainerTest'
import MuseumContainer from '../containers/MuseumContainer'
import {Switch, Route, withRouter} from 'react-router-dom'




class GalleryContainer extends Component {
    
     state = {
         eisels: [],
         artworks: []
     }
    
    
    componentDidMount() {
        
        fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => this.setState({eisels: data}, () => {
            fetch('http://localhost:3000/artworks').then(resp => resp.json()).then(data => this.setState({artworks: data}))
        }))
        // fetch('http://localhost:3000/artworks').then(resp => resp.json()).then(data => this.setState({artworks: data}))

    }

    

     postArtworkToAPI = (workObj) => {
        
        let data = new FormData()
          data.append('artwork[user_id]', this.props.currentUser.id)
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
          if (this.state.artworks.length > 0) {
            
            this.setState({artworks: [...this.state.artworks, data]})
            this.props.history.push('/gallery/display')
          } else {
            
            this.setState({artworks: data})
            this.props.history.push('/gallery/display')
          }
        
       
        })
      
      }

      postEiselToAPI = (eiselObj) => {
    
        let config = {
          method: "POST",
          body: eiselObj
        }
        fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => {
        

        this.setState({eisels: [...this.state.eisels, data]})
        this.props.history.push('/gallery/display')
        
        })
        
        
      }


      deleteEisel = (eiselObj) => {
        
      
        let config = {
          method: "DELETE",
          headers: {
            "content-type":"application/json"
          }
        }
      
        fetch(`http://localhost:3000/eisels/${eiselObj.id}`, config).then(resp => resp.json()).then(data => {
            let eiselsAfterDelete = this.state.eisels.filter(eisel => eisel.id !== data.id)
        
            this.setState({eisels: eiselsAfterDelete})
        
            this.props.history.push('/gallery/display')
            

        })
        
      }


      


   render() {
    console.log(this.state.artworks)
    console.log(this.state.eisels)
       return (
           
           <div>
            <Switch>
            
            <Route path="/gallery/createeisel" render={() => {
                return (
                    <div>

                        <EiselTest currentUser={this.props.currentUser}
                        postEisel={this.postEiselToAPI}/>
                    </div>
                )
                
            }}/>
            
            
            <Route path="/gallery/display" render={() => {
                
                return (
                    <div >

                <EiselsContainer currentUser={this.props.currentUser}
                eisels={this.state.eisels}
                artworks={this.state.artworks}
                deleteEisel={this.deleteEisel} 
                />
                
                </div>

)}
}/>

            <Route path='/gallery/museum' render={() => {
                return (
                    <div>
                    <MuseumContainer postWork={this.postArtworkToAPI} />
                  </div>
                )
            }}/>

                    
                <Route path='/gallery' render={() => {
                    return (
                        <div className='galleryBackground'>
                            
                            <img id='door' src='https://www.pngkey.com/png/full/322-3226486_screen-door.png' alt='not found' onClick={() => { this.props.history.push('/gallery/museum') }}/>
                            
                            
                            
                            

                            <img id='eisel' src='https://img.freepik.com/free-photo/close-up-golden-blank-white-frame_23-2147910001.jpg?size=626&ext=jpg' alt='not found' onClick={() => { this.props.history.push('/gallery/display') }}/>
                            
                            
                            
                            

                            <img id='coloringBook' src='https://images-na.ssl-images-amazon.com/images/I/41en2EIkbOL._SX258_BO1,204,203,200_.jpg' alt='not found' onClick={() => { this.props.history.push('/coloring')}}/>
                            
                            
                            
                            

                            <img id='pallete' src='https://images.freeimages.com/images/large-previews/a0b/artist-palette-1172456.jpg' alt='not found' onClick={() => { this.props.history.push('/gallery/createeisel') }}/>
                            
                            
                        <div >
                            
                        </div>
                        </div>
                    )
                }}/>
            

            </Switch>


            

        </div>
    
    )
}
}







export default withRouter(GalleryContainer)