
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  DollarSign, 
  MapPin, 
  Clock, 
  Star, 
  User, 
  LogOut, 
  Navigation,
  Phone,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import MapComponent from './MapComponent';

interface DriverDashboardProps {
  onLogout: () => void;
}

const DriverDashboard = ({ onLogout }: DriverDashboardProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'earnings' | 'profile'>('home');
  const [incomingRide, setIncomingRide] = useState<any>(null);
  const [currentRide, setCurrentRide] = useState<any>(null);

  // Simulate incoming ride request
  React.useEffect(() => {
    if (isOnline && !incomingRide && !currentRide) {
      const timer = setTimeout(() => {
        setIncomingRide({
          id: 1,
          rider: "Sarah Johnson",
          pickup: "123 Main Street",
          destination: "Downtown Mall",
          distance: "2.3 miles",
          duration: "8 minutes",
          fare: "$12.50",
          rating: 4.9
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, incomingRide, currentRide]);

  const handleAcceptRide = () => {
    setCurrentRide(incomingRide);
    setIncomingRide(null);
  };

  const handleDeclineRide = () => {
    setIncomingRide(null);
  };

  const handleCompleteRide = () => {
    setCurrentRide(null);
  };

  const todayEarnings = {
    total: 156.75,
    trips: 8,
    hours: 6.5,
    rating: 4.8
  };

  const recentTrips = [
    { id: 1, from: "Airport", to: "Downtown", fare: 25.00, time: "2:30 PM", rating: 5 },
    { id: 2, from: "Mall", to: "Suburbs", fare: 18.50, time: "1:45 PM", rating: 4 },
    { id: 3, from: "Office", to: "Restaurant", fare: 12.25, time: "12:15 PM", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <Car className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Driver Dashboard</p>
                <p className="text-xs text-gray-500">Mike Wilson</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOnline(!isOnline)}
                  className="p-0"
                >
                  {isOnline ? (
                    <ToggleRight className="h-6 w-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </Button>
              </div>
              <Button variant="ghost" onClick={onLogout} className="text-gray-500">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Incoming Ride Request Modal */}
      {incomingRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-green-600">New Ride Request!</CardTitle>
              <CardDescription>Accept this ride?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="font-medium">{incomingRide.rider}</p>
                  <div className="flex items-center justify-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{incomingRide.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">{incomingRide.pickup}</span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm">{incomingRide.destination}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{incomingRide.fare}</p>
                    <p className="text-xs text-gray-500">Estimated fare</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{incomingRide.distance}</p>
                    <p className="text-xs text-gray-500">Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{incomingRide.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleDeclineRide}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleAcceptRide}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={isOnline ? 'text-green-900' : 'text-gray-900'}>
                      Driver Status
                    </CardTitle>
                    <CardDescription>
                      {isOnline ? 'You are online and ready to receive rides' : 'Go online to start receiving ride requests'}
                    </CardDescription>
                  </div>
                  <Badge variant={isOnline ? 'default' : 'secondary'} className={isOnline ? 'bg-green-600' : ''}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </CardHeader>
              {currentRide && (
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-medium">Current Ride</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Pickup: {currentRide.pickup}</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm">Destination: {currentRide.destination}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Rider
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={handleCompleteRide}
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Today's Earnings */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Earnings</CardTitle>
                <CardDescription>Your performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">${todayEarnings.total}</p>
                    <p className="text-sm text-gray-500">Total Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{todayEarnings.trips}</p>
                    <p className="text-sm text-gray-500">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{todayEarnings.hours}h</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold ml-1">{todayEarnings.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Live Map</CardTitle>
                <CardDescription>
                  {currentRide ? "Navigate to your destination" : "Your current location"}
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
                    <Car className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  <Button 
                    variant={activeTab === 'earnings' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('earnings')}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Earnings
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

            {/* Recent Trips */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Your latest completed rides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{trip.from} → {trip.to}</p>
                          <p className="text-xs text-gray-500">{trip.time}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < trip.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="font-bold text-green-600">${trip.fare}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Info</CardTitle>
                <CardDescription>Your registered vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Make/Model</span>
                    <span className="text-sm font-medium">Toyota Camry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">License Plate</span>
                    <span className="text-sm font-medium">ABC-123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="text-sm font-medium">2022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Color</span>
                    <span className="text-sm font-medium">Silver</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
