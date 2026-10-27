/**
 * IdentityFlow - Email Dispatch Service
 * Sends temporary credentials to new hires via EmailJS REST API.
 */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Dispatches a secure welcome email containing initial login credentials.
 */
async function sendTemporaryCredentials(personalEmail, firstName, corporateEmail, tempPassword) {
    const payload = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
            to_email: personalEmail,
            first_name: firstName,
            corporate_email: corporateEmail,
            temp_password: tempPassword,
            login_url: 'https://workspace.google.com/dashboard'
        }
    };

    try {
        await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(`✅ Temporary credentials dispatched to personal email: ${personalEmail}`);
        return { success: true };
        
    } catch (error) {
        console.error(`❌ EmailJS Dispatch Error for ${personalEmail}:`, error.response ? error.response.data : error.message);
        throw new Error('Failed to dispatch temporary credentials via EmailJS');
    }
}

module.exports = { sendTemporaryCredentials };
