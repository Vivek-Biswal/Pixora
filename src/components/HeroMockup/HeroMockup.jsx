import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Settings, LayoutDashboard, RefreshCw, TrendingUp, Users, Globe, Eye, ArrowUpRight, ArrowDownRight, ToggleLeft, ToggleRight } from 'lucide-react';
import './HeroMockup.css';

/* ---- Helpers ---- */
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateChartData = () =>
  Array.from({ length: 7 }, () => randomBetween(25, 100));

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) return;
    const dur = 800;
    const step = end / (dur / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(id); }
      else setDisplay(Math.ceil(start));
    }, 16);
    return () => clearInterval(id);
  }, [value]);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
};

/* ============================================================ */

const HeroMockup = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartData, setChartData] = useState(generateChartData);
  const [chartKey, setChartKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settings, setSettings] = useState({
    analytics: true,
    notifications: false,
    darkMode: true,
    autoSave: true,
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={14} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
  ];

  const metrics = [
    { label: 'Visitors', value: 12847, change: +12.5, icon: <Users size={16} /> },
    { label: 'Page Views', value: 48293, change: +8.3, icon: <Eye size={16} /> },
    { label: 'Bounce Rate', value: 24, change: -3.1, suffix: '%', icon: <Globe size={16} /> },
  ];

  const refreshChart = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setChartData(generateChartData());
      setChartKey(k => k + 1);
      setIsRefreshing(false);
    }, 400);
  }, []);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  /* ---- Tab content renderers ---- */

  const renderOverview = () => (
    <motion.div
      className="hm-tab-content"
      key="overview"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {/* Metric cards */}
      <div className="hm-metrics">
        {metrics.map((m, i) => (
          <motion.div
            className="hm-metric-card"
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="hm-metric-icon">{m.icon}</div>
            <div className="hm-metric-info">
              <span className="hm-metric-label">{m.label}</span>
              <span className="hm-metric-value">
                <AnimatedNumber value={m.value} suffix={m.suffix || ''} />
              </span>
            </div>
            <span className={`hm-metric-change ${m.change > 0 ? 'up' : 'down'}`}>
              {m.change > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(m.change)}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mini activity feed */}
      <div className="hm-activity">
        <div className="hm-activity-header">Recent Activity</div>
        {[
          { text: 'New lead from contact form', time: '2m ago', dot: 'green' },
          { text: 'Website deployed to production', time: '15m ago', dot: 'blue' },
          { text: 'SEO audit completed', time: '1h ago', dot: 'purple' },
        ].map((item, i) => (
          <motion.div
            className="hm-activity-item"
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className={`hm-activity-dot ${item.dot}`} />
            <span className="hm-activity-text">{item.text}</span>
            <span className="hm-activity-time">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      className="hm-tab-content"
      key="analytics"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="hm-chart-header">
        <div>
          <span className="hm-chart-title">Weekly Traffic</span>
          <span className="hm-chart-subtitle">Visitors per day</span>
        </div>
        <motion.button
          className="hm-refresh-btn"
          onClick={refreshChart}
          whileTap={{ scale: 0.9 }}
          disabled={isRefreshing}
        >
          <motion.span
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: 'linear' }}
            style={{ display: 'flex' }}
          >
            <RefreshCw size={13} />
          </motion.span>
          Refresh
        </motion.button>
      </div>

      <div className="hm-chart-area">
        <div className="hm-chart-y-axis">
          {[100, 75, 50, 25, 0].map(v => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <div className="hm-chart-bars">
          {chartData.map((h, i) => (
            <div className="hm-bar-col" key={`${chartKey}-${i}`}>
              <motion.div
                className="hm-bar"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              >
                <span className="hm-bar-tooltip">{Math.round(h * 1.28)}k</span>
              </motion.div>
              <span className="hm-bar-label">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      className="hm-tab-content"
      key="settings"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="hm-settings-list">
        {[
          { key: 'analytics', label: 'Track Analytics', desc: 'Monitor visitor behaviour' },
          { key: 'notifications', label: 'Push Notifications', desc: 'Get real-time alerts' },
          { key: 'darkMode', label: 'Dark Mode', desc: 'Reduce eye strain' },
          { key: 'autoSave', label: 'Auto Save', desc: 'Save changes automatically' },
        ].map((item, i) => (
          <motion.div
            className="hm-setting-row"
            key={item.key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => toggleSetting(item.key)}
          >
            <div className="hm-setting-info">
              <span className="hm-setting-label">{item.label}</span>
              <span className="hm-setting-desc">{item.desc}</span>
            </div>
            <div className={`hm-toggle ${settings[item.key] ? 'active' : ''}`}>
              {settings[item.key] ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const contentMap = { overview: renderOverview, analytics: renderAnalytics, settings: renderSettings };

  return (
    <div className="hm-wrapper">
      {/* Browser chrome */}
      <div className="hm-chrome">
        <div className="hm-dots">
          <span className="hm-dot red" />
          <span className="hm-dot yellow" />
          <span className="hm-dot green" />
        </div>
        <div className="hm-url-bar">
          <Globe size={10} />
          <span>app.pixora.studio/dashboard</span>
        </div>
      </div>

      {/* App body */}
      <div className="hm-body">
        {/* Sidebar */}
        <div className="hm-sidebar">
          <div className="hm-sidebar-logo">
            <div className="hm-logo-icon">P</div>
            <span className="hm-logo-text">Pixora</span>
          </div>

          <nav className="hm-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`hm-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="hm-sidebar-footer">
            <div className="hm-user-avatar">V</div>
            <div className="hm-user-info">
              <span className="hm-user-name">Vivek</span>
              <span className="hm-user-role">Admin</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="hm-main">
          <div className="hm-topbar">
            <h3 className="hm-page-title">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <div className="hm-topbar-right">
              <span className="hm-status-dot" />
              <span className="hm-status-text">Live</span>
            </div>
          </div>

          <div className="hm-content-area">
            <AnimatePresence mode="wait">
              {contentMap[activeTab]()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
