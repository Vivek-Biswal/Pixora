export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processPayment = async (options) => {
  const isLoaded = await loadRazorpay();
  
  if (!isLoaded) {
    throw new Error('Razorpay SDK failed to load. Are you online?');
  }

  const defaultOptions = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: "50000", // Default amount in paise
    currency: "INR",
    name: "Pixora Studio",
    description: "Web Design Project Advance",
    image: "/logo.png",
    handler: function (response) {
      // This will be handled by the component
      return response;
    },
    prefill: {
      name: "",
      email: "",
      contact: ""
    },
    notes: {
      address: "Pixora Studio Corporate Office"
    },
    theme: {
      color: "#4F6EF7"
    }
  };

  const rzp = new window.Razorpay({ ...defaultOptions, ...options });
  rzp.open();
};
