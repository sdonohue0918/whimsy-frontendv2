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

                <EiselsContainer currentUser={props.currentUser} eisels={props.eisels} setSearch={props.setSearch} setSelect={props.setSelect} searchValue={props.searchValue} selectValue={props.selectValue}/>
                <button onClick={() => history.push('/gallery')}>Back To Home</button>
                </div>

                )}
                }/>

                    
                
            

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