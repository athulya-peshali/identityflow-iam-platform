/**
 * IdentityFlow - Slack Integration Service
 * Manages workspace invitations and channel assignments.
 */
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Slack Web API Client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * Invites a new employee to the corporate Slack workspace
 */
async function inviteToSlack(email, firstName, lastName) {
    try {
        // Utilizing the Slack Admin API to invite the user
        const response = await slackClient.apiCall('admin.users.invite', {
            team_id: process.env.SLACK_TEAM_ID,
            email: email,
            channel_ids: 'C01234567', // Default #general channel placeholder
            custom_message: `Welcome to the team, ${firstName}!`
        });

        console.log(`✅ Slack invitation sent to: ${email}`);
        return { success: true };

    } catch (error) {
        console.error(`❌ Slack Provisioning Error for ${email}:`, error.message);
        throw error;
    }
}

module.exports = { inviteToSlack };
