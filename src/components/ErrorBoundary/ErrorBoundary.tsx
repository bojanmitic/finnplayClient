import React, { Component } from 'react';
import NotFound from '../../containers/NotFound';

interface Error {
  stack?: string;
}

class ErrorBoundary extends Component<any, any> {
  state = {
    errorMessage: ''
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  // eslint-disable-next-line no-console
  logErrorToServices = console.log;

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return <NotFound />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
