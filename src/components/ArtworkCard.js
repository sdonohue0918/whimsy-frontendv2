import { NavLink, useHistory } from 'react-router-dom'



const ArtworkCard = (props) => {
    let history = useHistory()
    
    
    const clickPush = () => {
        history.push(`/museum/${props.details.objectID}`)
    }

    return (
        <div>
        <div className='artworkCard' >
            
            <img className='artworkCardImage' onClick={clickPush} src={props.details.primaryImage} alt='not available'></img>
            
            
           

        </div>
        </div>
    )
}

export default ArtworkCard