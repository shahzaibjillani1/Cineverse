import { Component } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error){
    return { hasError: true, error: error};
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error Boundry caught an error', error, errorInfo);
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  render(){
    if(this.state.hasError){
        return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Something went wrong</h2>
          <p className="text-zinc-500 max-w-md mb-8 text-sm">
            We ran into an unexpected rendering error. Please try reloading the page or clear your browser cache.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center space-x-2 px-5 py-2.5 bg-brand-primary hover:bg-red-700 text-white rounded-full font-semibold transition-all cursor-pointer shadow-lg glow-primary"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
