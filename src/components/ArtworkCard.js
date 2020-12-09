import {useHistory} from 'react-router-dom'



const ArtworkCard = (props) => {

    const history = useHistory()
    
    
    const postHandler = () => {
        
        props.postWork(props.details)
    }
    
    const redirect = () => {
        history.push(`/gallery/display/artwork/${props.details.objectID}`)
    }
    
    
    return (

        <div>
        
           

            

        
              
                        <div>
                            
                            <div>
                                <div className='card' >
                                
                                <button className='artworkCardButton' onClick={redirect}>Full Page</button>
            
                                <img className='cardImage' onClick={postHandler} src={props.details.primaryImage} alt='not available'></img>
                                
            
                                </div>
                            </div>


                        </div>
                    
                
            
                
                    
                
            
        
            
        
        
           
        
        </div>
    )
}

export default ArtworkCard


