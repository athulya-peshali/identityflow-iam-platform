/**
 * IdentityFlow - Middleware Automation Engine
 * Main entry point for the HR webhook listener.
 * Author: Athulya Peshali
 */

const express = require('express');
const dotenv = require('dotenv');
const { provisionUser } = require('./controllers/provisioning');
const { sendTemporaryCredentials } = require('./services/emailjs');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// System Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'IdentityFlow Engine is operational.' });
});

// Webhook Listener: HR Portal Event Trigger
app.post('/api/v1/webhook/hr-event', (req, res) => {
    try {
        const payload = req.body;

        // 1. Validate payload structure
        if (!payload || !payload.event_type || !payload.data) {
            return res.status(400).json({ error: 'Invalid webhook payload structure.' });
        }

        const { employee_id, first_name, last_name, personal_email, status } = payload.data;
        console.log(`[Webhook Received] Event: ${payload.event_type} | Employee: ${employee_id} | Status: ${status}`);

        // 2. Return 202 Accepted immediately
        res.status(202).json({ 
            message: 'Webhook received and processing initiated.',
            event_id: payload.event_id 
        });

        // 3. Process the payload asynchronously in the background
        if (status === 'HIRED') {
            console.log(`[Action] Initiating Onboarding Workflow for ${first_name} ${last_name}...`);
            
            // Execute Provisioning Pipeline
            provisionUser(payload.data)
                .then(async (result) => {
                    console.log(`[Success] Provisioning completed for: ${result.email}`);
                    
                    // Dispatch secure credentials to personal email
                    await sendTemporaryCredentials(personal_email, first_name, result.email, result.tempPassword);
                })
                .catch(error => {
                    console.error(`[Error] Provisioning failed for ${employee_id}`);
                });

        } else if (status === 'TERMINATED') {
            console.log(`[Action] Initiating Offboarding Revocation for ${first_name} ${last_name}...`);
            // TODO: Execute Revocation Pipeline (Sprint 4)
        } else {
            console.log(`[Ignored] Status '${status}' requires no automated action.`);
        }

    } catch (error) {
        console.error('[Error] Failed to handle webhook:', error.message);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 IdentityFlow Engine is listening on port ${PORT}`);
});
