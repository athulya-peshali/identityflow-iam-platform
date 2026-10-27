/**
 * IdentityFlow - Provisioning Controller
 * Handles account creation logic across Firebase, Google Workspace, and Slack.
 */
const db = require('../services/firebase');

async function provisionUser(employeeData) {
    const { employee_id, first_name, last_name, department } = employeeData;
    
    // Auto-generate corporate email
    const corporate_email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@techflow.com`;
    
    try {
        // 1. Provision User in Firestore (RBAC)
        await db.collection('users').doc(employee_id).set({
            first_name: first_name,
            last_name: last_name,
            corporate_email: corporate_email,
            department: department,
            access_level: 3, // Default clearance level
            is_active: true,
            created_at: new Date().toISOString()
        });

        // 2. Log to Immutable Audit Ledger
        await db.collection('audit_logs').add({
            timestamp: new Date().toISOString(),
            action_type: 'PROVISION_FIRESTORE_RBAC',
            target_employee_id: employee_id,
            status: 'SUCCESS',
            executed_by: 'IdentityFlow_Engine'
        });

        console.log(`✅ Successfully provisioned ${corporate_email} in Firestore.`);
        return { success: true, email: corporate_email };

    } catch (error) {
        console.error(`❌ Failed to provision user ${employee_id}:`, error);
        
        // Log failure to audit ledger
        await db.collection('audit_logs').add({
            timestamp: new Date().toISOString(),
            action_type: 'PROVISION_FIRESTORE_RBAC',
            target_employee_id: employee_id,
            status: 'FAILED',
            error_details: error.message,
            executed_by: 'IdentityFlow_Engine'
        });
        
        throw error;
    }
}

module.exports = { provisionUser };
