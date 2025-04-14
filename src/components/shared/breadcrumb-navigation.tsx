import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function BreadcrumbNavigation() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Only show breadcrumbs if we're not on the home page
  if (pathSegments.length === 0) return null;

  // Generate breadcrumb items from path segments
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />

      {pathSegments.map((segment, index) => {
        // Skip rendering "v1", "v2" etc. as separate breadcrumb items
        if (segment.startsWith('v') && !isNaN(parseInt(segment.substring(1)))) {
          return null;
        }

        const isLast =
          index === pathSegments.length - 1 ||
          (index === pathSegments.length - 2 && pathSegments[index + 1].startsWith('v'));

        // Build the href by joining segments up to the current one
        const to = `/${pathSegments.slice(0, index + 1).join('/')}`;

        // Capitalize the segment and replace hyphens with spaces
        const displayText = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        // Add the version to the last item if applicable
        let versionText = '';
        if (isLast && index + 1 < pathSegments.length && pathSegments[index + 1].startsWith('v')) {
          versionText = ` (${pathSegments[index + 1]})`;
        }

        return (
          <React.Fragment key={segment}>
            {isLast ? (
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {displayText}
                  {versionText}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={to}>{displayText}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbNavigation;
