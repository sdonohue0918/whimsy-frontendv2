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
                    <div>

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
                        <div>
                            <NavLink to='/gallery/display'>Visit Your Gallery!</NavLink>
                            <NavLink to='/museum'>Visit The Museum!</NavLink>
                            <NavLink to='/gallery/createeisel'>Go Create!</NavLink>
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



// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchStages: () => {
//             dispatch(fetchStages())
//         }
//     }
// }

export default GalleryContainer