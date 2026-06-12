import React from 'react';
import { motion } from 'framer-motion';

const NotificationsStub = () => {
  return (
    <div style={{ padding: '100px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: '400px', background: 'var(--glass-bg)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}
      >
        <h1 style={{ marginBottom: '16px', fontSize: '24px' }}>Notifications</h1>
        <p style={{ color: 'var(--text-secondary)' }}>You have no new notifications right now. Check back later!</p>
        <button className="btn btn--primary" style={{ marginTop: '24px' }} onClick={() => window.history.back()}>
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotificationsStub;
