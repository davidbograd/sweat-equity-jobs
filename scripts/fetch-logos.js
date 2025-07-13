const fs = require('fs');
const path = require('path');
const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const pipelineAsync = promisify(pipeline);

// Load companies data
const companies = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/companies.json'), 'utf-8'));

const generateLogoUrl = (website) => {
  const cleanDomain = website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

  const apiKey = process.env.LOGO_DEV_API_KEY;
  if (!apiKey) {
    throw new Error('LOGO_DEV_API_KEY environment variable is required');
  }

  return `https://img.logo.dev/${cleanDomain}?token=${apiKey}&size=60&retina=true`;
};

const downloadLogo = async (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download logo: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', reject);
    }).on('error', reject);
  });
};

const createSafeFilename = (website) => {
  return website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_');
};

const main = async () => {
  console.log('Starting logo fetching process...');
  
  // Create logos directory if it doesn't exist
  const logosDir = path.join(__dirname, '../public/logos');
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  const logoMapping = {};
  const successful = [];
  const failed = [];

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const safeFilename = createSafeFilename(company.website);
    const logoPath = path.join(logosDir, `${safeFilename}.png`);
    const logoUrl = generateLogoUrl(company.website);

    try {
      console.log(`Fetching logo ${i + 1}/${companies.length}: ${company.name}`);
      await downloadLogo(logoUrl, logoPath);
      
      // Store mapping for component to use
      logoMapping[company.website] = `/logos/${safeFilename}.png`;
      successful.push(company.name);
      
    } catch (error) {
      console.warn(`Failed to fetch logo for ${company.name}: ${error.message}`);
      failed.push({ name: company.name, error: error.message });
    }

    // Add small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Save logo mapping to JSON file
  const mappingPath = path.join(__dirname, '../src/data/logo-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(logoMapping, null, 2));

  console.log(`\nLogo fetching complete!`);
  console.log(`✅ Successfully fetched: ${successful.length} logos`);
  console.log(`❌ Failed: ${failed.length} logos`);
  
  if (failed.length > 0) {
    console.log('\nFailed logos:');
    failed.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`);
    });
  }

  console.log(`\nLogo mapping saved to: ${mappingPath}`);
};

main().catch(console.error); 