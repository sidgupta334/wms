import { isNil } from 'lodash';
import React from 'react';

import ButtonTab, { ButtonTabConfig } from './ButtonTab';
import Stack from '../material/Stack';

type ButtonTabsProps = {
  tabs: ButtonTabConfig[];
  value: any;
  onChange: (value: any) => void;
  btnGap?: number;
};

const ButtonTabs: React.FC<ButtonTabsProps> = ({ tabs, value, onChange, btnGap = 0.75 }) => {
  const handleTabClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const tabElement = target.closest('.button-tab') as HTMLElement;
    const tabValue = tabElement?.dataset?.tab as any;
    !isNil(tabValue) && onChange(tabValue);
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={btnGap} onClick={handleTabClick}>
      {tabs.map((tabProps: ButtonTabConfig) => (
        <ButtonTab key={tabProps.value} {...tabProps} isActive={tabProps.value === value} />
      ))}
    </Stack>
  );
};

export default ButtonTabs;
