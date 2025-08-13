import { Settings } from "lucide-react";
import Image from "next/image";

const Profileuser = () => {
    return (
        <div className="flex items-center gap-7 mb-6">
            <span className="bg-white p-2 rounded-full text-[var(--color-accent1)] hover:text-[var(--color-accent2)] transition-all duration-500 cursor-pointer">
                <Settings size={18} />
            </span>
            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-[var(--color-accent2)] font-bold tracking-wide">Alaa Saboukh</span>
                    <span className="text-xs self-end text-[var(--color-accent1)] tracking-wide">Admin</span>
                </div>
                <div className=" rounded-full relative w-13 h-13">
                    <Image src="/iamges/alaa.png" fill alt="" className="cursor-pointer hover:opacity-85 transition-all duration-500 rounded-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Profileuser;