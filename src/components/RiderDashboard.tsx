
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Clock, CreditCard, History, User, LogOut, Star } from "lucide-react";
import MapComponent from './MapComponent';
import RideBooking from './RideBooking';

interface RiderDashboardProps {
  onLogout: () => void;
}

const RiderDashboard = ({ onLogout }: RiderDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'history' | 'profile'>('home');
  const [currentRide, setCurrentRide] = useState<any>(null);

  const recentRides = [
    { id: 1, from: "Home", to: "Downtown Office", date: "Today, 9:30 AM", fare: "$12.50", rating: 5 },
    { id: 2, from: "Mall", to: "Home", date: "Yesterday, 6:45 PM", fare: "$8.30", rating: 4 },
    { id: 3, from: "Airport", to: "Hotel", date: "Dec 15, 2:15 PM", fare: "$25.00", rating: 5 },
  ];

  if (activeTab === 'booking') {
    return (
      <RideBooking 
        onBack={() => setActiveTab('home')} 
        onRideBooked={(ride) => {
          setCurrentRide(ride);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Welcome back,</p>
                <p className="text-xs text-gray-500">John Doe</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-gray-500">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Ride or Quick Actions */}
            {currentRide ? (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">Current Ride</CardTitle>
                  <CardDescription>Driver is on the way</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Driver: Alex Johnson</p>
                        <p className="text-sm text-gray-600">Toyota Camry • ABC-123</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">4.9</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">$12.50</p>
                        <p className="text-sm text-gray-600">Estimated fare</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track Driver
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Call Driver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Where would you like to go?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Button 
                      className="h-20 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setActiveTab('booking')}
                    >
                      <div className="text-center">
                        <MapPin className="h-6 w-6 mx-auto mb-2" />
                        <span>Book a Ride</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-20">
                      <div className="text-center">
                        <Clock className="h-6 w-6 mx-auto mb-2" />
                        <span>Schedule Ride</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Live Map</CardTitle>
                <CardDescription>
                  {currentRide ? "Track your current ride" : "Available drivers near you"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapComponent />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Navigation */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button 
                    variant={activeTab === 'home' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('home')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('history')}
                  >
                    <History className="h-4 w-4 mr-2" />
                    Ride History
                  </Button>
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Recent Rides */}
            {activeTab === 'history' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Ride History</CardTitle>
                  <CardDescription>Your recent trips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRides.map((ride) => (
                      <div key={ride.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{ride.from} → {ride.to}</p>
                            <p className="text-xs text-gray-500">{ride.date}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < ride.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="font-bold text-green-600">{ride.fare}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rides</CardTitle>
                  <CardDescription>Quick access to recent destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentRides.slice(0, 3).map((ride) => (
                      <Button 
                        key={ride.id} 
                        variant="ghost" 
                        className="w-full justify-start h-auto p-3"
                      >
                        <div className="text-left">
                          <p className="font-medium text-sm">{ride.to}</p>
                          <p className="text-xs text-gray-500">{ride.from}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Manage payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">•••• 4242</p>
                        <p className="text-xs text-gray-500">Default</p>
                      </div>
                    </div>
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

export default RiderDashboard;
