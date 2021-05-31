import React, {Component} from 'react'
import '../App.css';



function RenderForm(props){
    if(props.component.state.form === "login"){
        return(
            <>
            <form id="form-admin" method="POST">
                <div id="admin-login-alert-box"></div>
                <div className="mb-3">
                    <input className="form-control form-control-lg" type="text" name="login"
                    placeholder="Email" value={props.component.state.credentials.login} onChange={props.component.inputChanged}/>
                </div>
                <div className="mb-3">
                    <input className="form-control form-control-lg" type="password" name="password"
                    placeholder="Password" value={props.component.state.credentials.password} onChange={props.component.inputChanged}/>
                </div>
                <button type="button" id="btn-signin" className="btn btn-lg btn-primary btn-block mr-2 my-3" onClick={props.component.login}>Sign
                in</button>
            </form>
            <p>Not Registered? <span className="underlined text-primary pointer" id="link-signup" onClick={props.component.handleClick}>Create an Account Here</span></p>
                        
            </>
        )
    }
    else if(props.component.state.form === "signup"){
        let prop = props.component.state
        return(
            <>
            <form id="form-admin" method="POST">
                <div id="admin-login-alert-box"></div>
                <div className="mb-3">
                    <input className={prop.first_name.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}  type="text" name="first_name" id="first_name"
                    placeholder="First Name" value={prop.first_name.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.first_name.message}
                    </div>
                </div>
                <div className="mb-3">
                    <input className={prop.last_name.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"} type="text" name="last_name" id="last_name"
                    placeholder="Last Name" value={prop.last_name.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.last_name.message}
                    </div>
                </div>
                <div className="mb-3">
                    <input className={prop.email.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"} type="email" name="email" id="email"
                    placeholder="Email" value={prop.email.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.email.message}
                    </div>
                </div>
                <div className="mb-3">
                    <input className={prop.username.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"} type="text" name="username" id="username"
                    placeholder="Username" value={prop.username.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.username.message}
                    </div>
                </div>
                <div className="mb-3">
                    <input className={prop.password1.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"} type="password" name="password1" id="password1"
                    placeholder="Password" value={prop.password1.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.password1.message}
                    </div>
                </div>
                <div className="mb-3">
                    <input className={prop.password2.valid ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"} type="password" name="password2" id="password2"
                    placeholder="Re-enter Password" value={prop.password2.value} onChange={props.component.changeHandler}/>
                    <div className="invalid-feedback text-left">
                        {prop.password2.message}
                    </div>
                </div>
                <button type="button" id="btn-signin" className="btn btn-lg btn-primary btn-block mr-2 my-3" onClick={props.component.register}>Sign
                up</button>
            </form>
            <p>Already Registered? <span className="underlined text-primary pointer" id="link-signup" onClick={props.component.handleClick}>Click Here to Login</span></p>
               
            </>
        )
    }
    
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

class Login extends Component {

    state = {
        form: "login",
        first_name: {
            value: "",
            valid: true,
            message: ""
        },
        last_name: {
            value: "",
            valid: true,
            message: ''
        },
        email: {
            value: "",
            valid: true,
            message: ''
        },
        username: {
            value: "",
            valid: true,
            message: ''
        },
        password1: {
            value: "",
            valid: true,
            message: ''
        },
        password2: {
            value: "",
            valid: true,
            message: ''
        },
        credentials: {login: '', password:''}
    }

    login = event =>{
        //console.log(this.state.credentials)
        let form_data = new FormData();
        let data = this.state.credentials
        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        fetch('http://127.0.0.1:8000/login/', {
            method: "POST",
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: form_data,

        }).then(data=>data.json()).then(data=>{
            if(data.code == 200){
                window.location.replace("./dashboard")
            }
            else if(data.code == 403){
                document.getElementById("admin-login-alert-box").innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Invalid Username/Password Please Try Again...
                </div>
                `
            }
            
        }).catch(error =>console.error(error))
    }

    register = event =>{
        let form_data = new FormData();
        let prop = this
        console.log(this.state)
        {Object.entries(this.state).map(([key, value]) => (

            form_data.append(key, value['value'])
        ))}
        //console.log(this.state.credentials)
        fetch('http://127.0.0.1:8000/register/', {
            method: "POST",
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: form_data,

        }).then(data=>data.json()).then(data=>{
            if(data['data']['code'] == 200)
                window.location.replace("./dashboard")
            else{
                let keys = Object.keys(data['data'])
                keys.forEach((field)=>{
                    const acc = prop.state
                    acc[field]['valid'] = false
                    acc[field]['message'] = data['data'][field][0]['message']
                    prop.setState({[field]: acc[field]})
                    // console.log(prop.state.account.first_name)
                    //renderErrors(field, data['data'][field][0]['message'])
                })
            }
        }).catch(error =>console.error(error))
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
      };

    inputChanged = event =>{
        const cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({credentials: cred})
    }

    inputAccChanged = event =>{
        const cred = this.state.account
        cred[event.target.name]['value'] = event.target.value
        this.setState({credentials: cred})
    }

    handleClick = ()=>{
        if(this.state.form === "login"){
            this.setState({form: "signup"})
        }
        else if(this.state.form === "signup"){
            this.setState({form: "login"})
        }
    }
    


    render(){
    return (
        <div className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                    <div className="d-table-cell align-middle">
                    <div className="text-center mt-4">
                        <h1 className="h2">Sample Login-Registration System</h1>
                        <p className="lead">
                        Developed by: Ezekiel Reginio
                        </p>
                    </div>

                    <div className="card">
                        <div className="card-body" id="card-body">
                        <div className="m-sm-4" id="card-form">
                            <RenderForm component={this} />
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;
