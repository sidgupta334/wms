import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistoryIndex } from 'common/context/hooks/historyIndex';
import React, { useEffect, useState } from 'react';
import { NavBtnSizeType, StyledNavButton, StyledNavIcon } from './styles';
import useRouter from 'common/hooks/useRouter';

const StyledArrowBackIcon = StyledNavIcon(ArrowBackIcon);

type BackButtonProps = {
  clickHandler?: Function;
  size?: NavBtnSizeType;
  route?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ clickHandler, size = 'medium', route }) => {
  const { goBack, redirectToRoute } = useRouter();
  const { historyIndex } = useHistoryIndex();
  const [isVisible, setIsVisible] = useState(!!clickHandler || !!route);

  const handleClick = () => {
    if (clickHandler) {
      clickHandler();
      return;
    }
    if (route) {
      redirectToRoute(route);
      return;
    }

    goBack();
  };

  useEffect(() => {
    if (!clickHandler && !route) {
      setIsVisible(!!historyIndex);
    }
  }, [historyIndex, clickHandler, route]);

  if (!isVisible) {
    return <></>;
  }

  return (
    <StyledNavButton
      size={size}
      startIcon={<StyledArrowBackIcon size={size} />}
      onClick={handleClick}
      variant="outlined"
    ></StyledNavButton>
  );
};

export default BackButton;
