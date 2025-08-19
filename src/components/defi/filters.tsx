"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'

type MetaResponse = {
  data: {
    protocolChains: string[]
    protocolCategories: string[]
    protocolProjects: string[]
    poolChains: string[]
    poolProjects: string[]
  }
}

export const ProtocolFilters: React.FC<{
  chain: string
  setChain: (v: string) => void
  category: string
  setCategory: (v: string) => void
}> = ({ chain, setChain, category, setCategory }) => {
  const { data } = useQuery<MetaResponse>({
    queryKey: ['defi-meta'],
    queryFn: async () => {
      const res = await fetch('/api/defi/metadata')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  const chains = data?.data?.protocolChains ?? []
  const categories = data?.data?.protocolCategories ?? []
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select value={chain} onChange={(e) => setChain(e.target.value)} className="w-full sm:w-64 border rounded px-3 py-2 bg-background" aria-label="Filter protocols by chain">
        <option value="">All chains</option>
        {chains.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full sm:w-64 border rounded px-3 py-2 bg-background" aria-label="Filter protocols by category">
        <option value="">All categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )
}

export const PoolFilters: React.FC<{
  chain: string
  setChain: (v: string) => void
  project: string
  setProject: (v: string) => void
}> = ({ chain, setChain, project, setProject }) => {
  const { data } = useQuery<MetaResponse>({
    queryKey: ['defi-meta'],
    queryFn: async () => {
      const res = await fetch('/api/defi/metadata')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  const chains = data?.data?.poolChains ?? []
  const projects = data?.data?.poolProjects ?? []
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select value={chain} onChange={(e) => setChain(e.target.value)} className="w-full sm:w-64 border rounded px-3 py-2 bg-background" aria-label="Filter pools by chain">
        <option value="">All chains</option>
        {chains.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={project} onChange={(e) => setProject(e.target.value)} className="w-full sm:w-64 border rounded px-3 py-2 bg-background" aria-label="Filter pools by project">
        <option value="">All projects</option>
        {projects.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  )
}
