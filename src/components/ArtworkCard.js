import { NavLink, useHistory } from 'react-router-dom'



const ArtworkCard = (props) => {
    let history = useHistory()
    
    
    const clickPush = () => {
        history.push(`/museum/${props.details.objectID}`)
    }

    return (
        <div className='artworkCard' >
            
            <img className='artworkCardImage' src={props.details.primaryImage} alt='not available'></img>
            <h3 className='artworkCardTitle'>{props.details.title}</h3>
            <h3 className='artworkCardName'>{props.details.artistDisplayName}</h3>
            <h3 className='artworkCardDate'>{props.details.objectDate}</h3>
            <button onClick={clickPush}></button>
            {/* <NavLink to={`/museum/${props.details.objectID}`}></NavLink> */}

        </div>
    )
}

export default ArtworkCard