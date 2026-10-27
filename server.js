/**
 * IdentityFlow - Middleware Automation Engine
 * Main entry point for the HR webhook listener.
 * Author: Athulya Peshali
 */

const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// System Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'IdentityFlow Engine is operational.' });
});

// Webhook Listener: HR Portal Event Trigger (US-01)
app.post('/api/v1/webhook/hr-event', async (req, res) => {
    try {
        const payload = req.body;

        // 1. Validate payload structure
        if (!payload || !payload.event_type || !payload.data) {
            return res.status(400).json({ error: 'Invalid webhook payload structure.' });
        }

        const { employee_id, first_name, last_name, status } = payload.data;
        console.log(`[Webhook Received] Event: ${payload.event_type} | Employee: ${employee_id} | Status: ${status}`);

        // 2. Route based on HR Status
        if (status === 'HIRED') {
            console.log(`[Action] Initiating Onboarding Workflow for ${first_name} ${last_name}...`);
            // TODO: Call Google Workspace API (Sprint 2)
            // TODO: Call Slack API (Sprint 2)
            // TODO: Provision Firestore RBAC (Sprint 2)
            // TODO: Dispatch EmailJS Temp Credentials (Sprint 3)
            
        } else if (status === 'TERMINATED') {
            console.log(`[Action] Initiating Offboarding Revocation for ${first_name} ${last_name}...`);
            // TODO: Suspend Google Workspace User
            // TODO: Deactivate Slack Account
            // TODO: Revoke Firestore DB Access
        } else {
            console.log(`[Ignored] Status '${status}' requires no automated action.`);
        }

        // 3. Return 202 Accepted immediately to prevent HR system timeouts
        return res.status(202).json({ 
            message: 'Webhook processed successfully.',
            event_id: payload.event_id 
        });

    } catch (error) {
        console.error('[Error] Failed to process webhook:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 IdentityFlow Engine is listening on port ${PORT}`);
});
