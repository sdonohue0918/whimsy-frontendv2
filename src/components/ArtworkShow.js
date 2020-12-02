import {NavLink} from 'react-router-dom'

const ArtworkShow = (props) => {

    

    return (
        <div>
            <div className='artworkShow'>

             <img className='artworkShowImage'src={props.details.primaryImage} alt='not available'/>
            </div>
            
         
        </div>
    )
}

export default ArtworkShow