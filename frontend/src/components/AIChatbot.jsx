import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your AI shopping assistant. How can I help you today?",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || loading) return;

        const userMessage = { role: "user", content: message };
        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("/ai/gpt/chat", {
                message,
                conversationHistory: messages,
            });

            const aiMessage = { role: "assistant", content: response.data.response };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to get AI response");
            const errorMessage = {
                role: "assistant",
                content: "Sorry, I'm having trouble right now. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className='fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <MessageCircle className='h-6 w-6' />
                    <span className='hidden sm:inline'>Chat with AI</span>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='fixed bottom-6 right-6 w-96 h-[600px] bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col border border-gray-700'
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    >
                        {/* Header */}
                        <div className='bg-emerald-600 px-4 py-3 rounded-t-lg flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Bot className='h-5 w-5' />
                                <h3 className='font-semibold'>AI Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='hover:bg-emerald-700 rounded p-1 transition-colors'
                            >
                                <X className='h-5 w-5' />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                            msg.role === "user"
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-700 text-gray-100"
                                        }`}
                                    >
                                        <p className='text-sm'>{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className='flex justify-start'>
                                    <div className='bg-gray-700 rounded-lg px-4 py-2'>
                                        <div className='flex gap-1'>
                                            <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
                                            <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: "0.2s" }}></div>
                                            <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className='p-4 border-t border-gray-700'>
                            <div className='flex gap-2'>
                                <input
                                    type='text'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder='Type your message...'
                                    className='flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                                    disabled={loading}
                                />
                                <button
                                    type='submit'
                                    disabled={loading || !message.trim()}
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                                >
                                    <Send className='h-5 w-5' />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;

