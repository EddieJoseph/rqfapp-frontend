import React from 'react';
import {connect} from 'react-redux';


const LoadingAnimation = (props) =>{
//console.log(props)
const message = props.text!==undefined?props.text:"Loading..."
return(
    //preloader-circle
    <div >
        <div className="preloader-background">
            <div>
                <div className="preloader-circle">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>

                <div className="spinner-layer spinner-red">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>

                <div className="spinner-layer spinner-yellow">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>

                <div className="spinner-layer spinner-green">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            </div>
            <div className=".preloader-text">
            <p className="blinking ">{message}</p>
            </div>
            </div>
        </div>
    </div>
)
}


function mapStateToProps (state) {
    return {
        user: state.userData.user
    }
}

export default connect(mapStateToProps)(LoadingAnimation)

