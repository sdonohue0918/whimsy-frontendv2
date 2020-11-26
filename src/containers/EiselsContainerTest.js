
import {useEffect , useState} from 'react'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import {Switch, withRouter, Route} from 'react-router-dom'
import EiselCard from '../components/EiselCard'
import GalleryNav from '../components/GalleryNav'
import EiselShow from '../components/EiselShow'



const EiselsContainer = (props) => {
    const [userEisels, setUserEisels] = useState([])
    const [allEisels, setAllEisels] = useState([])
    const [filter, setFilter] = useState(null)
    
    const getUsersEisels = () => {
        let currentUserEisels = props.eisels.filter(eisel => eisel.user_id === props.currentUser.id)
        setUserEisels(currentUserEisels)
    }

    const getAllEisels = () => {
        let eisels = props.eisels.map(eisel => {return <EiselCard key={eisel.id} eisel={eisel}/>})
    }

   

    
    const renderEisels = () => {

        // let filterEisels = props.eisels.filter(eisel => eisel.name.toLowerCase().includes(props.searchValue.toLowerCase()))
        // let applySelectFilter = props.eisels.filter(eisel => eisel.genre.toLowerCase().includes(props.selectValue.toLowerCase()))
        // let newArray = filterEisels.concat(applySelectFilter)
        // let bothFilters = [...new Set(newArray)] 

        // return bothFilters.map( eisel => { return <EiselCard key={eisel.id} eisel={eisel}></EiselCard>})

        // let filterEisels = userEisels.filter(eisel => eisel.name.toLowerCase().includes(props.searchValue.toLowerCase()))
        //let applySelectFilter = userEisels.filter(eisel => eisel.genre.toLowerCase().includes(props.selectValue.toLowerCase()))
        // let newArray = filterEisels.concat(applySelectFilter)
        // let bothFilters = [...new Set(newArray)]
        //return applySelectFilter.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
        // else if (props.selectValue === "likedEisels") {
        //     let likedEisels = props.eisels.filter( eisel => )
        // }
        // if (props.selectValue === "allEisels") {
        //     return props.eisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
            
        //   } else if (props.selectValue === "userOnly") {
        //     let currentUserEisels = props.eisels.filter(eisel => eisel.user_id === props.currentUser.id)
        //     return currentUserEisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
            
        //   }

        // if (filter === "userOnly" ) {
        //     let currentUserEisels = props.eisels.filter(eisel => eisel.user_id === props.currentUser.id)
        //     return currentUserEisels.map(eisel => {return <EiselCard key={eisel.id} eisel={eisel}/>})

        // } else if (filter === "allEisels") {
        //     return props.eisels.map(eisel => {return <EiselCard key={eisel.id} eisel={eisel}/>})
        // }
        
        
        
    }

    
    
    return (
        <div>
            
            <Switch>
                <Route path='/gallery/display/:id' render={(routerProps) => {
                    let eisel
                    if (props.eisels.length > 0) {
                        let id = parseInt(routerProps.match.params.id)
                        eisel = props.eisels.find(eisel => eisel.id === id)
                    }
                    return (
                        <div>
                            {eisel ? <EiselShow currentUser={props.currentUser} eisel={eisel}/> : <h3>Loading</h3> }
                        </div>
                    )
                }}/>

                <Route path='/gallery/display' render={() => {
                    return (
                        <div>

                        <GalleryNav setSearch={props.setSearch} setSelect={props.setSelect} selectValue={props.selectValue}/>
                        {/* {renderEisels()} */}
                        </div>
                        )
                }}/>
            </Switch>
            
            
        </div>
    )
    
     


}

// const mapStateToProps = (state) => {
//     const { stages } = state
//     const { searchInput } = state
//     const { stage } = state
//     const {selectInput } = state
//     return {
//         stages,
//         searchInput,
//         stage,
//         selectInput
//     }
//     // return {
//     // stages: state.stages,
//     // stage: state.stage,
//     // searchInput: state.searchInput,
//     // selectInput: state.selectInput
//     // }
// }

export default EiselsContainer

// export default connect(mapStateToProps)(EiselsContainer)