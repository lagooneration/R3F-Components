'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'


export const Audio = ({ route = '/particles', ...props }) => {
    const mesh = useRef(null)
    const router = useRouter()
  
    const [hovered, hover] = useState(false)
    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
  
    useCursor(hovered)
    useFrame((state, delta) => {
      const t = state.clock.getElapsedTime()
      mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
      mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
      mesh.current.rotation.z -= delta / 4
    })
  
    return (
      <group ref={mesh} {...props}>
        
        <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} scale={2.0}>
          <sphereGeometry args={[0.55, 64, 64]}/>
          <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
        </mesh>
      </group>
    )
  }

  export const Particles = ({ route = '/particles', ...props }) => {
    const count = 2000;
    const router = useRouter()
    const points = useRef();
    const [hovered, hover] = useState(false)
    useCursor(hovered)
    // useFrame((state, delta) => {
    //   const t = state.clock.getElapsedTime()
    //   mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    //   mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    //   mesh.current.rotation.z -= delta / 4
    // })
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Generate random values for x, y, and z on every loop
            let x = (Math.random() - 0.5) * 2;
            let y = (Math.random() - 0.5) * 2;
            let z = (Math.random() - 0.5) * 2;
        
            // We add the 3 values to the attribute array for every loop
            positions.set([x, y, z], i * 3);
          }
        
          return positions;
        }, [count]);
      
  
    return (
      <points 
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}
        ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#5786F5"
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    );
  };

export const Sphere = ({ route = '/', ...props }) => {
//   const mesh = useRef(null)
  const router = useRouter()
  const points = useRef();

  const [hovered, hover] = useState(false)
  // const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
//   useFrame((state, delta) => {
//     const t = state.clock.getElapsedTime()
//     mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
//     mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
//     mesh.current.rotation.z -= delta / 4
//   })

  return (
    <points ref={points}
    onClick={() => router.push(route)}
       onPointerOver={() => hover(true)}
       onPointerOut={() => hover(false)}
       {...props}>
      <sphereGeometry args={[1, 48, 48]} />
      <pointsMaterial color={hovered ? 'hotpink' : '#5786F5'} size={0.015} sizeAttenuation />
    </points>
  )
}




export const Custom = (props) => {
    const { count, shape } = props;
  
    // This reference gives us direct access to our points
    const points = useRef();
  
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(count * 3);
  
      if (shape === "box") {
        for (let i = 0; i < count; i++) {
          let x = (Math.random() - 0.5) * 2;
          let y = (Math.random() - 0.5) * 2;
          let z = (Math.random() - 0.5) * 2;
  
          positions.set([x, y, z], i * 3);
        }
      }
  
      if (shape === "sphere") {
        const distance = 0.5;
       
        for (let i = 0; i < count; i++) {
          const theta = THREE.MathUtils.randFloatSpread(360); 
          const phi = THREE.MathUtils.randFloatSpread(360); 
  
          let x = distance * Math.sin(theta) * Math.cos(phi)
          let y = distance * Math.sin(theta) * Math.sin(phi);
          let z = distance * Math.cos(theta);
  
          positions.set([x, y, z], i * 3);
        }
      }
  
      return positions;
    }, [count, shape]);
    return (
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.015} color="#5786F5" sizeAttenuation depthWrite={false} />
        </points>
      );
    };
    