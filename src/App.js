
import './App.css';
import GalleryContainer from './containers/GalleryContainer'
import Signup from './components/Signup'
import Login from './components/Login'
import {useEffect, useState} from 'react'
import { Route, Switch, useHistory, NavLink }  from 'react-router-dom'



function App() {
  const [eisels, setAllEisels] = useState([])
  const [filterEisels, setFilterEisels] = useState(null)
  const [users, setAppUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const [selectInput, setSelectInput] = useState("allEisels")
  const history = useHistory()
  
  
  useEffect(() => {
    fetch('http://localhost:3000/eisels').then(resp => resp.json()).then(data => setAllEisels(data))
    fetch('http://localhost:3000/users').then(resp => resp.json()).then(data => setAppUsers(data))
  }, [setAllEisels])

  

  const postEiselToAPI = (eiselObj) => {
    
    let config = {
      method: "POST",
      body: eiselObj
    }
    fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => setAllEisels([...eisels, data]))
    history.push('/gallery')
    
  }

  const postUserToAPI = (userObj) => {
    
    let config = {
      method: "POST",
      body: userObj
    }
    fetch('http://localhost:3000/users', config).then(resp => resp.json()).then(data => setAppUsers([...users, data]))
  }


  const setSearchValue = (searchValue) => {
    setSearchInput(searchValue)
  }

   const setSelectValue = (selectValue) => {
    setSelectInput(selectValue)
  }

  const getCurrentUser = (userObj) => {
    
    let userObjName = userObj.get('username')
    let userObjPassword = userObj.get('password')
    //console.log(userObjName, userObjPassword)

    let matchUser = users.find(user => user.username === userObjName)
    //console.log(matchUser)
    setCurrentUser(matchUser)
    //history.push('/')
    

  }
  
const getFilterEisels = () => {
  
}



console.log(selectInput)
  
  return (
    <div className="App">
        {currentUser ? history.push('/gallery') : history.push('/signup')}
            <Switch>


            <Route path="/gallery" render={() => {
              return (
                <div>

                  <GalleryContainer 
                  setSelect={setSelectValue} 
                  setSearch={setSearchValue}
                  currentUser={currentUser} 
                  eisels={eisels} 
                  postEisel={postEiselToAPI}
                  searchValue={searchInput}
                  selectValue={selectInput}
                  />
                  <NavLink to='/gallery/display'>Visit Your Gallery!</NavLink>
                  
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
