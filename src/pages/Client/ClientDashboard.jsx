import React, { useState, useEffect, useRef } from 'react';
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
  Send,
  Home,
  User,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Folder
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, storage } from '../../config/firebase';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import { processPayment } from '../../services/payment';
import { motion, AnimatePresence } from 'framer-motion';
import './ClientDashboard.css';

// ─── FAQ Data ───
const FAQ_DATA = [
  {
    q: "How long does it take to build my website?",
    a: "Most websites are delivered in 5–7 days. Simple landing pages take 3–5 days. E-commerce stores take 10–14 days. We give you an exact delivery date on Day 1."
  },
  {
    q: "Do I own the website after it's built?",
    a: "Yes — 100%. You own all the code, design files, images, and domain. No lock-ins, no monthly platform fees."
  },
  {
    q: "How do I share feedback or request changes?",
    a: "Use the Messages tab above to send us notes, or WhatsApp us directly. We include revision rounds in every project."
  },
  {
    q: "Can I update the website myself after launch?",
    a: "Yes. Business and E-Commerce sites include a simple CMS that lets you edit content without touching code."
  },
  {
    q: "When will my files appear in the File Vault?",
    a: "Once your project is active, we upload all deliverables there within 24 hours of completion."
  },
  {
    q: "How do I pay for my project?",
    a: "We will send you an invoice through this dashboard once your quote is approved. We accept UPI, cards, and bank transfer. GST invoice included."
  }
];

