import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-primary mt-5">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <Link className="flex items-center gap-1" to="/">
                        <Calendar className="size-9"/>
                        <span className="text-2xl font-bold text-white">GehGeh</span>
                    </Link>
                    <p className="mt-6 text-sm">
                        Serial Entrepreneur Africa’s most Experienced financial coach
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+234-800-123-4567</p>
                            <p>support@gehgeh.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © GehGeh. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer;
