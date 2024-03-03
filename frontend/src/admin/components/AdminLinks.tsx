import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

import Stack from 'common/components/material/Stack';

import useRouter from 'common/hooks/useRouter';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import HeaderLink from './HeaderLink';
import { Divider } from '@mui/material';

const AdminLinks: React.FC = () => {
  const { redirectToRoute } = useRouter();

  const handleIconClick = (selectedLink: string) => {
    switch (selectedLink) {
      case 'Home':
        redirectToRoute(AppRoutesEnum.ADMIN_HOME);
        return;
      case 'Opportunities':
        redirectToRoute(AppRoutesEnum.ADMIN_OPPORTUNITIES);
        return;
      case 'Praises':
        redirectToRoute(AppRoutesEnum.ADMIN_PRAISES);
        return;
      case 'Manage':
        redirectToRoute(AppRoutesEnum.ADMIN_MANAGE);
        return;
    }
  };

  return (
    <Stack direction="row" alignItems="center">
      <HeaderLink label="Home" Icon={CottageRoundedIcon} onClick={handleIconClick} />
      <Divider orientation="vertical" flexItem />
      <HeaderLink
        label="Opportunities"
        Icon={WorkHistoryRoundedIcon}
        onClick={handleIconClick}
      />
      <Divider orientation="vertical" flexItem />
      <HeaderLink label="Praises" Icon={AddReactionRoundedIcon} onClick={handleIconClick} />
      <Divider orientation="vertical" flexItem />
      <HeaderLink
        label="Manage"
        Icon={SettingsSuggestRoundedIcon}
        onClick={handleIconClick}
      />
    </Stack>
  );
};

export default AdminLinks;
