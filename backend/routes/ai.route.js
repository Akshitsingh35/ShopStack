import express from 'express';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
import {
    generateProductDescription,
    chatWithAI,
    getAIRecommendations,
    generateProductDescriptionGemini,
    chatWithGemini,
    analyzeProductSentiment,
} from '../controllers/ai.controller.js';

const router = express.Router();

// GPT (OpenAI) Routes
router.post('/gpt/generate-description', protectRoute, adminRoute, generateProductDescription);
router.post('/gpt/chat', protectRoute, chatWithAI);
router.post('/gpt/recommendations', protectRoute, getAIRecommendations);

// Gemini Routes
router.post('/gemini/generate-description', protectRoute, adminRoute, generateProductDescriptionGemini);
router.post('/gemini/chat', protectRoute, chatWithGemini);
router.post('/gemini/analyze-sentiment', protectRoute, adminRoute, analyzeProductSentiment);

export default router;

