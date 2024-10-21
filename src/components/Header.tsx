import React from "react";
import Image from "next/image";
import Smiley from "../../public/icons/smiley.png";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <Image
                src={Smiley} // Replace with your logo path
                alt="Logo"
                width={50}
                height={50}
                className="h-8 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
