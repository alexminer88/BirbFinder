import React from 'react';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  submitForm() {
    this.props.updateAddress(this.state.address);
  }

  render() {
    return (
      <div className="address-form">
        <label htmlFor="">Address</label>
        <input type="text" id="address" onChange={this.handleChange}/>
        <button onClick={this.submitForm}>Search Birbs</button>
      </div>
    )
  }

}

export default AddressForm;