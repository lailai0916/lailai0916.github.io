export interface SkillItem {
  title: string;
  icon: string;
  hide?: boolean;
}

export const SKILL_LIST: SkillItem[] = [
  { title: 'C', icon: 'c' },
  { title: 'C++', icon: 'cpp' },
  { title: 'Python', icon: 'py' },
  { title: 'Java', icon: 'java' },
  { title: 'Markdown', icon: 'md' },
  { title: 'LaTeX', icon: 'latex' },
  { title: 'HTML', icon: 'html' },
  { title: 'CSS', icon: 'css' },
  { title: 'JavaScript', icon: 'js' },
  { title: 'TypeScript', icon: 'ts' },
  { title: 'React', icon: 'react' },
  { title: 'Tailwind CSS', icon: 'tailwind' },
  { title: 'QT', icon: 'qt', hide: true },
  { title: 'CMake', icon: 'cmake', hide: true },
  { title: 'NPM', icon: 'npm', hide: true },
  { title: 'Git', icon: 'git', hide: true },
  { title: 'GitHub', icon: 'github', hide: true },
  { title: 'VSCode', icon: 'vscode', hide: true },
  { title: 'Visual Studio', icon: 'visualstudio', hide: true },
  { title: 'Linux', icon: 'linux', hide: true },
  { title: 'Windows', icon: 'windows', hide: true },
  { title: 'Docker', icon: 'docker', hide: true },
  { title: 'Cloudflare', icon: 'cloudflare', hide: true },
  { title: 'WordPress', icon: 'wordpress', hide: true },
];
