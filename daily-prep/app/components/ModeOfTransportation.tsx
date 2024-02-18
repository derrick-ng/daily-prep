"use client";
import React, { useState } from "react";

const ModeOfTransportation = () => {
  return (
    <div>
      <fieldset>
        <legend>Mode of Transportation (default drive)</legend>
        <label>
          <input type="radio" name="type-transportation" value="1" checked />
          Drive
        </label>
        <label>
          <input type="radio" name="type-transportation" value="2" />
          Public Transport
        </label>
        <label>
          <input type="radio" name="type-transportation" value="3" />
          Walk
        </label>
        <label>
          <input type="radio" name="type-transportation" value="4" />
          Bike
        </label>
      </fieldset>
    </div>
  );
};

export default ModeOfTransportation;
