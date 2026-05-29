import React, { useEffect } from 'react';
import ScrollAnimator from '../../components/ScrollAnimator';
import './LegalPage.css';

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Cancellation & Refund Policy | Pixora Web Design Studio";
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container">
          <ScrollAnimator animation="fade-in">
            <span className="section-badge">Legal</span>
            <h1>Cancellation & Refund Policy</h1>
            <p>Our commitment to transparency and fairness.</p>
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
                  At Pixora Web Design Studio, we strive to ensure our clients are satisfied with our digital services. However, because we provide professional services and digital products, we have established the following refund and cancellation policy.
                </p>

                <h2>1. Service Cancellation</h2>
                <p>
                  Clients may request to cancel a project at any time. Cancellation requests must be sent in writing to hi.pixora.studio@gmail.com.
                </p>

                <h2>2. Refund Eligibility</h2>
                <p>
                  Refunds are only applicable before project work has officially started. Once our team has initiated the research, design, or development phase of a project, the initial deposit or payment becomes non-refundable.
                </p>
                <p>
                  This is because our services involve manual labor, time, and creative effort that cannot be "returned" once expended.
                </p>

                <h2>3. Subscription Cancellations</h2>
                <p>
                  For recurring maintenance and support plans:
                </p>
                <ul>
                  <li>You may cancel your subscription at any time.</li>
                  <li>Cancellation will take effect at the end of the current billing cycle.</li>
                  <li>No refunds will be provided for any unused portion of a billing cycle.</li>
                  <li>In the event of a technical failure on our part that results in service downtime exceeding 48 hours, a pro-rated credit may be applied to your account at our discretion.</li>
                </ul>

                <h2>4. Modification of Scope</h2>
                <p>
                  If a client decides to significantly reduce the scope of a project after work has begun, no refunds will be given for work already completed. However, the remaining balance for the unstarted portions of the project may be waived or credited toward future services.
                </p>

                <h2>5. Processing of Refunds</h2>
                <p>
                  If a refund is approved (e.g., if work hasn't started), the amount will be credited back to the original payment method via Razorpay within 7-10 business days.
                </p>

                <h2>6. Chargebacks</h2>
                <p>
                  We encourage clients to contact us directly to resolve any issues before initiating a chargeback through their bank. Unauthorized chargebacks will result in the immediate suspension of all services and may lead to legal action to recover the costs.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions regarding our refund and cancellation policy, please reach out to us:
                  <br />
                  <strong>Email:</strong> hi.pixora.studio@gmail.com
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
