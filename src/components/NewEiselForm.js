import React, {useRef, useState} from 'react'


const NewEiselForm = (props) => {

    const [eiselname, setEiselName] = React.useState("")
    const [eiselgenre, setEiselGenre] = React.useState("")
    const eiselform = React.useRef()
    


    const handlePost = (e) => {
        e.preventDefault()
        const file = new File([props.data], `${eiselname}.png`, {type: 'image/png'})
        
        let form = new FormData()
        form.append('eisel[name]', eiselform.current[0].value)
        form.append('eisel[genre]', eiselform.current[1].value)
        form.append('eisel[user_id]', eiselform.current[2].value)
        form.append('eisel[imagefile]', file)
        
        props.postEisel(form)
    }
    
    
    
    
    return (
        <div>
            <div id='eiselformContainer'>

            <form id='eiselform' ref={eiselform}>
                <input className='eiselformInputs' type="text"  name='eisel[name]' value={eiselname} placeholder='Give it a name!' onChange={evt => setEiselName(evt.target.value)}/>
                <input className='eiselformInputs' type="text"  name='eisel[genre]' value={eiselgenre} placeholder="what's its style?" onChange={evt => setEiselGenre(evt.target.value)}/>
                <input className='eiselformInputs' type="integer"  name='eisel[user_id]' value={props.currentUser.id} hidden readOnly/>
                
                <button className='eiselformInputs' onClick={handlePost}>Submit Your Creation!</button>
            </form>
            </div>
                
                
           



        
        </div>
    )
}

export default NewEiselForm