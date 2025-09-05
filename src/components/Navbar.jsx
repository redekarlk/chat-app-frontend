// 'use client';

// import { useContext, useState } from 'react';
// import Link from 'next/link';
// import { HiMenu, HiX } from 'react-icons/hi';
// import { AppContent } from '@/context/AppContext';

// export default function Navbar() {
//     const {userData}= useContext(AppContent);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Search', href: '/search-users' },
//     { name: 'Profile', href: '/profile' },
//     { name: 'Requests', href: '/requests' },
//   ];

//   return (
//     <nav className="bg-gray-900 text-white shadow-md fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo / Brand */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="text-2xl font-bold text-blue-400">
//               Chat-App
//             </Link>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="hover:text-blue-400 transition-colors font-medium"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu} className="focus:outline-none">
//               {isOpen ? (
//                 <HiX className="h-6 w-6" />
//               ) : (
//                 <HiMenu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300">
//           <ul className="flex flex-col px-4 py-4 space-y-2">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <Link
//                   href={link.href}
//                   className="block px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }



'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { AppContent } from '@/context/AppContext';
import { useRouter } from 'next/navigation'; // for redirect
import axios from 'axios';

export default function Navbar() {
  const { userData } = useContext(AppContent);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search-users' },
    { name: 'Profile', href: '/profile' },
    { name: 'Requests', href: '/requests' },
  ];

  const handleLogout = () => {
   
    try {
        const {data} = axios.post(`/api/user-auth/logout`)

    } catch (error) {
        console.log(error)
    }
    
    // Close mobile menu
    setIsOpen(false);

    // Redirect to login
    router.push('/auth');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              Chat-App
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-400 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Login/Logout */}
            {userData ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md font-medium transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md font-medium transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300">
          <ul className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Login/Logout */}
            <li>
              {userData ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="block px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
