"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-advance testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const navigate = (dir: number) => {
        setDirection(dir);
        setCurrentIndex((prev) => {
            if (dir === 1) {
                return (prev + 1) % TESTIMONIALS.length;
            } else {
                return prev === 0 ? TESTIMONIALS.length - 1 : prev - 1;
            }
        });
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    return (
        <section ref={sectionRef} className="section relative bg-surface overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface to-void pointer-events-none" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-purple uppercase tracking-widest mb-3 block">
            // Social Proof
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Trusted by <span className="text-gradient">Elite Hunters</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join thousands of security researchers who have leveled up
                        their bug bounty game with HexStrike.
                    </p>
                </motion.div>

                {/* Featured testimonial carousel */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="relative">
                        {/* Navigation buttons */}
                        <motion.button
                            onClick={() => navigate(-1)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 p-2 bg-surface border border-border rounded-full text-gray-400 hover:text-cyan hover:border-cyan transition-all"
                            aria-label="Previous testimonial"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => navigate(1)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 p-2 bg-surface border border-border rounded-full text-gray-400 hover:text-cyan hover:border-cyan transition-all"
                            aria-label="Next testimonial"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>

                        {/* Testimonial card */}
                        <div className="overflow-hidden">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                    }}
                                >
                                    <Card variant="glow" padding="lg" className="text-center card-lift">
                                        {/* Quote icon */}
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            <Quote className="w-10 h-10 text-cyan/30 mx-auto mb-4" />
                                        </motion.div>

                                        {/* Quote */}
                                        <p className="text-xl lg:text-2xl text-white font-medium mb-6 leading-relaxed">
                                            "{TESTIMONIALS[currentIndex].quote}"
                                        </p>

                                        {/* Rating */}
                                        <div className="flex justify-center gap-1 mb-4">
                                            {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Star
                                                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center justify-center gap-3">
                                            <motion.div
                                                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan to-purple flex items-center justify-center text-void font-bold"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                {TESTIMONIALS[currentIndex].avatar}
                                            </motion.div>
                                            <div className="text-left">
                                                <div className="font-bold text-white">
                                                    {TESTIMONIALS[currentIndex].name}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {TESTIMONIALS[currentIndex].role} •{" "}
                                                    {TESTIMONIALS[currentIndex].company}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Dots indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {TESTIMONIALS.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={cn(
                                        "h-2 rounded-full transition-all",
                                        index === currentIndex
                                            ? "bg-cyan w-6"
                                            : "bg-gray-600 hover:bg-gray-500 w-2"
                                    )}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonial grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TESTIMONIALS.slice(0, 6).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                <Card variant="default" padding="md" className="h-full card-lift group">
                                    {/* Stars */}
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                            >
                                                <Star
                                                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-sm text-gray-300 mb-4 line-clamp-4 group-hover:text-gray-200 transition-colors">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan to-purple flex items-center justify-center text-void text-xs font-bold"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            {testimonial.avatar}
                                        </motion.div>
                                        <div>
                                            <div className="text-sm font-medium text-white group-hover:text-cyan transition-colors">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {testimonial.handle}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
