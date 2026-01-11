"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button, GlowingLine } from "@/components/ui";
import { FAQ } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-b border-border last:border-0 group"
        >
            <motion.button
                onClick={onClick}
                className="w-full py-4 lg:py-5 flex items-start justify-between gap-4 text-left relative"
                aria-expanded={isOpen}
                whileHover={{ x: 5 }}
            >
                <span
                    className={cn(
                        "text-base lg:text-lg font-medium transition-colors leading-tight",
                        isOpen ? "text-cyan" : "text-white group-hover:text-cyan"
                    )}
                >
                    {question}
                </span>
                <motion.span
                    className={cn(
                        "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all",
                        isOpen
                            ? "bg-cyan border-cyan text-void rotate-180"
                            : "border-border text-gray-400 group-hover:border-cyan group-hover:text-cyan"
                    )}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4" />
                    ) : (
                        <Plus className="w-4 h-4" />
                    )}
                </motion.span>
            </motion.button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-4 lg:pb-5 text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{answer}</p>
            </motion.div>
        </motion.div>
    );
}

export function FAQSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="section relative bg-void overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-3 block">
            // FAQ
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Frequently Asked <span className="animated-gradient-text">Questions</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Got questions? We've got answers. If you can't find what you're
                        looking for, reach out to our support team.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        className="bg-surface/60 backdrop-blur-md border border-border/50 rounded-2xl p-5 lg:p-6 card-lift"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {FAQ.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Glowing Line Divider */}
                <div className="max-w-3xl mx-auto mt-8">
                    <GlowingLine />
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 mb-4">
                        Still have questions? We're here to help.
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary">Contact Support</Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default FAQSection;
