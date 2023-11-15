import React from 'react';
import ContentLoader from 'react-content-loader';
import '../../../../scss/app.scss';

const Skeleton = props => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="141" cy="126" r="124" />
    <rect x="267" y="325" rx="0" ry="0" width="2" height="7" />
    <rect x="3" y="271" rx="14" ry="14" width="280" height="27" />
    <rect x="-1" y="325" rx="10" ry="10" width="280" height="109" />
    <rect x="0" y="453" rx="10" ry="10" width="95" height="30" />
    <rect x="122" y="447" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
