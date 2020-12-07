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
            
            
        </div>
       </>
    )
}

export default EiselCard

