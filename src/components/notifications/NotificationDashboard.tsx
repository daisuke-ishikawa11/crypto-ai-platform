/**
 * 🎛️ Notification Management Dashboard
 * Comprehensive notification system management interface
 */

'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bell, 
  Send, 
  Users, 
  TrendingUp, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  MessageSquare,
  Mail,
  Smartphone,
  Webhook,
  Slack,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { NotificationAnalytics } from './analytics/NotificationAnalytics'
import { NotificationTemplates } from './templates/NotificationTemplates'
import { NotificationCampaigns } from './campaigns/NotificationCampaigns'
import { NotificationSettings } from './settings/NotificationSettings'
import { RealtimeMetrics } from './metrics/RealtimeMetrics'
import { NotificationChannel, NotificationStatus, NotificationType } from '@/lib/notifications/types'

interface DashboardStats {
  totalNotifications: number
  sentToday: number
  deliveryRate: number
  openRate: number
  failedCount: number
  queuedCount: number
  activeTemplates: number
  activeCampaigns: number
}

interface RecentNotification {
  id: string
  type: NotificationType
  channel: NotificationChannel
  recipient: string
  status: NotificationStatus
  sentAt: Date
  title: string
}

export function NotificationDashboard() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null)
  const [recentNotifications, setRecentNotifications] = React.useState<RecentNotification[]>([])
  const [activeTab, setActiveTab] = React.useState('overview')
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)

  React.useEffect(() => {
    loadDashboardData()
    
    // Set up real-time updates
    const interval = setInterval(loadDashboardData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setRefreshing(true)
      
      // Load dashboard statistics
      const statsResponse = await fetch('/api/notifications/dashboard/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.stats)
      }

      // Load recent notifications
      const recentResponse = await fetch('/api/notifications/dashboard/recent?limit=10')
      if (recentResponse.ok) {
        const recentData = await recentResponse.json()
        setRecentNotifications(recentData.notifications)
      }

    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    loadDashboardData()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-8 w-8 text-blue-600" />
            Notification Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor your notification system
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Real-time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Notifications"
              value={stats?.totalNotifications || 0}
              icon={Bell}
              trend="+12% from last week"
              trendUp={true}
            />
            <StatCard
              title="Sent Today"
              value={stats?.sentToday || 0}
              icon={Send}
              trend="+5% from yesterday"
              trendUp={true}
            />
            <StatCard
              title="Delivery Rate"
              value={`${((stats?.deliveryRate || 0) * 100).toFixed(1)}%`}
              icon={CheckCircle}
              trend="-0.2% from last week"
              trendUp={false}
            />
            <StatCard
              title="Open Rate"
              value={`${((stats?.openRate || 0) * 100).toFixed(1)}%`}
              icon={TrendingUp}
              trend="+1.3% from last week"
              trendUp={true}
            />
          </div>

          {/* Channel Distribution & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Channel Distribution
                </CardTitle>
                <CardDescription>
                  Notifications sent by channel (last 7 days)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ChannelMetric
                    channel="Email"
                    icon={Mail}
                    count={1250}
                    percentage={45}
                    color="bg-blue-500"
                  />
                  <ChannelMetric
                    channel="Push"
                    icon={Smartphone}
                    count={980}
                    percentage={35}
                    color="bg-green-500"
                  />
                  <ChannelMetric
                    channel="In-App"
                    icon={Bell}
                    count={420}
                    percentage={15}
                    color="bg-purple-500"
                  />
                  <ChannelMetric
                    channel="Webhook"
                    icon={Webhook}
                    count={140}
                    percentage={5}
                    color="bg-orange-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest notification deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentNotifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {getChannelIcon(notification.channel)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.recipient}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={notification.status} />
                        <span className="text-xs text-gray-400">
                          {formatTime(notification.sentAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>
                Current system status and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HealthMetric
                  label="Queue Status"
                  value={`${stats?.queuedCount || 0} queued`}
                  status={stats && stats.queuedCount < 100 ? 'healthy' : 'warning'}
                />
                <HealthMetric
                  label="Failed Notifications"
                  value={`${stats?.failedCount || 0} failed`}
                  status={stats && stats.failedCount < 50 ? 'healthy' : 'error'}
                />
                <HealthMetric
                  label="Provider Status"
                  value="All operational"
                  status="healthy"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <NotificationAnalytics />
        </TabsContent>

        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>

        <TabsContent value="campaigns">
          <NotificationCampaigns />
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="realtime">
          <RealtimeMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper Components

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: string
  trendUp?: boolean
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <p className={`text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ChannelMetricProps {
  channel: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  percentage: number
  color: string
}

function ChannelMetric({ channel, icon: Icon, count, percentage, color }: ChannelMetricProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {channel}
          </span>
          <span className="text-sm text-gray-500">
            {count.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

interface HealthMetricProps {
  label: string
  value: string
  status: 'healthy' | 'warning' | 'error'
}

function HealthMetric({ label, value, status }: HealthMetricProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900'
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
    }
  }

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </span>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {status.toUpperCase()}
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: NotificationStatus }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return { color: 'bg-green-100 text-green-800', label: 'Delivered' }
      case 'failed':
        return { color: 'bg-red-100 text-red-800', label: 'Failed' }
      case 'pending':
      case 'queued':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' }
      case 'sending':
        return { color: 'bg-blue-100 text-blue-800', label: 'Sending' }
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' }
    }
  }

  const { color, label } = getStatusConfig()

  return (
    <Badge className={`${color} text-xs`}>
      {label}
    </Badge>
  )
}

function getChannelIcon(channel: NotificationChannel) {
  const iconProps = { className: "h-4 w-4 text-gray-600 dark:text-gray-400" }
  
  switch (channel) {
    case NotificationChannel.EMAIL:
      return <Mail {...iconProps} />
    case NotificationChannel.PUSH:
      return <Smartphone {...iconProps} />
    case NotificationChannel.SMS:
      return <MessageSquare {...iconProps} />
    case NotificationChannel.WEBHOOK:
      return <Webhook {...iconProps} />
    case NotificationChannel.SLACK:
      return <Slack {...iconProps} />
    case NotificationChannel.IN_APP:
    default:
      return <Bell {...iconProps} />
  }
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}
