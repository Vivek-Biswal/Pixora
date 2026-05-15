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
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Activity,
  ChevronRight,
  MoreHorizontal,
  Menu,
  X,
  TrendingUp,
  Calendar,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { processPayment } from '../../services/payment';
import { motion, AnimatePresence } from 'framer-motion';
import './ClientDashboard.css';

// --- Dummy Data for Premium Feel ---
const dummyActivities = [
  { id: 1, action: "Project status updated to", target: "In Progress", time: "2 hours ago", icon: Activity, type: "project" },
  { id: 2, action: "Invoice #INV-2026-001 generated for", target: "Advance Payment", time: "5 hours ago", icon: FileText, type: "payment" },
  { id: 3, action: "New message received from", target: "Pixora Team", time: "1 day ago", icon: MessageSquare, type: "message" },
  { id: 4, action: "Project request submitted", target: "SaaS Dashboard Redesign", time: "2 days ago", icon: FolderGit2, type: "project" },
];

const dummyInvoices = [
  { id: "INV-2026-001", date: "May 15, 2026", amount: "₹1,000", status: "Pending", desc: "Advance Payment" },
  { id: "INV-2026-000", date: "May 01, 2026", amount: "₹5,000", status: "Paid", desc: "Discovery Phase" }
];

const dummyReminders = [
  { id: 1, title: "Kickoff Meeting", date: "May 18, 2026", time: "10:00 AM", icon: Calendar },
  { id: 2, title: "Design Review", date: "May 22, 2026", time: "2:00 PM", icon: Target },
];

