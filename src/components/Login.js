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
            <form ref={loginForm}>
                <input type="text" placeholder="Enter your Username" name="username" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                <input type="password" placeholder="Enter your Password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                <button onClick={loginUser}>Login To Start Creating!</button>
            </form>

        </div>
    )
}

export default Login