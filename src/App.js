import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-out.component";
import  {auth, createProfileUserDocument} from './firebase/firebase.utils'
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentUser: null
    //     }
    // }
    unSubscribeFromAuth = null; 
    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            
            if(userAuth) {
                const userRef = await createProfileUserDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                      
                            id: snapshot.id,
                            ...snapshot.data()
                       
                    })
                   
                }) 
               
            } else {
                setCurrentUser(userAuth)
            }
            // this.setState({currentUser: user});
            // console.log(user)
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }

    render() {
        return (
            <div >
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage}></Route>
                    <Route path='/shop' component={ShopPage}></Route>
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>): <SignInAndSignUp></SignInAndSignUp>} ></Route>
                   
                </Switch>
      
                {/* <HomePage /> */}
            </div>
        );
    }
 
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser 
})
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
