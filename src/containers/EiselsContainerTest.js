
import {useEffect , useState} from 'react'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import {Switch, withRouter, Route} from 'react-router-dom'
//import EiselCard from '../components/EiselCard'
import GalleryFilters from '../components/GalleryFilters'
import EiselShow from '../components/EiselShow'



const EiselsContainer = (props) => {
    const [Eisels, setAllEisels] = useState([])
    const [filter, setFilter] = useState(null)
    
   
    // const renderEisels = () => {

    //     return props.eisels.map(eisel => { return <EiselCard key={eisel.id} eisel={eisel}/>})
        
    // }

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
                            {eisel ? <EiselShow postLike={props.postLike} deleteLike={props.deleteLike} deleteEisel={props.deleteEisel} currentUser={props.currentUser} eisel={eisel}/> : <h3>Loading</h3> }
                        </div>
                    )
                }}/>

                <Route path='/gallery/display' render={() => {
                    return (
                        <div>

                        <GalleryFilters  eisels={props.eisels} artworks={props.artworks} currentUser={props.currentUser}/>
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