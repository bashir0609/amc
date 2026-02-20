import 'dotenv/config';

async function testApi() {
  const tokenUrl = process.env.MOT_HISTORY_TOKEN_URL;
  const clientId = process.env.MOT_HISTORY_CLIENT_ID;
  const clientSecret = process.env.MOT_HISTORY_CLIENT_SECRET;
  const scope = process.env.MOT_HISTORY_SCOPE_URL;
  const apiKey = process.env.MOT_HISTORY_API_KEY;

  if (!tokenUrl || !clientId || !clientSecret || !scope || !apiKey) {
    console.error("Missing ENV vars");
    return;
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', scope);

  console.log("Fetching token...");
  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    console.error("Token fail:", await tokenRes.text());
    return;
  }
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;
  console.log("Token acquired.");

  console.log("Fetching MOT history...");
  const vrm = "AB12CDE";
  
  // Try both Tapi and History URLs to see exact error
  const urls = [
    `https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${vrm}`,
    `https://tapi.dvsa.gov.uk/mot-history/v1/trade/vehicles/registration/${vrm}`
  ]

  for (const url of urls) {
     console.log(`\nTesting: ${url}`);
     try {
       const res = await fetch(url, {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
           'x-api-key': apiKey,
           'Accept': 'application/json',
         },
       });
       console.log("Status:", res.status);
       console.log("Response:", await res.text());
     } catch (e: any) {
        console.error("Fetch Error:", e.message);
     }
  }
}

testApi();
