// Mock implementations for missing API routes used in tests
import { NextResponse } from 'next/server'

export async function GET(request?: any) {
  return NextResponse.json({ 
    message: 'Mock GET endpoint',
    status: 'ok',
    data: []
  }, { status: 200 })
}

export async function POST(request?: any) {
  return NextResponse.json({ 
    message: 'Mock POST endpoint',
    status: 'ok',
    data: { id: 'mock-id', created: true }
  }, { status: 201 })
}

export async function PUT(request?: any) {
  return NextResponse.json({ 
    message: 'Mock PUT endpoint',
    status: 'ok',
    data: { id: 'mock-id', updated: true }
  }, { status: 200 })
}

export async function DELETE(request?: any) {
  return NextResponse.json({ 
    message: 'Mock DELETE endpoint',
    status: 'ok',
    data: { id: 'mock-id', deleted: true }
  }, { status: 200 })
}