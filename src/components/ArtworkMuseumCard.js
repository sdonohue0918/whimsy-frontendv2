import {useHistory} from 'react-router-dom'

const ArtworkMuseumCard = (props) => {
    const history = useHistory()

    const redirect = () => {
        console.log(props.details)
        history.push(`/museum/${props.details.objectID}`)
    }

    return (
        <div>
            <div>
                <div className='card' >
                                
                
            
                <img className='cardImage' onClick={redirect} src={props.details.primaryImage} alt='not available'></img>
                                
            
                </div>
            </div>
        </div>
    )

}

export default ArtworkMuseumCard