
// Track donation state with localStorage
export const checkDonationStatus = (): boolean => {
  return localStorage.getItem('donation_completed') === 'true';
};

export const markDonationComplete = () => {
  localStorage.setItem('donation_completed', 'true');
  localStorage.setItem('donation_timestamp', Date.now().toString());
};

// Helper to handle donation complete callback
export const handleDonationComplete = (callback?: () => void) => {
  markDonationComplete();
  if (callback) {
    callback();
  }
};
