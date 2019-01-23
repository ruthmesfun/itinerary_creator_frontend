import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id,
      title: '',
      start: '',
      end: '',
      city: '',
      state: '',
      budget: '1'
    }
  }

  handleChange = event => {
    const key =  event.target.name
    if(key === 'budget'){
      this.setState({ [key]: parseInt(event.target.value)})
    }else{
      this.setState({ [key]: event.target.value})
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/itineraries', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        city: this.state.city,
        state: this.state.state,
        budget: this.state.budget
      })
    })
    .then(r => r.json())
    .then(r => this.props.updateCurrentItinerary(r))
  }

  render() {
    return (
      <div>
      {this.props.getIteneraryId() ? <Redirect to="/itinerary" /> :
      <div>
        <h1> Generate New Itinerary </h1>
        <form onSubmit = {this.handleSubmit}>
          <div>
            <label>Title of itinerary</label>
            <div>
              <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
            </div>
          </div>
          <div>
          <label>Start Date</label>
          <div>
            <input type='date' name='start' value={this.state.start} onChange={this.handleChange}/>
          </div>
        </div>
        <div>
        <label>End Date</label>
          <div>
            <input type='date' name='end' value={this.state.end} onChange={this.handleChange}/>
          </div>
        </div>
        <div>
        <label>City</label>
          <input type='text' name='city' value={this.state.city} onChange={this.handleChange}/>
          <label>State</label>
          <input type='text' name='state' value={this.state.state} onChange={this.handleChange}/>
        </div>

        <div>
           <label>What is this itinerary for? </label>
            <div>
              <input
                    type='radio'
                    name='budget'
                    value='1'
                    checked={this.state.budget === 1}
                    onChange={this.handleChange}/> Tinder Date
        </div>
            <div>
              <input
                      type='radio'
                      name='budget'
                      value='2'
                      checked={this.state.budget === 2}
                      onChange={this.handleChange}/> Want to impress your date
            </div>
            <div>
              <input
                type='radio'
                name='budget'
                value='3'
                checked={this.state.budget === 3}
                onChange={this.handleChange}/> Friends or Family came to visit
            </div>
            <div>
              <input
                type='radio'
                name='budget'
                value='4'
                checked={this.state.budget === 4}
                onChange={this.handleChange}/> Ballin!
            </div>
          </div>
          <button type= 'submit' value='submit'> Submit</button>

        </form>
      </div>}
      </div>
    )
  }
}

export default Quiz
