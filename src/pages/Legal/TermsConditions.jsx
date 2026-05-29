import React, { useEffect } from 'react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './LegalPage.css';

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Pixora Web Design Studio";
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Legal</span>
            <h1>Terms & Conditions</h1>
            <p>Rules and guidelines for using our services.</p>
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
                  Welcome to Pixora Web Design Studio. These Terms and Conditions outline the rules and regulations for the use of Pixora's Website and Services.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing this website and engaging our services, we assume you accept these terms and conditions. Do not continue to use Pixora if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <h2>2. Services Provided</h2>
                <p>
                  Pixora is a digital service business providing web design, development, maintenance, and related digital solutions. All services are delivered digitally/online. No physical products are shipped as part of our standard service offerings.
                </p>

                <h2>3. Project Timelines & Delivery</h2>
                <p>
                  Project timelines are estimates and vary depending on client requirements, project complexity, and feedback cycles. We strive to meet all deadlines but are not liable for delays caused by third-party services or client-side delays. All final deliverables will be provided via secure digital transfer or direct deployment to the client's hosting environment.
                </p>

                <h2>4. Client Responsibilities</h2>
                <p>
                  Users and clients are responsible for providing correct business information, branding assets, and content required for project completion. Delays in providing necessary materials will result in project timeline adjustments.
                </p>

                <h2>5. Payment Terms</h2>
                <p>
                  Payments are processed securely via Razorpay. For project-based work, we may require an upfront deposit before work commences. Maintenance and support plans are recurring and will be billed according to the selected plan (monthly/annually).
                </p>

                <h2>6. Recurring Billing</h2>
                <p>
                  By subscribing to our maintenance or support plans, you authorize Pixora to charge your provided payment method on a recurring basis. You can cancel these plans at any time through your dashboard or by contacting support, but no pro-rated refunds will be provided for the current billing period.
                </p>

                <h2>7. Intellectual Property</h2>
                <p>
                  Unless otherwise stated, Pixora and/or its licensors own the intellectual property rights for all material on Pixora. All intellectual property rights are reserved. You may access this from Pixora for your own personal use subjected to restrictions set in these terms and conditions.
                </p>

                <h2>8. User Content</h2>
                <p>
                  In these terms and conditions, "Your Content" shall mean any audio, video, text, images, or other material you choose to display on your website or provide to us. By providing Your Content, you grant Pixora a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it for the purpose of completing your project.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                  In no event shall Pixora, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website or our services whether such liability is under contract.
                </p>

                <h2>10. Governing Law</h2>
                <p>
                  These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
                </p>

                <h2>11. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at hi.pixora.studio@gmail.com.
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
