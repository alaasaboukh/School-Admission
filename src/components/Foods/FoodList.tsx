"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteFoods, fetchFoods } from "@/redux/foodSlice";
import Image from "next/image";
import { BarChart2, Star, TrendingUp } from "lucide-react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const FoodList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Foods, loading, error } = useSelector(
        (state: RootState) => state.food
    );
    const [category, setCategory] = useState<string[]>([]);
    const [selectCategory, SetSelectCategory] = useState<string>("All");
    const currentUser = useAppSelector(
        (state: RootState) => state.auth.currentUser
    );
    const adminEmail = "alaasaboukh1@gmail.com";

    useEffect(() => {
        const CategoriesFoods = Array.from(new Set(Foods.map((m) => m.mealType)));
        setCategory(CategoriesFoods);
    }, [Foods]);

    useEffect(() => {
        dispatch(fetchFoods());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteFoods(id));
    };

    const filterCategory =
        selectCategory === "All"
            ? Foods
            : Foods.filter((f) => f.mealType === selectCategory);

    if (loading)
        return (
            <div className="flex items-center justify-center flex-col h-full">
                <div className="loading"></div>
                <p className="text-[var(--color-accent2)] text-sm mt-2">
                    loading Students
                </p>
            </div>
        );
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
    if (Foods.length === 0)
        return <p className="text-center py-4">No foods found.</p>;

    return (
        <div className="bg-[var(--bg-background)] rounded-xl shadow p-5 space-y-2">
            <div className="flex items-center justify-between max-md:flex-col gap-y-4">
                <h2 className="text-[var(--color-accent2)] text-xl font-bold">
                    Food Menu
                </h2>
                <ul className="flex items-center gap-7 px-5 flex-wrap">
                    <li
                        className={`cursor-pointer font-semibold transition-all duration-300 ${selectCategory === "All"
                                ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                                : "text-[var(--color-accent1)]"
                            }`}
                        onClick={() => SetSelectCategory("All")}
                    >
                        All Menu
                    </li>
                    {category.map((cat) => (
                        <li
                            key={cat}
                            onClick={() => SetSelectCategory(cat)}
                            className={`cursor-pointer font-semibold transition-all duration-300 ${selectCategory === cat
                                    ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                                    : "text-[var(--color-accent1)]"
                                }`}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>
            {filterCategory.map((food) => (
                <div
                    key={food.id}
                    className="grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr_0.7fr_1fr_1fr_0.5fr] items-center gap-5 mt-8"
                >
                    {food.imageUrl && (
                        <Link href={`/food/${food.id}`}>
                            <div className="lg:w-[300px] lg:h-[150px] max-lg:w-[200px] max-lg:h-[120px] relative mx-auto max-md:w-full max-md:h-[180px] ">
                                <Image
                                    src={food.imageUrl}
                                    alt={food.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        </Link>
                    )}

                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        {food.mealType && (
                            <span className="bg-[var(--color-primary)] text-sm text-white rounded-2xl px-7 py-1.5 w-fit mx-auto sm:mx-0">
                                {food.mealType}
                            </span>
                        )}
                        <h2 className="text-lg font-bold text-[var(--color-accent2)]">
                            {food.name}
                        </h2>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Star className="text-orange-300 w-5 h-5" fill="orange" />
                        <span className="text-[var(--color-accent2)] font-bold">
                            {food.rate}
                        </span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <BarChart2 className="text-[var(--color-primary)] w-13 h-13 max-md:w-9 max-md:h-9" />
                        <div>
                            <span className="text-[var(--color-accent2)] font-bold">
                                {food.total.toLocaleString()}
                            </span>
                            <p className="text-[var(--color-accent1)] text-sm">Total Order</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <TrendingUp className="text-[var(--color-primary)] w-13 h-13 max-md:w-9 max-md:h-9" />
                        <div>
                            <span className="text-[var(--color-accent2)] font-bold">
                                {food.interest}
                            </span>
                            <p className="text-[var(--color-accent1)] text-sm">Interest</p>
                        </div>
                    </div>

                    <div className="relative w-13 h-13 max-md:w-11 max-md:h-11 mx-auto sm:mx-0">
                        <CircularProgressbar
                            value={food.percent}
                            strokeWidth={10}
                            styles={buildStyles({
                                pathColor: "#4D44B5",
                                trailColor: "#F3F4FF",
                            })}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-sm max-md:text-xs text-[var(--color-accent2)]">
                            {food.percent}%
                        </div>
                    </div>
                    {currentUser?.email === adminEmail && (
                        <button
                            onClick={() => handleDelete(food.id!)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FoodList;
