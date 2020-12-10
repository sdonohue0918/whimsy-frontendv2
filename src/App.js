
import './App.css';
import GalleryContainer from './containers/GalleryContainer'
import Signup from './components/Signup'
import ColoringContainer from './containers/ColoringContainer'
import Login from './components/Login'
import {useEffect, useState} from 'react'
import { Route, Switch, useHistory}  from 'react-router-dom'
import React from 'react'




  function App() {
  
    const [users, setAppUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const history = useHistory()


  
  
  useEffect(() => {
    
    fetch('http://localhost:3000/users').then(resp => resp.json()).then(data => setAppUsers(data))
    
  }, [])

  
  
  
  
  
const postUserToAPI = (userObj) => {
    
    let config = {
      method: "POST",
      body: userObj
    }
    fetch('http://localhost:3000/users', config).then(resp => resp.json()).then(data => setAppUsers([...users, data]))
  }


  

  const getCurrentUser = (userObj) => {
    
    let userObjName = userObj.get('username')
   

    let matchUser = users.find(user => user.username === userObjName)
    
    setCurrentUser(matchUser)
    
    

  }
  






  

    return (
      <div className="App">
          {currentUser ? history.push('/gallery') : history.push('/signup')}
              <Switch>
  
  
              <Route path="/gallery" render={() => {
                return (
                  <div>
  
                    <GalleryContainer 
                    
                    
                    currentUser={currentUser} 
                    
                    
                    />
                    
                    
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
  
              <Route path='/signup' render={() =>{
                return (
                  <div>
                    <Signup signup={postUserToAPI}/>
                  </div>
                )
              }}/>
                
  
              <Route path='/login' render={() => {
                return (
                  <div>
                    <Login login={getCurrentUser}/>
                  </div>
                )
              }}/>
                
        
              </Switch>
      </div>
      
    );
  
  


}

export default App
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




// export default connect(mapStateToProps, mapDispatchToProps)(App);
