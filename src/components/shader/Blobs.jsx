import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import vertex from './blobs/shader.vert'
import fragment from './blobs/shader.frag'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    iResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  vertex,
  fragment
)

extend({ ShaderImpl })

export const Blobs = forwardRef(({ ...props }, ref) => {
  const localRef = useRef()
  useImperativeHandle(ref, () => localRef.current)

  useFrame((_, delta) => {
    localRef.current.time += delta
  })

  return (
    <mesh {...props}>
      {/* <sphereGeometry args={[0.5, 32, 32]} /> */}
      <planeGeometry args={[5, 8]} />
      <shaderImpl ref={localRef} glsl={THREE.GLSL3} />
    </mesh>
  )
})

Blobs.displayName = 'Blobs'