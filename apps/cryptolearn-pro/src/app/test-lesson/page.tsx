'use client'

import { useState, useEffect } from 'react'

export default function TestLessonPage() {
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    async function testLesson() {
      try {
        setResult('Loading...')
        
        // Test 1: Import lesson-registry functions
        const { loadLesson, getLessonMeta } = await import('@/data/lessons/lesson-registry')
        setResult(prev => prev + '\n✓ Imported lesson-registry')
        
        // Test 2: Get lesson meta
        const lessonMeta = getLessonMeta('what-is-cryptocurrency')
        setResult(prev => prev + '\n✓ Found lesson meta: ' + (lessonMeta?.title || 'NOT FOUND'))
        
        // Test 3: Load the lesson
        const lesson = await loadLesson('what-is-cryptocurrency')
        setResult(prev => prev + '\n✓ Loaded lesson: ' + lesson.title)
        setResult(prev => prev + '\n✓ Sections count: ' + lesson.content.sections.length)
        setResult(prev => prev + '\n✓ First section: ' + lesson.content.sections[0]?.title)
        
      } catch (error) {
        setResult(prev => prev + '\n✗ Error: ' + (error as Error).message)
        console.error('Test error:', error)
      }
    }
    
    testLesson()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Lesson Loading Test</h1>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono text-sm">
        {result}
      </pre>
    </div>
  )
}