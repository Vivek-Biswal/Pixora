import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast, { Toaster } from 'react-hot-toast';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      // For now, let's allow the user to see it for development, 
      // but in production we'd redirect
      // navigate('/');
    }

    const q = query(collection(db, 'project_requests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      setLoading(false);
    });

    const qMessages = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(docs);
    });

    return () => {
      unsubscribe();
      unsubscribeMessages();
    };
  }, [user, navigate]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateDoc(doc(db, 'project_requests', requestId), { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon">P</div>
            <span className="logo-text">Pixora Admin</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <FileText size={20} /> Project Requests
            {requests.filter(r => r.status === 'pending').length > 0 && (
              <span className="badge-count">{requests.filter(r => r.status === 'pending').length}</span>
            )}
          </button>
          <button 
            className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users size={20} /> Clients
          </button>
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare size={20} /> Messages
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => navigate('/settings')}>
            <Settings size={20} /> Settings
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search requests, clients..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
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
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="stat-card">
                <div className="stat-icon pending"><Clock size={24} /></div>
                <div className="stat-data">
                  <span className="stat-label">Pending Requests</span>
                  <h3 className="stat-value">{requests.filter(r => r.status === 'pending').length}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon active"><CheckCircle size={24} /></div>
                <div className="stat-data">
                  <span className="stat-label">Active Projects</span>
                  <h3 className="stat-value">{requests.filter(r => r.status === 'active').length}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon message"><MessageSquare size={24} /></div>
                <div className="stat-data">
                  <span className="stat-label">New Messages</span>
                  <h3 className="stat-value">{messages.filter(m => m.status === 'unread').length}</h3>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="content-card">
              <div className="card-header">
                <h3>Project Requests</h3>
                <div className="header-filters">
                  <button className="btn btn--secondary btn--sm"><Filter size={16} /> Filter</button>
                </div>
              </div>
              
              {loading ? (
                <div className="loading-state">Loading requests...</div>
              ) : requests.length === 0 ? (
                <div className="empty-state">No requests found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Project Type</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td>
                            <div className="td-client">
                              <strong>{request.name}</strong>
                              <span>{request.email}</span>
                            </div>
                          </td>
                          <td>{request.category}</td>
                          <td>{request.budget}</td>
                          <td>
                            <span className={`status-badge ${request.status || 'pending'}`}>
                              {request.status || 'pending'}
                            </span>
                          </td>
                          <td>{request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Just now'}</td>
                          <td>
                            <div className="td-actions">
                              <select 
                                className="status-select"
                                value={request.status || 'pending'}
                                onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button className="icon-btn"><MoreVertical size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="content-card">
              <div className="card-header">
                <h3>Contact Messages</h3>
              </div>
              
              {messages.length === 0 ? (
                <div className="empty-state">No messages found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg) => (
                        <tr key={msg.id}>
                          <td>
                            <div className="td-client">
                              <strong>{msg.name}</strong>
                              <span>{msg.email}</span>
                            </div>
                          </td>
                          <td>{msg.subject || 'N/A'}</td>
                          <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</td>
                          <td>
                            <span className={`status-badge ${msg.status || 'unread'}`}>
                              {msg.status || 'unread'}
                            </span>
                          </td>
                          <td>{msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
