const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Initialize Gemini
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

exports.analyzeListing = async (listingData) => {
  if (!genAI) {
    // MOCK MODE FOR DEMONSTRATION IF NO API KEY IS PRESENT
    let isSuspicious = false;
    let reason = null;
    
    if (!listingData.image) {
      return { isSuspicious: true, reason: "No images provided for this listing. Fake or incomplete listings often lack images." };
    }
    
    const rentNum = parseInt(listingData.rent);
    if (rentNum < 3000) {
      return { isSuspicious: true, reason: `Rent (₹${rentNum}) is suspiciously low for a standard room, which is a common scam indicator.` };
    }
    
    if (listingData.description && listingData.description.toLowerCase().includes("wire transfer")) {
      return { isSuspicious: true, reason: "Description contains scam-like wording requesting wire transfers." };
    }
    
    return { isSuspicious: false, reason: null };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an AI assistant that detects fake or suspicious real estate listings.
      Check the following room listing for:
      1. Unrealistic rent (too low or too high for a standard room)
      2. Missing images (image field is null)
      3. Scam-like wording in the description (e.g., "wire transfer", "send money before viewing", "out of country").
      4. IF AN IMAGE IS PROVIDED, verify it using vision. Does it look like a real bedroom, kitchen, living room, or bathroom? Or does it look like a fake, random, or unrelated image?

      Listing Data:
      Title: ${listingData.title}
      Rent: ${listingData.rent}
      Description: ${listingData.description}
      Has Image: ${listingData.image ? 'Yes' : 'No'}
      
      Respond STRICTLY in JSON format with two keys:
      - "isSuspicious": boolean
      - "reason": string (if suspicious, explain why in 1 sentence. Include image verification results if applicable. If not suspicious, return null)
    `;

    const contents = [prompt];
    
    // Add image for Vision Analysis
    if (listingData.image) {
      const imagePath = path.join(__dirname, "../uploads", listingData.image);
      if (fs.existsSync(imagePath)) {
        const mimeType = listingData.image.toLowerCase().endsWith("png") ? "image/png" : "image/jpeg";
        contents.push(fileToGenerativePart(imagePath, mimeType));
      }
    }

    const result = await model.generateContent(contents);
    const response = await result.response;
    const text = response.text().replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return { isSuspicious: false, reason: null };
  }
};

exports.parseSearchQuery = async (query) => {
  if (!genAI) {
    // MOCK MODE FOR DEMONSTRATION IF NO API KEY IS PRESENT
    const q = query.toLowerCase();
    let maxRent = null;
    let location = null;
    
    // Simple regex extraction for demo purposes
    const rentMatch = q.match(/under (\d+)k/i) || q.match(/under (\d+)/i) || q.match(/max (\d+)k?/i) || q.match(/budget (\d+)k?/i);
    if (rentMatch) {
      maxRent = parseInt(rentMatch[1]);
      if (q.includes("k") || rentMatch[1].length <= 2) maxRent *= 1000;
    }
    
    // Common demo cities
    if (q.includes("chandigarh")) location = "Chandigarh";
    else if (q.includes("delhi")) location = "Delhi";
    else if (q.includes("mumbai")) location = "Mumbai";
    else if (q.includes("bangalore")) location = "Bangalore";
    else if (q.includes("pune")) location = "Pune";
    
    const aiMessage = `I've set up filters for ${location || 'any location'}${maxRent ? ` with a budget under ₹${maxRent}` : ''}. Let's see what we can find for you!`;

    return { 
      location: location, 
      maxRent: maxRent, 
      amenities: q.includes("parking") ? ["parking"] : (q.includes("wifi") ? ["wifi"] : []),
      aiMessage: aiMessage
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Extract search filters from the following user query for a room search.
      Query: "${query}"
      
      Extract:
      - "location": city or neighborhood name (string or null)
      - "maxRent": maximum rent budget (number or null). Note: '8k' means 8000.
      - "amenities": array of strings (e.g., ["parking", "wifi", "ac"])
      - "aiMessage": A friendly, conversational response summarizing what you understood. (e.g. "I found some great places in Chandigarh under ₹8,000 for you! Let's take a look.")

      Respond STRICTLY in JSON format with keys: "location", "maxRent", "amenities", "aiMessage".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Parse Query Error:", error);
    return { location: null, maxRent: null, amenities: [], aiMessage: "I'm having trouble understanding right now, but here are all our available rooms!" };
  }
};
