import React from 'react';
import Link from '@docusaurus/Link';
import { CardGrid, CardItem } from '../common/CardGrid';

const projects = [
  {
    title: 'lailai\'s Home',
    description: '基于 Docusaurus 构建的个人网站。',
    link: '/docs/project/GitHub/lailais-Home/README',
  },
  {
    title: 'iGame',
    description: '基于 C++ 的终端游戏。',
    link: '/docs/project/终端/iGame',
  },
  {
    title: 'iClock',
    description: '基于 Desmos 的数学艺术作品。',
    link: '/docs/project/Desmos/艺术博览会/iClock',
  },
];

export default function Project() {
  return (
    <CardGrid title="我的项目">
      {projects.map((project, idx) => (
        <CardItem key={idx}>
          <div className="card shadow--md">
            <div className="card__header">
              <h3>{project.title}</h3>
            </div>
            <div className="card__body">
              <p>{project.description}</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to={project.link}>
                查看详情
              </Link>
            </div>
          </div>
        </CardItem>
      ))}
    </CardGrid>
  );
}
