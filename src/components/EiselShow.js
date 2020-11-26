import {withRouter} from 'react-router-dom'

const EiselShow = (props) => {
    let filepath = `http://127.0.0.1:8080/${props.eisel.name}.png`
    return (
        <div>
        <div className='showCard'>
            <img className='showCardImage' src={filepath}></img>
        </div>
            {props.currentUser.id === props.eisel.user_id ? <button>Delete This Image</button> : <button>Like This Image</button>}
       
        </div>
    )

}

export default EiselShow