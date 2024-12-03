'use client'

import { BlobsComponent } from '@/components/canvas/Shaders'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ShaderComponent = dynamic(() => import('@/components/shader/Shader').then((mod) => mod.Shader), { ssr: false })
const HeartbeatComponent = dynamic(() => import('@/components/shader/Heartbeat').then((mod) => mod.Heartbeat), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

export default function Page() {
  return (
    <>
    <div className='h-1/2 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
         {/* jumbo */}
         <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
           <p className='w-full uppercase'>Re-usable</p>
           <h1 className='my-4 text-5xl font-bold leading-tight'>Shaders</h1>
           <p className='mb-8 text-2xl leading-normal'>Color Swing.</p>
         </div>

         <div className='w-full text-center md:w-3/5'>
         <View orbit className='absolute top-12 flex h-1/2 w-full flex-col items-center justify-center'>
          <Suspense fallback={null}>
            <ShaderComponent />
            <Common />
          </Suspense>
        </View>
         </div>
       </div>

       <div className='h-1/2 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
         {/* jumbo */}
         <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
           <p className='mb-8 text-2xl leading-normal'>Heartbeat</p>
         </div>

         <div className='w-full text-center md:w-3/5'>
         <View className='absolute top-1/2 flex h-1/2 w-full flex-col items-center justify-center'>
          <Suspense fallback={null}>
            <HeartbeatComponent />
            <Common />
          </Suspense>
        </View>
         </div>
       </div>

       <div className='h-3/4 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
         {/* jumbo */}
         <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
           <p className='mb-8 text-2xl leading-normal'>Blobs</p>
         </div>

         <div className='w-full text-center md:w-3/5'>
         <View className='absolute top-3/2 flex h-1/2 w-full flex-col items-center justify-center'>
          <Suspense fallback={null}>
            <BlobsComponent />
            <Common />
          </Suspense>
        </View>
         </div>
       </div>


       <div className='h-screen mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
       asd</div>
    </>
  )
}