import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import './sign-in.styles.scss';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password} = this.state;

        try {
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({
                    email: '',
                    password: ''
                })
        } catch (error) {
            console.log(error);
        }
    } 

    handleChange =e => {
        const {  value, name} = e.target;
        this.setState({ [name]: value});
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I have already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' label='email' handleChange={this.handleChange} value={this.state.email} required/>
                    
                    <FormInput name='password' label='password' type='password' handleChange={this.handleChange} value={this.state.password} required/>
                    

                   <div className='buttons'>
                    <CustomButton type='submit' >Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                   </div>
                   
                </form>
            </div>
        );
    }
}