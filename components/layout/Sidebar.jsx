"use client";

import { MdOutlineDirectionsBike } from "react-icons/md";
import { GrYoga } from "react-icons/gr"
import { BiSwim } from "react-icons/bi";
import { LuDumbbell } from "react-icons/lu";

/**
 * Composant Sidebar de l'application.
 * Affiche la navigation latérale avec des icônes de sport.
 * @module Sidebar
 * @returns {JSX.Element} Le composant Sidebar.
 */
export default function Sidebar() {
    return (
        <aside className="w-20 flex flex-col content-center items-center bg-black">
            <nav className="flex flex-col gap-6 pt-45">
                <button className="bg-white cursor-pointer rounded-md p-3">
                    <GrYoga className="size-8 stroke-red-600" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3">
                    <BiSwim className="size-8 fill-red-600" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3">
                    <MdOutlineDirectionsBike className="size-8 fill-red-600" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3">
                    <LuDumbbell className="size-8 fill-red-600 stroke-red-600" />
                </button>

            </nav>
            <p className=" text-white rotate-270 mt-45 text-xs w-[180px]" >Copiryght, SportSee 2025</p>
        </aside>
    );
}
