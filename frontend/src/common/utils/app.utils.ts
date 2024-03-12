import { JobSkillType } from 'common/types/JobSkillType';
import { EndorsedSkillType } from 'home/types/profile.type';
import { isEmpty } from 'lodash';

// Typical character length requirement to perform search
const DEFAULT_MIN_LENGTH = 3;

export const validateMinLength = (value?: string, minLength = DEFAULT_MIN_LENGTH) => {
  return !!value && value.length >= minLength;
};

export const filterEndorsedAndSearchedSkills = (
  endorsedSkills: EndorsedSkillType[] = [],
  searchedSkills: JobSkillType[] = [],
): EndorsedSkillType[] => {
  console.log('searchedSkills: ', searchedSkills);
  if (isEmpty(endorsedSkills) || isEmpty(searchedSkills)) {
    return [...endorsedSkills, ...mapToEndorsedSkills(searchedSkills)];
  }

  const endorsedSkillsMap = new Map();
  endorsedSkills.forEach((skill) => {
    endorsedSkillsMap.set(skill.externalCode, skill);
  });

  const uniqueSkills = searchedSkills.filter((skill) => !endorsedSkillsMap.has(skill.id));
  return [...endorsedSkills, ...mapToEndorsedSkills(uniqueSkills)];
};

const mapToEndorsedSkills = (skills: JobSkillType[] = []): EndorsedSkillType[] => {
  return skills.map((skill) => ({ ...skill, externalCode: skill.id, count: 0 }));
};
