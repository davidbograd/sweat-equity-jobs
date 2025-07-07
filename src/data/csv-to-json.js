/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Function to parse CSV content
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  const companies = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const company = {};
      headers.forEach((header, index) => {
        company[header] = values[index].replace(/"/g, ''); // Remove quotes
      });
      companies.push(company);
    }
  }
  
  return companies;
}

// Function to properly parse CSV line (handles quoted values with commas)
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

// Helper function to properly capitalize work types
function capitalizeWorkType(workType) {
  const cleaned = workType.trim();
  
  // Handle specific cases
  if (cleaned.toLowerCase() === 'on-site' || cleaned.toLowerCase() === 'onsite') {
    return 'On-site';
  }
  if (cleaned.toLowerCase() === 'remote') {
    return 'Remote';
  }
  if (cleaned.toLowerCase() === 'hybrid') {
    return 'Hybrid';
  }
  
  // Default: capitalize first letter
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

// Function to convert CSV data to sampleCompanies format
function convertToSampleCompaniesFormat(csvData) {
  return csvData.map((company, index) => {
    // Handle multiple locations - take the first one for now
    const locations = company.Location.split(',').map(loc => loc.trim());
    const primaryLocation = locations[0];
    
    // Handle multiple work arrangements - take the first one for now
    const workArrangements = company['Work Arrangement'].split(',').map(work => capitalizeWorkType(work.trim()));
    const primaryWorkType = workArrangements[0];
    
    // Clean up website URL
    let website = company.Website;
    if (website.startsWith('https://')) {
      website = website.replace('https://', '');
    } else if (website.startsWith('http://')) {
      website = website.replace('http://', '');
    }
    if (website.startsWith('www.')) {
      website = website.replace('www.', '');
    }
    // Remove trailing slash
    if (website.endsWith('/')) {
      website = website.slice(0, -1);
    }
    
    return {
      id: (index + 1).toString(),
      name: company.Company,
      website: website,
      description: company['1-liner'],
      year: company['Year Founded'],
      location: primaryLocation,
      workType: primaryWorkType,
      // Store additional data for potential future use
      allLocations: locations,
      allWorkTypes: workArrangements
    };
  });
}

// Function to show usage information
function showUsage() {
  console.log('📖 Usage:');
  console.log('  node csv-to-json.js <input-csv-file> [output-json-file]');
  console.log('');
  console.log('📋 Examples:');
  console.log('  node csv-to-json.js my-companies.csv');
  console.log('  node csv-to-json.js my-companies.csv output.json');
  console.log('  node csv-to-json.js ../data/companies.csv companies.json');
  console.log('');
  console.log('ℹ️  If no output file is specified, it will default to "companies.json"');
}

// Main conversion function
function convertCSVToJSON() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  // Check if input file is provided
  if (args.length === 0) {
    console.error('❌ Error: No input CSV file specified');
    console.log('');
    showUsage();
    return;
  }
  
  const inputFile = args[0];
  const outputFile = args[1] || 'companies.json';
  
  // Build file paths
  const csvPath = path.resolve(__dirname, inputFile);
  const jsonPath = path.resolve(__dirname, outputFile);
  
  try {
    // Check if CSV file exists
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ CSV file not found: ${csvPath}`);
      console.log('');
      console.log('💡 Tips:');
      console.log('  - Make sure the file path is correct');
      console.log('  - Use relative paths from the src/data/ directory');
      console.log('  - Check the file extension (.csv)');
      return;
    }
    
    console.log('🚀 Starting CSV to JSON conversion...');
    console.log(`📂 Input:  ${csvPath}`);
    console.log(`📂 Output: ${jsonPath}`);
    console.log('');
    
    // Read CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV to raw data
    const csvData = parseCSV(csvContent);
    
    if (csvData.length === 0) {
      console.error('❌ No data found in CSV file');
      return;
    }
    
    // Convert to sampleCompanies format
    const companies = convertToSampleCompaniesFormat(csvData);
    
    // Write JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(companies, null, 2));
    
    console.log(`✅ Successfully converted CSV to JSON!`);
    console.log(`📊 Converted ${companies.length} companies`);
    
    // Preview first few companies
    if (companies.length > 0) {
      console.log('\n📋 Preview of first company:');
      console.log(JSON.stringify(companies[0], null, 2));
      
      if (companies.length > 1) {
        console.log('\n📋 Preview of second company:');
        console.log(JSON.stringify(companies[1], null, 2));
      }
    }
    
    // Show summary of locations and work types
    const allLocations = [...new Set(companies.flatMap(c => c.allLocations))];
    const allWorkTypes = [...new Set(companies.flatMap(c => c.allWorkTypes))];
    
    console.log('\n📍 All locations found:', allLocations.join(', '));
    console.log('💼 All work types found:', allWorkTypes.join(', '));
    
  } catch (error) {
    console.error('❌ Error converting CSV to JSON:', error.message);
    console.log('');
    console.log('💡 Common issues:');
    console.log('  - CSV file is not properly formatted');
    console.log('  - Missing required columns (Company, Location, Work Arrangement, etc.)');
    console.log('  - File encoding issues');
  }
}

// Run the conversion
convertCSVToJSON(); 