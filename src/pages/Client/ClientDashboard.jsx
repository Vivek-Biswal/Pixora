import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderGit2,
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Plus,
  CreditCard,
  Search,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Activity,
  ChevronRight,
  Menu,
  X,
  Zap,
  Download,
  UploadCloud,
  FileBadge,
  MoreVertical,
  CalendarDays,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { processPayment } from '../../services/payment';
import { motion, AnimatePresence } from 'framer-motion';
import './ClientDashboard.css';

// --- Premium Mock Data for UX Demonstration ---
const MOCK_ACTIVE_PHASE = "Design & Prototyping";
const MOCK_NEXT_MILESTONE = "Homepage Approval";
const MOCK_DEADLINE = "May 24, 2026";

const MOCK_TIMELINE = [
  { id: 1, title: "Discovery & Strategy", status: "done", date: "May 10" },
  { id: 2, title: "Design & Prototyping", status: "active", date: "In Progress" },
  { id: 3, title: "Development & Integration", status: "pending", date: "Upcoming" },
  { id: 4, title: "QA & Handoff", status: "pending", date: "Upcoming" }
];

const MOCK_FILES = [
  { id: 1, name: "Brand_Guidelines.pdf", type: "document", size: "4.2 MB", date: "May 12" },
  { id: 2, name: "Homepage_v1_Preview.fig", type: "design", size: "12.8 MB", date: "May 15" },
  { id: 3, name: "Copywriting_Draft.docx", type: "document", size: "1.1 MB", date: "May 14" },
];

const MOCK_MESSAGES = [
  { id: 1, sender: "Pixora Team", role: "Agency", time: "10:30 AM", text: "Hi! We just uploaded the v1 designs to the File Vault. Please take a look and let us know your thoughts.", isClient: false },
  { id: 2, sender: "You", role: "Client", time: "11:15 AM", text: "Thanks, looking at them now. The dark theme is exactly what we wanted.", isClient: true },
];

