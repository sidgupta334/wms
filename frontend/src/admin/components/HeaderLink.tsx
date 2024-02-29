import Button from 'common/components/material/Button';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';

type HeaderLinkProps = {
  label: string;
  Icon: React.FC<any>;
  onClick: (selectedLink: string) => void;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ label, Icon, onClick }) => {
  return (
    <Button
      onClick={() => onClick(label)}
      variant="text"
      size="small"
      sx={{ borderRadius: '0.75rem', mx: 2 }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon />
        <Typography variant="button1" color={ColorPalette.PRIMARY500}>
          {label}
        </Typography>
      </Stack>
    </Button>
  );
};

export default HeaderLink;
