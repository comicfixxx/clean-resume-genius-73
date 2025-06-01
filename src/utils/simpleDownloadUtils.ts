
// Simple download utilities for the donation-based system
export const checkDonationAndDownload = (format: string = 'pdf') => {
  // Check if user has donated recently (within 24 hours)
  const lastDonation = localStorage.getItem('donation_timestamp');
  if (lastDonation) {
    const donationTime = new Date(parseInt(lastDonation));
    const now = new Date();
    const hoursSinceDonation = (now.getTime() - donationTime.getTime()) / (1000 * 60 * 60);
    
    // Allow download if donated within last 24 hours
    if (hoursSinceDonation < 24) {
      return true;
    }
  }
  return false;
};

export const triggerDownload = (format: string = 'pdf') => {
  // Simple download trigger - in a real app this would generate the actual file
  console.log(`Downloading resume in ${format} format`);
  
  // Create a simple download simulation
  const link = document.createElement('a');
  link.href = '#';
  link.download = `resume.${format}`;
  link.click();
};
