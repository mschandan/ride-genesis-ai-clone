
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Clock, Shield, Users, Star } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import RiderDashboard from "@/components/RiderDashboard";
import DriverDashboard from "@/components/DriverDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'rider' | 'driver' | 'admin'>('landing');
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'rider' | 'driver'>('rider');

  const handleAuth = (type: 'login' | 'signup', user: 'rider' | 'driver') => {
    setAuthType(type);
    setUserType(user);
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setCurrentView(userType);
  };

  if (currentView === 'rider') {
    return <RiderDashboard onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'driver') {
    return <DriverDashboard onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onLogout={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">RideShare</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('admin')}
                className="text-gray-600 hover:text-gray-900"
              >
                Admin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleAuth('login', 'rider')}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => handleAuth('signup', 'rider')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your ride, 
            <span className="text-blue-600"> on demand</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a ride in minutes, or drive and earn money on your schedule. 
            Safe, reliable, and affordable transportation for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
              onClick={() => handleAuth('signup', 'rider')}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Book a Ride
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => handleAuth('signup', 'driver')}
            >
              <Car className="mr-2 h-5 w-5" />
              Drive & Earn
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose RideShare?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get a ride in under 5 minutes with our network of verified drivers
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All drivers are background checked and rides are tracked in real-time
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Top Rated</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rated 4.9/5 by millions of satisfied riders and drivers
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of riders and drivers on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => handleAuth('signup', 'rider')}
            >
              <Users className="mr-2 h-5 w-5" />
              Become a Rider
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => handleAuth('signup', 'driver')}
            >
              <Car className="mr-2 h-5 w-5" />
              Become a Driver
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          type={authType}
          userType={userType}
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Index;
