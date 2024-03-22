import React, { useState } from 'react';
import './App.css'
import axios from 'axios'

function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState({
    companyName: '',
    industryType: 'manufacturing',
    location: 'USA',
    electricity: '',
    naturalGas: '',
    dieselPetrol: '',
    heatingOil: '',
    solidWaste: '',
    liquidWaste: '',
    hazardousWaste: '',
    vehicleFuelType: 'gasoline',
    mileagePerVehicle: '',
    numVehicles: '',
    totalMilesDriven: '',
    airMiles: '',
    railMiles: '',
    shipmentMethod: 'truck',
    avgShipmentWeight: '',
    avgShipmentDistance: '',
    carbonFootprint: 0
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateCarbonFootprint = async () => {
    const {
      electricity,
      naturalGas,
      heatingOil,
      solidWaste,
      liquidWaste,
      hazardousWaste,
      mileagePerVehicle,
      numVehicles,
      totalMilesDriven,
      airMiles,
      railMiles,
      shipmentMethod,
      avgShipmentWeight,
      avgShipmentDistance
    } = formData;

    // Calculate emissions from energy usage
    let energyEmissions = (electricity * 0.4) + (naturalGas * 0.2) + (heatingOil * 2.93);

    // Calculate emissions from vehicles
    let vehicleEmissions = 0;
    if (formData.vehicleFuelType === "gasoline") {
      vehicleEmissions = mileagePerVehicle * numVehicles * 0.4;
    } else if (formData.vehicleFuelType === "diesel") {
      vehicleEmissions = mileagePerVehicle * numVehicles * 0.5;
    } else if (formData.vehicleFuelType === "petrol") {
      vehicleEmissions = mileagePerVehicle * numVehicles * 0.45;
    }

    // Calculate emissions from total miles driven
    let totalMilesEmissions = totalMilesDriven * 0.4;

    // Calculate emissions from waste generation
    let wasteEmissions = (solidWaste * 0.6) + (liquidWaste * 0.5) + (hazardousWaste * 1.0);

    // Calculate emissions from air travel
    let airEmissions = airMiles * 0.4;

    // Calculate emissions from rail travel
    let railEmissions = railMiles * 0.4;

    // Calculate emissions from shipping
    let shippingEmissions = 0;
    if (shipmentMethod === "truck") {
      shippingEmissions = avgShipmentWeight * avgShipmentDistance * 0.001;
    } else if (shipmentMethod === "ocean") {
      shippingEmissions = avgShipmentWeight * avgShipmentDistance * 0.002;
    } else if (shipmentMethod === "rail") {
      shippingEmissions = avgShipmentWeight * avgShipmentDistance * 0.0015;
    }

    // Calculate total carbon footprint
    let carbonFootprint = energyEmissions + vehicleEmissions + totalMilesEmissions + wasteEmissions + airEmissions + railEmissions + shippingEmissions;

    setResult("Total Carbon Footprint: " + carbonFootprint.toFixed(2) + " kg CO2e");

    setFormData({
      ...formData,
      carbonFootprint: carbonFootprint.toFixed(2)
    });

    try {
      // Make an HTTP POST request to save the form data to the database
      const response = await axios.post('http://localhost:5000/api/saveFormData', formData);// Log the response from the server
      // Optionally, you can display a success message to the user
    } catch (error) {
      console.error('Error:', error.message); // Log any errors
    }
  };


  return (
    <div>
      <h2>Carbon Footprint Calculator</h2>

      <form>
        <fieldset>

          <label htmlFor="industryType">Industry Type: </label>
          <select id="industryType" name="industryType" onChange={handleChange}>
            <option value="manufacturing">Manufacturing</option>
            <option value="transportation">Transportation</option>
            <option value="retail">Retail</option>
            <option value="agriculture">Agriculture</option>
            <option value="hospitality">Hospitality</option>
            <option value="others">Others</option>
          </select><br />

          <label htmlFor="location">Location (Country/Region): </label>
          <select id="location" name="location" onChange={handleChange}>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
          </select><br />

          <legend>User Information</legend>
          <label htmlFor="userName">User Name: </label>
          <input type="text" id="userName" name="userName" onChange={handleChange} /><br />

          <label htmlFor="userEmail">User Email: </label>
          <input type="email" id="userEmail" name="userEmail" onChange={handleChange} /><br />

          <label htmlFor="userPhone">User Phone Number: </label>
          <input type="tel" id="userPhone" name="userPhone" onChange={handleChange} /><br />

          <label htmlFor="companyName">Company Name: </label>
          <input type="text" id="companyName" name="companyName" onChange={handleChange} /><br />

          <label htmlFor="companyWebsite">Company Website: </label>
          <input type="url" id="companyWebsite" name="companyWebsite" onChange={handleChange} /><br />
        </fieldset>

        <fieldset>
          <legend>Energy Usage</legend>
          <label for="electricity">Annual Electricity Usage (kWh): </label>
          <input type="number" id="electricity" name="electricity"  onChange={handleChange}/><br></br>

          <label for="naturalGas">Annual Natural Gas Usage (m<sup>3</sup>): </label>
          <input type="number" id="naturalGas" name="naturalGas" onChange={handleChange} /><br></br>

          <label for="dieselPetrol">Annual Diesel/Petrol Usage (liters): </label>
          <input type="number" id="dieselPetrol" name="dieselPetrol" onChange={handleChange}/><br></br>

          <label for="heatingOil">Annual Heating Oil Usage (liters): </label>
          <input type="number" id="heatingOil" name="heatingOil" onChange={handleChange}/><br></br>
        </fieldset>

        <fieldset>
          <legend>Waste Generation</legend>
          <label for="solidWaste">Annual Solid Waste Generation (kilograms): </label>
          <input type="number" id="solidWaste" name="solidWaste" onChange={handleChange}/><br></br>

          <label for="liquidWaste">Annual Liquid Waste Generation (liters): </label>
          <input type="number" id="liquidWaste" name="liquidWaste" onChange={handleChange}/><br></br>

          <label for="hazardousWaste">Annual Hazardous Waste Generation (kilograms): </label>
          <input type="number" id="hazardousWaste" name="hazardousWaste" onChange={handleChange}/><br></br>
        </fieldset>

        <fieldset>
          <legend>Vehicle Details</legend>
          <label for="vehicleFuelType">Fuel Type: </label>
          <select id="vehicleFuelType" name="vehicleFuelType" onChange={handleChange}>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
          </select><br></br>

          <label for="mileagePerVehicle">Average Mileage per Vehicle (miles): </label>
          <input type="number" id="mileagePerVehicle" name="mileagePerVehicle" onChange={handleChange}/><br></br>

          <label for="numVehicles">Number of Company Vehicles: </label>
          <input type="number" id="numVehicles" name="numVehicles" onChange={handleChange}/><br></br>

          <label for="totalMilesDriven">Total Miles Driven per Year: </label>
          <input type="number" id="totalMilesDriven" name="totalMilesDriven" onChange={handleChange}/><br></br>
        </fieldset>

        <fieldset>
          <legend>Travel</legend>
          <label for="airMiles">Total Air Travel Miles: </label>
          <input type="number" id="airMiles" name="airMiles" onChange={handleChange}/><br></br>

          <label for="railMiles">Total Rail Travel Miles: </label>
          <input type="number" id="railMiles" name="railMiles" onChange={handleChange}/><br></br>
        </fieldset>

        <fieldset>
          <legend>Shipping</legend>
          <label for="shipmentMethod">Shipping Method: </label>
          <select id="shipmentMethod" name="shipmentMethod" onChange={handleChange}>
            <option value="truck">Truck/Ground</option>
            <option value="ocean">Ocean/Water</option>
            <option value="rail">Rail</option>
          </select><br></br>

          <label for="avgShipmentWeight">Average Shipment Weight (kg): </label>
          <input type="number" id="avgShipmentWeight" name="avgShipmentWeight" onChange={handleChange}/><br></br>

          <label for="avgShipmentDistance">Average Shipment Distance (km): </label>
          <input type="number" id="avgShipmentDistance" name="avgShipmentDistance" onChange={handleChange}/><br></br>
        </fieldset>

        <button type="button" onClick={calculateCarbonFootprint}>Calculate Carbon Footprint</button>
      </form>
      <p id="result">{result}</p>
    </div>
  );
}

export default CarbonFootprintCalculator;
