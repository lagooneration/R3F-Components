import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  vertex,
  fragment
)

extend({ ShaderImpl })

export const Shader = forwardRef(({ ...props }, ref) => {
  const localRef = useRef()
  useImperativeHandle(ref, () => localRef.current)

  useFrame((_, delta) => {
    localRef.current.time += delta
  })

  return (
    <mesh {...props}>
      {/* <sphereGeometry args={[0.5, 32, 32]} /> */}
      <planeGeometry args={[1, 1]} />
      <shaderImpl ref={localRef} glsl={THREE.GLSL3} />
    </mesh>
  )
})

Shader.displayName = 'Shader'