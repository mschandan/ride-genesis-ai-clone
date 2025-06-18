
import React from 'react';
import { MapPin, Navigation, Car } from 'lucide-react';

const MapComponent = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
      {/* Simulated map background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
            linear-gradient(#e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Map overlay with controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <MapPin className="h-12 w-12 mx-auto mb-2 text-blue-600" />
          <p className="text-sm font-medium">Interactive Map</p>
          <p className="text-xs">Real-time location tracking</p>
        </div>
      </div>
      
      {/* Simulated markers */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
          <Car className="h-4 w-4 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full">
          <MapPin className="h-4 w-4 text-white" />
        </div>
      </div>
      
      <div className="absolute top-8 right-12">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <Navigation className="h-4 w-4 text-white" />
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-1">
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-xs font-bold">
          +
        </button>
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-xs font-bold">
          −
        </button>
      </div>
      
      {/* Location indicator */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg px-2 py-1 shadow-md">
        <p className="text-xs text-gray-600">Live Location</p>
      </div>
    </div>
  );
};

export default MapComponent;
