import React from 'react'

const AdditionalFeatures = () => {
  return (
    <form id="additional-features-container">
      <p>Select everything you want to be sent</p>

      <div className="additional-features">
        <input type="checkbox" id="weather-checkbox" />
        <label >Do you want to be sent the weather?</label>
      </div>

      <div className="additional-features" id="email-features-container">
        <input type="checkbox" id="email-checkbox" />
        <label>Email?</label>
        <input type="text" placeholder="personal email" />
        <input type="text" placeholder="name priority senders" />
      </div>

      <div className="additional-features">
        <input type="checkbox" id="eta-checkbox" />
        <label>Eta to Destination? </label>
        <input type="text" placeholder="Start" />
        <input type="text" placeholder="Destination" />
        <div>
          <fieldset>
            <legend>Mode of Transportation (default drive)</legend>
            <label> <input type="radio" name="type-transportation" value="1" checked />Drive </label>
            <label> <input type="radio" name="type-transportation" value="2" />Public Transport </label>
            <label> <input type="radio" name="type-transportation" value="3" />Walk </label>
            <label> <input type="radio" name="type-transportation" value="4" />Bike </label>
          </fieldset>
        </div>
      </div>

      <div className="additional-features">
        <p>Enter phone number and time you would like to receive text (default 8:30 am)</p>
        <input type="text" placeholder="phone number" />
        <input type="text" placeholder="time" />
        <button>Save</button>
      </div>
    </form>
  )
}

export default AdditionalFeatures