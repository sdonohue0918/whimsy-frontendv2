import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'

const EiselShow = (props) => {
    let filepath = `http://127.0.0.1:8080/${props.eisel.name}.png`
    const [likedEisels, setLikedEisels] = useState(null)

    useEffect(() => {
        likedEiselsByUser()
    }, [])

    
    const clickDelete = () => {
        //console.log(props.eisel)
        props.deleteEisel(props.eisel)
    }
    
    const clickLike = () => {
        
        props.postLike(props.eisel)
    }

    const clickUnlike = () => {
        let likedEisel = props.eisel.likes.find(like => like.user_id === props.currentUser.id)
        //console.log(likedEisel)
        props.deleteLike(likedEisel)
        
    }

    const likedEiselsByUser = () => {
       let likedByUser = props.eisel.likes.some(like => like.user_id === props.currentUser.id)
       setLikedEisels(likedByUser)
    }

    
    const renderLikeFeature = () => {
        return (
            <div>
                <div className='showDetailsLike'>
                    <h5> Likes : {props.eisel.likes.length}</h5>
                    {likedEisels ? <button onClick={clickUnlike}>Unlike</button> : <button onClick={clickLike}>Like</button>}
                </div>
            </div>
        )
    }

    
    
    return (
        <div>
        
        <div className='detailsBackground'>
        
        <div className='showCard'>
            <img className='showCardImage' src={filepath}></img>
        </div>
        
        <div className='detailsTab'>
            <div className='detail'>
            <h2><u>Title</u> ~  </h2>
            <h2><i >{props.eisel.name}</i></h2>
            </div>
            {/* <br></br> */}
            <div className='detail'>
            <h2><u>Genre</u> ~  </h2>
            <h2><i>{props.eisel.genre}</i></h2>
            </div>
            {/* <div className='detail'>
            <h2><u>Likes</u> ~  </h2>

            {props.eisel.likes.length === 0 ? <h2> None</h2> : <h2>{props.eisel.likes.count}</h2>} */}
            {/* </div> */}
            <div className='detail'>

            </div>
            {props.currentUser.id === props.eisel.user_id ? <button style={{color: 'red'}} className='eiselShowDelete' onClick={clickDelete}>Delete This Image</button> : null}
            

        </div>

        
        
            {props.currentUser.id !== props.eisel.user_id ? renderLikeFeature() : null}


            </div>
        
        
        </div>
    )

}

export default EiselShow


