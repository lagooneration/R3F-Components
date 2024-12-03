'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshShaderMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const Shader = dynamic(() => import('@/components/shader/Shader').then((mod) => mod.Shader), { ssr: false })
const Heartbeat = dynamic(() => import('@/components/shader/Heartbeat').then((mod) => mod.Heartbeat), { ssr: false })
const Blobs = dynamic(() => import('@/components/shader/Blobs').then((mod) => mod.Blobs), { ssr: false })

const ShaderComponent = ({ route = '/', ...props }) => {
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
      <Shader/>
    </mesh>
  )
}

export default ShaderComponent



export const HeartbeatComponent = () => {
  return <mesh>
    <sphereGeometry args={[0.5, 64, 64]} />
    <Heartbeat />
  </mesh>
}

export const BlobsComponent = () => {
  return <mesh>
    {/* <sphereGeometry args={[0.5, 64, 64]} /> */}
    <Blobs />
  </mesh>
}
