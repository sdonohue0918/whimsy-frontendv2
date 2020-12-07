import {useState, useRef} from 'react'


const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const loginForm = useRef()
    
    const loginUser = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("username", loginForm.current[0].value)
        form.append("password", loginForm.current[1].value)
        
        props.login(form)

        
        

    }
    
    
    return (
        <div>
            <div id='loginBackground'>
            <div id='loginContainer'>

            <form ref={loginForm} id='loginForm'>
                <input className='loginInput' type="text" placeholder="Enter your Username" name="username" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                <input className='loginInput' type="password" placeholder="Enter your Password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                <button className='loginInput' onClick={loginUser}>Login To Start Creating!</button>
            </form>
            </div>
            </div>

        </div>
    )
}

export default Login