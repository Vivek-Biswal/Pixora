import React, { useEffect } from 'react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './LegalPage.css';

const ShippingPolicy = () => {
  useEffect(() => {
    document.title = "Shipping & Delivery Policy | Pixora Web Design Studio";
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Legal</span>
            <h1>Shipping & Delivery Policy</h1>
            <p>Clarification on our digital delivery process.</p>
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
                  Pixora Web Design Studio is a provider of digital services, including web design, software development, and digital marketing consulting.
                </p>

                <h2>1. Digital Delivery Only</h2>
                <p>
                  All services provided by Pixora are delivered digitally. We do not ship any physical goods or products to our clients. Consequently, there are no shipping charges, delivery partners, or physical tracking numbers involved in our business operations.
                </p>

                <h2>2. Delivery Method</h2>
                <p>
                  Deliverables such as website files, design assets, and reports will be provided through:
                </p>
                <ul>
                  <li>Direct deployment to your server or hosting environment.</li>
                  <li>Secure cloud storage links (e.g., Google Drive, Dropbox).</li>
                  <li>Email attachments for smaller files.</li>
                  <li>Access to project management tools where assets are hosted.</li>
                </ul>

                <h2>3. Delivery Timelines</h2>
                <p>
                  The "delivery" of our service occurs in milestones as defined in your project proposal. Final delivery of a project is completed when the website goes live or the final assets are handed over to the client.
                </p>
                <p>
                  Project timelines vary significantly (from 2 weeks to 3 months) based on the specific requirements, complexity, and the client's responsiveness in providing feedback and content.
                </p>

                <h2>4. Proof of Delivery</h2>
                <p>
                  For the purposes of payment verification and Razorpay requirements, the following shall constitute proof of delivery:
                </p>
                <ul>
                  <li>Confirmation email sent by us stating the completion of a milestone or project.</li>
                  <li>The website being live on the client's domain.</li>
                  <li>The client's written approval of the final deliverables.</li>
                </ul>

                <h2>5. Contact Us</h2>
                <p>
                  If you have any questions about how we deliver our services, please contact us at hi.pixora.studio@gmail.com.
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
