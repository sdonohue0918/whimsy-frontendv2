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

    


    
    
    return (
        <div>
        <div className='showCard'>
            <img className='showCardImage' src={filepath}></img>
        </div>
            {props.currentUser.id === props.eisel.user_id ? <button style={{color: 'red'}} onClick={clickDelete}>Delete This Image</button> : null}
       <div>
           Likes : {props.eisel.likes.length}
           {likedEisels ? <button onClick={clickUnlike}>Unlike</button> : <button onClick={clickLike}>Like</button>}
       </div>
        </div>
    )

}

export default EiselShow