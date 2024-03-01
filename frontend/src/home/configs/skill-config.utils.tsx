import AppBoxShadows from 'common/theme/AppBoxShadows';
import ColorPalette from 'common/theme/colorPalette';

const DEFAULT_CHIP_STYLE = {
  height: '24px',
  color: ColorPalette.BLUEGRAY700,
  border: `1px solid ${ColorPalette.GRAY200}`,
  '&:hover.MuiChip-root': {
    backgroundColor: ColorPalette.WHITE,
    boxShadow: AppBoxShadows.shadow2,
  },
  '&:active': {
    borderColor: 'transparent',
    backgroundColor: ColorPalette.PRIMARY50,
    color: ColorPalette.BLUEGRAY700,
  },
};

const SELECTED_CHIP_STYLE = {
  color: ColorPalette.PRIMARY400,
  border: `1px solid ${ColorPalette.GRAY200}`,
  height: '24px',
  '& .skill-chip-icon': {
    fill: ColorPalette.PRIMARY400,
  },
  '&:active': {
    backgroundColor: ColorPalette.PRIMARY50,
    color: ColorPalette.BLUEGRAY700,
  },
};

export const ENDORSED_SKILL_CHIP_STYLE = {
  normalStateStyle: DEFAULT_CHIP_STYLE,
  endorsedStateStyle: DEFAULT_CHIP_STYLE,
  selectedStateStyle: SELECTED_CHIP_STYLE,
  selectedEndorsedStateStyle: SELECTED_CHIP_STYLE,
};
