"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui";
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
            className="border-b border-border last:border-0"
        >
            <button
                onClick={onClick}
                className="w-full py-5 flex items-start justify-between gap-4 text-left group"
                aria-expanded={isOpen}
            >
                <span
                    className={cn(
                        "text-lg font-medium transition-colors",
                        isOpen ? "text-cyan" : "text-white group-hover:text-cyan"
                    )}
                >
                    {question}
                </span>
                <span
                    className={cn(
                        "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all",
                        isOpen
                            ? "bg-cyan border-cyan text-void rotate-180"
                            : "border-border text-gray-400 group-hover:border-cyan group-hover:text-cyan"
                    )}
                >
                    {isOpen ? (
                        <Minus className="w-4 h-4" />
                    ) : (
                        <Plus className="w-4 h-4" />
                    )}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-5 text-gray-400 leading-relaxed">{answer}</p>
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
        <section ref={sectionRef} className="section relative bg-void">
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
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Got questions? We've got answers. If you can't find what you're
                        looking for, reach out to our support team.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-surface border border-border rounded-lg p-6">
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
                    </div>
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
