import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  component: () => {
    return (
      <div>
        <div className="py-5"></div> {/* spacer element */}
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-mono text-7xl">
            GALLERY
          </div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>
        <div className="flex items-center justify-center pb-8 pt-3">
          <div className="w-1/12"></div> {/* spacer element */}
          <div className="flex-1 pr-10 text-center">
            <select
              name="photo_drives"
              id="photo_drives"
              className="w-full rounded-lg border-2 border-black pb-1 pl-1 pt-1 font-mono text-lg font-semibold hover:cursor-pointer"
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
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseGreen" />
        </div>
        <div className="justify-center">
          <div className="flex-5 pb-5 pt-5 text-center font-mono text-3xl">
            Spring 2024
          </div>
        </div>
        <div id="slideshow" className="border-black">
          {/* slideshow component goes in this div*/}
        </div>
      </div>
    );
  },
});
