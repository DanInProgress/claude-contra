import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';

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

  private handleReload = () => {
    window.location.reload();
  };

  private getArtifactDisplayName = (artifactId: string): string => {
    const [name, version] = artifactId.split('.v');
    return `${name.charAt(0).toUpperCase() + name.slice(1)}${version ? ` (v${version})` : ' (v1)'}`;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">
                Error in {this.getArtifactDisplayName(this.props.artifactId)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTitle>Error Details</AlertTitle>
                <AlertDescription>
                  <p className="font-mono text-sm whitespace-pre-wrap">
                    {this.state.error?.toString()}
                  </p>
                </AlertDescription>
              </Alert>
              
              {this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600">Stack trace</summary>
                  <pre className="mt-2 overflow-auto text-xs rounded bg-gray-100 p-4">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Try switching to a different version of this artifact
              </p>
              <Button onClick={this.handleReload}>Reload Page</Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