const MOCK_INVOICES = [
  { id: "INV-001", amount: "₹1,000", status: "Pending", desc: "Project Kickoff - 50% Advance", date: "May 15, 2026" },
  { id: "INV-000", amount: "₹500", status: "Paid", desc: "Consultation Retainer", date: "May 01, 2026" }
];

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Firebase Fetch for real data
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'project_requests'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handlePayment = async (amount) => {
    try {
      await processPayment({
        amount: "100000", // 1000 INR
        prefill: { name: user.name, email: user.email },
        handler: (response) => toast.success("Payment successful! ID: " + response.razorpay_payment_id)
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    out: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  // ─── Render: Smart Overview ───
  const renderSmartOverview = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="overview">
      <h1 className="cd-page-title">Good morning, {user?.name?.split(' ')[0]}</h1>
      <p className="cd-page-desc">Here is the current status of your workspace and active deliverables.</p>

      {/* Hero Status Banner */}
      <div className="cd-status-banner" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="cd-badge cd-badge-purple" style={{ marginBottom: '16px' }}>
              <Activity size={12} /> Active Phase
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{MOCK_ACTIVE_PHASE}</h2>
            <p style={{ color: 'var(--cd-text-secondary)', maxWidth: '400px', lineHeight: '1.5' }}>
              Our design team is currently crafting the high-fidelity mockups for your platform. Next review is scheduled soon.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--cd-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Target Deadline</div>
            <div style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarDays size={16} color="var(--cd-accent)" /> {MOCK_DEADLINE}
            </div>
          </div>
        </div>
      </div>

      <div className="cd-grid-overview">
        {/* Left Column: Action Items & Recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="cd-card" style={{ padding: '0' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cd-border)', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Requires Your Attention</h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertCircle size={20} color="var(--cd-warning)" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--cd-text-primary)' }}>Invoice #INV-001 Pending</div>
                    <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)' }}>Advance payment required to lock developer hours.</div>
                  </div>
                </div>
                <button className="cd-btn-primary" onClick={() => handlePayment('1000')} style={{ background: 'var(--cd-warning)', color: '#000' }}>
                  Pay ₹1,000
                </button>
              </div>
            </div>
          </div>

          <div className="cd-card" style={{ padding: '0' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cd-border)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Recent Project Requests</h3>
            </div>
            <table className="cd-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--cd-text-muted)' }}>Loading...</td></tr>
                ) : requests.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--cd-text-muted)' }}>No requests found.</td></tr>
                ) : (
                  requests.slice(0,3).map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: '500' }}>{r.company || 'Personal Project'}</td>
                      <td><span className={`cd-badge ${r.status === 'completed' ? 'cd-badge-green' : r.status === 'active' ? 'cd-badge-purple' : 'cd-badge-gray'}`}>{r.status || 'Pending'}</span></td>
                      <td style={{ color: 'var(--cd-text-secondary)' }}>{r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString() : 'New'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Workflow Timeline */}
        <div className="cd-card">
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>Project Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {MOCK_TIMELINE.map((stage, idx) => (
              <div key={stage.id} className="cd-workflow-stage">
                <div className={`cd-stage-icon ${stage.status === 'done' ? 'cd-stage-done' : stage.status === 'active' ? 'cd-stage-active' : 'cd-stage-pending'}`}>
                  {stage.status === 'done' ? <CheckCircle2 size={16} /> : stage.status === 'active' ? <Clock size={16} /> : <div style={{width: 8, height: 8, borderRadius: '50%', background: 'currentColor'}} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: stage.status === 'active' ? '600' : '500', color: stage.status === 'pending' ? 'var(--cd-text-muted)' : 'var(--cd-text-primary)' }}>{stage.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--cd-text-secondary)', marginTop: '2px' }}>{stage.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ─── Render: Project Workflow ───
  const renderProjectWorkflow = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="cd-page-title">Project Workflow</h1>
          <p className="cd-page-desc" style={{ marginBottom: 0 }}>Detailed tracking of all milestones, revisions, and deliverables.</p>
        </div>
        <button className="cd-btn-primary" onClick={() => navigate('/request')}><Plus size={16} /> New Request</button>
      </div>

      <div className="cd-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--cd-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Pixora Web Platform Rebuild</div>
            <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)' }}>Started on May 10, 2026 • Expected Completion: Jun 15, 2026</div>
          </div>
          <span className="cd-badge cd-badge-purple">Active</span>
        </div>
        
        <div style={{ padding: '32px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--cd-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
            <span>Overall Progress</span>
            <span style={{ color: 'var(--cd-accent-light)' }}>45%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--cd-border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, var(--cd-accent), var(--cd-accent-light))', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>Milestone Breakdown</h3>
          <table className="cd-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Status</th>
                <th>Deliverables</th>
                <th>Est. Completion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '500' }}>1. Discovery & Architecture</td>
                <td><span className="cd-badge cd-badge-green">Completed</span></td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>Sitemap, Wireframes</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>May 12, 2026</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '500' }}>2. Design & UI Prototyping</td>
                <td><span className="cd-badge cd-badge-purple">In Progress</span></td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>Figma Files, Design System</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>May 24, 2026</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '500', color: 'var(--cd-text-muted)' }}>3. Frontend Development</td>
                <td><span className="cd-badge cd-badge-gray">Pending</span></td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>React Components</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>Jun 05, 2026</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '500', color: 'var(--cd-text-muted)' }}>4. QA & Launch</td>
                <td><span className="cd-badge cd-badge-gray">Pending</span></td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>Final Build</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>Jun 15, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  // ─── Render: File Vault ───
  const renderFileVault = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="files">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="cd-page-title">File Vault</h1>
          <p className="cd-page-desc" style={{ marginBottom: 0 }}>Secure access to all your project deliverables and brand assets.</p>
        </div>
        <button className="cd-btn-primary"><UploadCloud size={16} /> Upload Asset</button>
      </div>

      <div className="cd-files-grid">
        {MOCK_FILES.map(file => (
          <div key={file.id} className="cd-file-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--cd-accent-light)' }}>
                {file.type === 'design' ? <FileBadge size={20} /> : <FileText size={20} />}
              </div>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--cd-text-muted)', cursor: 'pointer' }}><MoreVertical size={16}/></button>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px', wordBreak: 'break-all' }}>{file.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--cd-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{file.size}</span>
              <span>{file.date}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // ─── Render: Communication Hub ───
  const renderCommunicationHub = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="messages">
      <h1 className="cd-page-title">Communication Hub</h1>
      <p className="cd-page-desc">Direct line to the Pixora engineering and design teams.</p>

      <div className="cd-card" style={{ padding: 0, display: 'flex', height: '600px', overflow: 'hidden' }}>
        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--cd-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="cd-avatar" style={{ background: 'var(--cd-accent)', color: '#fff' }}>P</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Pixora Core Team</div>
              <div style={{ fontSize: '12px', color: 'var(--cd-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 6, height: 6, background: 'var(--cd-success)', borderRadius: '50%' }} /> Usually replies in a few hours
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {MOCK_MESSAGES.map(msg => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isClient ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--cd-text-secondary)' }}>{msg.sender}</span>
                  <span style={{ fontSize: '10px', color: 'var(--cd-text-muted)' }}>{msg.time}</span>
                </div>
                <div style={{ 
                  background: msg.isClient ? 'var(--cd-text-primary)' : 'rgba(255,255,255,0.05)', 
                  color: msg.isClient ? '#000' : '#fff',
                  border: msg.isClient ? 'none' : '1px solid var(--cd-border)',
                  padding: '12px 16px', 
                  borderRadius: msg.isClient ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  maxWidth: '70%',
                  fontSize: '13px',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid var(--cd-border)', background: 'var(--cd-surface-solid)' }}>
            <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cd-border)', borderRadius: '8px', padding: '8px' }}>
              <input type="text" placeholder="Type a message..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', padding: '0 8px', fontSize: '13px' }} />
              <button className="cd-btn-primary" style={{ padding: '8px', borderRadius: '6px' }}><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ─── Render: Billing Center ───
  const renderBillingCenter = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="billing">
      <h1 className="cd-page-title">Billing & Payments</h1>
      <p className="cd-page-desc">Manage your invoices, retainers, and secure payment methods.</p>

      <div className="cd-card" style={{ padding: 0, marginBottom: '32px' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--cd-border)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Invoice History</h3>
        </div>
        <table className="cd-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--cd-text-secondary)' }}>{inv.id}</td>
                <td style={{ fontWeight: '500' }}>{inv.desc}</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>{inv.date}</td>
                <td style={{ fontWeight: '600' }}>{inv.amount}</td>
                <td><span className={`cd-badge ${inv.status === 'Paid' ? 'cd-badge-green' : 'cd-badge-gray'}`}>{inv.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  {inv.status === 'Pending' ? (
                    <button className="cd-btn-primary" onClick={() => handlePayment('1000')} style={{ padding: '6px 12px', fontSize: '11px' }}>Pay Now</button>
                  ) : (
                    <button className="cd-btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}><Download size={14} /> PDF</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <div className="cd-layout">
      <Toaster position="top-right" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' } }} />
      
      {/* ─── Sidebar Navigation ─── */}
      <aside className={`cd-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/" className="cd-logo">
          <div className="cd-logo-icon">P</div>
          <span className="cd-logo-text">Pixora</span>
        </Link>

        <div className="cd-nav-group-title">Workspace</div>
        <nav className="cd-nav">
          <button className={`cd-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={16} /> Overview
          </button>
          <button className={`cd-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <FolderGit2 size={16} /> Projects
          </button>
          <button className={`cd-nav-item ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
            <FileBadge size={16} /> File Vault
          </button>
        </nav>

        <div className="cd-nav-group-title">Account & Support</div>
        <nav className="cd-nav">
          <button className={`cd-nav-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => setActiveTab('billing')}>
            <CreditCard size={16} /> Billing
          </button>
          <button className={`cd-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <MessageSquare size={16} /> Support
          </button>
        </nav>

        <div className="cd-sidebar-footer">
          <div className="cd-user-profile" onClick={() => navigate('/settings')}>
            <div className="cd-avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--cd-text-secondary)' }}>Client Portal</div>
            </div>
            <Settings size={14} color="var(--cd-text-muted)" />
          </div>
          <button className="cd-nav-item" onClick={handleLogout} style={{ marginTop: '8px', color: 'var(--cd-danger)' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="cd-main">
        <header className="cd-header">
          <div className="cd-breadcrumbs">
            <span>Pixora OS</span> <ChevronRight size={14} /> <span style={{ textTransform: 'capitalize' }}>{activeTab}</span>
          </div>
          
          <div className="cd-header-actions">
            <div className={`cd-search-bar ${searchFocused ? 'focused' : ''}`}>
              <Search size={14} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                onFocus={() => setSearchFocused(true)} 
                onBlur={() => setSearchFocused(false)} 
              />
              <span style={{ fontSize: '10px', color: 'var(--cd-text-muted)', border: '1px solid var(--cd-border)', padding: '2px 4px', borderRadius: '4px' }}>⌘K</span>
            </div>
            <button className="cd-btn-secondary" style={{ padding: '6px', borderRadius: '50%' }}>
              <Bell size={16} />
            </button>
            <button className="cd-btn-primary" onClick={() => navigate('/request')}>
              <Plus size={16} /> New Request
            </button>
          </div>
        </header>

        <div className="cd-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && renderSmartOverview()}
            {activeTab === 'files' && renderFileVault()}
            {activeTab === 'messages' && renderCommunicationHub()}
            {activeTab === 'billing' && renderBillingCenter()}
            {activeTab === 'projects' && renderProjectWorkflow()} 
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
