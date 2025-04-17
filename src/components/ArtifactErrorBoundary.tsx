import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  artifactId: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ArtifactErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Artifact Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public componentDidUpdate(prevProps: Props) {
    // Reset error state when artifactId changes
    if (this.state.hasError && prevProps.artifactId !== this.props.artifactId) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private getArtifactDisplayName = (artifactId: string): string => {
    const [name, version] = artifactId.split('.v');
    return `${name.charAt(0).toUpperCase() + name.slice(1)}${version ? ` (v${version})` : ' (v1)'}`;
  };

  private getSimplifiedErrorMessage = (error: Error): string => {
    const message = error.toString();
    
    if (message.includes('Cannot read properties')) {
      return "Property accessed on undefined/null value";
    }
    
    if (message.includes('is not a function')) {
      return "Function not found or not callable";
    }
    
    if (message.includes('NetworkError') || message.includes('Failed to fetch')) {
      return "Network error encountered";
    }
    
    if (message.includes('SyntaxError')) {
      return "Syntax error in code";
    }

    if (message.includes('bare specifier')) {
      return "Invalid import path";
    }

    return message;
  };

  public render() {
    if (this.state.hasError) {
      const artifactName = this.getArtifactDisplayName(this.props.artifactId);
      const [name, version] = this.props.artifactId.split('.v');
      const versionNum = parseInt(version || '1');
      
      return (
        <Card className="w-full mx-auto max-w-2xl my-8">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error in {artifactName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {this.state.error && this.getSimplifiedErrorMessage(this.state.error)}
              </AlertDescription>
            </Alert>

            {this.state.errorInfo && (
              <details className="text-xs">
                <summary className="cursor-pointer text-sm text-gray-600">Stack trace</summary>
                <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <Link to="/artifacts" className="text-sm text-primary hover:underline">
                Browse artifacts
              </Link>
              {versionNum > 1 && (
                <Link 
                  to={`/artifacts/${name}/v${versionNum - 1}`} 
                  className="text-sm text-primary hover:underline"
                >
                  Try v{versionNum - 1}
                </Link>
              )}
            </div>
            <Button onClick={this.handleReload}>Reload</Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}
