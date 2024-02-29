import * as yup from 'yup';

// IP address is not included
export const regURL =
  /^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]{2,})+)(:\d+)?(\/\S*)?)$/gm;

export const EmailSchema = yup.string().label('Email').email().required();