const ClientDashboard = ({ defaultTab = 'overview' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // ─── Core State ───
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ─── Messages State ───
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [messagesLoading, setMessagesLoading] = useState(true);

  // ─── Invoices State ───
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  // ─── Profile State ───
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileCompany, setProfileCompany] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  // ─── FAQ State ───
  const [expandedFaq, setExpandedFaq] = useState(null);


  // ═══════════════════════════════════════
  // FIREBASE SUBSCRIPTIONS
  // ═══════════════════════════════════════

  // Fetch project_requests
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
    }, (error) => {
      console.error("Error fetching project requests:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch client_messages
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'client_messages'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(docs);
      setMessagesLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setMessagesLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch invoices
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'invoices'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(docs);
      setInvoicesLoading(false);
    }, (error) => {
      console.error("Error fetching invoices:", error);
      setInvoicesLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch profile data
  useEffect(() => {
    if (!user) return;
    setProfileName(user.name || '');
    const fetchProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfilePhone(data.phone || '');
          setProfileCompany(data.company || '');
          if (data.name) setProfileName(data.name);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user]);

  // Fetch notifications
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(docs);
      
      const unread = docs.some(n => !n.read);
      setHasNewUpdate(unread);
    }, (error) => {
      console.error("Error fetching notifications:", error);
    });
    return () => unsubscribe();
  }, [user]);

  // Notification dot logic fallback
  useEffect(() => {
    if (requests.length === 0) return;
    const lastSeen = localStorage.getItem('pixora_last_seen_at');
    const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
    const hasUpdate = requests.some(r => {
      const updatedAt = r.updatedAt?.toDate ? r.updatedAt.toDate().getTime() : 0;
      return updatedAt > lastSeenTime;
    });
    if (hasUpdate) setHasNewUpdate(true);
  }, [requests]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ═══════════════════════════════════════
  // DERIVED VALUES
  // ═══════════════════════════════════════

  const activeRequest = requests.find(r => r.status === 'active')
    || requests.find(r => r.status === 'pending')
    || (requests.length > 0 ? requests[0] : null);

  const getPhaseLabel = (status) => {
    switch (status) {
      case 'pending': return 'Awaiting Our Review';
      case 'active': return 'Currently In Development';
      case 'completed': return 'Project Completed';
      case 'cancelled': return 'Project Cancelled';
      default: return 'No Active Project';
    }
  };

  const getTimeline = (status) => {
    const stages = [
      { id: 1, title: "Discovery & Strategy" },
      { id: 2, title: "Design & Prototyping" },
      { id: 3, title: "Development & Integration" },
      { id: 4, title: "QA & Handoff" }
    ];
    return stages.map((stage, idx) => {
      let stageStatus = 'pending';
      if (status === 'completed') {
        stageStatus = 'done';
      } else if (status === 'active') {
        if (idx === 0) stageStatus = 'done';
        else if (idx === 1) stageStatus = 'active';
      } else if (status === 'pending') {
        if (idx === 0) stageStatus = 'active';
      }
      return { ...stage, status: stageStatus };
    });
  };

  const getProgressIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'active': return 1;
      case 'completed': return 4;
      case 'cancelled': return -1;
      default: return -1;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'cd-badge-blue';
      case 'completed': return 'cd-badge-green';
      case 'pending': return 'cd-badge-yellow';
      case 'cancelled': return 'cd-badge-red';
      default: return 'cd-badge-gray';
    }
  };

  const getStatusText = (status) => {
    if (status === 'active') return 'In Progress';
    if (status === 'completed') return 'Completed';
    if (status === 'pending') return 'Pending';
    if (status === 'cancelled') return 'Cancelled';
    return status || 'Pending';
  };

  const filteredRequests = requests.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (r.company?.toLowerCase().includes(q))
      || (r.category?.toLowerCase().includes(q))
      || (r.description?.toLowerCase().includes(q))
      || (r.name?.toLowerCase().includes(q));
  });

  // ═══════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ═══════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════

  const handlePayment = async (amount) => {
    try {
      await processPayment({
        amount: String(Number(amount) * 100),
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

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      await addDoc(collection(db, 'client_messages'), {
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        text: messageText.trim(),
        timestamp: serverTimestamp(),
        read: false,
        senderType: 'client'
      });
      setMessageText('');
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error('Failed to send message');
    }
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    // Phone validation exactly 10 digits if provided
    if (profilePhone.trim() && !/^\d{10}$/.test(profilePhone.trim())) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    setProfileSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: profileName.trim(),
        phone: profilePhone.trim(),
        company: profileCompany.trim(),
      }, { merge: true });

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: profileName.trim() });
      }
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error('Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setIsResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success('Reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset email.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await setDoc(doc(db, 'users', user.uid), { photoURL: downloadURL }, { merge: true });
      
      toast.success('Profile photo updated!');
      // Force reload to show new photo
      window.location.reload();
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleBellClick = () => {
    localStorage.setItem('pixora_last_seen_at', new Date().toISOString());
    setHasNewUpdate(false);
    setActiveTab('projects');
  };

  // ═══════════════════════════════════════
  // PAGE TRANSITION
  // ═══════════════════════════════════════

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    out: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  // ═══════════════════════════════════════
  // RENDER: ONBOARDING (no requests)
  // ═══════════════════════════════════════

  const renderOnboarding = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="onboarding">
      <div className="cd-onboarding">
        <div className="cd-onboarding-icon">👋</div>
        <h1 className="cd-page-title">Welcome, {user?.name?.split(' ')[0]}!</h1>
        <p className="cd-page-desc" style={{ textAlign: 'center', margin: '0 auto 8px', maxWidth: '460px' }}>
          Here's how your project journey works with Pixora
        </p>

        <div className="cd-onboarding-steps">
          <div className="cd-onboarding-step">
            <div className="cd-onboarding-step-icon">1</div>
            <div className="cd-onboarding-step-content">
              <h4>Submit your project request</h4>
              <p>Tell us what you need — type, budget, timeline, and goals.</p>
            </div>
          </div>
          <div className="cd-onboarding-step">
            <div className="cd-onboarding-step-icon">2</div>
            <div className="cd-onboarding-step-content">
              <h4>Receive free quote within 24 hours</h4>
              <p>We review your request and send a detailed quote with a delivery date.</p>
            </div>
          </div>
          <div className="cd-onboarding-step">
            <div className="cd-onboarding-step-icon">3</div>
            <div className="cd-onboarding-step-content">
              <h4>Approve quote and we start building</h4>
              <p>Once you approve, our team begins designing and developing your site.</p>
            </div>
          </div>
          <div className="cd-onboarding-step">
            <div className="cd-onboarding-step-icon">4</div>
            <div className="cd-onboarding-step-content">
              <h4>Your website goes live in 7 days</h4>
              <p>We deliver a polished, production-ready website to you.</p>
            </div>
          </div>
        </div>

        <button className="cd-btn-primary cd-btn-large" onClick={() => navigate('/request')}>
          <Plus size={18} /> Submit Your First Request
        </button>

        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="cd-whatsapp-text-link">
          Have questions? Chat with us on WhatsApp →
        </a>
      </div>
    </motion.div>
  );

  // ═══════════════════════════════════════
  // RENDER: SMART OVERVIEW
  // ═══════════════════════════════════════

  const renderSmartOverview = () => {
    const activeProjects = requests.filter(r => r.status === 'active' || r.status === 'pending');
    const hasCompleted = requests.some(r => r.status === 'completed');

    if (requests.length === 0 && !loading) {
      return renderOnboarding();
    }

    return (
      <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="overview">
        <h1 className="cd-page-title">{getGreeting()}, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="cd-page-desc">Here's your project status and recent activity.</p>

        {hasCompleted && (
          <div style={{ background: 'linear-gradient(135deg, var(--cd-success), #10b981)', color: 'white', padding: '20px 24px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 8px 24px rgba(16,185,129,0.2)' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>Your project is live! 🎉</h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Congratulations! One or more of your projects have been completed and delivered.</p>
            </div>
          </div>
        )}

        <div className="cd-grid-overview">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Recent Project Requests */}
            <div className="cd-card" style={{ padding: '0' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cd-border)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Recent Project Requests</h3>
              </div>
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Timeline</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--cd-text-muted)' }}>Loading...</td></tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--cd-text-muted)' }}>
                      {searchQuery ? `No results for "${searchQuery}"` : 'No requests found.'}
                    </td></tr>
                  ) : (
                    filteredRequests.slice(0, 5).map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: '500' }}>{r.company || r.category || 'Personal Project'}</td>
                        <td>{r.timeline || 'TBD'}</td>
                        <td><span className={`cd-badge ${getStatusBadgeClass(r.status)}`}>{getStatusText(r.status)}</span></td>
                        <td>{formatDate(r.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Timeline */}
          {activeRequest && (
            <div className="cd-card">
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>Project Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {timeline.map((stage) => (
                  <div key={stage.id} className="cd-workflow-stage">
                    <div className={`cd-stage-icon ${stage.status === 'done' ? 'cd-stage-done' : stage.status === 'active' ? 'cd-stage-active' : 'cd-stage-pending'}`}>
                      {stage.status === 'done' ? <CheckCircle2 size={16} /> : stage.status === 'active' ? <Clock size={16} /> : <div style={{width: 8, height: 8, borderRadius: '50%', background: 'currentColor'}} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: stage.status === 'active' ? '600' : '500', color: stage.status === 'pending' ? 'var(--cd-text-muted)' : 'var(--cd-text-primary)' }}>{stage.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--cd-text-secondary)', marginTop: '2px' }}>
                        {stage.status === 'done' ? 'Completed' : stage.status === 'active' ? 'In Progress' : 'Upcoming'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // ═══════════════════════════════════════
  // RENDER: PROJECT WORKFLOW
  // ═══════════════════════════════════════

  const renderProjectWorkflow = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="cd-page-title">Project Workflow</h1>
          <p className="cd-page-desc" style={{ marginBottom: 0 }}>Detailed tracking of all your project requests and deliverables.</p>
        </div>
        <button className="cd-btn-primary" onClick={() => navigate('/request')}><Plus size={16} /> New Request</button>
      </div>

      {loading ? (
        <div className="cd-no-results">Loading projects...</div>
      ) : filteredRequests.length === 0 && searchQuery ? (
        <div className="cd-no-results">No results for "{searchQuery}"</div>
      ) : requests.length === 0 ? (
        <div className="cd-card">
          <div className="cd-empty-state">
            <div className="cd-empty-state-icon"><FolderGit2 size={28} /></div>
            <h3>No projects yet</h3>
            <p>Submit your first project request and track its progress here.</p>
            <button className="cd-btn-primary" onClick={() => navigate('/request')}><Plus size={16} /> Submit Your First Request</button>
          </div>
        </div>
      ) : (
        <div className="cd-projects-grid">
          {filteredRequests.map(r => {
            const progressIdx = getProgressIndex(r.status);
            return (
              <div key={r.id} className="cd-project-card">
                <div className="cd-project-card-header">
                  <div>
                    {r.category && (
                      <div className="cd-badge cd-badge-gray" style={{ marginBottom: '8px' }}>{r.category}</div>
                    )}
                    <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                      {r.company || 'Personal Project'}
                    </div>
                  </div>
                  <span className={`cd-badge ${getStatusBadgeClass(r.status)}`}>{getStatusText(r.status)}</span>
                </div>

                {r.description && (
                  <div className="cd-project-card-desc">{r.description}</div>
                )}

                <div className="cd-project-card-meta">
                  <span><CalendarDays size={14} /> Submitted {formatDate(r.createdAt)}</span>
                  {r.budget && <span><CreditCard size={14} /> {r.budget}</span>}
                  {r.timeline && <span><Clock size={14} /> {r.timeline}</span>}
                </div>

                {/* Progress bar for active projects */}
                {(r.status === 'active' || r.status === 'pending') && (
                  <div className="cd-progress-track">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`cd-progress-step ${i < progressIdx ? 'done' : i === progressIdx ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );

  // ═══════════════════════════════════════
  // RENDER: FILE VAULT (honest empty state)
  // ═══════════════════════════════════════

  const renderFileVault = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="files">
      <div>
        <h1 className="cd-page-title">File Vault</h1>
        <p className="cd-page-desc">Secure access to all your project deliverables and brand assets.</p>
      </div>

      <div className="cd-card">
        <div className="cd-empty-state">
          <div className="cd-empty-state-icon"><Folder size={28} /></div>
          <h3>Your project files will appear here</h3>
          <p>
            Once your project is active, we will upload all deliverables, design files, and brand assets here for you to download at any time.
          </p>
          <div style={{ fontSize: '13px', color: 'var(--cd-text-secondary)', lineHeight: '1.6' }}>
            Need to share a file with us?{' '}
            <a href="https://wa.me/919818457227" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontWeight: '500' }}>
              Send it via WhatsApp
            </a>{' '}
            or email us at{' '}
            <a href="mailto:vivekbiswal2006@gmail.com" style={{ color: 'var(--cd-accent-light)', textDecoration: 'none', fontWeight: '500' }}>
              vivekbiswal2006@gmail.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ═══════════════════════════════════════
  // RENDER: COMMUNICATION HUB
  // ═══════════════════════════════════════

  const renderCommunicationHub = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="messages">
      <h1 className="cd-page-title">Communication Hub</h1>
      <p className="cd-page-desc">Direct line to the Pixora engineering and design teams.</p>

      <div className="cd-card" style={{ padding: 0, display: 'flex', height: '600px', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid var(--cd-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="cd-avatar" style={{ background: 'var(--cd-accent)', color: '#fff' }}>P</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Pixora Core Team</div>
              <div style={{ fontSize: '12px', color: 'var(--cd-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 6, height: 6, background: 'var(--cd-success)', borderRadius: '50%' }} /> Usually replies in a few hours
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messagesLoading ? (
              <div className="cd-system-note">
                <p>Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="cd-system-note">
                <div className="cd-system-note-icon"><MessageSquare size={22} /></div>
                <p>Send us a message below and we will reply within a few hours. You can also reach us on WhatsApp for faster responses.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="cd-whatsapp-text-link" style={{ marginTop: '4px' }}>
                  Chat on WhatsApp →
                </a>
              </div>
            ) : (
              messages.map(msg => {
                const isClient = msg.senderType !== 'admin';
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isClient ? 'flex-end' : 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--cd-text-secondary)' }}>
                        {isClient ? 'You' : 'Pixora Team'}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--cd-text-muted)' }}>{formatTime(msg.timestamp)}</span>
                    </div>
                    <div style={{
                      background: isClient ? 'var(--cd-text-primary)' : 'rgba(255,255,255,0.05)',
                      color: isClient ? '#000' : '#fff',
                      border: isClient ? 'none' : '1px solid var(--cd-border)',
                      padding: '12px 16px',
                      borderRadius: isClient ? '12px 12px 0 12px' : '12px 12px 12px 0',
                      maxWidth: '70%',
                      fontSize: '13px',
                      lineHeight: '1.5'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div style={{ padding: '20px', borderTop: '1px solid var(--cd-border)', background: 'var(--cd-surface-solid)' }}>
            <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cd-border)', borderRadius: '8px', padding: '8px' }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', padding: '0 8px', fontSize: '13px' }}
              />
              <button className="cd-btn-primary" onClick={handleSendMessage} style={{ padding: '8px', borderRadius: '6px' }}><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ═══════════════════════════════════════
  // RENDER: BILLING CENTER
  // ═══════════════════════════════════════

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
            {invoicesLoading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--cd-text-muted)' }}>Loading...</td></tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="cd-empty-state" style={{ minHeight: '200px', padding: '40px 20px' }}>
                    <div className="cd-empty-state-icon"><CreditCard size={24} /></div>
                    <h3>No invoices yet</h3>
                    <p>Your invoices will appear here after your project quote is approved. All invoices include a GST receipt.</p>
                  </div>
                </td>
              </tr>
            ) : (
              invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--cd-text-secondary)' }}>{inv.invoiceId || inv.id}</td>
                  <td style={{ fontWeight: '500' }}>{inv.desc || inv.description || '—'}</td>
                  <td style={{ color: 'var(--cd-text-secondary)' }}>{formatDate(inv.createdAt)}</td>
                  <td style={{ fontWeight: '600' }}>₹{inv.amount}</td>
                  <td><span className={`cd-badge ${inv.status === 'Paid' ? 'cd-badge-green' : 'cd-badge-yellow'}`}>{inv.status}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    {inv.status === 'Pending' ? (
                      <button className="cd-btn-primary" onClick={() => handlePayment(inv.amount)} style={{ padding: '6px 12px', fontSize: '11px' }}>Pay Now</button>
                    ) : (
                      <button className="cd-btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}><Download size={14} /> PDF</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  // ═══════════════════════════════════════
  // RENDER: PROFILE
  // ═══════════════════════════════════════

  const renderProfile = () => {
    const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U';
    
    return (
      <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="profile">
        <h1 className="cd-page-title">My Profile</h1>
        <p className="cd-page-desc">Manage your account details and preferences.</p>

        {/* Top Header Profile Card */}
        <div className="cd-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(37, 99, 235, 0.1))' }} />
          
          <div style={{ position: 'relative', width: '96px', height: '96px', borderRadius: '50%', background: 'var(--cd-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', border: '4px solid #030014', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              userInitials
            )}
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>{user?.name}</h2>
          <p style={{ color: 'var(--cd-text-secondary)', margin: '0 0 24px 0' }}>{user?.email}</p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="cd-btn-primary" onClick={() => setIsEditingProfile(!isEditingProfile)}>
              {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button className="cd-btn-secondary" onClick={handlePasswordReset} disabled={isResettingPassword}>
              {isResettingPassword ? 'Sending...' : 'Change Password'}
            </button>
            <button className="cd-btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={isUploadingPhoto}>
              {isUploadingPhoto ? 'Uploading...' : 'Upload Photo'}
            </button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handlePhotoUpload} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
          
          {/* Info Grid */}
          <div className="cd-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--cd-accent)" /> Account Overview
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--cd-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Joined Date</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{user?.createdAt?.toDate ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'Recently'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--cd-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Total Projects</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{requests.length}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--cd-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Current Plan</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>Pay-as-you-go</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--cd-text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Account Type</div>
                <div style={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}>{user?.role || 'Client'}</div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditingProfile && (
            <motion.div className="cd-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={18} color="var(--cd-accent)" /> Update Details
              </h3>
              <div className="cd-profile-form" style={{ marginTop: 0 }}>
                <div className="cd-form-group">
                  <label className="cd-form-label">Full Name</label>
                  <input type="text" className="cd-form-input" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="cd-form-group">
                  <label className="cd-form-label">Phone Number</label>
                  <input type="tel" className="cd-form-input" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} placeholder="10-digit number" />
                </div>
                <div className="cd-form-group">
                  <label className="cd-form-label">Company Name</label>
                  <input type="text" className="cd-form-input" value={profileCompany} onChange={(e) => setProfileCompany(e.target.value)} placeholder="Your company" />
                </div>
                <button className="cd-btn-primary" onClick={handleSaveProfile} disabled={profileSaving} style={{ width: '100%', marginTop: '8px' }}>
                  {profileSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    );
  };

  // ═══════════════════════════════════════
  // RENDER: HELP & FAQ
  // ═══════════════════════════════════════

  const renderHelp = () => (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" key="help">
      <h1 className="cd-page-title">Help & FAQ</h1>
      <p className="cd-page-desc">Answers to common questions about your project and working with Pixora.</p>

      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--cd-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Frequently Asked Questions
      </h3>

      <div className="cd-faq-list">
        {FAQ_DATA.map((faq, idx) => (
          <div key={idx} className="cd-faq-item">
            <button
              className={`cd-faq-question ${expandedFaq === idx ? 'open' : ''}`}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            >
              {faq.q}
              <ChevronDown size={18} />
            </button>
            {expandedFaq === idx && (
              <div className="cd-faq-answer">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <div className="cd-contact-box">
        <h3>Still have questions? We are here to help.</h3>
        <p>Reach out to us and we will get back to you as soon as possible.</p>
        <div className="cd-contact-links">
          <a href="https://wa.me/919818457227" target="_blank" rel="noopener noreferrer" className="cd-contact-link cd-contact-link-whatsapp">
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
          <a href="mailto:vivekbiswal2006@gmail.com" className="cd-contact-link cd-contact-link-email">
            <Send size={16} /> vivekbiswal2006@gmail.com
          </a>
        </div>
      </div>
    </motion.div>
  );

  // ═══════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════

  return (
    <div className="cd-layout">
      <Toaster position="top-right" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' } }} />
      
      {/* ─── Sidebar Navigation ─── */}
      <aside className={`cd-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '0 24px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="cd-logo" style={{ padding: 0 }}>
            <div className="cd-logo-icon">P</div>
            <span className="cd-logo-text">Pixora</span>
          </div>
          <button 
            onClick={() => navigate('/')} 
            title="Back to Site"
            style={{ 
              border: '1px solid var(--cd-border)', background: 'rgba(255,255,255,0.05)', 
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              borderRadius: '6px', color: 'var(--cd-text-secondary)', cursor: 'pointer' 
            }}
          >
            <Home size={16} strokeWidth={2} />
          </button>
        </div>

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
          <button className={`cd-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={16} /> My Profile
          </button>
          <button className={`cd-nav-item ${activeTab === 'help' ? 'active' : ''}`} onClick={() => setActiveTab('help')}>
            <HelpCircle size={16} /> Help & FAQ
          </button>
        </nav>

        <div className="cd-sidebar-footer">
          {/* WhatsApp Shortcut */}
          <a
            className="cd-nav-item cd-whatsapp-link"
            href="https://wa.me/919818457227"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>

          {/* User Profile — navigates to Profile tab */}
          <div className="cd-user-profile" onClick={() => setActiveTab('profile')}>
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
            <span>Pixora OS</span> <ChevronRight size={14} /> <span style={{ textTransform: 'capitalize' }}>{activeTab === 'help' ? 'Help & FAQ' : activeTab === 'profile' ? 'My Profile' : activeTab}</span>
          </div>
          
          <div className="cd-header-actions">
            <div className={`cd-search-bar ${searchFocused ? 'focused' : ''} ${activeTab !== 'overview' && activeTab !== 'projects' ? 'cd-search-hidden' : ''}`}>
              <Search size={14} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)} 
                onBlur={() => setSearchFocused(false)} 
              />
              <span style={{ fontSize: '10px', color: 'var(--cd-text-muted)', border: '1px solid var(--cd-border)', padding: '2px 4px', borderRadius: '4px' }}>⌘K</span>
            </div>
            <button className="cd-btn-secondary" onClick={() => navigate('/')} style={{ padding: '6px', borderRadius: '50%' }} title="Back to Site">
              <Home size={16} />
            </button>
            <button className="cd-btn-secondary" onClick={handleBellClick} style={{ padding: '6px', borderRadius: '50%', position: 'relative' }} title="Notifications">
              <div className="cd-bell-wrapper">
                <Bell size={16} />
                {hasNewUpdate && <div className="cd-notification-dot" />}
              </div>
            </button>
            <button className="cd-btn-primary" onClick={() => navigate('/request')}>
              <Plus size={16} /> New Request
            </button>
          </div>
        </header>

        <div className="cd-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && renderSmartOverview()}
            {activeTab === 'projects' && renderProjectWorkflow()}
            {activeTab === 'files' && renderFileVault()}
            {activeTab === 'messages' && renderCommunicationHub()}
            {activeTab === 'billing' && renderBillingCenter()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'help' && renderHelp()}
          </AnimatePresence>
        </div>
      </main>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav className="cd-mobile-nav">
        <button className={`cd-mobile-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </button>
        <button className={`cd-mobile-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          <FolderGit2 size={20} />
          <span>Projects</span>
        </button>
        <button className={`cd-mobile-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
          <MessageSquare size={20} />
          <span>Messages</span>
        </button>
        <button className={`cd-mobile-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          <User size={20} />
          <span>Profile</span>
        </button>
        <button className={`cd-mobile-nav-item ${activeTab === 'help' ? 'active' : ''}`} onClick={() => setActiveTab('help')}>
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
      </nav>
    </div>
  );
};

export default ClientDashboard;
