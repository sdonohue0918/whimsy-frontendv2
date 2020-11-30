import {withRouter, NavLink} from 'react-router-dom'

const EiselCard = (props) => {
    
    let filePath = `http://127.0.0.1:8080/${props.eisel.name}.png`
   
    return (
        
        <>

        <div className='card'>
            <img className='cardImage' src={filePath} alt="no file here!"></img>
            <h3><i>Title</i>{props.eisel.name}</h3>
            <br></br>
            <h3><i>Genre</i>{props.eisel.genre}</h3>
            <NavLink to={`/gallery/display/${props.eisel.id}`}>

            <button>Full Page</button>
            </NavLink>
        </div>
       </>
    )
}

export default withRouter(EiselCard)

// /Users/amydonohue/Flatiron/code/mod5/whimsy_apiv2/app/eisels
// whimsy_apiv2/app/eisels