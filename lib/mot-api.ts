export interface MOTHistoryResponse {
  registration: string;
  make: string;
  model: string;
  primaryColour: string;
  fuelType: string;
  manufactureDate: string;
  motTests: {
    completedDate: string;
    testResult: string;
    expiryDate: string;
    odometerValue: string;
    odometerUnit: string;
    motTestNumber: string;
  }[];
}

let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function getAccessToken(): Promise<string> {
  const tokenUrl = process.env.MOT_HISTORY_TOKEN_URL;
  const clientId = process.env.MOT_HISTORY_CLIENT_ID;
  const clientSecret = process.env.MOT_HISTORY_CLIENT_SECRET;
  const scope = process.env.MOT_HISTORY_SCOPE_URL;

  if (!tokenUrl || !clientId || !clientSecret || !scope) {
    throw new Error('MOT API credentials are not fully configured in environment variables.');
  }

  // Check if we have a valid cached token (with a 60-second buffer)
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', scope);

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch access token: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // data.expires_in is usually in seconds
  tokenExpiresAt = Date.now() + data.expires_in * 1000;

  return cachedToken!;
}

export async function getVehicleMotHistory(vrm: string): Promise<MOTHistoryResponse | null> {
  const apiKey = process.env.MOT_HISTORY_API_KEY;
  if (!apiKey) {
    throw new Error('MOT_HISTORY_API_KEY is not configured in environment variables.');
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(`https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${encodeURIComponent(vrm)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (response.status === 404) {
      return null; // Vehicle not found
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOT history: ${response.status} ${errorText}`);
    }

    const data: MOTHistoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching MOT history for VRM ${vrm}:`, error);
    throw error;
  }
}
