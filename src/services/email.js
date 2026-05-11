import emailjs from '@emailjs/browser';

export const sendWelcomeEmail = async (userEmail, userName) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: userName,
        to_email: userEmail,
        message: "Welcome to Pixora Studio! We're excited to have you on board. Your account has been successfully created."
      },
      publicKey
    );
  } catch (error) {
    console.error("EmailJS Error:", error);
  }
};

export const sendNewRequestNotification = async (adminEmail, requestData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: "Pixora Admin",
        to_email: adminEmail,
        message: `New Project Request from ${requestData.name} (${requestData.email}). Project: ${requestData.category}.`
      },
      publicKey
    );
  } catch (error) {
    console.error("EmailJS Error:", error);
  }
};
