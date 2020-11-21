const EiselCard = (props) => {
    return (
        <div className='card'>
            {/* <image src={props.stage.fileimage}></image> */}
            <h3>{props.eisel.name}</h3>
            <h3>{props.eisel.genre}</h3>

        </div>
    )
}

export default EiselCard