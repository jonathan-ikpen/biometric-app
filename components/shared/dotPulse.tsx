"use client"
import { useEffect } from 'react'

export default function DotPulse() {
    useEffect(() => {
        async function getLoader() {
            const {dotPulse} = await import('ldrs')
            dotPulse.register()
        }

        getLoader()
    }, [])
    return <l-dot-pulse size="43" speed="1.3" color="#333"></l-dot-pulse>
}