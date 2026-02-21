export interface HubspotSubmissionData {
  email: string;
  name?: string;
  phone?: string;
  formName: string; // e.g., "MOT Booking Form" or "Contact Form"
  messageDetails: string; // The full html-formatted note body
  vehicleReg?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  motDate?: string;
}

/**
 * Handles posting form submission data directly to HubSpot CRM.
 * It will attempt to find or create a Contact based on Email,
 * and then append an Engagement Note containing the submission details.
 */
export async function submitToHubspot(data: HubspotSubmissionData): Promise<boolean> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  
  if (!token) {
    console.warn("HubSpot API token is missing. Skipping CRM sync.");
    return false;
  }

  try {
    const contactId = await getOrCreateContact(token, data);
    
    if (contactId) {
      await createEngagementNote(token, contactId, data);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("HubSpot Integration Error:", error);
    return false;
  }
}

async function getOrCreateContact(token: string, data: HubspotSubmissionData): Promise<string | null> {
  const [firstname, ...lastnameParts] = (data.name || "").split(" ");
  const lastname = lastnameParts.join(" ");

  // HubSpot requires custom properties to exist in the portal if we push them directly via API.
  // Standard properties we can push: email, firstname, lastname, phone.
  const properties = {
    email: data.email,
    ...(firstname && { firstname }),
    ...(lastname && { lastname }),
    ...(data.phone && { phone: data.phone })
  };

  try {
    // Attempt to Create Contact
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ properties })
    });

    if (response.ok) {
      const result = await response.json();
      return result.id;
    }

    // 409 Conflict means the contact already exists
    if (response.status === 409) {
      await response.json(); // Consume the body
      // The error message usually contains the existing ID, e.g., "Contact already exists. Existing ID: 12345"
      // Alternatively, we can search for them explicitly.
      
      const searchResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: data.email
                }
              ]
            }
          ]
        })
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        if (searchResult.results && searchResult.results.length > 0) {
          // Contact exists, return their ID so we can attach the note.
          // Optional: we could PATCH the contact here to update phone/name if missing
          return searchResult.results[0].id;
        }
      }
    }

    console.error("HubSpot Contact Creation Failed:", await response.text());
    return null;
  } catch (error) {
    console.error("Error in getOrCreateContact:", error);
    return null;
  }
}

async function createEngagementNote(token: string, contactId: string, data: HubspotSubmissionData) {
  const timestamp = new Date().getTime();
  
  // Format the Note Body
  let bodyBuilder = `<h2>New Form Submission: ${data.formName}</h2>`;
  
  if (data.vehicleReg || data.vehicleMake || data.vehicleModel) {
    bodyBuilder += `<h3>Vehicle Details</h3><ul>`;
    if (data.vehicleReg) bodyBuilder += `<li><strong>Registration:</strong> ${data.vehicleReg}</li>`;
    if (data.vehicleMake) bodyBuilder += `<li><strong>Make:</strong> ${data.vehicleMake}</li>`;
    if (data.vehicleModel) bodyBuilder += `<li><strong>Model:</strong> ${data.vehicleModel}</li>`;
    if (data.motDate) bodyBuilder += `<li><strong>MOT Expiry:</strong> ${data.motDate}</li>`;
    bodyBuilder += `</ul>`;
  }

  bodyBuilder += `<h3>Submission Details</h3>`;
  bodyBuilder += data.messageDetails;

  const payload = {
    properties: {
      hs_timestamp: timestamp,
      hs_note_body: bodyBuilder
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 202 // Note to Contact standard association ID
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("HubSpot Note Creation Failed:", await response.text());
    }
  } catch (error) {
    console.error("Error in createEngagementNote:", error);
  }
}
