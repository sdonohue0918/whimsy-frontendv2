import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'

const EiselShow = (props) => {
    

    
    const clickDelete = () => {
        
        props.deleteEisel(props.eisel)
    }
    


    
    
    return (
        <div>
        
        <div className='detailsBackground'>
        
        <div className='showCard'>
            <img className='showCardImage' src={props.eisel.imagefile}></img>
        </div>
        
        <div className='detailsTab'>
            <div className='detail'>
            <h2><u>Title</u> ~  </h2>
            <h2><i >{props.eisel.name}</i></h2>
            </div>
            
            <div className='detail'>
            <h2><u>Genre</u> ~  </h2>
            <h2><i>{props.eisel.genre}</i></h2>
            </div>
            
            <div className='detail'>

            </div>
            {props.currentUser.id === props.eisel.user_id ? <button style={{color: 'red'}} className='eiselShowDelete' onClick={clickDelete}>Delete This Image</button> : null}
            

        </div>

        
    


            </div>
        
        
        </div>
    )

}

export default EiselShow


