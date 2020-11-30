import { Stage, Layer, Line, Rect, Image} from 'react-konva'
import {useState} from 'react'
//import useImage from 'use-image'


const ColoringTest = () => {
    const [image, setImage] = useState("")
    const [stageProps, setStageProps] = useState({height: 600,
        width: 600})
    const [lineProps, setLineProps] = useState({stroke: 'black',
        strokeWidth: 1,
        tension: 0.2,
        lineCap: 'round'})
    const [lines, setLines] = useState([])
    const [lineColor, setLineColor] = useState('black')
        
    const [strokeWidth, setStrokeWidth] = useState(1)
    const [tension, setTension] = useState(0.2)
    const [lineCap, setLineCap] = useState('round')

    return (
        <div>
            <Stage />
        </div>
    )
}

export default ColoringTest