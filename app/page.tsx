'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const vantaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vanta.js effect
  useEffect(() => {
    const loadVanta = async () => {
      const p5Script = document.createElement('script');
      const vantaScript = document.createElement('script');

      p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js';
      vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.21/vanta.topology.min.js';

      p5Script.onload = () => {
        vantaScript.onload = () => {
          if (window.VANTA) {
            window.VANTA.TOPOLOGY({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: window.innerHeight, // Cover the full height of the viewport
              minWidth: window.innerWidth, // Cover the full width of the viewport
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x80deff,
              backgroundColor: 0xf0f0f0,
            });
          }
        };
      };

      document.head.appendChild(p5Script);
      document.head.appendChild(vantaScript);
    };

    loadVanta();

    // Clean up on component unmount
    return () => {
      if (window.VANTA) {
        window.VANTA.destroy();
      }
    };
  }, []);

  return (
    <div ref={vantaRef} className="min-h-screen text-black overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-colors duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Auxilium<span className="text-blue-500">.</span>
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            <NavItem text="Products" />
            <NavItem text="Methods" />
            <NavItem text="Resources" />
            <NavItem text="Docs" />
            <NavItem text="Company" />
            <a href="#" className="text-lg hover:text-gray-600">
              Pricing
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://main.d2nee70q3udcww.amplifyapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-black px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Get a demo
            </a>
            <a
              href="https://main.d2nee70q3udcww.amplifyapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
              Empowering Your Journey
            </h2>
            <p className="text-2xl md:text-3xl mb-12 max-w-4xl">
              Auxilium is your partner in navigating the complexities of modern
              business. We provide innovative solutions to help you thrive in
              today&apos;s dynamic environment.
            </p>
            <div className="space-x-6 mt-8 mb-8 bg-gray-100">
              {' '}
              {/* Added mb-8 for bottom spacing and bg color */}
              <a
                href="https://main.d2nee70q3udcww.amplifyapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 text-black px-8 py-4 text-xl rounded-full hover:bg-gray-300 transition duration-300"
              >
                Get Started
              </a>
              <a
                href="https://main.d2nee70q3udcww.amplifyapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white px-8 py-4 text-xl rounded-full hover:bg-opacity-90 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About Auxilium
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-center">
            At Auxilium, we believe in the power of innovation to transform
            businesses. Our team of experts is dedicated to providing
            cutting-edge solutions that drive growth and efficiency for our
            clients.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Expert Consultation"
              description="Our team of seasoned professionals offers unparalleled insights to guide your business strategy."
            />
            <FeatureCard
              title="Innovative Technology"
              description="We leverage the latest technologies to create custom solutions tailored to your unique needs."
            />
            <FeatureCard
              title="Continuous Support"
              description="Our commitment doesn't end at implementation. We provide ongoing support to ensure your success."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Auxilium. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ text }: { text: string }) {
  return (
    <div className="relative group">
      <a href="#" className="text-lg hover:text-gray-600 flex items-center">
        {text}
        <ChevronDown className="ml-1 w-4 h-4" />
      </a>
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Option 1
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Option 2
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Option 3
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  );
}
