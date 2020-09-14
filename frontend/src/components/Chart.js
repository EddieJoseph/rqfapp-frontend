import React, {Component} from 'react';
//import JqxChart, { IChartProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxchart';

class Chart extends Component{
    getPlot( nr, max, type,name){
        let percent = nr/max*100;
        if(max===0){
            percent=0;
        }
        //console.log(max)
        if(type===null){
            return (
                <div key={name}>
                <p>{name}</p>
                <div className="row">
                    <div className="col c1" style={{width:percent+"%"}}></div>
                </div>
                </div>
            )
        }
        if(type===true){
            return (
                <div key={name}>
                <p>{name}</p>  
                <div className="row">
                    <div className="col cp" style={{width:percent+"%"}}></div>
                </div>
                </div>
            )
        }
        if(type===false){
            return (
                <div key={name}>
                <p>{name}</p>
                    <div className="row">
                        <div className="col cn" style={{width:percent+"%"}}></div>
                    </div>
                    </div>
            )
        }
    }





    render(){
        
        const {structure}=this.props;
        const {commentnumbers}=this.props;
        const {checkboxValues}=this.props;
        let bars=[]
        let max=0;
        for(let c=0;c<commentnumbers.length;c++){
            max=max+commentnumbers[c]
        }
        //console.log("structure",structure)
        //console.log("commentnumbers",commentnumbers)
        //console.log("checkboxValues",checkboxValues)
        for(let c=0;c<structure.length;c++){
            //console.log(structure[c].name)
            //<div kex={c}>
            bars.push(
                
                    this.getPlot(commentnumbers[c],max,checkboxValues[c],structure[c].name) 
                
            )
            //</div>
        }
        //console.log(bars)
        

        //{this.getPlot(Math.floor(Math.random() * 10),10,0,"Programmplanung")}
                
       // {this.getPlot(Math.floor(Math.random() * 10),10,0,"TNB")}
        
        //{this.getPlot(Math.floor(Math.random() * 10),10,1,"Wanderplanung")}
        
       // {this.getPlot(Math.floor(Math.random() * 10),10,2,"Allgemein")}

        return(
            <div>
                <p style={{fontWeight:"bold"}}>{max} {max===1?"Beobachtung":"Beobachtungen"}</p>
            <div className="col s6 chart" >
                {bars}  
            </div></div>
        )
    }
}
export default Chart;