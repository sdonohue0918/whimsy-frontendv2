

const ArtworkShow = (props) => {

    //console.log(props)

    const handleDelete = () => {
        props.deleteArtwork(props.details)
    }

    return (
        <div>
            <div className='detailsBackground'>
            
            <div className='showCard'>

             <img className='artworkShowImage'src={props.details.primaryImage} alt='not available'/>
             
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
                
                <h4>{props.details.medium}</h4>
                </div>

                <div className='artDetail'>
                <h4><u>Region</u> ~</h4>
                <h4>{props.details.region}</h4>
                </div>

                <div className='artDetail'>
                <h4><u>Country of Origin</u> ~</h4>
                <h4>{props.details.country_of_origin}</h4>
                </div>

                <div className='artDetail'>
                    <button onClick={handleDelete}>Delete Artwork</button>
                </div>
            
            </div>

            </div>
            
         
        </div>
    )
}

export default ArtworkShow