import { Stage, Layer, Line, Rect, Image} from 'react-konva'
import {useState, useRef} from 'react'
import useImage from 'use-image'


const ColoringTest = () => {
    
    const [stageProps, setStageProps] = useState({height: 800,
                                                    width: 800})
    const [lineProps, setLineProps] = useState({stroke: 'black',
                                                strokeWidth: 1,
                                                    tension: 0.2,
                                                lineCap: 'round'})
    const [lines, setLines] = useState([])
    const [lineColor, setLineColor] = useState('black')
        
    const [strokeWidth, setStrokeWidth] = useState(1)
    const [tension, setTension] = useState(0.2)
    const [lineCap, setLineCap] = useState('round')
    const [opacity, setOpacity] = useState(1)
    const isDrawing = useRef(false) 
    const eiselStage = useRef()
    const targetLayer = useRef()
    const [click, setClick] = useState(false)
    const [print, setPrint] = useState('https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-page-adult-zen-stormtrooper-by-allan.jpg')
    const [image] = useImage(print)




    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();

        if (click) {

            setLines([...lines, {  points: [pos.x, pos.y], stroke: 'white', strokeWidth: strokeWidth, tension: tension, lineCap: lineCap, opacity: opacity }]);
        } else {
            setLines([...lines, {  points: [pos.x, pos.y], stroke: lineColor, strokeWidth: strokeWidth, tension: tension, lineCap: lineCap, opacity: opacity }])
        }
      };


    

      const handleMouseMove = (e) => {
        
        if (!isDrawing.current) {
          return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        
        lastLine.points = lastLine.points.concat([point.x, point.y]);
    
        
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
      };



      const handleMouseUp = (e) => {
        isDrawing.current = false;
        targetLayer.current = e.target
        
      };


      const eraseClickHandler = () => {
        setClick(prevClick => !prevClick)
        
      
    }

    const eraseSelect = () => {
        return (
            <div id='eraserContainer'>
                <label className='colorBarLabel' for='eraser'>Set Eraser Width</label>
                <input type='range' id='eraser' name='eraser' min={0} max={6} step={1} onChange={(evt) => {setStrokeWidth(evt.target.value)}}/>
            </div>
        )
    } 

    
    
    
    
    
    
      return (
          
          <>
        <div id='coloringTestBackground'>
        <div className='utensilBar'>
          
          
          <div>
          <select id="printSelect" onChange={(evt) => {setPrint(evt.target.value)}}>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-page-adult-zen-stormtrooper-by-allan.jpg'>Psychedelic Stormtrooper</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-mandala-heather-hinson-1.jpg'>Flower</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-mandala-metal-vegetal.jpg'>Metal Flower</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-mandala-yin-yang-and-elegant-leaves.jpg'>Yin/Yang Mandala</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-page-adult-fox-mountain-forest-by-allan.jpg'>Mountain Fox</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-page-musician-playing-the-saxophone.jpg'>Saxophonist</option>
            <option value='https://whimsy-coloringprints.s3.us-east-2.amazonaws.com/prints/coloring-whimsical-background.jpg'>Many Flowers</option>
         </select>
          </div>
        
        
        <div>
            <div className='colorBar'>
            <label className='colorBarLabel' for='color'>Set Color</label>
            <input id ='color' type="color" onChange={(evt) => {setLineColor(`${evt.target.value}`)}}></input>
            </div>

        <div className='opacityContainer'>
            <label className='colorBarLabel' for='opacitySlider'>Set Opacity</label>
            <input id="opacitySlider" type="range" name='opacity' min={0} max={1} step={0.1} onChange={(evt) => {setOpacity(evt.target.value)}}/>
        </div>
        
        <div className='strokeWidthContainer'>
            <label className='colorBarLabel' for='strokeWidthSlider'>Set Brush Width</label>
            <input id='strokeWidthSlider' type='range' name='strokeWidth' min={0} max={6} step={1} onChange={(evt) => {setStrokeWidth(evt.target.value)}}/>
        </div>
        
       

        <div className='eraseButton'>

       <button className="eraser" onClick={eraseClickHandler}>{click ? 'Toggle Draw' : 'Toggle Erase'}</button>
       {click ? eraseSelect() : console.log('erase select not rendered')}
        </div>
       
       </div>
       </div>
        
        <div className='canvas'>
        <div className='coloringPrintBorder'>
            <Stage width={stageProps.height} height={stageProps.width}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            <Layer ref={targetLayer}>
                    
                    <Image image={image} height={800} width={800}/>

                      
                   {isDrawing ? lines.map((line, i) => (<Line key={i} points={line.points} stroke={line.stroke} strokeWidth={line.strokeWidth} tension={line.tension} lineCap={line.lineCap} />)) : console.log("check for errors")}
                  
                  
            </Layer>
            
            </Stage >
        </div>
        </div>
        </div>

        
        </>
    )
}

export default ColoringTest