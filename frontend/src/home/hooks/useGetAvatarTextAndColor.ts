import { useMemo } from 'react';

const BgColors = [
  '#a271b0',
  '#5ea89d',
  '#261eb8',
  '#bd8491',
  '#7c84b3',
  '#49b81f',
  '#6a13ec',
  '#23c0ec',
  '#511807',
  '#f89876',
  '#5b1f48',
  '#029208',
];

const useGetAvatarTextAndColor = (name: string) => {
  let initials;
  if (!name) {
    initials = '';
  }
  const words = name.split(' ');
  const w = words.map((word) => {
    return word[0];
  });
  initials = name
    .split(' ')
    .map((word) => word[0])
    .join('');
  const color = useMemo(() => Math.floor(Math.random() * 11) + 1, [name]);
  return {
    initials,
    color: color > 11 ? BgColors[10] : BgColors[color],
  };
};

export default useGetAvatarTextAndColor;
