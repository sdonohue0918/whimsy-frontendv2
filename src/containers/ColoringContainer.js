import ColoringTest from '../components/ColoringTest'
import { Route } from 'react-router-dom'

const ColoringContainer = () => {
    return (
        <div>
            <Route to='/coloring' render={() => {
                return (
                    <div>
                        <ColoringTest />
                    </div>

                )
            }}/>
        </div>
    )
}

export default ColoringContainer