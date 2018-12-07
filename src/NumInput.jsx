import React from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends React.Component {

    constructor(props) {
        super(props);
        this.state  = { value : this.format(props.value) };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log("In componentwillReceive props settting state => ", this.state.value);
        this.setState({ value : this.format(newProps.value)});
        
    }

    onBlur(e){
            //    console.log("In onBlur state => ", this.state.value);

        this.props.onChange(e,this.unformat(this.state.value));
        
    }

    onChange(e){
    //    console.log("In child onChange() event value state => ", e.target.value);    
    //    console.log("In child onChange()  state value => ", this.state.value);        

        // if(e.target.value.match(/^\d*$/)){
        if(e.target.value.match(/^[0-9.]*$/)){
            // console.log("acceptedddddddddddddddddd")
            this.setState({value : e.target.value});
          //  console.log("In child onChange() setting state.value => ", this.state.value); 
        }
    }

    format(num){
    //    console.log("In format() num => string ", num);        
        return (num !=null && num != '') ? num.toString() : '';
    }

    unformat(str){
      //  console.log("In unformat() string => num ", str);        
        
        const val = parseFloat(str);
        // console.log("In unformat() string => num ", val);        

        return isNaN(val) ? null : val;
    }

    render(){
        return(
            <input
                type="text" maxLength="6" {...this.props} value={this.state.value}
                onBlur={this.onBlur} onChange={this.onChange}
            />
            );
    }
}

NumInput.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    };