import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Users, MessageSquare, Settings, LogOut,
  Bell, Search, Filter, MoreVertical, CheckCircle, Clock, AlertCircle,
  TrendingUp, DollarSign, Eye, Mail, ChevronDown, X, ExternalLink,
  Calendar, Phone, MapPin, Briefcase, Star, ArrowUpRight, Activity,
  Sun, Moon, Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast, { Toaster } from 'react-hot-toast';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Listen to project requests
    const q1 = query(collection(db, 'project_requests'), orderBy('createdAt', 'desc'));
    const unsub1 = onSnapshot(q1, (snap) => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    // Listen to contact messages
    const q2 = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const unsub2 = onSnapshot(q2, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Load clients
    getDocs(collection(db, 'users')).then(snap => {
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }).catch(() => {});

    return () => { unsub1(); unsub2(); };
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateDoc(doc(db, 'project_requests', id), { status });
      toast.success(`Status → ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  const handleMessageStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'contact_messages', id), { status });
      toast.success(`Marked as ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  const handleLogout = async () => { await logout(); navigate('/login'); };

  const formatDate = (ts) => {
    if (!ts) return 'Just now';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  // Stats
  const pending = requests.filter(r => (r.status || 'pending') === 'pending').length;
  const active = requests.filter(r => r.status === 'active').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const unreadMsgs = messages.filter(m => (m.status || 'unread') === 'unread').length;

  // Search filter
  const filteredRequests = requests.filter(r =>
    !searchQuery || 
    r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m =>
    !searchQuery ||
    m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'requests', label: 'Requests', icon: <FileText size={20} />, badge: pending },
    { id: 'clients', label: 'Clients', icon: <Users size={20} />, badge: clients.length },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, badge: unreadMsgs },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="dashboard-layout">
      <Toaster position="top-right" toastOptions={{ style: { background: theme === 'light' ? '#fff' : '#1a1a2e', color: theme === 'light' ? '#0f172a' : '#fff', border: '1px solid rgba(139,92,246,0.2)' }}} />

      {/* ── Sidebar ── */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon">P</div>
            <span className="logo-text">Pixora Admin</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={`nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.icon} <span>{t.label}</span>
              {t.badge > 0 && <span className="badge-count">{t.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button className="nav-item" onClick={() => navigate('/')}>
            <Home size={20} /> <span>Back to Site</span>
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search requests, clients, messages..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="header-actions">
            <button className="icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              {(pending + unreadMsgs) > 0 && <span style={{ position:'absolute',top:'-2px',right:'-2px',width:'8px',height:'8px',borderRadius:'50%',background:'#ef4444' }} />}
            </button>
            <div className="user-profile">
              <div className="profile-img">{user?.name?.charAt(0) || 'A'}</div>
              <div className="profile-info">
                <span className="profile-name">{user?.name || 'Admin'}</span>
                <span className="profile-role">Agency Owner</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          {/* ═══════ OVERVIEW TAB ═══════ */}
          {activeTab === 'overview' && (
            <>
              <div className="welcome-banner">
                <h1>Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋</h1>
                <p>Here's what's happening with your agency today.</p>
              </div>

              <div className="overview-grid">
                {[
                  { icon: <Clock size={24} />, label: 'Pending Requests', value: pending, cls: 'pending', action: () => setActiveTab('requests') },
                  { icon: <CheckCircle size={24} />, label: 'Active Projects', value: active, cls: 'active' },
                  { icon: <Star size={24} />, label: 'Completed', value: completed, cls: 'completed' },
                  { icon: <MessageSquare size={24} />, label: 'Unread Messages', value: unreadMsgs, cls: 'message', action: () => setActiveTab('messages') },
                  { icon: <Users size={24} />, label: 'Total Clients', value: clients.length, cls: 'clients', action: () => setActiveTab('clients') },
                  { icon: <TrendingUp size={24} />, label: 'Total Requests', value: requests.length, cls: 'total' },
                ].map((s, i) => (
                  <div key={i} className="stat-card" onClick={s.action} style={{ cursor: s.action ? 'pointer' : 'default' }}>
                    <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                    <div className="stat-data">
                      <span className="stat-label">{s.label}</span>
                      <h3 className="stat-value">{s.value}</h3>
                    </div>
                    {s.action && <ArrowUpRight size={16} style={{ opacity: 0.3, marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="content-card" style={{ marginTop: '32px' }}>
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <button className="btn btn--secondary btn--sm" onClick={() => setActiveTab('requests')}>View All</button>
                </div>
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead><tr><th>Client</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {requests.slice(0, 5).map(r => (
                        <tr key={r.id} onClick={() => { setSelectedRequest(r); setActiveTab('requests'); }} style={{ cursor: 'pointer' }}>
                          <td><div className="td-client"><strong>{r.name}</strong><span>{r.email}</span></div></td>
                          <td>{r.category}</td>
                          <td><span className={`status-badge ${r.status || 'pending'}`}>{r.status || 'pending'}</span></td>
                          <td>{formatDate(r.createdAt)}</td>
                        </tr>
                      ))}
                      {requests.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--dash-text-sub)' }}>No requests yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ═══════ REQUESTS TAB ═══════ */}
          {activeTab === 'requests' && (
            <>
              <div className="content-card">
                <div className="card-header">
                  <h3>Project Requests ({filteredRequests.length})</h3>
                </div>
                {loading ? (
                  <div className="empty-state">Loading requests...</div>
                ) : filteredRequests.length === 0 ? (
                  <div className="empty-state">No requests found.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="dashboard-table">
                      <thead><tr><th>Client</th><th>Project Type</th><th>Budget</th><th>Timeline</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredRequests.map(r => (
                          <tr key={r.id}>
                            <td>
                              <div className="td-client">
                                <strong>{r.name}</strong>
                                <span>{r.email}</span>
                                {r.phone && <span style={{ fontSize: '11px' }}>{r.phone}</span>}
                              </div>
                            </td>
                            <td><span className="badge--purple" style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '12px', background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>{r.category}</span></td>
                            <td style={{ fontWeight: 600 }}>{r.budget || 'N/A'}</td>
                            <td>{r.timeline || 'N/A'}</td>
                            <td><span className={`status-badge ${r.status || 'pending'}`}>{r.status || 'pending'}</span></td>
                            <td><div style={{ fontSize: '13px' }}>{formatDate(r.createdAt)}<br/><span style={{ color: 'var(--dash-text-sub)', fontSize: '11px' }}>{formatTime(r.createdAt)}</span></div></td>
                            <td>
                              <div className="td-actions">
                                <select className="status-select" value={r.status || 'pending'} onChange={e => handleStatusUpdate(r.id, e.target.value)}
                                  style={{ background: 'var(--dash-card)', color: 'var(--dash-text-main)', border: '1px solid var(--dash-border)', borderRadius: '8px', padding: '6px 10px', fontSize: '12px' }}>
                                  <option value="pending">Pending</option>
                                  <option value="active">Active</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                <button className="icon-btn" onClick={() => setSelectedRequest(r)} title="View Details"><Eye size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Request Detail Modal */}
              {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                  <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3>Request Details</h3>
                      <button className="icon-btn" onClick={() => setSelectedRequest(null)}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                      <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label"><Users size={14} /> Client</span><span className="detail-value">{selectedRequest.name}</span></div>
                        <div className="detail-item"><span className="detail-label"><Mail size={14} /> Email</span><span className="detail-value">{selectedRequest.email}</span></div>
                        {selectedRequest.phone && <div className="detail-item"><span className="detail-label"><Phone size={14} /> Phone</span><span className="detail-value">{selectedRequest.phone}</span></div>}
                        <div className="detail-item"><span className="detail-label"><Briefcase size={14} /> Category</span><span className="detail-value">{selectedRequest.category}</span></div>
                        <div className="detail-item"><span className="detail-label"><DollarSign size={14} /> Budget</span><span className="detail-value">{selectedRequest.budget}</span></div>
                        <div className="detail-item"><span className="detail-label"><Calendar size={14} /> Timeline</span><span className="detail-value">{selectedRequest.timeline || 'Not specified'}</span></div>
                        <div className="detail-item"><span className="detail-label"><Clock size={14} /> Submitted</span><span className="detail-value">{formatDate(selectedRequest.createdAt)}</span></div>
                        <div className="detail-item"><span className="detail-label"><Activity size={14} /> Status</span><span className={`status-badge ${selectedRequest.status || 'pending'}`}>{selectedRequest.status || 'pending'}</span></div>
                      </div>
                      {selectedRequest.description && (
                        <div style={{ marginTop: '20px' }}>
                          <span className="detail-label" style={{ display: 'block', marginBottom: '8px' }}>Project Description</span>
                          <p style={{ color: 'var(--dash-text-sub)', lineHeight: 1.7, fontSize: '14px', background: 'var(--dash-card)', padding: '16px', borderRadius: '12px', border: '1px solid var(--dash-border)' }}>{selectedRequest.description}</p>
                        </div>
                      )}
                      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                        <a href={`mailto:${selectedRequest.email}`} className="btn btn--primary btn--sm"><Mail size={14} /> Email Client</a>
                        <select className="status-select" value={selectedRequest.status || 'pending'} onChange={e => { handleStatusUpdate(selectedRequest.id, e.target.value); setSelectedRequest({...selectedRequest, status: e.target.value}); }}
                          style={{ background: 'var(--dash-card)', color: 'var(--dash-text-main)', border: '1px solid var(--dash-border)', borderRadius: '8px', padding: '8px 14px', fontSize: '13px' }}>
                          <option value="pending">Pending</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════ CLIENTS TAB ═══════ */}
          {activeTab === 'clients' && (
            <div className="content-card">
              <div className="card-header">
                <h3>Registered Clients ({clients.length})</h3>
              </div>
              {clients.length === 0 ? (
                <div className="empty-state">No clients registered yet.</div>
              ) : (
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead><tr><th>Client</th><th>Role</th><th>Joined</th></tr></thead>
                    <tbody>
                      {clients.filter(c => c.role !== 'admin').map(c => (
                        <tr key={c.id}>
                          <td><div className="td-client"><strong>{c.name || 'Unknown'}</strong><span>{c.email}</span></div></td>
                          <td><span className="status-badge active">{c.role || 'client'}</span></td>
                          <td>{formatDate(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ═══════ MESSAGES TAB ═══════ */}
          {activeTab === 'messages' && (
            <>
              <div className="content-card">
                <div className="card-header">
                  <h3>Contact Messages ({filteredMessages.length})</h3>
                </div>
                {filteredMessages.length === 0 ? (
                  <div className="empty-state">No messages found.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="dashboard-table">
                      <thead><tr><th>Sender</th><th>Subject</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredMessages.map(msg => (
                          <tr key={msg.id}>
                            <td><div className="td-client"><strong>{msg.name}</strong><span>{msg.email}</span></div></td>
                            <td>{msg.subject || 'N/A'}</td>
                            <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</td>
                            <td><span className={`status-badge ${msg.status || 'unread'}`}>{msg.status || 'unread'}</span></td>
                            <td>{formatDate(msg.createdAt)}</td>
                            <td>
                              <div className="td-actions">
                                <button className="icon-btn" onClick={() => setSelectedMessage(msg)} title="View"><Eye size={16} /></button>
                                {(msg.status || 'unread') === 'unread' && (
                                  <button className="icon-btn" onClick={() => handleMessageStatus(msg.id, 'read')} title="Mark Read"><CheckCircle size={16} /></button>
                                )}
                                <a href={`mailto:${msg.email}`} className="icon-btn" title="Reply"><Mail size={16} /></a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Message Detail Modal */}
              {selectedMessage && (
                <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
                  <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3>Message from {selectedMessage.name}</h3>
                      <button className="icon-btn" onClick={() => setSelectedMessage(null)}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                      <div className="detail-grid">
                        <div className="detail-item"><span className="detail-label"><Users size={14} /> Name</span><span className="detail-value">{selectedMessage.name}</span></div>
                        <div className="detail-item"><span className="detail-label"><Mail size={14} /> Email</span><span className="detail-value">{selectedMessage.email}</span></div>
                        <div className="detail-item"><span className="detail-label"><FileText size={14} /> Subject</span><span className="detail-value">{selectedMessage.subject || 'N/A'}</span></div>
                        <div className="detail-item"><span className="detail-label"><Calendar size={14} /> Date</span><span className="detail-value">{formatDate(selectedMessage.createdAt)}</span></div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <span className="detail-label" style={{ display: 'block', marginBottom: '8px' }}>Full Message</span>
                        <p style={{ color: 'var(--dash-text-sub)', lineHeight: 1.8, fontSize: '14px', background: 'var(--dash-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--dash-border)' }}>{selectedMessage.message}</p>
                      </div>
                      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                        <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Inquiry'}`} className="btn btn--primary btn--sm"><Mail size={14} /> Reply via Email</a>
                        {(selectedMessage.status || 'unread') === 'unread' && (
                          <button className="btn btn--secondary btn--sm" onClick={() => { handleMessageStatus(selectedMessage.id, 'read'); setSelectedMessage({...selectedMessage, status: 'read'}); }}><CheckCircle size={14} /> Mark as Read</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════ ANALYTICS TAB ═══════ */}
          {activeTab === 'analytics' && (
            <>
              <div className="welcome-banner">
                <h1>Analytics Overview 📊</h1>
                <p>Track your agency's performance at a glance.</p>
              </div>
              <div className="overview-grid">
                {[
                  { label: 'Conversion Rate', value: requests.length > 0 ? Math.round((active + completed) / requests.length * 100) + '%' : '0%', cls: 'active' },
                  { label: 'Avg Response Time', value: '< 24h', cls: 'pending' },
                  { label: 'Client Satisfaction', value: '98%', cls: 'completed' },
                  { label: 'Projects This Month', value: requests.filter(r => { if (!r.createdAt?.toDate) return false; const d = r.createdAt.toDate(); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length, cls: 'message' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className={`stat-icon ${s.cls}`}><TrendingUp size={24} /></div>
                    <div className="stat-data">
                      <span className="stat-label">{s.label}</span>
                      <h3 className="stat-value">{s.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status breakdown */}
              <div className="content-card" style={{ marginTop: '32px' }}>
                <div className="card-header"><h3>Request Status Breakdown</h3></div>
                <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                  {[
                    { label: 'Pending', count: pending, color: '#f7b500', pct: requests.length ? (pending/requests.length*100).toFixed(0) : 0 },
                    { label: 'Active', count: active, color: '#4f6ef7', pct: requests.length ? (active/requests.length*100).toFixed(0) : 0 },
                    { label: 'Completed', count: completed, color: '#2ed47a', pct: requests.length ? (completed/requests.length*100).toFixed(0) : 0 },
                    { label: 'Cancelled', count: requests.filter(r => r.status === 'cancelled').length, color: '#ef4444', pct: requests.length ? (requests.filter(r => r.status === 'cancelled').length/requests.length*100).toFixed(0) : 0 },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: 800, color: s.color, marginBottom: '4px' }}>{s.count}</div>
                      <div style={{ fontSize: '13px', color: 'var(--dash-text-sub)', marginBottom: '12px' }}>{s.label}</div>
                      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--dash-border)', overflow: 'hidden' }}>
                        <div style={{ width: `${s.pct}%`, height: '100%', borderRadius: '3px', background: s.color, transition: 'width 0.6s ease' }} />
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-sub)', marginTop: '6px' }}>{s.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
