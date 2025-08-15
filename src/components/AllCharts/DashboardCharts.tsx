"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
} from "recharts";
import SchoolPerformanceChart from "./Chart";

const barData = [
    { name: "Mon", thisWeek: 90, lastWeek: 80 },
    { name: "Tue", thisWeek: 40, lastWeek: 60 },
    { name: "Wed", thisWeek: 70, lastWeek: 50 },
    { name: "Thu", thisWeek: 30, lastWeek: 40 },
    { name: "Fri", thisWeek: 80, lastWeek: 70 },
    { name: "Sat", thisWeek: 60, lastWeek: 90 },
    { name: "Sun", thisWeek: 50, lastWeek: 65 },
];

const dayPickerStyles = {
    day: { width: "100px" },
};

type CustomTooltipProps = {
    active?: boolean;
    label?: string;
    payload?: { name: string; value: number }[];
};

const CustomBarTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
}) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-[var(--bg-background)] p-4 rounded-xl shadow-lg border border-gray-200 text-sm">
            <p className="font-bold text-[var(--color-accent2)] mb-2">{label}</p>
            {payload.map((entry) => (
                <div
                    key={`${entry.name}-${label}`}
                    className="flex justify-between gap-6 text-[var(--color-accent1)]"
                >
                    <span className="tracking-wide">{entry.name}</span>
                    <span className="font-bold tracking-wide text-[var(--color-accent2)]">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

const BAR_RADIUS: [number, number, number, number] = [10, 10, 0, 0];

const BAR_SIZE = 13;

export default function DashboardCharts() {
    const [value, setValue] = useState(new Date());

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
                <SchoolPerformanceChart />
            </div>

            {/* Calendar */}
            <div className="col-span-1">
                <div className="bg-[var(--bg-background)] rounded-lg p-5 min-h-[426px]">
                    <h2 className="font-bold text-lg text-[var(--color-accent2)] mb-4">
                        School Calendar
                    </h2>
                    <DayPicker
                        aria-label="School Calendar Date Picker"
                        mode="single"
                        required
                        selected={value || undefined}
                        onSelect={setValue}
                        className="w-full text-[var(--color-accent2)] overflow-x-auto"
                        modifiersClassNames={{
                            today: "font-bold text-blue-600",
                        }}
                        styles={dayPickerStyles}
                    />
                </div>
            </div>

            {/* Finance Chart */}
            <div className="col-span-1">
                <div className="bg-[var(--bg-background)] rounded-lg p-5 sm:min-h-[430px]">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-bold text-lg text-[var(--color-accent2)]">
                            School Finance
                        </h2>
                    </div>
                    <ResponsiveContainer width="100%" height={345}>
                        <BarChart
                            data={barData}
                            margin={{ top: 0, right: 1, left: -15, bottom: 0 }}
                        >
                            <CartesianGrid stroke="#e5e7eb" strokeDasharray="" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#999", fontSize: 12, dy: 10 }}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#999", fontSize: 12, dx: -15 }}
                            />
                            <Bar
                                dataKey="lastWeek"
                                fill="#f97316"
                                radius={BAR_RADIUS}
                                barSize={BAR_SIZE}
                            />
                            <Bar
                                dataKey="thisWeek"
                                fill="#facc15"
                                radius={BAR_RADIUS}
                                barSize={BAR_SIZE}
                            />

                            <Tooltip
                                content={<CustomBarTooltip />}
                                cursor={{ fill: "transparent" }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="sr-only">
                        Finance chart comparing this week and last week across days Monday
                        to Sunday.
                    </p>
                </div>
            </div>
        </div>
    );
}
