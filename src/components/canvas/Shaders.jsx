'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import usePostProcess from '@/templates/hooks/usePostprocess'

export const Blob = ({ route = '/', ...props }) => {
    const router = useRouter()
    const [hovered, hover] = useState(false)
    useCursor(hovered)
    return (
      <mesh
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    )
  }

export const PostProcessing = ({ route = '/', ...props }) => {
  usePostProcess()
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

// export const PostProcessing = () => {
//     usePostProcess() // Call the hook inside the component
//     return null
//   }



// {/* @ts-ignore */}
// <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
// {/* @ts-ignore */}
// <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
// {/* @ts-ignore */}
// <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />