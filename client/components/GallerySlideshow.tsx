import React from 'react'
import mainImage from '../assets/gallery/DSC01367.jpg'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const GallerySlideshow = () => {
  return (
    <div>
      <div className='flex'>
         <div className="pl-5 w-3/12"></div> {/* spacer element */}
         <div className='pr-10 flex justify-center items-center'><FaChevronLeft size={40} className='cursor-pointer'/></div>
         <div className='border-2 border-black rounded-lg flex-1 w-full overflow-hidden relative shadow-[5px_5px_0px_0px_rgb(6,104,179)]'>
          <img src={mainImage} alt="" className='w-full h-full object-cover'/>
         </div>
         <div className="pl-10 flex justify-center items-center"><FaChevronRight size={40} className='cursor-pointer'/></div> {/* spacer element */}
         <div className="pr-5 w-3/12"></div> {/* spacer element */}
      </div>
      <div className="pt-10"></div> {/* spacer element */}
    </div>
  )
}

export default GallerySlideshow
