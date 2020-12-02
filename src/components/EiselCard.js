import {withRouter, NavLink, useHistory} from 'react-router-dom'

const EiselCard = (props) => {
    const history = useHistory()
    
    let filePath = `http://127.0.0.1:8080/${props.eisel.name}.png`

    const clickHandler = () => {
        history.push(`/gallery/display/${props.eisel.id}`)
    }
   
    return (
        
        <>

        <div className='card'>
            <img className='cardImage' src={filePath} alt="no file here!" onClick={clickHandler}></img>
            <h5 className='cardTitle'>Title  </h5>
            <h3><i className='lineTitle'> {props.eisel.name}</i></h3>
            <br></br>
            <h5 className='cardGenre'>Genre </h5>
            <h3><i className='lineGenre'> {props.eisel.genre}</i></h3>
            
        </div>
       </>
    )
}

export default EiselCard

// /Users/amydonohue/Flatiron/code/mod5/whimsy_apiv2/app/eisels
// whimsy_apiv2/app/eisels