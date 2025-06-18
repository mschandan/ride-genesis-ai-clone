
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  Car, 
  Users,
  Zap,
  Star
} from "lucide-react";
import MapComponent from './MapComponent';

interface RideBookingProps {
  onBack: () => void;
  onRideBooked: (ride: any) => void;
}

const RideBooking = ({ onBack, onRideBooked }: RideBookingProps) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRideType, setSelectedRideType] = useState<string>('standard');
  const [showEstimate, setShowEstimate] = useState(false);

  const rideTypes = [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Affordable rides',
      icon: Car,
      price: '$8.50',
      time: '3 min',
      capacity: '4 seats'
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Reliable everyday rides',
      icon: Car,
      price: '$12.50',
      time: '2 min',
      capacity: '4 seats'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'High-end vehicles',
      icon: Star,
      price: '$18.75',
      time: '4 min',
      capacity: '4 seats'
    },
    {
      id: 'xl',
      name: 'XL',
      description: 'Extra space for groups',
      icon: Users,
      price: '$22.00',
      time: '5 min',
      capacity: '6 seats'
    }
  ];

  const handleGetEstimate = () => {
    if (pickup && destination) {
      setShowEstimate(true);
    }
  };

  const handleBookRide = () => {
    const selectedType = rideTypes.find(type => type.id === selectedRideType);
    const ride = {
      id: Date.now(),
      pickup,
      destination,
      rideType: selectedType,
      estimatedArrival: '3 minutes',
      fare: selectedType?.price
    };
    onRideBooked(ride);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Book a Ride</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Booking Form */}
          <div className="space-y-6">
            {/* Location Input */}
            <Card>
              <CardHeader>
                <CardTitle>Where to?</CardTitle>
                <CardDescription>Enter your pickup and destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 h-4 w-4 text-red-600" />
                    <Input
                      id="destination"
                      placeholder="Enter destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetEstimate}
                  disabled={!pickup || !destination}
                  className="w-full"
                >
                  Get Price Estimate
                </Button>
              </CardContent>
            </Card>

            {/* Ride Options */}
            {showEstimate && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose your ride</CardTitle>
                  <CardDescription>Select the best option for your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rideTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedRideType === type.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedRideType(type.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-full">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{type.name}</h3>
                                <p className="text-sm text-gray-500">{type.description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {type.time}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    <Users className="h-3 w-3 mr-1" />
                                    {type.capacity}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{type.price}</p>
                              <p className="text-sm text-gray-500">Estimated</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button 
                    onClick={handleBookRide}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Book {rideTypes.find(t => t.id === selectedRideType)?.name} Ride
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Trip Details */}
            {showEstimate && (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">3.2 miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time</span>
                      <span className="font-medium">12 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare</span>
                      <span className="font-medium">$3.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance Fee</span>
                      <span className="font-medium">$6.40</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Fee</span>
                      <span className="font-medium">$2.40</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total Estimate</span>
                        <span className="text-green-600">
                          {rideTypes.find(t => t.id === selectedRideType)?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Route Preview</CardTitle>
                <CardDescription>Your trip route and nearby drivers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapComponent />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>How would you like to pay?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">Credit Card</p>
                        <p className="text-xs text-gray-500">•••• 4242</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full text-sm">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideBooking;
