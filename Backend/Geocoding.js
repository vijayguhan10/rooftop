exports.fetchGeocodingData  = async (lat, lon) => {
  const apiKey = '444d651721b74cc1b8751ceefc23e4d4';
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      console.log(data);
      return data.results[0].formatted; 
    }
    throw new Error('No results found');
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    throw error;
  }
};
