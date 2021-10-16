// Add types for svgr
declare module '*.svg' {
  import React from 'react';
  const SVGRComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVGRComponent;
}

// Add types for mdx
declare module '*.mdx' {
  import React from 'react'
  const MDXComponent: React.ComponentType
  export default MDXComponent
}

declare module '*.md' {
  import React from 'react'
  const MDComponent: React.ComponentType
  export default MDComponent
}