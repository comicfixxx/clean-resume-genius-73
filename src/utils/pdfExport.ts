
import html2pdf from 'html2pdf.js';

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    throw new Error('Resume preview element not found');
  }

  // Show loading indication
  const loadingIndicator = document.createElement('div');
  loadingIndicator.setAttribute('role', 'status');
  loadingIndicator.setAttribute('aria-live', 'polite');
  loadingIndicator.className = 'fixed top-0 left-0 right-0 bg-primary/90 text-white text-center py-3 z-50 shadow-md';
  loadingIndicator.innerHTML = `
    <div class="flex items-center justify-center gap-3">
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Preparing your resume for ${format.toUpperCase()} export...</span>
    </div>
  `;
  document.body.appendChild(loadingIndicator);
  
  // Store original styles
  const originalStyles = element.getAttribute('style') || '';
  
  // Apply export styles
  element.setAttribute('style', `${originalStyles}; width: 100%; max-width: 8.5in; margin: 0 auto; background-color: white !important;`);

  // Optimized options
  const opt = {
    margin: [0.5, 0.5],
    filename: `resume.${format}`,
    image: { type: 'jpeg', quality: 0.95 }, 
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 10000,
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
    }
  };

  try {
    console.log(`Starting resume export to ${format} format`);
    
    // Wait for any pending renders
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (format === 'pdf') {
      const worker = html2pdf()
        .from(element)
        .set(opt);
      
      const blob = await worker.outputPdf('blob');
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else {
      await html2pdf().from(element).set(opt).save();
    }
    
    console.log('Resume export completed successfully');
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  } finally {
    // Reset styles
    element.setAttribute('style', originalStyles);
    
    // Remove loading indicator
    if (document.body.contains(loadingIndicator)) {
      loadingIndicator.style.transition = 'opacity 0.3s';
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(loadingIndicator)) {
          document.body.removeChild(loadingIndicator);
        }
      }, 300);
    }
  }
};

export const fallbackExport = (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found for fallback export');
    return;
  }
  
  // Clone element
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Apply print styles
  clone.style.width = '100%';
  clone.style.maxWidth = '8.5in';
  clone.style.margin = '0 auto';
  clone.style.backgroundColor = 'white';
  clone.style.padding = '0.5in';
  
  // Open print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume Preview</title>
          <style>
            body { 
              margin: 0; 
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body { margin: 0; padding: 0; }
              @page { size: A4; margin: 0; }
            }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 300);
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};
