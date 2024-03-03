import * as yup from 'yup';
export const JobTitleSkillSchema = yup
  .object({
    id: yup.string().label('id').required(),
    name: yup.string().label('name').required(),
  })
  .label('Job Title');
