import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-5">
        <p
          className="text-3xl font-semibold text-blue-800 uppercase cursor-pointer"
          onClick={handleReload}
        >
          SUMMARIST
        </p>
        <div className="flex space-x-4">
          <SignedOut>
            
            <SignInButton mode="redirect">
            <FontAwesomeIcon icon={faUser} size="2x" style={{ color: 'blue-800' }} className="cursor-pointer" />

            </SignInButton> 
          </SignedOut>
          <SignedIn>
           
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <h1 className="text-2xl font-bold orange_gradient uppercase tracking-wider max-md:hidden">
        Summarize your Reading
      </h1>
      <p className="text-lg font-bold text-gray-600 text-center mt-4">
        AI-powered tool to simplify articles into concise summaries effortlessly.
      </p>
    </header>
  );
};

export default Hero;
