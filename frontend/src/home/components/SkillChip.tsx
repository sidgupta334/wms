import { styled } from '@mui/material/styles';
import colorPalette from 'common/theme/colorPalette';
import Chip from 'common/components/material/input/Chip';
import { ENDORSED_SKILL_CHIP_STYLE } from 'home/configs/skill-config.utils';
import AppBoxShadows from 'common/theme/AppBoxShadows';

const BASE_CHIP_STYLE = {
  maxWidth: '100%',
  boxShadow: AppBoxShadows.shadow1,
  padding: '1px',
  border: `1px solid ${colorPalette.GRAY200}`,
  '& .MuiChip-label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 400,
    padding: '8px',
    height: '24px',
    borderRadius: '16px',
  },
  '& .MuiChip-root': {
    color: 'red',
  },
  '&.MuiChip-filled': {
    backgroundColor: colorPalette.PRIMARY300,
    border: 'none',
  },
  '& .MuiChip-deleteIcon': {
    marginRight: '0.35rem',
    marginLeft: '0.1rem',
  },
  '&:hover.MuiChip-root': {
    backgroundColor: colorPalette.WHITE,
    boxShadow: AppBoxShadows.shadow2,
  },
  '&.MuiChip-deletable, &:hover.MuiChip-deletable': {
    boxShadow: 'none',
  },
  '&:hover.MuiChip-filled': {
    backgroundColor: colorPalette.PRIMARY400,
  },
};

const {
  normalStateStyle,
  endorsedStateStyle,
  selectedStateStyle,
  selectedEndorsedStateStyle,
} = ENDORSED_SKILL_CHIP_STYLE;

export const StyledSkillChip = styled(Chip, {
  shouldForwardProp: (prop) => {
    return prop !== 'isSelected' && prop !== 'isEndorsedByLoggedInUser' && prop !== 'score';
  },
})<{}>(({}) => ({
  ...BASE_CHIP_STYLE,
  '&:hover .MuiChip-label': {
    color: colorPalette.PRIMARY400,
  },
  '&:hover .endorsed-skill-chip-icon': {
    fill: colorPalette.PRIMARY400,
  },
  '&.MuiChip-filled .MuiChip-label, &:hover.MuiChip-filled .MuiChip-label': {
    color: colorPalette.WHITE,
  },
  '&.MuiChip-outlined .MuiChip-deleteIcon': {
    fill: colorPalette.GRAY900,
  },
  '&:hover.MuiChip-outlined.MuiChip-deletable': {
    borderColor: colorPalette.BLUEGRAY700,
  },
  '&:hover.MuiChip-outlined.MuiChip-deletable .MuiChip-label': {
    color: colorPalette.BLUEGRAY700,
  },
  '&:hover.MuiChip-outlined .MuiChip-deleteIcon': {
    fill: colorPalette.BLUEGRAY700,
  },
  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
    backgroundColor: colorPalette.PRIMARY400,
    opacity: 0.2,
  },
  ...selectedEndorsedStateStyle,
}));
