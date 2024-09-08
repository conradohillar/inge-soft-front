import React, { createContext, useState, useContext } from 'react';

// Define the initial state for the ride context
const initialState = {
  cityFrom: '',
  cityTo: '',
  priceDetails: {},
  rideDate: '',
  startTime: { minimum: '', maximum: '' },
  availableSpacePeople: 0,
  availableSpaceSmallPackage: 0,
  availableSpaceMediumPackage: 0,
  availableSpaceLargePackage: 0,
  selectedCar: '',
};

// Create the context
const RideContext = createContext(initialState);

// Provider component to wrap your app
export const RideProvider = ({ children }) => {
  const [rideDetails, setRideDetails] = useState(initialState);

  // Function to update the ride details
  const updateRideDetails = (newDetails) => {
    setRideDetails((prevDetails) => ({
      ...prevDetails,
      ...newDetails,
    }));
  };

  return (
    <RideContext.Provider value={{ rideDetails, updateRideDetails }}>
      {children}
    </RideContext.Provider>
  );
};

// Custom hook to access the context
export const useRideContext = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRideContext must be used within a RideProvider');
  }
  return context;
};