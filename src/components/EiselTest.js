import { useRef, useState } from 'react'
import { Stage, Layer, Line, Rect} from 'react-konva';
import {withRouter, NavLink} from 'react-router-dom'
import NewEiselForm from './NewEiselForm';




const EiselTest = (props) => {
    
    const [stageProps, setStageProps] = useState({height: 600,
                                            width: 600})

    const [lineProps, setLineProps] = useState({stroke: 'black',
                                        strokeWidth: 1,
                                        tension: 0.2,
                                        lineCap: 'round',
                                        
                                                })
    
    
    
    const [lines, setLines] = useState([])
    const [lineColor, setLineColor] = useState('black')
    
    const [strokeWidth, setStrokeWidth] = useState(1)
    const [tension, setTension] = useState(0.2)
    const [lineCap, setLineCap] = useState('round')
    const [opacity, setOpacity] = useState(1)

    const [rawData, setRawData] = useState(null)
    const isDrawing = useRef(false) 
    const eiselStage = useRef()
    const targetLayer = useRef()
    
    const [click, setClick] = useState(false)
    const [formClick, setFormClick] = useState(false)
    




    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();

        if (click) {

            setLines([...lines, {  points: [pos.x, pos.y], stroke: 'white', strokeWidth: strokeWidth, tension: tension, lineCap: lineCap, opacity: opacity}]);
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
        
        
      };

    

      const handleSave = () => {
          let canvas = eiselStage.current
          let url = canvas.toDataURL()
          let stripUrl = url.replace(/^data:image\/(png|jpg);base64,/, "")
          let byteCharacters = atob(stripUrl)
          const byteNumbers = new Array(byteCharacters.length);
               for (let i = 0; i < byteCharacters.length; i++) {
               byteNumbers[i] = byteCharacters.charCodeAt(i);
               }
           
           const byteArray = new Uint8Array(byteNumbers)
           
           setRawData(byteArray)
       
       
       

        }

      const eraseClickHandler = () => {
          setClick(prevClick => !prevClick)
          
        
      }

      const formClickHandler = () => {
        handleSave()
        setFormClick(prevFormClick => !prevFormClick)

        
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
        <div id='eiselTestBackground'>
        <div className='utensilBar'>

        <div>

        <NavLink to='/gallery/display'>Back to Gallery!</NavLink>
        </div>
        
        <div className='colorBar'>
            <label className='colorBarLabel' for='colorPallette'>Color Pallette</label>
            <input type="color" id='colorPallette' onChange={(evt) => { setLineColor(`${evt.target.value}`)}}></input>
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
       
          <div className='canvas'>
          <div className='canvasBorder'>
            
              <Stage
              
              ref={eiselStage}
              width={stageProps.width}
              height={stageProps.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseUp={handleMouseUp}
              > 

                  <Layer ref={targetLayer}>
                      <Rect height={590} width={590} fill='white'/>

                      
                   {isDrawing ? lines.map((line, i) => (<Line key={i} points={line.points} stroke={line.stroke} strokeWidth={line.strokeWidth} tension={line.tension} lineCap={line.lineCap} opacity={line.opacity} />)) : console.log("check for errors")}
                  
                  
                  </Layer>
              </Stage>
               
              

        <div >

        <button id='postCanvasContainer' onClick={formClickHandler}>POST CANVAS</button>
        </div>
        
        
        
        {formClick ? <NewEiselForm data={rawData} postEisel={props.postEisel} currentUser={props.currentUser}/> : console.log("error")}
        
        
        
          </div>
          </div>
          </div>
          </>
      )

}

export default withRouter(EiselTest)

