
import { AlertTriangle, Home, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorState {
  errorMessage?: string;
  errorCode?: number;
  errorSource?: string;
}

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorInfo, setErrorInfo] = useState({
    title: "Page Not Found",
    description: "The page you are looking for doesn't exist or has been moved."
  });

  useEffect(() => {
    // Log the error page render with more context
    console.log('Error page rendered', { 
      pathname: location.pathname,
      state: location.state,
      search: location.search
    });
    
    // Update document title for better UX
    document.title = "Error - Resume Builder";

    // Check if there's a specific error message from state
    const state = location.state as ErrorState | null;
    
    if (state?.errorMessage) {
      setErrorInfo({
        title: `Error ${state.errorCode || ''}`,
        description: state.errorMessage
      });
    } else if (location.pathname.includes('error')) {
      setErrorInfo({
        title: "Application Error",
        description: "There was an unexpected error. Please try again or contact support."
      });
    } else if (location.search.includes('error=')) {
      // Handle query param errors
      const params = new URLSearchParams(location.search);
      const errorMsg = params.get('error');
      setErrorInfo({
        title: "Application Error",
        description: errorMsg || "An unknown error occurred."
      });
    }
  }, [location]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSupport = () => {
    // Open support chat or email in production
    window.open('mailto:support@sxoresume.com?subject=Error%20Report', '_blank');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{errorInfo.title}</h1>
        <p className="text-gray-600 mb-6">{errorInfo.description}</p>
        
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Sorry for the inconvenience</AlertTitle>
          <AlertDescription>
            You can try refreshing the page or going back to the previous page.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="min-w-[120px] h-auto py-2 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="min-w-[120px] h-auto py-2 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            onClick={handleRefresh}
            variant="secondary"
            className="min-w-[120px] h-auto py-2 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button 
            onClick={handleSupport}
            variant="ghost"
            className="min-w-[120px] h-auto py-2 mt-2"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
