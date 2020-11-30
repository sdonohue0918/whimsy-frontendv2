import { NavLink, useHistory } from 'react-router-dom'



const ArtworkCard = (props) => {
    let history = useHistory()
    
    
    const clickPush = () => {
        history.push(`/museum/${props.details.objectID}`)
    }

    return (
        <div className='artworkCard' onClick={clickPush}>
            
            <img className='artworkCardImage' src={props.details.primaryImage} alt='not available'></img>
            <h6>{props.details.title}</h6>
            <h6>{props.details.artistDisplayName}</h6>
            <h6>{props.details.objectDate}</h6>
            {/* <NavLink to={`/museum/${props.details.objectID}`}></NavLink> */}

        </div>
    )
}

export default ArtworkCard