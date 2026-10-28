import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import JmlChart from './components/JmlChart';
import TriggerPanel from './components/TriggerPanel';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import ProvisioningQueue from './components/ProvisioningQueue';
import SecurityAlerts from './components/SecurityAlerts';
import AuditLog from './components/AuditLog';
import { Users, Clock, AlertTriangle, Lock } from 'lucide-react';

const sparkActiveData = [
  { v: 1120 }, { v: 1140 }, { v: 1135 }, { v: 1170 }, { v: 1190 }, { v: 1210 }, { v: 1230 }, { v: 1248 }
];
const sparkPendingData = [
  { v: 12 }, { v: 9 }, { v: 10 }, { v: 7 }, { v: 8 }, { v: 5 }, { v: 4 }, { v: 3 }
];
const sparkFailedData = [
  { v: 6 }, { v: 8 }, { v: 5 }, { v: 7 }, { v: 4 }, { v: 5 }, { v: 3 }, { v: 2 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Real-time Event Stream
  const [events, setEvents] = useState([
    { time: '10:33:31', msg: 'Webhook fired for HIRED · nimal.perera', type: 'HIRED' },
    { time: '10:33:34', msg: 'Credential email dispatched', type: 'EMAIL' },
    { time: '10:35:02', msg: 'Access revoked · sanduni.silva', type: 'REVOKED' },
    { time: '10:36:40', msg: 'GitHub provisioning timed out, retry queued', type: 'WARNING' },
  ]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const addToast = (type, title, message) => {
    setToasts((prev) => [...prev, { id: Date.now(), type, title, message }]);
  };

  const addLogEvent = (msg, type) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setEvents((prev) => [{ time, msg, type }, ...prev]);
  };

  const handleHire = async (formData) => {
    setIsLoading(true);
    try {
      await fetch('/api/v1/webhook/hr-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'HIRED',
          data: { employee_id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`, ...formData },
        }),
      });
      addToast('success', 'Employee Provisioned', `Provisioning initiated for ${formData.name}.`);
      addLogEvent(`Webhook fired for HIRED · ${formData.name.toLowerCase().replace(/\s+/g, '.')}`, 'HIRED');
      addLogEvent(`Credential email dispatched to ${formData.name}`, 'EMAIL');
    } catch (err) {
      addToast('error', 'Provisioning Failed', 'Unable to reach backend webhook service.');
      addLogEvent(`Webhook failed for HIRED · ${formData.name}`, 'WARNING');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminateClick = (formData) => {
    setPendingAction(formData);
    setModalOpen(true);
  };

  const handleConfirmTerminate = async () => {
    if (!pendingAction) return;
    setModalOpen(false);
    setIsLoading(true);

    try {
      await fetch('/api/v1/webhook/hr-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'TERMINATED',
          data: { employee_id: 'EMP-9001', ...pendingAction },
        }),
      });
      addToast('success', 'Access Revoked', `All platform credentials removed for ${pendingAction.name}.`);
      addLogEvent(`Access revoked · ${pendingAction.name.toLowerCase().replace(/\s+/g, '.')}`, 'REVOKED');
    } catch (err) {
      addToast('error', 'Revocation Error', 'Failed to execute revocation workflow.');
      addLogEvent(`Revocation check failed · ${pendingAction.name}`, 'WARNING');
    } finally {
      setIsLoading(false);
      setPendingAction(null);
    }
  };

  const handleRetryJob = (employeeName) => {
    addToast('success', 'Retry Queued', `Re-initiating provisioning job for ${employeeName}.`);
    addLogEvent(`Provisioning retry queued · ${employeeName.toLowerCase().replace(/\s+/g, '.')}`, 'HIRED');
  };

  return (
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="px-[36px] pb-[36px] space-y-[20px] max-w-[1600px] w-full mx-auto">
            <Header searchInput={searchInput} setSearchInput={setSearchInput} />

            {/* ROW 1: KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] items-start">
              <KpiCard
                  label="Active Identities"
                  value="1,248"
                  chipText="▲ 12% this month"
                  chipType="success"
                  icon={Users}
                  iconBg="#D8F0F1"
                  iconColor="#147F87"
                  sparkData={sparkActiveData}
                  sparkColor="#147F87"
                  staggerIndex={0}
              />
              <KpiCard
                  label="Pending Provisioning"
                  value="3"
                  chipText="Awaiting webhook sync"
                  chipType="warning"
                  icon={Clock}
                  iconBg="#FEF0C7"
                  iconColor="#DC6803"
                  sparkData={sparkPendingData}
                  sparkColor="#DC6803"
                  onClick={() => setActiveTab('audit')}
                  staggerIndex={1}
              />
              <KpiCard
                  label="Failed Events"
                  value="2"
                  chipText="Needs retry"
                  chipType="danger"
                  icon={AlertTriangle}
                  iconBg="#FEE4E2"
                  iconColor="#D92D20"
                  sparkData={sparkFailedData}
                  sparkColor="#D92D20"
                  onClick={() => setActiveTab('audit')}
                  staggerIndex={2}
              />
              <KpiCard
                  label="MFA Coverage"
                  value="92%"
                  chipText="Target 100%"
                  chipType="purple"
                  icon={Lock}
                  iconBg="#E4E1FF"
                  iconColor="#7C6FE0"
                  isProgress={true}
                  progressVal={92}
                  staggerIndex={3}
              />
            </div>

            {/* ROW 2: Chart & Triggers */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-[20px] items-start">
              <JmlChart />
              <TriggerPanel
                  onHire={handleHire}
                  onTerminate={handleTerminateClick}
                  isLoading={isLoading}
              />
            </div>

            {/* ROW 3: Provisioning Queue & Security Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-[20px] items-start">
              <ProvisioningQueue onRetry={handleRetryJob} />
              <SecurityAlerts onAlertClick={(id) => setActiveTab(id)} />
            </div>

            {/* ROW 4: Audit Log */}
            <AuditLog events={events} />
          </div>
        </main>

        {/* Confirmation Modal & Toasts */}
        <ConfirmModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmTerminate}
            employeeName={pendingAction?.name || ''}
            targetSystems={pendingAction?.systems || []}
        />
        <Toast toasts={toasts} setToasts={setToasts} />
      </div>
  );
}