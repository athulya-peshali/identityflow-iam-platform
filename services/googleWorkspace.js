/**
 * IdentityFlow - Google Workspace Service
 * Interacts with the Google Admin Directory API to manage users.
 */
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// Configure JWT Auth for Google Service Account
const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    // Replace escaped newline characters for private key parsing
    process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null,
    ['https://www.googleapis.com/auth/admin.directory.user'],
    process.env.GOOGLE_ADMIN_USER_EMAIL // The admin email to impersonate
);

const adminService = google.admin({ version: 'directory_v1', auth });

/**
 * Provisions a new user in Google Workspace
 */
async function createWorkspaceUser(firstName, lastName, corporateEmail, tempPassword) {
    try {
        const response = await adminService.users.insert({
            requestBody: {
                primaryEmail: corporateEmail,
                password: tempPassword,
                name: {
                    givenName: firstName,
                    familyName: lastName
                },
                // Maps to Security Risk Mitigation [RSK-02]
                changePasswordAtNextLogin: true 
            }
        });
        
        console.log(`✅ Google Workspace user created: ${corporateEmail}`);
        return { success: true, googleId: response.data.id };
        
    } catch (error) {
        console.error(`❌ Google Workspace Provisioning Error for ${corporateEmail}:`, error.message);
        throw error;
    }
}

module.exports = { createWorkspaceUser };
