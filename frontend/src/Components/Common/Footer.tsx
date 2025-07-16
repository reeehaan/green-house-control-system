import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
const currentYear = new Date().getFullYear();

return (
<footer className="w-full bg-green-950 text-white py-8 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
    {/* Brand or Logo */}
    <div>
        <h1 className="text-2xl font-bold text-green-400">AgriSense</h1>
        <p className="text-sm mt-2 text-gray-300">
        Smart agriculture monitoring made simple.
        </p>
    </div>

    {/* Navigation Links */}
    <div className="flex flex-col gap-2 text-sm">
        <a href="#" className="hover:text-green-300 transition">About</a>
        <a href="#" className="hover:text-green-300 transition">Contact</a>
        <a href="#" className="hover:text-green-300 transition">Privacy Policy</a>
        <a href="#" className="hover:text-green-300 transition">Terms of Service</a>
    </div>

    {/* Social Icons */}
    <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-green-300 transition" aria-label="Facebook">
        <Facebook />
        </a>
        <a href="#" className="hover:text-green-300 transition" aria-label="Twitter">
        <Twitter />
        </a>
        <a href="#" className="hover:text-green-300 transition" aria-label="Instagram">
        <Instagram />
        </a>
        <a href="#" className="hover:text-green-300 transition" aria-label="LinkedIn">
        <Linkedin />
        </a>
    </div>
    </div>

    {/* Bottom Copyright */}
    <div className="border-t border-green-800 mt-6 pt-4 text-center text-sm text-gray-400">
    © {currentYear} AgriSense. All rights reserved.
    </div>
</footer>
);
};

export default Footer;
