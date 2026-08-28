"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-neutral-900 border border-rose-900/60 rounded-xl shadow-xl space-y-4 text-center my-4 font-sans">
          <div className="w-12 h-12 bg-rose-950/80 border border-rose-800 text-rose-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ⚠️
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {this.props.fallbackTitle || "Something went wrong loading this widget"}
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              An unexpected error occurred in this component. Our telemetry has logged the incident.
            </p>
          </div>
          {this.state.error && (
            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-[11px] font-mono text-rose-400 max-w-lg mx-auto truncate">
              {this.state.error.message}
            </div>
          )}
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xs font-semibold rounded-lg border border-neutral-700 transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
