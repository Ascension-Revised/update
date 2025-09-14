import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Enhanced architecture knowledge base for fallback responses
const architectureKnowledge = {
  "modern architecture": {
    response:
      "Modern architecture emerged in the early 20th century, emphasizing clean lines, open spaces, and the principle that 'form follows function.' Key characteristics include large windows, flat roofs, and minimal ornamentation. Notable architects like Le Corbusier, Mies van der Rohe, and Frank Lloyd Wright pioneered this movement.\n\nWould you like to explore specific modern architectural styles like Bauhaus or International Style?",
    related: ["bauhaus", "international style", "le corbusier", "frank lloyd wright"],
  },
  "sustainable architecture": {
    response:
      "Sustainable architecture focuses on minimizing environmental impact through energy-efficient design, renewable materials, and green technologies. Key strategies include passive solar design, green roofs, rainwater harvesting, and using locally-sourced materials.\n\nPopular certifications like LEED and BREEAM help measure sustainability. Would you like to know more about specific green building techniques or certification processes?",
    related: ["leed", "green building", "passive solar", "renewable energy"],
  },
  autocad: {
    response:
      "AutoCAD is industry-standard CAD software for creating precise 2D and 3D architectural drawings. It's essential for floor plans, elevations, sections, and construction details. Key features include layers, blocks, dimensioning, and parametric constraints.\n\nMany architects also use specialized versions like AutoCAD Architecture. Are you interested in learning specific AutoCAD techniques or comparing it with other CAD software?",
    related: ["revit", "cad software", "technical drawing", "floor plans"],
  },
  bim: {
    response:
      "Building Information Modeling (BIM) creates intelligent 3D models containing geometric and non-geometric data about buildings. Unlike traditional CAD, BIM enables collaboration, clash detection, and lifecycle management. Popular BIM software includes Revit, ArchiCAD, and Tekla.\n\nBIM improves project coordination and reduces errors. Would you like to explore BIM workflows or specific software comparisons?",
    related: ["revit", "archicad", "collaboration", "3d modeling"],
  },
  "gothic architecture": {
    response:
      "Gothic architecture dominated European building from the 12th-16th centuries, characterized by pointed arches, ribbed vaults, flying buttresses, and large windows with tracery. Famous examples include Notre-Dame de Paris, Chartres Cathedral, and Westminster Abbey.\n\nThe style emphasized height and light, creating spiritual spaces that seemed to reach toward heaven. Are you interested in specific Gothic elements or comparing it to other historical styles?",
    related: ["medieval architecture", "cathedrals", "pointed arch", "flying buttress"],
  },
  "classical architecture": {
    response:
      "Classical architecture draws from ancient Greek and Roman principles, emphasizing symmetry, proportion, and the classical orders (Doric, Ionic, Corinthian). Key elements include columns, pediments, and entablatures. This style influenced neoclassical and colonial architecture.\n\nFamous examples include the Parthenon, Pantheon, and many government buildings. Would you like to explore the classical orders or their influence on modern architecture?",
    related: ["greek architecture", "roman architecture", "columns", "neoclassical"],
  },
  "urban planning": {
    response:
      "Urban planning involves designing and organizing urban spaces to create functional, sustainable, and livable cities. Key concepts include zoning, transportation networks, public spaces, and mixed-use development. Planners consider factors like population growth, infrastructure, and environmental impact.\n\nModern approaches emphasize walkability, transit-oriented development, and smart growth. Are you interested in specific planning theories or contemporary urban challenges?",
    related: ["zoning", "transportation", "smart cities", "public space"],
  },
  "structural engineering": {
    response:
      "Structural engineering ensures buildings can safely support loads from gravity, wind, earthquakes, and occupancy. Key concepts include load paths, material properties, and structural systems like frames, trusses, and shells. Engineers work closely with architects to balance aesthetics and structural integrity.\n\nCommon materials include steel, concrete, timber, and composites. Would you like to explore specific structural systems or seismic design principles?",
    related: ["load bearing", "seismic design", "steel structure", "concrete"],
  },
}

function findBestMatch(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  // Check for direct matches
  for (const [key, data] of Object.entries(architectureKnowledge)) {
    if (lowerMessage.includes(key)) {
      return data.response
    }
  }

  // Check for related terms
  for (const [key, data] of Object.entries(architectureKnowledge)) {
    for (const related of data.related) {
      if (lowerMessage.includes(related)) {
        return data.response
      }
    }
  }

  // General architecture response
  if (lowerMessage.includes("architecture") || lowerMessage.includes("building") || lowerMessage.includes("design")) {
    return "Architecture is a fascinating field that combines art, science, and technology. I can help you explore various topics including architectural styles (Modern, Gothic, Classical), design tools (AutoCAD, BIM, Revit), sustainable practices, structural engineering, and urban planning.\n\nWhat specific aspect of architecture interests you most?"
  }

  // Default response
  return "That's an interesting question! As your architecture agent, I'm here to help with topics like architectural styles, design software, sustainable building practices, structural engineering, and urban planning. Could you tell me more about what you'd like to explore?"
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]

    // Try to use OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const result = await generateText({
          model: openai("gpt-4o-mini"),
          system: `You are an expert architecture agent and personal assistant. You have deep knowledge about:

- Architectural styles (Modern, Gothic, Classical, Brutalist, Art Deco, etc.)
- Sustainable and green building practices
- CAD software and tools (AutoCAD, Revit, SketchUp, Rhino, etc.)
- Building Information Modeling (BIM)
- Structural engineering principles
- Urban planning and design
- Construction materials and methods
- Building codes and regulations
- Famous architects and their works
- Architectural history and theory

You should:
- Provide detailed, accurate, and helpful responses about architecture
- Ask follow-up questions to better understand what the user needs
- Offer practical advice and examples
- Be enthusiastic about architecture while remaining professional
- Keep responses concise but informative (2-3 paragraphs max unless more detail is requested)
- Suggest related topics the user might find interesting

You are their personal architecture agent, so be helpful, knowledgeable, and engaging.`,
          messages: messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
        })

        return Response.json({ content: result.text })
      } catch (aiError) {
        console.log("AI API failed, using fallback:", aiError)
      }
    }

    // Fallback to enhanced keyword matching
    const response = findBestMatch(lastMessage.content)
    return Response.json({ content: response })
  } catch (error) {
    console.error("API Error:", error)
    return Response.json(
      {
        content:
          "I apologize, but I'm experiencing some technical difficulties. However, I'm still here to help with your architecture questions! Please try asking about architectural styles, design tools, or building practices.",
      },
      { status: 200 },
    )
  }
}
