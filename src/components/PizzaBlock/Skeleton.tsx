import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="135" r="124" />
    <rect x="0" y="271" rx="8" ry="8" width="280" height="23" />
    <rect x="0" y="308" rx="8" ry="8" width="280" height="88" />
    <rect x="1" y="405" rx="9" ry="9" width="92" height="30" />
    <rect x="127" y="402" rx="20" ry="20" width="155" height="45" />
  </ContentLoader>
);

export default Skeleton;
