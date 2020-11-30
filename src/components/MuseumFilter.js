import ArtworkCard from '../components/ArtworkCard'
import {useState, useEffect, useRef} from 'react'


const MuseumFilter = (props) => {
    //const [works, setWorks] = useState([])
    const works = useRef([])
    
    const renderArtworks = () => {
        //console.log(props.objects)
        if (works.current.length > 0) {
            return works.current.map(work => { return <ArtworkCard key={work.objectID} details={work}/>})
        } else {
            return (
                <div>
                    <h5>No Results Returned</h5>
                </div>
            )
        }
        
    }


    useEffect(() => {
        if (props.objects.objectIDs.length > 0) {
            testGetMetObject()
        } else {
            return
        }
    }, [props.objects])





    const testGetMetObject = () => {
        let config = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        
        let idList = []
        
        for (let i = 0; i <= 20; i++) {
            idList.push(props.objects.objectIDs[Math.floor(Math.random() * props.objects.objectIDs.length)])
            
        }
        
        console.log(idList)
        
        let worksArray = []
        
        if (idList.length === 21) {

            for (let i = 0; i < idList.length; i++) {
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${idList[i]}`, config).then(resp => resp.json()).then(data => {
                worksArray.push(data)
                
               })
            }
        }
        
        works.current = worksArray
    }
    
    
    
    
    
    
    
    console.log(props.objects)
    console.log(works.current)
    
    return (
        <div>
            {renderArtworks()}
        </div>
    )
}

export default MuseumFilter