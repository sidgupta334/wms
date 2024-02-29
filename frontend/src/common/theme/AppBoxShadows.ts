import { alpha } from '@mui/material';
import colorPalette from 'common/theme/colorPalette';

const AppBoxShadows = {
  shadow1: `0px 2.5625px 5.125px ${alpha(colorPalette.BLUEGRAYA900, 0.05)}`,
  shadow2: `0px 2.5625px 7.6875px ${alpha(
    colorPalette.BLUEGRAYA900,
    0.1,
  )}, 0px 2.5625px 5.125px ${alpha(colorPalette.BLUEGRAYA900, 0.06)}`,
  shadow3: `0px 10.25px 20.5px -5.125px ${alpha(
    colorPalette.BLUEGRAYA900,
    0.1,
  )}, 0px 5.125px 10.25px -5.125px ${alpha(colorPalette.BLUEGRAYA900, 0.06)}`,
  shadow4: `0px 30.75px 41px -10.25px ${alpha(
    colorPalette.BLUEGRAYA900,
    0.1,
  )}, 0px 10.25px 15.375px -5.125px ${alpha(colorPalette.BLUEGRAYA900, 0.05)}`,
  shadow5: `0px 51.25px 61.5px -10.25px ${alpha(
    colorPalette.BLUEGRAYA900,
    0.1,
  )}, 0px 20.5px 20.5px -10.25px ${alpha(colorPalette.BLUEGRAYA900, 0.04)}`,
  shadow6: `0px 61.5px 123px -30.75px ${alpha(colorPalette.BLUEGRAYA900, 0.25)}`,
  shadow7: `0px 82px 164px -30.75px ${alpha(colorPalette.BLUEGRAYA900, 0.2)}`,
  shadow8: `0px -10.25px 20.5px -5.125px ${alpha(
    colorPalette.BLUEGRAYA900,
    0.1,
  )}, 0px -5.13px 10.25px -5.125px ${alpha(colorPalette.BLUEGRAYA900, 0.06)}`,
  shadow9: `0 5px 10px ${alpha(colorPalette.BLUEGRAYA900, 0.3)}`,
};

export default AppBoxShadows;
