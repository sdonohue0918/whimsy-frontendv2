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
            <form ref={signupForm} onSubmit={postNewUser}>
                <input type='text' placeholder="Enter A Username" name='user[username]' value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                <input type='text'placeholder="Enter An Email" name='user[email]' value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                <input type='password' placeholder="Enter a Password" name='user[password]' value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                <button>Sign Up To Whimsy</button>
            </form>
            <div>
                <h3>Already A User? Click <NavLink to='/login'>Here</NavLink> To Login</h3>
            </div>
        </div>
        
    )

}

export default Signup