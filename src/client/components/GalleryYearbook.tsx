import React from 'react'
import { imageUrls } from '../assets/imageUrls'

const GalleryYearbook = () => {
  return (
    <div className='relative'>
      <div className="pt-6 pb-16 flex justify-center">
         <div className="text-6xl font-bold font-redhat text-white">UF SASE 2024-2025</div>
      </div>
      <div className='flex'>
         <div className="px-2"></div>
         <div className="border-4 border-white">
            <img src={imageUrls["fall2024_11.JPG"]} alt="yearbook" />
         </div>
         <div className="px-2"></div>
      </div>   
    </div>
  )
}

export default GalleryYearbook
