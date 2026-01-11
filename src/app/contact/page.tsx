"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    Send,
    Github,
    Twitter,
    MapPin,
    Clock,
    Check,
} from "lucide-react";
import { Button, Card, GlitchText, Terminal } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-20 bg-void">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

            <section className="section">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-3 block">
              // Contact
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Have a question or need support? We're here to help.
                            Reach out and we'll get back to you within 24 hours.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card variant="glow" padding="lg">
                                {isSubmitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-matrix/20 flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-matrix" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Message Sent!
                                        </h3>
                                        <p className="text-gray-400 mb-6">
                                            We'll get back to you within 24 hours.
                                        </p>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium text-gray-300 mb-2"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your name"
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium text-gray-300 mb-2"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="you@example.com"
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-gray-300 mb-2"
                                            >
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="input"
                                                required
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="sales">Sales Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="billing">Billing Question</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-medium text-gray-300 mb-2"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="How can we help you?"
                                                rows={5}
                                                className="input resize-none"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            loading={isSubmitting}
                                            icon={<Send className="w-5 h-5" />}
                                            iconPosition="right"
                                        >
                                            Send Message
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Quick Contact */}
                            <Card variant="default" padding="lg">
                                <h3 className="text-lg font-bold text-white mb-4">
                                    Quick Contact
                                </h3>
                                <div className="space-y-4">
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="flex items-center gap-3 text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-white">{SITE_CONFIG.email}</p>
                                        </div>
                                    </a>

                                    <a
                                        href={`https://twitter.com/${SITE_CONFIG.twitter.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                                            <Twitter className="w-5 h-5 text-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Twitter</p>
                                            <p className="text-white">{SITE_CONFIG.twitter}</p>
                                        </div>
                                    </a>

                                    <a
                                        href={SITE_CONFIG.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                                            <Github className="w-5 h-5 text-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">GitHub</p>
                                            <p className="text-white">github.com/hexstrike</p>
                                        </div>
                                    </a>
                                </div>
                            </Card>

                            {/* Response Time */}
                            <Card variant="default" padding="lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-matrix/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-matrix" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">
                                            Response Time
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            We typically respond within 24 hours during business days.
                                            For urgent issues, mention "URGENT" in your subject.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Terminal */}
                            <Card variant="default" padding="none">
                                <Terminal
                                    lines={[
                                        { type: "command", content: "hexstrike support --status" },
                                        { type: "success", content: "✓ Support team online" },
                                        { type: "output", content: "Average response: 4 hours" },
                                        { type: "success", content: "✓ Ready to help" },
                                    ]}
                                    autoType
                                    typeSpeed={30}
                                />
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
