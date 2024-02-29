import React from 'react';

import useScrollTrigger from '@mui/material/useScrollTrigger';

type ElevationScrollProps = {
  children: React.ReactElement;
};

const ElevationScroll: React.FC<ElevationScrollProps> = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    elevation: trigger ? 4 : 0,
  });
};

export default ElevationScroll;
