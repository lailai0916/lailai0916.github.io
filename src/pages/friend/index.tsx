import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import { memo, useRef } from 'react'

import { Friend, Friends } from '@site/src/data/friend'

import Link from '@docusaurus/Link'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

const TITLE = '友链'
const DESCRIPTION = '财富易得，知己难求。'
const friends = Friends

function FriendHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text-center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      {/* <a className="button button--primary" href="qwq" target="_blank" rel="noreferrer">
        🔗 申请友链
      </a> */}
    </section>
  )
}

const FriendCard = memo(({ friend }: { friend: Friend }) => (
  <li className="relative flex min-h-24 cursor-pointer flex-row items-center overflow-hidden rounded-card bg-card px-4 py-1 transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.01] hover:bg-[rgba(229,231,235,0.3)] hover:shadow-[0_3px_10px_0_rgba(164,190,217,0.3)]">
    <img
      // @ts-ignore
      src={friend.avatar}
      alt={friend.title}
      className="size-16 min-w-16 rounded-full object-contain"
    />
    <div className="pl-4">
      <div className="mb-1 flex items-center">
        <h4 className="mb-0 flex-1">
          <Link
            to={friend.website}
            className="bg-[0%_100%] bg-[length:0%_1px] bg-gradient-to-b from-ifm-color-primary to-ifm-color-primary bg-no-repeat no-underline transition-[background-size] duration-200 ease-out hover:bg-[length:100%_1px] focus:bg-[length:100%_1px]"
          >
            {friend.title}
          </Link>
        </h4>
      </div>
      <p className="m-0 line-clamp-2 w-full overflow-hidden text-sm leading-[1.66]">{friend.description}</p>
    </div>
  </li>
))

function FriendCards() {
  return (
    <section className="mt-8 mb-8">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <ul className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 ">
          {friends.map(friend => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Layout title={TITLE} description={DESCRIPTION} wrapperClassName="bg-background">
      <motion.main ref={ref} className="my-4 friends-link-page">
        <FriendHeader />
        <FriendCards />
      </motion.main>
    </Layout>
  )
}
