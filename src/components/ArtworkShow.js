import {NavLink} from 'react-router-dom'

const ArtworkShow = (props) => {

    const postHandler = () => {
        //console.log(props.details)
        props.postWork(props.details)
    }

    return (
        <div>
            <div className='artworkShow'>

             <img className='artworkShowImage'src={props.details.primaryImage} alt='not available'/>
            </div>
            <button onClick={postHandler}>Save This Work To Your Collection!</button>
           <NavLink to='/museum'>Back to Museum Home</NavLink>
        </div>
    )
}

export default ArtworkShow