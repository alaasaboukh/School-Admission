"use client";
import { useAppSelector } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import { Menu, X } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import ToggleSwitcher from "./ToggleSwitcher";
import { ToogleMenu } from "@/redux/menuSlice";

const TopComponent = ({ text }: { text: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const Menuu = useAppSelector((state) => state.menu.Menu);

    return (
        <div className="flex items-center justify-between w-full mb-7">
            <h1 className="font-bold text-xl sm:text-2xl text-[var(--color-accent2)]">
                {text}
            </h1>
            <div className="flex items-center gap-5">
                <span className=" p-1.5 rounded-4xl text-[var(--color-accent1)] hover:text-white hover:bg-[var(--color-accent2)] transition-all duration-500 cursor-pointer">
                    <ToggleSwitcher />
                </span>

                <span
                    className={`md:hidden transition-all duration-500 transform text-[var(--foreground)] cursor-pointer ${Menuu ? "rotate-90" : "rotate-0"
                        }`}
                    onClick={() => dispatch(ToogleMenu())}
                >
                    {Menuu ? <X /> : <Menu />}
                </span>
            </div>
        </div>
    );
};

export default TopComponent;
