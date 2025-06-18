
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Car, 
  DollarSign, 
  MapPin, 
  Clock, 
  Star, 
  LogOut, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'rides' | 'disputes' | 'analytics'>('overview');

  const stats = {
    totalRiders: 1250,
    totalDrivers: 340,
    activeRides: 45,
    totalRevenue: 15750.50,
    averageRating: 4.8,
    completedRides: 5680
  };

  const pendingDrivers = [
    { id: 1, name: "John Smith", email: "john@email.com", phone: "+1234567890", status: "pending", appliedDate: "2023-12-15" },
    { id: 2, name: "Sarah Davis", email: "sarah@email.com", phone: "+1234567891", status: "pending", appliedDate: "2023-12-14" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", phone: "+1234567892", status: "pending", appliedDate: "2023-12-13" },
  ];

  const activeRides = [
    { id: 1, rider: "Alice Brown", driver: "Bob Wilson", from: "Airport", to: "Downtown", status: "in-progress", fare: "$25.00" },
    { id: 2, rider: "Charlie Green", driver: "Diana Lee", from: "Mall", to: "Suburbs", status: "in-progress", fare: "$18.50" },
    { id: 3, rider: "Emma White", driver: "Frank Black", from: "Office", to: "Home", status: "in-progress", fare: "$12.75" },
  ];

  const disputes = [
    { id: 1, rideId: "#R123", rider: "Tom Brown", driver: "Lisa Wilson", issue: "Fare dispute", priority: "high", date: "2023-12-15" },
    { id: 2, rideId: "#R124", rider: "Jane Doe", driver: "Mark Davis", issue: "Route complaint", priority: "medium", date: "2023-12-14" },
    { id: 3, rideId: "#R125", rider: "Alex Johnson", driver: "Kate Smith", issue: "Late pickup", priority: "low", date: "2023-12-13" },
  ];

  const handleApproveDriver = (driverId: number) => {
    console.log(`Approving driver ${driverId}`);
  };

  const handleRejectDriver = (driverId: number) => {
    console.log(`Rejecting driver ${driverId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin Dashboard</p>
                <p className="text-xs text-gray-500">Administrator Portal</p>
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
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button 
                    variant={activeTab === 'overview' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('overview')}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === 'drivers' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('drivers')}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Driver Management
                  </Button>
                  <Button 
                    variant={activeTab === 'rides' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('rides')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Active Rides
                  </Button>
                  <Button 
                    variant={activeTab === 'disputes' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('disputes')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Disputes
                  </Button>
                  <Button 
                    variant={activeTab === 'analytics' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Stats */}
            {activeTab === 'overview' && (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Riders</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalRiders.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalDrivers}</div>
                      <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeRides}</div>
                      <p className="text-xs text-muted-foreground">Currently in progress</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.averageRating}</div>
                      <p className="text-xs text-muted-foreground">Platform average</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.completedRides.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">All time total</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Driver Management */}
            {activeTab === 'drivers' && (
              <Card>
                <CardHeader>
                  <CardTitle>Pending Driver Applications</CardTitle>
                  <CardDescription>Review and approve new driver registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{driver.name}</h3>
                          <p className="text-sm text-gray-500">{driver.email}</p>
                          <p className="text-sm text-gray-500">{driver.phone}</p>
                          <p className="text-xs text-gray-400">Applied: {driver.appliedDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Pending</Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectDriver(driver.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApproveDriver(driver.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Rides */}
            {activeTab === 'rides' && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Rides</CardTitle>
                  <CardDescription>Monitor ongoing rides in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeRides.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">{ride.rider} → {ride.driver}</h3>
                              <p className="text-sm text-gray-500">{ride.from} → {ride.to}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{ride.fare}</span>
                          <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disputes */}
            {activeTab === 'disputes' && (
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Resolution</CardTitle>
                  <CardDescription>Handle customer and driver disputes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {disputes.map((dispute) => (
                      <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{dispute.issue}</h3>
                          <p className="text-sm text-gray-500">
                            Ride {dispute.rideId}: {dispute.rider} vs {dispute.driver}
                          </p>
                          <p className="text-xs text-gray-400">Date: {dispute.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={dispute.priority === 'high' ? 'destructive' : 
                                   dispute.priority === 'medium' ? 'default' : 'secondary'}
                          >
                            {dispute.priority}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Analytics</CardTitle>
                    <CardDescription>Key performance metrics and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Revenue Growth</h4>
                          <p className="text-2xl font-bold text-green-600">+23%</p>
                          <p className="text-sm text-gray-500">vs last month</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">User Acquisition</h4>
                          <p className="text-2xl font-bold text-blue-600">+156</p>
                          <p className="text-sm text-gray-500">new users this week</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Driver Utilization</h4>
                          <p className="text-2xl font-bold text-purple-600">78%</p>
                          <p className="text-sm text-gray-500">average active rate</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Customer Satisfaction</h4>
                          <p className="text-2xl font-bold text-yellow-600">4.8/5</p>
                          <p className="text-sm text-gray-500">average rating</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
