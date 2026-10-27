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

/**
 * IdentityFlow - Provisioning Controller
 * Handles account creation logic across Firebase, Google Workspace, and Slack.
 */
const db = require('../services/firebase');
const { createWorkspaceUser } = require('../services/googleWorkspace');
const crypto = require('crypto'); // Native Node.js module for secure random generation

async function provisionUser(employeeData) {
    const { employee_id, first_name, last_name, department } = employeeData;
    
    // Auto-generate corporate email and a secure temporary password
    const corporate_email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@techflow.com`;
    const temp_password = crypto.randomBytes(8).toString('hex') + 'Aa1!'; // e.g., 9f86d081884c7d65Aa1!
    
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

        await db.collection('audit_logs').add({
            timestamp: new Date().toISOString(),
            action_type: 'PROVISION_FIRESTORE_RBAC',
            target_employee_id: employee_id,
            status: 'SUCCESS',
            executed_by: 'IdentityFlow_Engine'
        });
        console.log(`✅ Successfully provisioned ${corporate_email} in Firestore.`);

        // 2. Provision User in Google Workspace
        await createWorkspaceUser(first_name, last_name, corporate_email, temp_password);

        await db.collection('audit_logs').add({
            timestamp: new Date().toISOString(),
            action_type: 'PROVISION_GOOGLE_WORKSPACE',
            target_employee_id: employee_id,
            status: 'SUCCESS',
            executed_by: 'IdentityFlow_Engine'
        });

        // Return data needed for EmailJS (Sprint 3)
        return { 
            success: true, 
            email: corporate_email,
            tempPassword: temp_password 
        };

    } catch (error) {
        console.error(`❌ Failed to provision user ${employee_id}:`, error);
        
        // Log failure to audit ledger
        await db.collection('audit_logs').add({
            timestamp: new Date().toISOString(),
            action_type: 'PROVISION_ERROR',
            target_employee_id: employee_id,
            status: 'FAILED',
            error_details: error.message,
            executed_by: 'IdentityFlow_Engine'
        });
        
        throw error;
    }
}

module.exports = { provisionUser };
