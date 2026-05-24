import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Users, MessageSquare, TrendingUp, LogOut, Bell, Search, CheckCircle, Clock, Star, X, Eye, Mail, Calendar, Phone, Briefcase, DollarSign, Activity, Sun, Moon, Home, ArrowUpRight, ChevronDown } from 'lucide-react';
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
    const u1 = onSnapshot(query(collection(db, 'project_requests'), orderBy('createdAt', 'desc')), s => { setRequests(s.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); });
    const u2 = onSnapshot(query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc')), s => setMessages(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    getDocs(collection(db, 'users')).then(s => setClients(s.docs.map(d => ({ id: d.id, ...d.data() })))).catch(() => {});
    return () => { u1(); u2(); };
  }, []);

  const updateStatus = async (id, status) => { try { await updateDoc(doc(db, 'project_requests', id), { status }); toast.success(`Status → ${status}`); } catch { toast.error('Failed'); } };
  const updateMsgStatus = async (id, status) => { try { await updateDoc(doc(db, 'contact_messages', id), { status }); toast.success(`Marked ${status}`); } catch { toast.error('Failed'); } };
  const handleLogout = async () => { await logout(); navigate('/login'); };
  const fmt = ts => { if (!ts) return 'Just now'; const d = ts.toDate ? ts.toDate() : new Date(ts); return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const fmtTime = ts => { if (!ts) return ''; const d = ts.toDate ? ts.toDate() : new Date(ts); return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); };

  const pending = requests.filter(r => (r.status || 'pending') === 'pending').length;
  const active = requests.filter(r => r.status === 'active').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const unread = messages.filter(m => (m.status || 'unread') === 'unread').length;
  const sq = searchQuery.toLowerCase();
  const fReqs = requests.filter(r => !sq || r.name?.toLowerCase().includes(sq) || r.email?.toLowerCase().includes(sq) || r.category?.toLowerCase().includes(sq));
  const fMsgs = messages.filter(m => !sq || m.name?.toLowerCase().includes(sq) || m.email?.toLowerCase().includes(sq));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'requests', label: 'Requests', icon: <FileText size={18} />, badge: pending },
    { id: 'clients', label: 'Clients', icon: <Users size={18} />, badge: clients.filter(c=>c.role!=='admin').length },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, badge: unread },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} /> },
  ];

  const DetailModal = ({ data, onClose, type }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{type === 'request' ? 'Request Details' : `Message from ${data.name}`}</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item"><span className="detail-label"><Users size={13} /> Name</span><span className="detail-value">{data.name}</span></div>
            <div className="detail-item"><span className="detail-label"><Mail size={13} /> Email</span><span className="detail-value">{data.email}</span></div>
            {data.phone && <div className="detail-item"><span className="detail-label"><Phone size={13} /> Phone</span><span className="detail-value">{data.phone}</span></div>}
            {type === 'request' && <>
              <div className="detail-item"><span className="detail-label"><Briefcase size={13} /> Category</span><span className="detail-value">{data.category}</span></div>
              <div className="detail-item"><span className="detail-label"><DollarSign size={13} /> Budget</span><span className="detail-value">{data.budget || 'N/A'}</span></div>
              <div className="detail-item"><span className="detail-label"><Calendar size={13} /> Timeline</span><span className="detail-value">{data.timeline || 'N/A'}</span></div>
            </>}
            {type === 'message' && <div className="detail-item"><span className="detail-label"><FileText size={13} /> Subject</span><span className="detail-value">{data.subject || 'N/A'}</span></div>}
            <div className="detail-item"><span className="detail-label"><Clock size={13} /> Date</span><span className="detail-value">{fmt(data.createdAt)}</span></div>
            <div className="detail-item"><span className="detail-label"><Activity size={13} /> Status</span><span className={`status-badge ${data.status || (type === 'request' ? 'pending' : 'unread')}`}>{data.status || (type === 'request' ? 'pending' : 'unread')}</span></div>
          </div>
          {(data.description || data.message) && (
            <div style={{ marginTop: '20px' }}>
              <span className="detail-label" style={{ display: 'block', marginBottom: '8px' }}>{type === 'request' ? 'Description' : 'Full Message'}</span>
              <p style={{ color: 'var(--dash-text-sub)', lineHeight: 1.8, fontSize: '13px', background: 'var(--dash-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--dash-border)', margin: 0 }}>{data.description || data.message}</p>
            </div>
          )}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href={`mailto:${data.email}${type === 'message' ? `?subject=Re: ${data.subject || ''}` : ''}`} className="btn btn--primary btn--sm" style={{ textDecoration: 'none' }}><Mail size={14} /> {type === 'request' ? 'Email Client' : 'Reply'}</a>
            {type === 'request' && (
              <select value={data.status || 'pending'} onChange={e => { updateStatus(data.id, e.target.value); setSelectedRequest({...data, status: e.target.value}); }}
                style={{ background: 'var(--dash-surface-2)', color: 'var(--dash-text-main)', border: '1px solid var(--dash-border)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', cursor: 'pointer' }}>
                <option value="pending">Pending</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
              </select>
            )}
            {type === 'message' && (data.status || 'unread') === 'unread' && (
              <button className="btn btn--secondary btn--sm" onClick={() => { updateMsgStatus(data.id, 'read'); setSelectedMessage({...data, status: 'read'}); }}><CheckCircle size={14} /> Mark Read</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Toaster position="top-right" toastOptions={{ style: { background: theme === 'light' ? '#fff' : '#14141e', color: theme === 'light' ? '#0f172a' : '#f1f5f9', border: '1px solid rgba(99,102,241,0.2)', fontSize: '13px' }}} />

      <aside className="dashboard-sidebar">
        <div className="sidebar-logo" style={{ marginBottom: '12px' }}>
          <div style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-icon" style={{ background: 'var(--dash-blue)', color: '#fff' }}>P</div>
            <span className="logo-text">Pixora Admin</span>
          </div>
        </div>
        <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <button className="nav-item" onClick={() => navigate('/')} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--dash-border)' }}>
            <Home size={18} /><span>Back to Site</span>
          </button>
        </div>
        <div className="sidebar-section-label">Menu</div>
        <nav className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={`nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => { setActiveTab(t.id); setSearchQuery(''); }}>
              {t.icon} <span>{t.label}</span>
              {t.badge > 0 && <span className="badge-count">{t.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}<span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span></button>
          <button className="nav-item logout" onClick={handleLogout}><LogOut size={18} /><span>Sign Out</span></button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={16} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <span className="search-shortcut">⌘K</span>
          </div>
          <div className="header-actions">
            <button className="header-icon-btn" onClick={() => navigate('/')} title="Back to Site">
              <Home size={18} />
            </button>
            <button className="header-icon-btn">
              <Bell size={18} />
              {(pending + unread) > 0 && <span className="notification-dot" />}
            </button>
            <div className="user-profile">
              <div className="profile-info">
                <span className="profile-name">{user?.name || 'Admin'}</span>
                <span className="profile-role">Owner</span>
              </div>
              <div className="profile-img">{user?.name?.charAt(0) || 'A'}</div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (<>
            <div className="welcome-banner">
              <h1>Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋</h1>
              <p>Here's your agency overview for today.</p>
            </div>
            <div className="overview-grid">
              {[
                { icon: <Clock size={22} />, label: 'Pending', value: pending, cls: 'pending', go: () => setActiveTab('requests') },
                { icon: <CheckCircle size={22} />, label: 'Active Projects', value: active, cls: 'active' },
                { icon: <Star size={22} />, label: 'Completed', value: completed, cls: 'completed' },
                { icon: <MessageSquare size={22} />, label: 'Unread Messages', value: unread, cls: 'message', go: () => setActiveTab('messages') },
                { icon: <Users size={22} />, label: 'Total Clients', value: clients.filter(c=>c.role!=='admin').length, cls: 'clients', go: () => setActiveTab('clients') },
                { icon: <TrendingUp size={22} />, label: 'Total Requests', value: requests.length, cls: 'total' },
              ].map((s, i) => (
                <div key={i} className="stat-card" onClick={s.go} style={{ cursor: s.go ? 'pointer' : 'default' }}>
                  <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                  <div className="stat-data"><span className="stat-label">{s.label}</span><h3 className="stat-value">{s.value}</h3></div>
                  {s.go && <ArrowUpRight size={14} style={{ opacity: 0.25 }} />}
                </div>
              ))}
            </div>
            <div className="content-card">
              <div className="card-header"><h3>Recent Activity</h3><button className="btn btn--secondary btn--sm" onClick={() => setActiveTab('requests')}>View All</button></div>
              <div className="table-responsive"><table className="dashboard-table">
                <thead><tr><th>Client</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {requests.slice(0, 6).map(r => (
                    <tr key={r.id} onClick={() => { setSelectedRequest(r); setActiveTab('requests'); }} style={{ cursor: 'pointer' }}>
                      <td><div className="td-client"><strong>{r.name}</strong><span>{r.email}</span></div></td>
                      <td>{r.category}</td>
                      <td><span className={`status-badge ${r.status || 'pending'}`}>{r.status || 'pending'}</span></td>
                      <td style={{ fontSize: '12px', color: 'var(--dash-text-sub)' }}>{fmt(r.createdAt)}</td>
                    </tr>
                  ))}
                  {requests.length === 0 && <tr><td colSpan="4" className="empty-state">No activity yet</td></tr>}
                </tbody>
              </table></div>
            </div>
          </>)}

          {/* REQUESTS */}
          {activeTab === 'requests' && (<>
            <div className="content-card">
              <div className="card-header"><h3>Project Requests ({fReqs.length})</h3></div>
              {loading ? <div className="loading-state">Loading...</div> : fReqs.length === 0 ? <div className="empty-state">No requests found.</div> : (
                <div className="table-responsive"><table className="dashboard-table">
                  <thead><tr><th>Client</th><th>Type</th><th>Budget</th><th>Timeline</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>{fReqs.map(r => (
                    <tr key={r.id}>
                      <td><div className="td-client"><strong>{r.name}</strong><span>{r.email}</span>{r.phone && <span>{r.phone}</span>}</div></td>
                      <td><span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(99,102,241,0.1)', color: 'var(--dash-blue)', fontWeight: 600 }}>{r.category}</span></td>
                      <td style={{ fontWeight: 600 }}>{r.budget || '—'}</td>
                      <td>{r.timeline || '—'}</td>
                      <td><span className={`status-badge ${r.status || 'pending'}`}>{r.status || 'pending'}</span></td>
                      <td><div style={{ fontSize: '12px' }}>{fmt(r.createdAt)}<br/><span style={{ color: 'var(--dash-text-dim)', fontSize: '11px' }}>{fmtTime(r.createdAt)}</span></div></td>
                      <td><div className="td-actions">
                        <select value={r.status || 'pending'} onChange={e => updateStatus(r.id, e.target.value)} style={{ background: 'var(--dash-surface-2)', color: 'var(--dash-text-main)', border: '1px solid var(--dash-border)', borderRadius: '6px', padding: '5px 8px', fontSize: '11px', cursor: 'pointer' }}>
                          <option value="pending">Pending</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                        </select>
                        <button className="icon-btn" onClick={() => setSelectedRequest(r)} title="Details"><Eye size={15} /></button>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </div>
            {selectedRequest && <DetailModal data={selectedRequest} onClose={() => setSelectedRequest(null)} type="request" />}
          </>)}

          {/* CLIENTS */}
          {activeTab === 'clients' && (
            <div className="content-card">
              <div className="card-header"><h3>Registered Clients ({clients.filter(c=>c.role!=='admin').length})</h3></div>
              {clients.filter(c=>c.role!=='admin').length === 0 ? <div className="empty-state">No clients yet.</div> : (
                <div className="table-responsive"><table className="dashboard-table">
                  <thead><tr><th>Client</th><th>Role</th><th>Joined</th></tr></thead>
                  <tbody>{clients.filter(c=>c.role!=='admin').map(c => (
                    <tr key={c.id}>
                      <td><div className="td-client"><strong>{c.name || 'Unknown'}</strong><span>{c.email}</span></div></td>
                      <td><span className="status-badge active">{c.role || 'client'}</span></td>
                      <td style={{ fontSize: '12px', color: 'var(--dash-text-sub)' }}>{fmt(c.createdAt)}</td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (<>
            <div className="content-card">
              <div className="card-header"><h3>Messages ({fMsgs.length})</h3></div>
              {fMsgs.length === 0 ? <div className="empty-state">No messages.</div> : (
                <div className="table-responsive"><table className="dashboard-table">
                  <thead><tr><th>Sender</th><th>Subject</th><th>Preview</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>{fMsgs.map(m => (
                    <tr key={m.id}>
                      <td><div className="td-client"><strong>{m.name}</strong><span>{m.email}</span></div></td>
                      <td>{m.subject || '—'}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--dash-text-sub)' }}>{m.message}</td>
                      <td><span className={`status-badge ${m.status || 'unread'}`}>{m.status || 'unread'}</span></td>
                      <td style={{ fontSize: '12px', color: 'var(--dash-text-sub)' }}>{fmt(m.createdAt)}</td>
                      <td><div className="td-actions">
                        <button className="icon-btn" onClick={() => setSelectedMessage(m)}><Eye size={15} /></button>
                        {(m.status||'unread')==='unread' && <button className="icon-btn" onClick={() => updateMsgStatus(m.id, 'read')}><CheckCircle size={15} /></button>}
                        <a href={`mailto:${m.email}`} className="icon-btn"><Mail size={15} /></a>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </div>
            {selectedMessage && <DetailModal data={selectedMessage} onClose={() => setSelectedMessage(null)} type="message" />}
          </>)}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (<>
            <div className="welcome-banner"><h1>Analytics 📊</h1><p>Agency performance at a glance.</p></div>
            <div className="overview-grid">
              {[
                { label: 'Conversion Rate', value: requests.length > 0 ? Math.round((active+completed)/requests.length*100)+'%' : '0%', cls: 'active' },
                { label: 'Avg Response', value: '< 24h', cls: 'pending' },
                { label: 'Satisfaction', value: '98%', cls: 'completed' },
                { label: 'This Month', value: requests.filter(r => { if(!r.createdAt?.toDate) return false; const d=r.createdAt.toDate(), n=new Date(); return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear(); }).length, cls: 'message' },
                { label: 'Total Clients', value: clients.filter(c=>c.role!=='admin').length, cls: 'clients' },
                { label: 'All-Time Requests', value: requests.length, cls: 'total' },
              ].map((s,i) => (
                <div key={i} className="stat-card">
                  <div className={`stat-icon ${s.cls}`}><TrendingUp size={22} /></div>
                  <div className="stat-data"><span className="stat-label">{s.label}</span><h3 className="stat-value">{s.value}</h3></div>
                </div>
              ))}
            </div>
            <div className="content-card">
              <div className="card-header"><h3>Status Breakdown</h3></div>
              <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {[
                  { label: 'Pending', n: pending, color: 'var(--dash-amber)' },
                  { label: 'Active', n: active, color: 'var(--dash-blue)' },
                  { label: 'Completed', n: completed, color: 'var(--dash-green)' },
                  { label: 'Cancelled', n: requests.filter(r=>r.status==='cancelled').length, color: 'var(--dash-coral)' },
                ].map((s,i) => {
                  const pct = requests.length ? (s.n/requests.length*100).toFixed(0) : 0;
                  return (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: 800, color: s.color, letterSpacing: '-1px' }}>{s.n}</div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-sub)', margin: '4px 0 12px', fontWeight: 500 }}>{s.label}</div>
                      <div style={{ height: '4px', borderRadius: '2px', background: 'var(--dash-border)', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '2px', background: s.color, transition: 'width 0.8s ease' }} />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--dash-text-dim)', marginTop: '6px' }}>{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>)}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
