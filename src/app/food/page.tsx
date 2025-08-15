"use client";

import FoodList from "@/components/Foods/FoodList";
import TopComponent from "@/components/Nested/TopComponent";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            <TopComponent text="Food" />
            <FoodList />
        </div>
    );
};

export default Page;
