
import './App.css';
import GalleryContainer from './containers/GalleryContainer'
import Signup from './components/Signup'
import MuseumContainer from './containers/MuseumContainer'
import ColoringContainer from './containers/ColoringContainer'
import Login from './components/Login'
import {useEffect, useState} from 'react'
import { Route, Switch, useHistory, NavLink }  from 'react-router-dom'
import React from 'react'




  function App() {
  
    const [eisels, setAllEisels] = useState([])
    const [artworks, setArtWorks] = useState([])
  //const [filterEisels, setFilterEisels] = useState(null)
    const [users, setAppUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    //const [selectInput, setSelectInput] = useState("allEisels")
  
  
    const history = useHistory()


  
  
  useEffect(() => {
    fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => setAllEisels(data))
    fetch('http://localhost:3000/users').then(resp => resp.json()).then(data => setAppUsers(data))
    fetch('http://localhost:3000/artworks').then(resp => resp.json()).then(data => setArtWorks(data))
  }, [])

  
  
  
  const postArtworkToAPI = (workObj) => {
    //console.log(workObj)
    let data = new FormData()
      data.append('artwork[user_id]', currentUser.id)
      data.append('artwork[MET_ID]', workObj.objectID)
      data.append('artwork[title]', workObj.title)
      data.append('artwork[image_link]', workObj.primaryImage)
      data.append('artwork[artist_name]', workObj.artistDisplayName)
      data.append('artwork[date_made]', workObj.objectDate)
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
        setArtWorks([...artworks, data])
      } else {
        setArtWorks([data])
      }
    
   
    })
  
  }
  
  
  
  
  
  const postEiselToAPI = (eiselObj) => {
    
    let config = {
      method: "POST",
      body: eiselObj
    }
    fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => {
      setAllEisels([...eisels, data])
      history.push('/gallery/display')
    })
    
    
  }

  const postUserToAPI = (userObj) => {
    
    let config = {
      method: "POST",
      body: userObj
    }
    fetch('http://localhost:3000/users', config).then(resp => resp.json()).then(data => setAppUsers([...users, data]))
  }



   const setSelectValue = (selectValue) => {
    setSelectInput(selectValue)
    history.push('/gallery/display')
  }

  const getCurrentUser = (userObj) => {
    
    let userObjName = userObj.get('username')
    // let userObjPassword = userObj.get('password')
    //console.log(userObjName, userObjPassword)

    let matchUser = users.find(user => user.username === userObjName)
    //console.log(matchUser)
    setCurrentUser(matchUser)
    //history.push('/')
    

  }
  
// const getFilterEisels = () => {
//   if (selectInput === "allEisels") {
//     return eisels
//   } else if (selectInput === "userOnly") {
//     let currentUserEisels = eisels.filter(eisel => eisel.user_id === currentUser.id)
//     return currentUserEisels
//   } 
// }

const deleteEisel = (eiselObj) => {
  let eiselsAfterDelete = eisels.filter(eisel => eisel.id !== eiselObj.id)

  let config = {
    method: "DELETE",
    headers: {
      "content-type":"application/json"
    }
  }

  fetch(`http://localhost:3000/eisels/${eiselObj.id}`, config).then(resp => resp.json()).then(data => setAllEisels(eiselsAfterDelete))
}

const addLikeToEisel = (likeObj) => {
  let like = new FormData()
  like.append('like[user_id]', currentUser.id)
  like.append('like[eisel_id]', likeObj.id)
  
  //console.log(like.get('like[user_id]'), like.get('like[eisel_id]'))
  
  let config = {
    method: "POST",
    body: like  
  }

  fetch('http://localhost:3000/likes', config).then(resp => resp.json()).then(data => {
    let targetEisel = eisels.filter(eisel => eisel.id === data.eisel_id)
    console.log(targetEisel[0])
    targetEisel[0].likes.push(data)
    let currentEiselArray = eisels.filter(eisel => eisel.id !== targetEisel[0].id)
    let finalArray = [...currentEiselArray, targetEisel[0]]
    setAllEisels(finalArray)
    history.push('/gallery/display')

    


  })

}

const removeLikeFromEisel = (likeObj) => {
    let config = {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }

    fetch(`http://localhost:3000/likes/${likeObj.id}`, config).then(resp => resp.json()).then(data => {
      let targetEisel = eisels.filter(eisel => eisel.id === data.eisel_id)
      let newTargetEiselLikes = targetEisel[0].likes.filter(like => like.id !== data.id)
      targetEisel[0].likes = newTargetEiselLikes

      let currentEiselArray = eisels.filter(eisel => eisel.id !== targetEisel[0].id)
      let finalArray = [...currentEiselArray, targetEisel[0]]
      console.log(finalArray)
      setAllEisels(finalArray)
      history.push('/gallery/display')
      

    
    
  
  
    })

    
    
    
}

  console.log(eisels)

    return (
      <div className="App">
          {currentUser ? history.push('/gallery') : history.push('/signup')}
              <Switch>
  
  
              <Route path="/gallery" render={() => {
                return (
                  <div>
  
                    <GalleryContainer 
                    
                    
                    currentUser={currentUser} 
                    eisels={eisels}
                    artworks={artworks} 
                    postEisel={postEiselToAPI}
                    deleteEisel={deleteEisel}
                    deleteLike={removeLikeFromEisel}
                    postLike={addLikeToEisel}
                    
                    />
                    
                    
                  </div>
                )
  
              }}/>
              

              <Route path='/museum' render={() => {
                return (
                  <div>
                    <MuseumContainer postWork={postArtworkToAPI} />
                  </div>
                )
              }}/>

              <Route path='/coloring' render={() => {
                return (
                  <div>
                    <ColoringContainer />
                  </div>
                )
              }}/>
  
              <Route path='/signup'>
                <Signup signup={postUserToAPI}/>
              </Route>
  
              <Route path='/login'>
                <Login login={getCurrentUser}/>
              </Route>
        
              </Switch>
      </div>
      
    );
  
  


}

// const mapStateToProps = (state) => {
//   return {
//     width: state.width,
//     height: state.height,
//     stages: state.stages,
//     stage: state.stage,
//     stroke: state.stroke,
//     strokeWidth: state.strokeWidth,
//     tension: state.tension,
//     lineCap: state.lineCap


// }

// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeColor: (color) => { dispatch(changeColor(color)) },
//     changeStrokewidth: (swidth) => { dispatch(changeStrokewidth(swidth)) },
//     changeTension: (tension) => { dispatch(changeTension(tension)) },
//     changeLinecap: (lineCap) => { dispatch(changeLinecap(lineCap)) },
//     changeStageHeight: (stageHeight) => { dispatch(changeStageHeight(stageHeight)) },
//     changeStageWidth: (stageWidth) => { dispatch(changeStageWidth(stageWidth)) },
//     postStage: (currentStage) => { dispatch(postStage(currentStage)) },
//     fetchAllStages: () => { dispatch(fetchStages())}
// }
// }

export default App


// export default connect(mapStateToProps, mapDispatchToProps)(App);
