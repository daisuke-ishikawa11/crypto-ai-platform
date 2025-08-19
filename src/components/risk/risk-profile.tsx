'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RiskProfile as RiskProfileType } from '@/lib/risk/types';
import { Shield, Settings } from 'lucide-react';

export function RiskProfile() {
  const [profile, setProfile] = React.useState<RiskProfileType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/risk/analysis?type=profile');
      const data = await response.json();
      setProfile(data.data);
    } catch (error) {
      console.error('Failed to fetch risk profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const defaultProfile: RiskProfileType = {
    user_id: '',
    risk_tolerance: 'moderate',
    max_portfolio_risk: 60,
    max_position_size: 25,
    stop_loss_percentage: 10,
    take_profit_percentage: 30,
    preferred_assets: [],
    excluded_assets: [],
    created_at: new Date(),
    updated_at: new Date()
  };

  const currentProfile = profile || defaultProfile;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Risk Profile
              </CardTitle>
              <CardDescription>
                Customize your risk parameters and trading preferences
              </CardDescription>
            </div>
            <Button
              variant={editing ? 'default' : 'outline'}
              onClick={() => setEditing(!editing)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {editing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Risk Tolerance</Label>
                <div className="mt-2">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProfile.risk_tolerance === 'conservative' 
                        ? 'bg-green-100 text-green-800'
                        : currentProfile.risk_tolerance === 'moderate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {currentProfile.risk_tolerance.charAt(0).toUpperCase() + currentProfile.risk_tolerance.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Maximum Portfolio Risk</Label>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{currentProfile.max_portfolio_risk}%</span>
                  <p className="text-sm text-muted-foreground">
                    Maximum acceptable risk score for your portfolio
                  </p>
                </div>
              </div>

              <div>
                <Label>Maximum Position Size</Label>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{currentProfile.max_position_size}%</span>
                  <p className="text-sm text-muted-foreground">
                    Maximum allocation per asset
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Default Stop Loss</Label>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-red-600">-{currentProfile.stop_loss_percentage}%</span>
                  <p className="text-sm text-muted-foreground">
                    Automatic stop loss for new positions
                  </p>
                </div>
              </div>

              <div>
                <Label>Default Take Profit</Label>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-green-600">+{currentProfile.take_profit_percentage}%</span>
                  <p className="text-sm text-muted-foreground">
                    Target profit for new positions
                  </p>
                </div>
              </div>

              <div>
                <Label>Profile Status</Label>
                <div className="mt-2">
                  <span className="text-sm text-green-600 font-medium">Active</span>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(currentProfile.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Management Guidelines</CardTitle>
          <CardDescription>
            Best practices based on your risk profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span className="text-sm">
                Never risk more than {currentProfile.max_position_size}% of your portfolio on a single trade
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span className="text-sm">
                Always set stop losses to limit downside to {currentProfile.stop_loss_percentage}%
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span className="text-sm">
                Monitor portfolio risk score and keep it below {currentProfile.max_portfolio_risk}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span className="text-sm">
                Diversify across multiple uncorrelated assets to reduce overall risk
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 
