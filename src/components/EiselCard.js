import {withRouter, NavLink} from 'react-router-dom'

const EiselCard = (props) => {
    
    let filePath = `http://127.0.0.1:8080/${props.eisel.name}.png`
   
    return (
        
        <>

        <div className='card'>
            <img className='cardImage' src={filePath} alt="no file here!"></img>
            <h3 className='cardTitle'>Title  : <i>       {props.eisel.name}</i></h3>
            <br></br>
            <h3 className='cardGenre'>Genre  :  <i>      {props.eisel.genre}</i></h3>
            <NavLink to={`/gallery/display/${props.eisel.id}`}>

            <button className='cardButton'>Full Screen Image</button>
            </NavLink>
        </div>
       </>
    )
}

export default withRouter(EiselCard)

// /Users/amydonohue/Flatiron/code/mod5/whimsy_apiv2/app/eisels
// whimsy_apiv2/app/eisels