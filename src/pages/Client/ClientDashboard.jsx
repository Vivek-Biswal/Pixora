import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  PlusCircle,
  Clock,
  CheckCircle,
  CreditCard,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { processPayment } from '../../services/payment';
import '../Admin/Dashboard.css';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

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
  }, [user, navigate]);

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
            <span className="logo-text">Pixora</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <LayoutDashboard size={20} /> My Projects
          </button>
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare size={20} /> Support
          </button>
          <button 
            className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <CreditCard size={20} /> Billing
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
          <h2 style={{ fontSize: '20px', margin: 0 }}>Welcome back, {user?.name}</h2>
          <div className="header-actions">
            <button className="btn btn--primary btn--sm" onClick={() => navigate('/request')}>
              <PlusCircle size={18} /> New Request
            </button>
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="user-profile">
              <div className="profile-img">{user?.name?.charAt(0) || 'U'}</div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="overview-grid">
            <div className="stat-card">
              <div className="stat-icon active"><FileText size={24} /></div>
              <div className="stat-data">
                <span className="stat-label">Total Requests</span>
                <h3 className="stat-value">{requests.length}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending"><Clock size={24} /></div>
              <div className="stat-data">
                <span className="stat-label">Active Projects</span>
                <h3 className="stat-value">{requests.filter(r => r.status === 'active').length}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon message"><CheckCircle size={24} /></div>
              <div className="stat-data">
                <span className="stat-label">Completed</span>
                <h3 className="stat-value">{requests.filter(r => r.status === 'completed').length}</h3>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3>My Projects</h3>
            </div>
            
            {loading ? (
              <div className="loading-state">Loading projects...</div>
            ) : requests.length === 0 ? (
              <div className="empty-state" style={{ padding: '60px 0' }}>
                <FileText size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                <p>You haven't submitted any project requests yet.</p>
                <button className="btn btn--primary" onClick={() => navigate('/request')} style={{ marginTop: '20px' }}>
                  Start Your First Project
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Submitted On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td><strong>{request.company || 'Personal Project'}</strong></td>
                        <td>{request.category}</td>
                        <td>
                          <span className={`status-badge ${request.status || 'pending'}`}>
                            {request.status || 'pending'}
                          </span>
                        </td>
                        <td>{request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Just now'}</td>
                        <td>
                          <button className="btn btn--outline btn--sm">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {activeTab === 'billing' && (
            <div className="content-card" style={{ marginTop: '24px' }}>
              <div className="card-header">
                <h3>Billing & Payments</h3>
              </div>
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <CreditCard size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                <h4>Advance Project Payment</h4>
                <p style={{ color: 'var(--color-gray-400)', marginBottom: '24px' }}>
                  Secure your slot and start your project with a 50% advance payment.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '24px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-gray-400)' }}>Amount to pay</span>
                  <h2 style={{ margin: 0 }}>₹1,000.00</h2>
                </div>
                <br />
                <button className="btn btn--coral btn--lg" onClick={handlePayment}>
                  Pay with Razorpay
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
