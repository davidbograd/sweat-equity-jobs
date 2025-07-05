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

// Function to convert CSV data to sampleCompanies format
function convertToSampleCompaniesFormat(csvData) {
  return csvData.map((company, index) => {
    // Handle multiple locations - take the first one for now
    const locations = company.Location.split(',').map(loc => loc.trim());
    const primaryLocation = locations[0];
    
    // Handle multiple work arrangements - take the first one for now
    const workArrangements = company['Work Arrangement'].split(',').map(work => work.trim());
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
    
    return {
      id: (index + 1).toString(),
      name: company.Company,
      website: website,
      description: company.Oneliner,
      year: company['Year Founded'],
      location: primaryLocation,
      workType: primaryWorkType,
      // Store additional data for potential future use
      allLocations: locations,
      allWorkTypes: workArrangements
    };
  });
}

// Main conversion function
function convertCSVToJSON() {
  const csvPath = path.join(__dirname, '../data/placeholder-content.csv');
  const jsonPath = path.join(__dirname, '../src/data/companies.json');
  
  try {
    // Check if CSV file exists
    if (!fs.existsSync(csvPath)) {
      console.error(`CSV file not found: ${csvPath}`);
      console.log('Please make sure the CSV file exists at: data/placeholder-content.csv');
      return;
    }
    
    // Read CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV to raw data
    const csvData = parseCSV(csvContent);
    
    // Convert to sampleCompanies format
    const companies = convertToSampleCompaniesFormat(csvData);
    
    // Create src/data directory if it doesn't exist
    const srcDataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(srcDataDir)) {
      fs.mkdirSync(srcDataDir, { recursive: true });
    }
    
    // Write JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(companies, null, 2));
    
    console.log(`✅ Successfully converted CSV to JSON!`);
    console.log(`📁 Input: ${csvPath}`);
    console.log(`📁 Output: ${jsonPath}`);
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
  }
}

// Run the conversion
convertCSVToJSON(); 