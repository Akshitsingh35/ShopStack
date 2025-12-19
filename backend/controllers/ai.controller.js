import { openai } from '../lib/openai.js';
import { genAI } from '../lib/gemini.js';
import Product from '../models/product.model.js';

// ========== GPT (OpenAI) Functions ==========

/**
 * Generate product description using GPT
 */
export const generateProductDescription = async (req, res) => {
    try {
        const { productName, category, price } = req.body;

        if (!productName) {
            return res.status(400).json({ error: 'Product name is required' });
        }

        const prompt = `Write a compelling, SEO-friendly product description for an e-commerce website. 
        Product: ${productName}
        Category: ${category || 'General'}
        Price: $${price || 'Not specified'}
        
        Make it engaging, highlight key features, and keep it between 100-150 words.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert e-commerce copywriter specializing in product descriptions.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        const description = completion.choices[0].message.content;

        res.json({
            success: true,
            description,
        });
    } catch (error) {
        console.error('Error generating product description:', error);
        res.status(500).json({
            error: 'Failed to generate product description',
            message: error.message,
        });
    }
};

/**
 * AI Chatbot for customer support
 */
export const chatWithAI = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get product catalog for context
        const products = await Product.find({}).select('name category price').limit(10);
        const productList = products.map((p) => `${p.name} (${p.category}) - $${p.price}`).join('\n');

        const systemPrompt = `You are a helpful customer support assistant for an e-commerce website. 
        You can help customers with:
        - Product information and recommendations
        - Order inquiries
        - General questions about the store
        
        Available products:
        ${productList}
        
        Be friendly, concise, and helpful. If you don't know something, politely say so.`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: message },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 300,
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;

        res.json({
            success: true,
            response,
        });
    } catch (error) {
        console.error('Error in AI chat:', error);
        res.status(500).json({
            error: 'Failed to process chat message',
            message: error.message,
        });
    }
};

/**
 * Generate product recommendations based on user query
 */
export const getAIRecommendations = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // Get all products
        const products = await Product.find({}).select('name description category price image');

        const productList = products
            .map((p) => `Name: ${p.name}, Category: ${p.category}, Description: ${p.description}`)
            .join('\n\n');

        const prompt = `Based on this user query: "${query}"
        
        Here are our available products:
        ${productList}
        
        Recommend 3-5 products that best match the user's query. Return only the product names in a comma-separated list.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a product recommendation assistant. Return only product names.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 150,
            temperature: 0.5,
        });

        const recommendedNames = completion.choices[0].message.content
            .split(',')
            .map((name) => name.trim());

        // Find products matching the recommended names
        const recommendedProducts = products.filter((product) =>
            recommendedNames.some((name) => product.name.toLowerCase().includes(name.toLowerCase()))
        );

        res.json({
            success: true,
            products: recommendedProducts.slice(0, 5),
        });
    } catch (error) {
        console.error('Error getting AI recommendations:', error);
        res.status(500).json({
            error: 'Failed to get recommendations',
            message: error.message,
        });
    }
};

// ========== Gemini Functions ==========

/**
 * Generate product description using Gemini
 */
export const generateProductDescriptionGemini = async (req, res) => {
    try {
        const { productName, category, price } = req.body;

        if (!productName) {
            return res.status(400).json({ error: 'Product name is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Write a compelling, SEO-friendly product description for an e-commerce website. 
        Product: ${productName}
        Category: ${category || 'General'}
        Price: $${price || 'Not specified'}
        
        Make it engaging, highlight key features, and keep it between 100-150 words.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const description = response.text();

        res.json({
            success: true,
            description,
        });
    } catch (error) {
        console.error('Error generating product description with Gemini:', error);
        res.status(500).json({
            error: 'Failed to generate product description',
            message: error.message,
        });
    }
};

/**
 * AI Chatbot using Gemini
 */
export const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get product catalog for context
        const products = await Product.find({}).select('name category price').limit(10);
        const productList = products.map((p) => `${p.name} (${p.category}) - $${p.price}`).join('\n');

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are a helpful customer support assistant for an e-commerce website. 
        You can help customers with product information, order inquiries, and general questions.
        
        Available products:
        ${productList}
        
        User question: ${message}
        
        Provide a helpful, friendly response.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            response: text,
        });
    } catch (error) {
        console.error('Error in Gemini chat:', error);
        res.status(500).json({
            error: 'Failed to process chat message',
            message: error.message,
        });
    }
};

/**
 * Analyze product reviews/sentiment (using Gemini)
 */
export const analyzeProductSentiment = async (req, res) => {
    try {
        const { reviews } = req.body;

        if (!reviews || !Array.isArray(reviews)) {
            return res.status(400).json({ error: 'Reviews array is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const reviewsText = reviews.join('\n\n');

        const prompt = `Analyze these product reviews and provide:
        1. Overall sentiment (positive/negative/neutral)
        2. Key positive points mentioned
        3. Key negative points mentioned
        4. Overall rating estimate (1-5)
        
        Reviews:
        ${reviewsText}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = response.text();

        res.json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({
            error: 'Failed to analyze sentiment',
            message: error.message,
        });
    }
};

