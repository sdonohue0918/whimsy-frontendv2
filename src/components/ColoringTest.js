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
    const isDrawing = useRef(false) 
    const eiselStage = useRef()
    const targetLayer = useRef()
    const [click, setClick] = useState(false)
    // const [formClick, setFormClick] = useState(false)
    const [print, setPrint] = useState('http://127.0.0.1:8081/coloring-page-adult-zen-stormtrooper-by-allan.jpg')
    const [image] = useImage(print)




    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();

        if (click) {

            setLines([...lines, {  points: [pos.x, pos.y], stroke: 'white', strokeWidth: strokeWidth, tension: tension, lineCap: lineCap }]);
        } else {
            setLines([...lines, {  points: [pos.x, pos.y], stroke: lineColor, strokeWidth: strokeWidth, tension: tension, lineCap: lineCap }])
        }
      };


    

      const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
          return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);
    
        // replace last
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


    
    
    
    
    
    
      return (
          
        <div>
            <div className='colorbar'>
            <input type="color" onChange={(evt) => {setLineColor(`${evt.target.value}`)}}></input>
        </div>
        
       <select id="strokeWidth" onChange={(evt) => {setStrokeWidth(evt.target.value)}}>
           <option value={1} selected>Small</option>
           <option value={2.5}>Mid</option>
           <option value={4}>Large</option>
       </select>
       
       <select id="tension" onChange={(evt) => {setTension(evt.target.value)}}>
           <option value={0.2} selected>Less Curve</option>
           <option value={0.5}>More Curve</option>
           <option value={0.75}>Curvy</option>
       </select>
       
       <select id="linecap" onChange={(evt) => {setLineCap(evt.target.value)}}>
           <option value='round' selected>Round</option>
           <option value='square'>Square</option>
           <option value='butt'>Butted</option>
       </select>
       <button id="eraser" onClick={eraseClickHandler}>{click ? 'Toggle Draw' : 'Toggle Erase'}</button>
       <select id="printSelct" onChange={(evt) => {setPrint(evt.target.value)}}>
            <option value='http://127.0.0.1:8081/coloring-page-adult-zen-stormtrooper-by-allan.jpg'>Psychedelic Stormtrooper</option>
            <option value='http://127.0.0.1:8081/coloring-mandala-heather-hinson-1.jpg'>Flower</option>
            <option value='http://127.0.0.1:8081/coloring-mandala-metal-vegetal.jpg'>Metal Flower</option>
            <option value='http://127.0.0.1:8081/coloring-mandala-yin-yang-and-elegant-leaves.jpg'>Yin/Yang Mandala</option>
            <option value='http://127.0.0.1:8081/coloring-page-adult-fox-mountain-forest-by-allan.jpg'>Mountain Fox</option>
            <option value='http://127.0.0.1:8081/coloring-page-musician-playing-the-saxophone.jpg'>Saxophonist</option>
            <option value='http://127.0.0.1:8081/coloring-whimsical-background.jpg'>Many Flowers</option>
       </select>
        
        
        
        <div className='canvas'>
        <div className='canvasBorder'>
            <Stage width={stageProps.height} height={stageProps.width}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            <Layer ref={targetLayer}>
                    {/* <Rect height={590} width={590} fillPatternImage={print}/> */}
                    <Image image={image} height={790} width={790}/>

                      
                   {isDrawing ? lines.map((line, i) => (<Line key={i} points={line.points} stroke={line.stroke} strokeWidth={line.strokeWidth} tension={line.tension} lineCap={line.lineCap} />)) : console.log("check for errors")}
                  
                  
            </Layer>
            
            </Stage >
        </div>
        </div>
        </div>
    )
}

export default ColoringTest