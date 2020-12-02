import {useHistory} from 'react-router-dom'



const ArtworkCard = (props) => {

    const history = useHistory()
    
    
    const postHandler = () => {
        //console.log(props.details)
        props.postWork(props.details)
    }
    
    const redirect = () => {
        history.push(`/gallery/display/artwork/${props.details.objectID}`)
    }
    
    
    return (

        <div>
        
           

            

        
              
                        <div>
                            
                            <div>
                                <div className='artworkCard' >
            
                                <img className='artworkCardImage' onClick={postHandler} src={props.details.primaryImage} alt='not available'></img>
                                <button onClick={redirect}>Full Screen Image</button>
            
                                </div>
                            </div>


                        </div>
                    
                
            
                
                    
                
            
        
            
        
        
           
        
        </div>
    )
}

export default ArtworkCard


