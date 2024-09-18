export interface CommandCategory {
  name: string;
  description?: string;
}

export const mainCategory = {
  name: 'Main commands',
  description: 'Convert movies to secret codes.',
} satisfies CommandCategory;

export const bugFixCategory = {
  name: 'Bug fixers',
  description: 'Fix bugs of the console.',
} satisfies CommandCategory;

export const utilityCategory = {
  name: 'Utility',
};

export const commandCategories: CommandCategory[] = [
  mainCategory,
  bugFixCategory,
  utilityCategory,
];
