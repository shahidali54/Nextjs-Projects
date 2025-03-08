"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white border-opacity-30">
                <h1 className="text-3xl font-extrabold mb-6 text-white">Countdown Timer</h1>
                <div className="flex items-center mb-6">
                    <Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration (seconds)"
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1 mr-4 rounded-lg border-gray-300 px-4 py-2 focus:ring-2 focus:ring-white bg-gray-100 text-gray-800"
                    />
                    <Button
                        onClick={handleSetDuration}
                        className="bg-white text-gray-800 font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Set
                    </Button>
                </div>
                <div className="text-6xl font-bold text-blue-500 drop-shadow-lg mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleStart}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
                    >
                        {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button
                        onClick={handlePause}
                        className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
                    >
                        Pause
                    </Button>
                    <Button
                        onClick={handleReset}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all transform hover:scale-105"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}