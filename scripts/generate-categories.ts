import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const categories = [
  {
    id: 'burgers',
    name: 'Burgers',
    prompt: 'Professional food icon of delicious gourmet burger with cheese, lettuce, tomato on transparent background, flat design style, modern app icon, high quality, clean edges, PNG style, no background'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    prompt: 'Professional food icon of Italian pizza with pepperoni and cheese on transparent background, flat design style, modern app icon, high quality, clean edges, circular shape, no background'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    prompt: 'Professional food icon of sushi platter with maki and nigiri rolls on transparent background, flat design style, modern app icon, Japanese cuisine, high quality, clean edges, no background'
  },
  {
    id: 'dessert',
    name: 'Dessert',
    prompt: 'Professional food icon of dessert cake with cherry on top and cream on transparent background, flat design style, modern app icon, sweet treat, pink tones, high quality, clean edges, no background'
  },
  {
    id: 'asian',
    name: 'Asian',
    prompt: 'Professional food icon of Asian noodles bowl with chopsticks on transparent background, flat design style, modern app icon, Chinese Thai cuisine, high quality, clean edges, no background'
  },
  {
    id: 'cafe',
    name: 'Cafe',
    prompt: 'Professional food icon of coffee cup with latte art and steam on transparent background, flat design style, modern app icon, cafe beverage, brown warm tones, high quality, clean edges, no background'
  }
];

async function generateCategoryImages() {
  console.log('🎨 Starting category image generation...\n');
  
  const zai = await ZAI.create();
  const outputDir = '/home/z/my-project/public/categories';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  for (const category of categories) {
    try {
      console.log(`📸 Generating ${category.name}...`);
      
      const response = await zai.images.generations.create({
        prompt: category.prompt,
        size: '1024x1024'
      });

      if (response.data && response.data[0] && response.data[0].base64) {
        const imageBase64 = response.data[0].base64;
        const buffer = Buffer.from(imageBase64, 'base64');
        
        const filename = `${category.id}.png`;
        const outputPath = path.join(outputDir, filename);
        
        fs.writeFileSync(outputPath, buffer);
        
        results.push({
          success: true,
          id: category.id,
          name: category.name,
          path: outputPath,
          size: buffer.length
        });
        
        console.log(`   ✅ Saved: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      results.push({
        success: false,
        id: category.id,
        name: category.name,
        error: error.message
      });
      console.error(`   ❌ Failed: ${category.name} - ${error.message}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n📊 Generation Summary:');
  console.log('─'.repeat(40));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\nGenerated files:');
    successful.forEach(r => {
      console.log(`   📁 ${r.id}.png`);
    });
  }

  return results;
}

// Run generation
generateCategoryImages()
  .then((results) => {
    console.log('\n🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
