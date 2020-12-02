import {NavLink} from 'react-router-dom'
import {useState, useRef} from 'react'

const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const signupForm = useRef()

    const postNewUser = (evt) => {
        evt.preventDefault()
        let form = new FormData()
        form.append('user[username]', signupForm.current[0].value)
        form.append('user[email]', signupForm.current[1].value)
        form.append('user[password]', signupForm.current[2].value)
        props.signup(form)
    }   
    
    
    return (
        <div> 
            
            <div id='signupBackground'>

            
            <div id='signupContainer'>
            
            <form id='signupForm' ref={signupForm} onSubmit={postNewUser}>
                <label for='username' className='signupLabel'> Username </label>
                <input id='username' className='signupInput' type='text' placeholder="Enter A Username" name='user[username]' value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                <label for='email' className='signupLabel'>E-Mail</label>
                <input id='email' className='signupInput' type='text'placeholder="Enter An Email" name='user[email]' value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                <label for='password' className='signupLabel'>Password</label>
                <input id='password' className='signupInput' type='password' placeholder="Enter a Password" name='user[password]' value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                <button id='signupButton' style={{color: 'blue'}}>Sign Up To Whimsy</button>
            </form>
            <div id='signupLoginLink'>
                <h3 style={{color: 'teal'}}>Already A User? Click <NavLink to='/login'>Here</NavLink> To Login</h3>
            </div>
            
            </div>
           
           
           </div>
        
        
        
        
        </div>
        
    )

}

export default Signup