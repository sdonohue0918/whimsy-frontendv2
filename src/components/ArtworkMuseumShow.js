const ArtworkMuseumShow = (props) => {
    
    
    const handlePost = () => {
        props.postWork(props.details)
    }
    
    
    
    return (
        <div>
            <div className='museumDetailsBackground'>
            
            <div className='showCard'>

             <img className='artworkShowImage'src={props.details.primaryImage} alt='not available'/>
             <button className='museumShowButton' onClick={handlePost}>Save This To Your Gallery!</button>
             </div>
            
            <div className='artDetailsTabOne'>
                <div className='artDetail'>
                <h4><u>Artist</u> ~</h4>
                
                 {props.details.displayName === "" || props.details.displayName === undefined ? <h4>Anonymous</h4> : <h4>{props.details.title}</h4>}

                </div>

                <div className='artDetail'>
                <h4><u>Title</u> ~</h4>
                <h4>{props.details.title}</h4>
                </div>

                <div className='artDetail'>
                <h4><u>Circa</u> ~</h4>
                <h4>{props.details.objectDate}</h4>
                </div>

                </div>

            <div className='artDetailsTabTwo'>
                 <div className='artDetail'>
                <h4><u>Medium</u> ~</h4>
                <h4 style={{fontFamily: 'Snell Roundhand'}}>{props.details.medium}</h4>

                </div>

                <div className='artDetail'>
                <h4><u>Region</u> ~</h4>
                {props.details.region === "" || props.details.region === undefined ? <h4>N/A</h4> : <h4>{props.details.region}</h4>}
                </div>

               
            
            </div>

            
            
            </div>
        </div>
    )

}

export default ArtworkMuseumShow