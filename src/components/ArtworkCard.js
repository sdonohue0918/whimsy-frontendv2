import {useHistory} from 'react-router-dom'



const ArtworkCard = (props) => {

    const history = useHistory()
    
    
    
    const redirect = () => {
        history.push(`/gallery/display/artwork/${props.details.id}`)
    }
    
    
    return (

        <div>
        
           

            

        
              
                        <div>
                            
                            <div>
                                <div className='card' >
                                
                                {/* <button className='artworkCardButton' onClick={redirect}>Full Page</button> */}
            
                                <img className='cardImage' onClick={redirect} src={props.details.primaryImage} alt='not available'></img>
                                
            
                                </div>
                            </div>


                        </div>
                    
                
            
                
                    
                
            
        
            
        
        
           
        
        </div>
    )
}

export default ArtworkCard


