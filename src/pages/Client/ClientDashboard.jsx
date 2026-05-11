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
<<<<<<< HEAD
  ArrowRight,
  Sparkles,
  Search,
  AlertCircle
=======
  Download
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
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
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (!user) return;

    console.log("DASHBOARD: Fetching projects for user", user.uid);
    
=======
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
    const q = query(
      collection(db, 'project_requests'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

<<<<<<< HEAD
    // Add a timeout to fallback if Firestore is hanging
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn("DASHBOARD: Firestore request timed out.");
        setLoading(false);
        setError("Request timed out. Please check your connection.");
      }
    }, 8000);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(timeoutId);
      console.log("DASHBOARD: Received snapshot", snapshot.size, "documents");
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      setLoading(false);
      setError(null);
    }, (err) => {
      clearTimeout(timeoutId);
      console.error("DASHBOARD: Firestore error", err);
      setError("Failed to load projects. Check console for details.");
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user]);
=======
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, navigate]);
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e

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
<<<<<<< HEAD
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const SkeletonStat = () => (
    <div className="stat-card skeleton-card">
      <div className="stat-icon skeleton" style={{ width: '64px', height: '64px', borderRadius: '18px' }}></div>
      <div className="stat-data">
        <div className="skeleton-text skeleton" style={{ width: '60px' }}></div>
        <div className="skeleton-title skeleton" style={{ width: '40px', height: '32px' }}></div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout animate-fade-in">
=======
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
<<<<<<< HEAD
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
=======
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
            <div className="logo-icon">P</div>
            <span className="logo-text">Pixora</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
<<<<<<< HEAD
            <LayoutDashboard size={20} /> <span>My Projects</span>
=======
            <LayoutDashboard size={20} /> My Projects
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
          </button>
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
<<<<<<< HEAD
            <MessageSquare size={20} /> <span>Support</span>
=======
            <MessageSquare size={20} /> Support
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
          </button>
          <button 
            className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
<<<<<<< HEAD
            <CreditCard size={20} /> <span>Billing</span>
=======
            <CreditCard size={20} /> Billing
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => navigate('/settings')}>
<<<<<<< HEAD
            <Settings size={20} /> <span>Settings</span>
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} /> <span>Logout</span>
=======
            <Settings size={20} /> Settings
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} /> Logout
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
<<<<<<< HEAD
          <div className="header-search">
            <Search size={18} color="#a0a0b0" />
            <input type="text" placeholder="Search projects..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="user-profile">
              <div className="profile-img">{user?.name?.charAt(0) || 'U'}</div>
              <div className="profile-info">
                <span className="profile-name">{user?.name}</span>
                <span className="profile-role">Client</span>
              </div>
=======
          <h2 style={{ fontSize: '20px', margin: 0 }}>Welcome back, {user?.name}</h2>
          <div className="header-actions">
            <button className="btn btn--primary btn--sm" onClick={() => navigate('/request')}>
              <PlusCircle size={18} /> New Request
            </button>
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="user-profile">
              <div className="profile-img">{user?.name?.charAt(0) || 'U'}</div>
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
            </div>
          </div>
        </header>

        <div className="dashboard-content">
<<<<<<< HEAD
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1>Welcome back, {user?.name?.split(' ')[0]}! <Sparkles size={24} color="#f7b500" style={{ marginLeft: '8px' }} /></h1>
                <p>Track your project progress, manage invoices, and communicate with your team all in one place.</p>
              </div>
              <button className="btn btn--primary" onClick={() => navigate('/request')}>
                <PlusCircle size={18} /> New Project Request
              </button>
            </div>
          </div>

          <div className="overview-grid">
            {loading ? (
              <>
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {activeTab === 'projects' && (
            <div className="content-card">
              <div className="card-header">
                <h3>Current Projects</h3>
                {!loading && requests.length > 0 && (
                  <Link to="/request" className="link-action">New Request <ArrowRight size={16} /></Link>
                )}
              </div>
              
              {loading ? (
                <div style={{ padding: '40px' }}>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                </div>
              ) : error ? (
                <div className="empty-state">
                  <AlertCircle size={48} color="#ff4e6b" style={{ marginBottom: '20px' }} />
                  <h4>Oops! Something went wrong</h4>
                  <p>{error}</p>
                  <button className="btn btn--outline" onClick={() => window.location.reload()}>Try Refreshing</button>
                </div>
              ) : requests.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <FileText size={48} />
                  </div>
                  <h4>No projects yet</h4>
                  <p>You haven't submitted any project requests. Start your journey with Pixora by creating your first request.</p>
                  <button className="btn btn--primary" onClick={() => navigate('/request')}>
                    Create Your First Request
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
          )}

          {activeTab === 'billing' && (
            <div className="content-card animate-fade-in">
              <div className="card-header">
                <h3>Billing & Payments</h3>
              </div>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <CreditCard size={64} style={{ opacity: 0.1, marginBottom: '24px' }} />
                <h4>Advance Project Payment</h4>
                <p style={{ color: 'var(--dash-text-sub)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
                  Secure your project slot with a 50% advance payment. Once paid, our team will begin the discovery phase.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '20px', display: 'inline-block', marginBottom: '32px', border: '1px solid var(--dash-border)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--dash-text-sub)', display: 'block', marginBottom: '8px' }}>Amount Due</span>
                  <h2 style={{ margin: 0, fontSize: '36px' }}>₹1,000.00</h2>
                </div>
                <br />
                <button className="btn btn--coral btn--lg" onClick={handlePayment}>
                  Secure Slot with Razorpay
=======
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
                      <th>Files</th>
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
                          {request.fileUrl ? (
                            <a href={request.fileUrl} target="_blank" rel="noreferrer" className="icon-btn">
                              <Download size={18} />
                            </a>
                          ) : '-'}
                        </td>
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
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
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
