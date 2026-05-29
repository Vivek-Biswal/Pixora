import React, { useEffect } from 'react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './LegalPage.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Pixora Web Design Studio";
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Legal</span>
            <h1>Privacy Policy</h1>
            <p>How we handle your data and protect your privacy.</p>
          </ScrollAnimator>
        </div>
      </header>

      <section className="legal-content-section">
        <div className="container">
          <ScrollAnimator animation="from-bottom">
            <div className="legal-card">
              <span className="last-updated">Last Updated: May 13, 2026</span>
              <div className="legal-text">
                <p>
                  At Pixora Web Design Studio, accessible from pixora.studio, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Pixora and how we use it.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                  If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </p>
                <p>
                  When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul>
                  <li>Provide, operate, and maintain our website and services</li>
                  <li>Improve, personalize, and expand our website and services</li>
                  <li>Understand and analyze how you use our website and services</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>

                <h2>3. Log Files</h2>
                <p>
                  Pixora follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                </p>

                <h2>4. Cookies and Web Beacons</h2>
                <p>
                  Like any other website, Pixora uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>

                <h2>5. Payment Processing</h2>
                <p>
                  We use Razorpay for processing payments. We do not store your card details on our servers. The data is shared with Razorpay in a secure manner to complete the transaction. Razorpay's use of your personal information is governed by their Privacy Policy.
                </p>

                <h2>6. GDPR Data Protection Rights</h2>
                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                <ul>
                  <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                  <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                  <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                  <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                </ul>

                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at hi.pixora.studio@gmail.com.
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
