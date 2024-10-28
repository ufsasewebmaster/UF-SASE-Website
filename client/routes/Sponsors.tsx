import { createFileRoute } from '@tanstack/react-router'
import arthrex from '../assets/images/sponsors_page/Arthrex.png'
import axogen from '../assets/images/sponsors_page/Axogen.png'
import blueorigin from '../assets/images/sponsors_page/BlueOriginLogo.png'
import fmglobal from '../assets/images/sponsors_page/FMGlobal.png'
import google from '../assets/images/sponsors_page/Google.png'
import headerImage from '../assets/images/sponsors_page/Header.png'
import johnson from '../assets/images/sponsors_page/J&J.png'
import sargentlundy from '../assets/images/sponsors_page/S&L.png'
import SponsorCard from '../components/SponsorCard'

export const Route = createFileRoute('/sponsors')({
  component: () => {
    return (
      <>
        <div
          className="flex h-screen w-full flex-col items-center bg-cover bg-center"
          style={{
            backgroundImage: headerImage
              ? `url(${headerImage})`
              : "url('default-image-url')",
          }}
        >
          <h1 className="relative z-50 m-0 flex h-5/6 w-min items-end border-b-8 border-saseGreen p-0 text-7xl font-semibold text-white">
            SPONSORS
          </h1>
        </div>

        <div className="m-0 flex w-full flex-col items-center bg-black p-20 pt-5">
          <p className="border-l-8 border-saseGreen pl-4 text-5xl text-white">
            Become a partner of the UF Society of Asian Scientists and Engineers
            (SASE) Chapter
          </p>
          <br></br>
          <p className="border-l-8 border-black pl-4 text-4xl italic text-white">
            To view our sponsorship packet, or for any related questions, please
            contact our External Vice President, Kayleen Diaz, at
            ufsase.evp@gmail.com
          </p>
        </div>

        <div className="flex flex-col items-center bg-gradient-to-b from-blue-300 to-white p-10 pt-0">
          <h1 className="p-4 text-3xl font-medium text-saseBlue">
            DIAMOND SPONSORS
          </h1>
          <div className="flex flex-row justify-center gap-12">
            <SponsorCard
              image={blueorigin}
              companyName="Blue Origin"
              diamond="Y"
            />
            <SponsorCard image={fmglobal} companyName="FM Global" diamond="Y" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-green-100 bg-gradient-to-b from-green-200 to-white p-10 pt-0">
          <h1 className="p-4 text-3xl font-medium text-saseGreen">
            GOLD SPONSORS
          </h1>
          <div className="flex flex-row justify-center gap-12">
            <SponsorCard
              image={sargentlundy}
              companyName="Sargent & Lundy"
              diamond="N"
            />
            <SponsorCard image={axogen} companyName="Axogen" diamond="N" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-10 pt-0">
          <h1 className="p-4 text-3xl font-medium">SILVER SPONSORS</h1>
          <div className="flex flex-row justify-center gap-12">
            <SponsorCard
              image={johnson}
              companyName="Johnson & Johnson"
              diamond="N"
            />
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-10 pt-0">
          <h1 className="p-4 text-3xl font-medium">BRONZE SPONSORS</h1>
          <div className="flex flex-row justify-center gap-12">
            <SponsorCard image={arthrex} companyName="Anthrex" diamond="N" />
            <SponsorCard image={google} companyName="Google" diamond="N" />
          </div>
        </div>
      </>
    )
  },
})
