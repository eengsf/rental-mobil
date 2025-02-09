import Image from 'next/image';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';

function Footer() {
  return (
    <>
      <div className="w-full h-full min-h-80 flex flex-col justify-between bg-slate-950/90 px-5 md:px-16 lg:px-20">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 py-10 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={24} height={24} />
              <h2 className="text-base text-custom-main4 font-semibold">
                Carentall
              </h2>
            </div>
            <div className="flex flex-col text-slate-400 text-xs">
              <span>31024 Sf J, San Jida, Sapodilla</span>
              <span>90301, SYD</span>
            </div>
            <span className="flex gap-2 items-center text-slate-400 text-xs">
              <BsFillTelephoneFill size={15} className="text-custom-main1" />
              +62 812-3456-7890
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-custom-main4 font-semibold">
              Our Product
            </h2>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>Career</li>
              <li>Cars</li>
              <li>Features</li>
              <li>Features</li>
              <li>Features</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-custom-main4 font-semibold">
              Resources
            </h2>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>Download</li>
              <li>Help Center</li>
              <li>Guides</li>
              <li>Partner Network</li>
              <li>Cruises</li>
              <li>Developer</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-custom-main4 font-semibold">
              About Carentall
            </h2>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>Why Choose Carentall</li>
              <li>Out Story</li>
              <li>Information</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-custom-main4 font-semibold">
              Follow Us
            </h2>
            <div className="flex gap-3">
              <div className="flex justify-center items-center w-6 h-6 rounded-full border border-slate-400 cursor-pointer">
                <FaFacebookF size={12} className="text-slate-400" />
              </div>
              <div className="flex justify-center items-center w-6 h-6 rounded-full border border-slate-400 cursor-pointer">
                <FaXTwitter size={12} className="text-slate-400" />
              </div>
              <div className="flex justify-center items-center w-6 h-6 rounded-full border border-slate-400 cursor-pointer">
                <FaInstagram size={12} className="text-slate-400" />
              </div>
              <div className="flex justify-center items-center w-6 h-6 rounded-full border border-slate-400 cursor-pointer">
                <FaYoutube size={12} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <p className="text-xs text-slate-400 text-center mt-5">
            © 2022 Carentall. All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
