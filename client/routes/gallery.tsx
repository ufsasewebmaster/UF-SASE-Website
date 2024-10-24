import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: () => {
    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-7xl text-center font-mono">GALLERY</div>
        </div>
        <div className="flex justify-center w-full">
          <hr className="h-5 border-t-4 border-saseBlue w-10/12" />
        </div>
        <div className="flex pt-3 pb-8 justify-center items-center">
          <div className="w-1/12"></div> {/* spacer element */}
          <div className="flex-1 pr-10 text-center">
            <select
              name="photo_drives"
              id="photo_drives"
              className="pl-1 pt-1 pb-1 text-lg font-semibold font-mono w-full border-2 border-black rounded-lg hover:cursor-pointer"
            >
              <option value="default" selected>
                Photo Google Drives
              </option>
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
              <option value="Fall 2023">Fall 2023</option>
              <option value="Spring 2023">Spring 2023</option>
              <option value="Fall 2022">Fall 2022</option>
            </select>
          </div>
          <div className="flex-1">{/* add image eventually */}</div>
        </div>
        <div className="flex justify-center w-full">
          <hr className="h-5 border-t-4 border-saseGreen w-10/12" />
        </div>
        <div className="justify-center">
          <div className="flex-5 pt-5 pb-5 text-3xl text-center font-mono">
            Spring 2024
          </div>
        </div>
        <div id="slideshow" className="border-black">
          {/* slideshow component goes in this div*/}
        </div>
        <div className="flex flex-col justify-center w-full pt-24 ">
          <div className="flex-1">
            <hr className="pt-10 h-1 border-t-1 border-black w-full" />
          </div>
          <div className="flex-1 pl-32">
            <i className="fab fa-instagram pr-10"></i>
            <i className="fab fa-discord pr-10"></i>
            <i className="fab fa-facebook"></i>
          </div>
          <div className="flex-1 pt-10">
            <hr className="pt-5 h-1 border-t-1 border-black w-full" />
          </div>
          <div className="flex justify-between pt-5">
            <div className="pl-28"></div> {/* spacer element */}
            <div className="flex flex-1 text-xs">
              <div className="pr-2">Home</div>
              <div className="pl-2 pr-2">About</div>
              <div className="pl-2 pr-2">Board</div>
              <div className="pl-2 pr-2">Gallery</div>
              <div className="pl-2 pr-2">Events & Slides</div>
              <div className="pl-2 pr-2">Sports</div>
              <div className="pl-2 pr-2">Sponsors</div>
              <div className="pl-2 pr-2">Blogs</div>
              <div className="pl-2 pr-2">Contact Us</div>
            </div>
            <div className="text-xs">
              Copyright <i className="fas fa-copyright"></i> 2024 - Yuki Theme
              by WP Moose
            </div>
            <div className="pr-28"></div>
          </div>
        </div>
      </div>
    )
  },
})
