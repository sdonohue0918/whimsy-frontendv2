import logo from './logo.svg';
import './App.css';
import EiselTest from './components/EiselTest'
import GalleryContainer from './containers/GalleryContainer'
import { connect } from 'react-redux'
import { changeColor, changeLinecap, changeStrokewidth, changeTension, changeStageHeight, changeStageWidth, postStage } from './actions/actions'
import { Route, Switch }  from 'react-router-dom'


function App(props) {


  const clickHandler = (e) => {
    let color = e.target.innerText
    props.changeColor(color)
  }
  
//   const colorChange = (event) => {
//     let color = event.target.style
//     this.props.changeColor(color)
// }
  
  
  return (
    <div className="App">
      

            <EiselTest width={props.width} height={props.height} stages={props.stages} stage={props.stage} stroke={props.stroke} strokeWidth={props.strokeWidth} tension={props.tension} lineCap={props.lineCap}/>
            <GalleryContainer/>
      
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    width: state.width,
    height: state.height,
    stages: state.stages,
    stage: state.stage,
    stroke: state.stroke,
    strokeWidth: state.strokeWidth,
    tension: state.tension,
    lineCap: state.lineCap


}

}

const mapDispatchToProps = (dispatch) => {
  return {
    changeColor: (color) => { dispatch(changeColor(color)) },
    changeStrokewidth: (swidth) => { dispatch(changeStrokewidth(swidth)) },
    changeTension: (tension) => { dispatch(changeTension(tension)) },
    changeLinecap: (lineCap) => { dispatch(changeLinecap(lineCap)) },
    changeStageHeight: (stageHeight) => { dispatch(changeStageHeight(stageHeight)) },
    changeStageWidth: (stageWidth) => { dispatch(changeStageWidth(stageWidth)) },
    postStage: (currentStage) => { dispatch(postStage(currentStage)) }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
