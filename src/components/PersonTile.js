import React, {Component} from 'react';
import Chart from './Chart';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
class _PersonTile extends Component{

    render(){
        const {person}=this.props
        const {structure}=this.props
        const checkboxValues = person.checkboxValues
        const commentnumbers = person.commentnumbers
        return (
            <div>
                <NavLink to={"/person/" + this.props.personId}>
                    <div className="col l4 m12 s12 container hoverable blacklink">
                        <div className="card" >
                            <div className="card-content">
                                <div className="row valign-wrapper bottom-align">
                                <div className="col card-title">{person.nickname}</div>
                                <div className="col"><p>{person.firstname+" "+person.lastname}</p></div>
                                <div className="col"><p>{person.organisation}</p></div>
                            </div>
                            <div className="row ">
                                <div className="col s6 center"><img className="responsive-img" src={person.image} alt=""></img></div>
                                <Chart checkboxValues={checkboxValues} commentnumbers={commentnumbers} structure={structure}/>    
                            </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
          user: state.userData.user,
          person: state.person.all.filter(p=>p.id===props.personId)[0],
          structure: state.checkbox.structure,
        }
}

const PersonTile = connect(mapStateToProps)(_PersonTile)

export default PersonTile