const dummySupportTickets = [
  { id: "TKT-001", title: "Integration Help Needed", status: "open", priority: "high", created: "2 days ago" },
  { id: "TKT-002", title: "Feature Request: Dark Mode", status: "closed", priority: "low", created: "1 week ago" },
];

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'project_requests'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Request timed out. Please check your connection.");
      }
    }, 8000);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(timeoutId);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      setLoading(false);
      setError(null);
    }, (err) => {
      clearTimeout(timeoutId);
      setError("Failed to load projects.");
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user]);

  const handlePayment = async () => {
    try {
      await processPayment({
        amount: "100000", // 1000 INR
        prefill: {
          name: user.name,
          email: user.email
        },
        handler: function(response) {
          toast.success("Payment successful! Payment ID: " + response.razorpay_payment_id);
        }
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

  // --- Render Tabs ---

  const renderOverview = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="overview">
      <div className="cd-page-title">Dashboard</div>
      <div className="cd-page-subtitle">Welcome back, {user?.name?.split(' ')[0]}. Here's your project snapshot.</div>

      {/* Stats Row */}
      <div className="cd-grid-4">
        <motion.div className="cd-card cd-stat-card" whileHover={{ y: -4 }}>
          <div className="cd-stat-header">
            <div className="cd-stat-icon"><FolderGit2 size={18} /></div>
            Total Projects
          </div>
          <div className="cd-stat-value">{loading ? '-' : requests.length}</div>
          <div className="cd-stat-trend cd-trend-positive"><ArrowUpRight size={14} /> 1 new this week</div>
        </motion.div>

        <motion.div className="cd-card cd-stat-card" whileHover={{ y: -4 }}>
          <div className="cd-stat-header">
            <div className="cd-stat-icon cd-icon-accent"><Activity size={18} /></div>
            Active Phase
          </div>
          <div className="cd-stat-value">{loading ? '-' : requests.filter(r => r.status === 'active').length}</div>
          <div className="cd-stat-trend cd-trend-neutral">In progress</div>
        </motion.div>

        <motion.div className="cd-card cd-stat-card" whileHover={{ y: -4 }}>
          <div className="cd-stat-header">
            <div className="cd-stat-icon cd-icon-warning"><CreditCard size={18} /></div>
            Pending Payments
          </div>
          <div className="cd-stat-value">1</div>
          <div className="cd-stat-trend cd-trend-neutral" style={{ color: 'var(--cd-warning)' }}>Action Required</div>
        </motion.div>

        <motion.div className="cd-card cd-stat-card" whileHover={{ y: -4 }}>
          <div className="cd-stat-header">
            <div className="cd-stat-icon cd-icon-success"><CheckCircle2 size={18} /></div>
            Completed
          </div>
          <div className="cd-stat-value">{loading ? '-' : requests.filter(r => r.status === 'completed').length}</div>
          <div className="cd-stat-trend cd-trend-positive"><TrendingUp size={14} /> On track</div>
        </motion.div>
      </div>

      {/* Main Grid: Projects + Activity */}
      <div className="cd-grid-2-1">
        <motion.div className="cd-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Recent Projects</div>
            <button className="cd-btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveTab('projects')}>
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="cd-activity-list">
              <div className="cd-sk-line long"></div>
              <div className="cd-sk-line medium"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon"><FolderGit2 size={24} /></div>
              <div className="cd-empty-title">No projects yet</div>
              <div className="cd-empty-desc">Create your first project request to get started with Pixora and unlock premium web solutions.</div>
              <button className="cd-btn-primary" onClick={() => navigate('/request')}><Plus size={16} /> New Request</button>
            </div>
          ) : (
            <div className="cd-table-container">
              <table className="cd-table" style={{ fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 3).map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.company || 'Personal Project'}</td>
                      <td>
                        <span className={`cd-badge cd-badge-${r.status || 'pending'}`}>
                          {r.status || 'pending'}
                        </span>
                      </td>
                      <td style={{ width: '40%' }}>
                        <div className="cd-progress-container" style={{ marginTop: 0 }}>
                          <div className="cd-progress-bar-bg">
                            <div className="cd-progress-bar-fill" style={{ width: r.status === 'completed' ? '100%' : r.status === 'active' ? '45%' : '15%' }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <motion.div className="cd-card">
          <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Recent Activity</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['all', 'project', 'payment', 'message'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActivityFilter(filter)}
                  className={`cd-filter-btn ${activityFilter === filter ? 'active' : ''}`}
                  style={{ fontSize: '11px', padding: '4px 8px' }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="cd-activity-list" style={{ marginTop: '16px' }}>
            {dummyActivities
              .filter(act => activityFilter === 'all' || act.type === activityFilter)
              .map((act, i) => {
                const IconComponent = act.icon;
                return (
                  <div className="cd-activity-item" key={act.id}>
                    <div className="cd-activity-icon"><IconComponent size={16} /></div>
                    <div className="cd-activity-content">
                      <div className="cd-activity-text">{act.action} <span>{act.target}</span></div>
                      <div className="cd-activity-time">{act.time}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Widgets */}
      <div className="cd-grid-3">
        <motion.div className="cd-card cd-widget-card" whileHover={{ borderColor: 'var(--cd-border-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="cd-widget-icon"><Calendar size={18} /></div>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Upcoming</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)', lineHeight: '1.6' }}>
            {dummyReminders.length > 0 ? (
              <>
                <div style={{ fontWeight: 500, color: 'var(--cd-text-primary)' }}>{dummyReminders[0].title}</div>
                <div>{dummyReminders[0].date} at {dummyReminders[0].time}</div>
              </>
            ) : 'No upcoming reminders'}
          </div>
        </motion.div>

        <motion.div className="cd-card cd-widget-card" whileHover={{ borderColor: 'var(--cd-border-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="cd-widget-icon"><AlertCircle size={18} /></div>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Support Tickets</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)', lineHeight: '1.6' }}>
            <div><span style={{ color: 'var(--cd-text-primary)', fontWeight: 500 }}>{dummySupportTickets.filter(t => t.status === 'open').length}</span> open ticket{dummySupportTickets.filter(t => t.status === 'open').length !== 1 ? 's' : ''}</div>
            <button className="cd-btn-secondary" style={{ fontSize: '11px', padding: '4px 8px', marginTop: '8px' }}>View All</button>
          </div>
        </motion.div>

        <motion.div className="cd-card cd-widget-card" whileHover={{ borderColor: 'var(--cd-border-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="cd-widget-icon"><Zap size={18} /></div>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Quick Actions</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="cd-btn-secondary" style={{ fontSize: '12px', padding: '8px 12px', justifyContent: 'flex-start' }}>
              <Plus size={14} /> New Request
            </button>
            <button className="cd-btn-secondary" style={{ fontSize: '12px', padding: '8px 12px', justifyContent: 'flex-start' }}>
              <MessageSquare size={14} /> Send Message
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderProjects = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div className="cd-page-title">Projects</div>
          <div className="cd-page-subtitle" style={{ marginBottom: 0 }}>Manage your requests and track progress across all phases.</div>
        </div>
        <button className="cd-btn-primary" onClick={() => navigate('/request')}>
          <Plus size={16} /> New Request
        </button>
      </div>

      {loading ? (
        <div className="cd-card">
          <div style={{ padding: '24px' }}>
            <div className="cd-sk-line long"></div>
            <div className="cd-sk-line medium"></div>
            <div className="cd-sk-line long"></div>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="cd-empty" style={{ minHeight: '300px' }}>
          <div className="cd-empty-icon"><FolderGit2 size={32} /></div>
          <div className="cd-empty-title">No projects found</div>
          <div className="cd-empty-desc">You haven't submitted any project requests yet. Start your journey with Pixora today.</div>
          <button className="cd-btn-primary" onClick={() => navigate('/request')}><Plus size={16} /> Create First Request</button>
        </div>
      ) : (
        <div className="cd-projects-grid">
          {requests.map(r => (
            <motion.div key={r.id} className="cd-project-card" whileHover={{ y: -4, borderColor: 'var(--cd-border-hover)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cd-text-primary)', marginBottom: '4px' }}>
                    {r.company || 'Personal Project'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)' }}>
                    {r.category || 'General'}
                  </div>
                </div>
                <button className="cd-btn-icon" style={{ width: '32px', height: '32px' }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span className={`cd-badge cd-badge-${r.status || 'pending'}`}>
                  {(r.status || 'pending').charAt(0).toUpperCase() + (r.status || 'pending').slice(1)}
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--cd-text-secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Progress</span>
                  <span>{r.status === 'completed' ? '100' : r.status === 'active' ? '45' : '15'}%</span>
                </div>
                <div className="cd-progress-bar-bg">
                  <div className="cd-progress-bar-fill" style={{ width: r.status === 'completed' ? '100%' : r.status === 'active' ? '45%' : '15%' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--cd-text-secondary)', marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid var(--cd-border)' }}>
                <span>Submitted {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString() : 'recently'}</span>
              </div>

              <button className="cd-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderBilling = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="billing">
      <div className="cd-page-title">Billing & Payments</div>
      <div className="cd-page-subtitle">Manage your payment methods and view past invoices.</div>

      <div className="cd-grid-2-1">
        <div className="cd-billing-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cd-accent)', fontWeight: 500, fontSize: '14px' }}>
            <AlertCircle size={16} /> Action Required
          </div>
          <div className="cd-billing-amount">₹1,000.00</div>
          <p style={{ color: 'var(--cd-text-secondary)', marginBottom: '32px', fontSize: '15px', lineHeight: '1.5', maxWidth: '400px' }}>
            Secure your project slot with a 50% advance payment. Once paid, our team will begin the discovery phase immediately.
          </p>
          <button className="cd-btn-primary" onClick={handlePayment} style={{ width: 'auto', padding: '12px 24px' }}>
            <CreditCard size={16} /> Pay with Razorpay
          </button>
        </div>

        <div className="cd-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>Payment Methods</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cd-text-muted)', fontSize: '13px', textAlign: 'center', border: '1px dashed var(--cd-border)', borderRadius: 'var(--cd-radius-sm)' }}>
            No saved payment methods.<br />Cards will be saved securely via Razorpay after first transaction.
          </div>
        </div>
      </div>

      <div className="cd-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--cd-border)', fontWeight: 600, fontSize: '15px' }}>
          Invoice History
        </div>
        <table className="cd-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {dummyInvoices.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--cd-text-secondary)' }}>{inv.id}</td>
                <td>{inv.desc}</td>
                <td style={{ fontWeight: 500 }}>{inv.amount}</td>
                <td style={{ color: 'var(--cd-text-secondary)' }}>{inv.date}</td>
                <td>
                  <span className={`cd-badge ${inv.status === 'Paid' ? 'cd-badge-completed' : 'cd-badge-pending'}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="cd-btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderMessages = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="messages">
      <div className="cd-page-title">Support & Messages</div>
      <div className="cd-page-subtitle">Communicate directly with the Pixora team.</div>

      <div className="cd-card" style={{ height: '600px', display: 'flex', flexDirection: 'column', padding: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--cd-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="cd-avatar" style={{ background: 'var(--cd-accent)', width: '40px', height: '40px' }}>P</div>
          <div>
            <div style={{ fontWeight: 600 }}>Pixora Team</div>
            <div style={{ fontSize: '12px', color: 'var(--cd-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--cd-success)', borderRadius: '50%' }}></div>
              Online
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <div style={{ alignSelf: 'center', fontSize: '12px', color: 'var(--cd-text-muted)' }}>Today, 10:42 AM</div>
          <div style={{ background: 'var(--cd-bg)', border: '1px solid var(--cd-border)', padding: '12px 16px', borderRadius: '12px 12px 12px 0', maxWidth: '70%', alignSelf: 'flex-start' }}>
            Hello {user?.name?.split(' ')[0]}! Welcome to your new dashboard. If you have any questions about your project or need assistance, feel free to drop a message here.
          </div>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--cd-border)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              style={{ flex: 1, background: 'var(--cd-bg)', border: '1px solid var(--cd-border)', borderRadius: 'var(--cd-radius-sm)', padding: '12px 16px', color: 'var(--cd-text-primary)', outline: 'none' }}
            />
            <button className="cd-btn-primary">Send</button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="cd-layout">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
      }} />
      
      {/* Sidebar with mobile toggle */}
      <aside className={`cd-sidebar ${sidebarOpen ? 'cd-sidebar-open' : 'cd-sidebar-closed'}`}>
        <div className="cd-sidebar-header">
          <Link to="/" className="cd-logo">
            <div className="cd-logo-icon">P</div>
            <span className="cd-logo-text">Pixora</span>
          </Link>
          <button 
            className="cd-sidebar-toggle cd-mobile-only"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="cd-nav">
          <button 
            className={`cd-nav-item ${activeTab === 'overview' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            className={`cd-nav-item ${activeTab === 'projects' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}
          >
            <FolderGit2 size={18} /> Projects
          </button>
          <button 
            className={`cd-nav-item ${activeTab === 'billing' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('billing'); setSidebarOpen(false); }}
          >
            <CreditCard size={18} /> Billing
          </button>
          <button 
            className={`cd-nav-item ${activeTab === 'messages' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
          >
            <MessageSquare size={18} /> Support
          </button>
        </nav>

        <div className="cd-sidebar-footer">
          <div className="cd-user-profile">
            <div className="cd-avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div className="cd-user-info">
              <span className="cd-user-name">{user?.name}</span>
              <span className="cd-user-plan">Client Portal</span>
            </div>
          </div>
          <button 
            className="cd-nav-item" 
            onClick={() => navigate('/settings')} 
            style={{ color: 'var(--cd-text-secondary)' }}
          >
            <Settings size={18} /> Settings
          </button>
          <button 
            className="cd-nav-item" 
            onClick={handleLogout} 
            style={{ color: 'var(--cd-text-secondary)' }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cd-main">
        <header className="cd-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="cd-sidebar-toggle cd-mobile-only"
              onClick={() => setSidebarOpen(true)}
              style={{ display: sidebarOpen ? 'none' : 'flex' }}
            >
              <Menu size={20} />
            </button>
            <div className="cd-breadcrumbs">
              <span>Pixora</span> <ChevronRight size={14} /> <span style={{ textTransform: 'capitalize' }}>{activeTab}</span>
            </div>
          </div>
          
          <div className="cd-header-actions">
            <div style={{ position: 'relative', flex: 1, maxWidth: '280px' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--cd-text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                style={{ 
                  width: '100%', background: 'var(--cd-surface)', border: '1px solid var(--cd-border)', 
                  padding: '10px 12px 10px 36px', borderRadius: 'var(--cd-radius-sm)', color: 'var(--cd-text-primary)', outline: 'none', fontSize: '13px', transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--cd-border-hover)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--cd-border)'}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <button 
                className="cd-btn-icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{ position: 'relative' }}
              >
                <Bell size={18} />
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', background: 'var(--cd-accent)', borderRadius: '50%' }}></span>
              </button>
              
              {notificationsOpen && (
                <div className="cd-notifications-dropdown">
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--cd-border)' }}>
                    Notifications
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)', textAlign: 'center', padding: '20px 12px' }}>
                    No new notifications
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="cd-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'projects' && renderProjects()}
            {activeTab === 'billing' && renderBilling()}
            {activeTab === 'messages' && renderMessages()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
