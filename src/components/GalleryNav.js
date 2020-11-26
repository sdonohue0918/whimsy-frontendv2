import {Route, NavLink} from 'react-router-dom'
import GalleryFilters from '../components/GalleryFilters'

const GalleryNav = (props) => {
    
    return (
        <div>
            <GalleryFilters setSearch={props.setSearch} setSelect={props.setSelect}/>
            <NavLink to='/gallery/createeisel'>Create!</NavLink>
        </div>
    )
}

export default GalleryNav 