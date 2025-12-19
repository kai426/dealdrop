import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
        formats: [
            {
                type: 'json',
                schema: {
                    type: 'object',
                    required: ['productName', 'currentPrice'],
                    properties: {
                        productName: { type: 'string' },
                        currentPrice: { type: 'string' },
                        currencyCode: { type: 'string' },
                        productImageUrl: { type: 'string' },
                    }
                },
                prompt: "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, BRL, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
            }
        ]
    })

    // Firecrawl retorna os dados extraídos dentro de 'extract'
    const extractedData = result.json;

    if (!extractedData || !extractedData.productName) {
      throw new Error("Nenhum dado extraído da URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Erro ao extrair com Firecrawl:", error);
    throw new Error(`Falha ao extrair produto: ${error.message}`);
  }
}
