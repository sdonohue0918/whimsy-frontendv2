import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Line, Rect} from 'react-konva';
import {postStage, addEisel} from '../actions/actions'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import NewEiselForm from './NewEiselForm';




const EiselTest = (props) => {
    
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

    const [rawData, setRawData] = useState(null)
    const isDrawing = useRef(false) 
    const eiselStage = useRef()
    const targetLayer = useRef()
    
    const [click, setClick] = useState(false)
    const [formClick, setFormClick] = useState(false)
    
    
    
        useEffect(() => {
            handleSave()
        }, [setFormClick])



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

    

      const handleSave = () => {
          let canvas = document.getElementsByTagName('canvas')[0]
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
        
        setFormClick(prevFormClick => !prevFormClick)

        
      } 

    const eraseSelect = () => {
        return (
            <div>
                <select id="eraseoptions" onChange={(evt) => {setStrokeWidth(evt.target.value)}}>
                    <option value={2}>Small Eraser</option>
                    <option value={4}>Mid Eraser</option>
                    <option value={6}>Large Eraser</option>
                </select>
            </div>
        )
    } 




    
      console.log(rawData)
      return (
          <>
          

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

                      
                   {isDrawing ? lines.map((line, i) => (<Line key={i} points={line.points} stroke={line.stroke} strokeWidth={line.strokeWidth} tension={line.tension} lineCap={line.lineCap} />)) : console.log("check for errors")}
                  
                  
                  </Layer>
              </Stage>
               
              {click ? eraseSelect() : console.log('erase select not rendered')}

        
        <button onClick={formClickHandler}>POST CANVAS</button>
        {/* <button onClick={handleSave}>SAVE CANVAS</button> */}
        {formClick ? <NewEiselForm data={rawData} postEisel={props.postEisel} currentUser={props.currentUser}/> : console.log("error")}
        <NavLink to='/gallery/display'>Back to Gallery!</NavLink>
          </div>
          </div>
          </>
      )

}

export default EiselTest

