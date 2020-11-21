import React from 'react'
import { Stage, Layer, Line, Text } from 'react-konva';
import {postStage, addEisel} from '../actions/actions'
import { connect } from 'react-redux'



const EiselTest = (props) => {
    const [tool, setTool] = React.useState('pen')
    const [lines, setLines] = React.useState([])
    const [lineColor, setLineColor] = React.useState('black')
    const [name, setName] = React.useState("")
    const [genre, setGenre] = React.useState("")
    const [file, setFile] = React.useState(null)
    // const [imgUrl, setimgUrl] = React.useState("")
    const isDrawing = React.useRef(false) 
    const eiselStage = React.useRef()
    const targetLayer = React.useRef()



    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
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
        // return lines.map((line, i) => (<Line key={i} points={line.points} stroke={lineColor} strokeWidth={props.strokeWidth.strokeWidth} tension={props.tension.tension} lineCap={props.lineCap.lineCap}/>))
      };

      const clickHandler = (e) => {
        let colorSpan = e.target.innerText
        console.log(e.target.innerText)
        setLineColor(colorSpan)
      }

      const handleSave = () => {
       //let url = eiselStage.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")
       let canvas = document.getElementsByTagName('canvas')[0]
       let url = canvas.toDataURL()
       let stripUrl = url.replace(/^data:image\/(png|jpg);base64,/, "")
       let byteCharacters = atob(stripUrl)
       const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
        
        const byteArray = new Uint8Array(byteNumbers)
        // const blob = new Blob([byteArray], {type: 'image/png'})
        const file = new File([byteArray], "image-name.png", {type: 'image/png'})
        setFile(file)
       

        


      }

      const handlePost = () => {
          let form = new FormData()
          form.append("eisel[name]", "coolthing")
          form.append("eisel[user_id]", "1")
          form.append("eisel[genre]", "magical_realism")
          form.append("eisel[imagefile]", file)
            
        props.postStage(form)



      }
    
      return (
          <>
        <span onClick={clickHandler} className='redDiv'>red</span>
        <span onClick={clickHandler} className="yellowDiv">yellow</span>
        <span onClick={clickHandler} className="greenDiv">green</span>
        <span onClick={clickHandler} className="blueDiv">blue</span>
        <span onClick={clickHandler} className="violetDiv">violet</span>
        <span onClick={clickHandler} className="purpleDiv">purple</span>
          
          <div className='canvasBorder'>
            
              <Stage
              
              ref={eiselStage}
              width={props.width.width}
              height={props.height.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseUp={handleMouseUp}
              > 
                  <Layer ref={targetLayer}>
      {isDrawing ? lines.map((line, i) => (<Line key={i} points={line.points} stroke={lineColor} strokeWidth={props.strokeWidth.strokeWidth} tension={props.tension.tension} lineCap={props.lineCap.lineCap}/>)) : console.log(lineColor)}
                  
                  </Layer>
              </Stage>
                {/* {lines.map((line, i) => (<Line))} */}


        <button onClick={handlePost}>POST CANVAS</button>
        <button onClick={handleSave}>SAVE CANVAS</button>

        {/* <img src={imgUrl} alt='whatever'></img> */}
          </div>
          </>
      )

}

const mapDispatchToProps = (dispatch) => {
    return {
        postStage: (eiselObj) => dispatch(postStage(eiselObj)),
        addEisel: (eisel) => dispatch(addEisel(eisel))
    }
}



export default connect(null, mapDispatchToProps)(EiselTest)



// const mapStateToProps = (state) => {
//     return {
//         width: state.width,
//         height: state.height,
//         stages: state.stages,
//         stage: state.stage,
//         stroke: state.stroke,
//         strokeWidth: state.strokeWidth,
//          tension: state.tension,
//         lineCap: state.lineCap


//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         changeColor: (color) => { dispatch(changeColor(color)) },
//         changeStrokewidth: (swidth) => { dispatch(changeStrokewidth(swidth)) },
//         changeTension: (tension) => { dispatch(changeTension(tension)) },
//         changeLinecap: (lineCap) => { dispatch(changeLinecap(lineCap)) },
//         changeStageHeight: (stageHeight) => { dispatch(changeStageHeight(stageHeight)) },
//         changeStageWidth: (stageWidth) => { dispatch(changeStageWidth(stageWidth)) },
//         postStage: (currentStage) => { dispatch(postStage(currentStage)) }
//     }
// }












// class EiselTest extends React.Component {


//     state = {
//         canvas: [],
//         canvasUrl: "",
//         uploadedCanvas: {},

//     }
    
//     localOnClick = () => {
//         let canvas = document.getElementById('canvas')
//         let context = canvas.getContext('2d')
//         addTriangle(context)

//         // let stage = new createjs.Stage('canvas')
//         // let circle = new createjs.Shape()
//         // circle.graphics.beginFill("DeepBlueSky").drawCircle(0, 0, 50)
//         // circle.x = 100
//         // circle.y = 100
//         // stage.addChild(circle)  
        
//     }
    
//     saveImageToBlob = () => {
//         let canvas = document.getElementById('canvas')
//         return new Promise(function(resolve, reject) {
//             canvas.toBlob(function(blob) {
//                 resolve(blob)
//             }
//         )})
        
       
//     }   
    
//     postImageToState = () => {
//          this.saveImageToBlob().then(resp => this.setState({
//             canvas: [...this.state.canvas, resp]
//         }))
       
        
//     }
    
//     getBlobtoUrl = () => {
//         let blob = this.state.canvas[0]
//         let url = URL.createObjectURL(blob)
//         this.setState({
//             canvasUrl: url
//        })
//     }

//     postBlobToRails = () => {
//         let blob = this.state.canvas[0]

//         let file = new File([blob], "eisel_name.png", {type: 'image/png'})
        
//         let form = new FormData()
        
//         form.append('eisel[name]', 'faunetta')
//         form.append('eisel[user_id]', 1)
//         form.append('eisel[imagefile]', file)
        
    

//         let config = {
//                 method: "POST",
//                 body: form
//             }

//         console.log(config.body)
//         fetch('http://localhost:3000/eisels', config).then(resp => resp.json()).then(data => console.log(data))
//     }



//     render() {
       
//         let url = this.state.canvasUrl
        
//         return(
            
//             <div id="canvas-container">
//                 <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
//                 <canvas id="canvas" height={450} width={450} onClick={this.localOnClick}></canvas>
//                 <button onClick={this.postImageToState}>Save your Image</button>
//                 <img id='image' src={url} alt='whatever' onClick={this.getBlobtoUrl}></img> 
//                 <button onClick={this.postBlobToRails}>Post Blob to Rails</button>
//             </div>
            
//         )
//     }
// }

// export default EiselTest

// let config = {
//     method: "POST",
//     headers: {
//         "content-type": "application/json"
//     },
//     body: JSON.stringify(formImageData)
// }





{/* <div >
              <span onClick={clickHandler} className='redDiv'>red</span>
              </div>
              <div >
              <span onClick={clickHandler} className="yellowDiv">yellow</span>
              </div>
              <div >
              <span onClick={clickHandler} className="greenDiv">green</span>
              </div>
              <div >
              <span onClick={clickHandler} className="blueDiv">blue</span>
              </div>
              <div >
              <span onClick={clickHandler} className="violetDiv">violet</span>
              </div>
              <div >
              <span onClick={clickHandler} className="purpleDiv">purple</span>
              </div> */}