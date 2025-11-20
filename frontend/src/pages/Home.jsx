import React from 'react'
import Hero from '../components/Hero'
import RecentlyAdded from '../components/RecentlyAdded'
import Reviews from '../components/Reviews'
import ThoughtBanner from '../components/ThoughtBanner'

const Home = () => {
  return (
    <div className="bg-[#3B2F2F] text-[#F2E8D5] px-10 py-8 min-h-screen">
      <Hero />
      <RecentlyAdded />
      <ThoughtBanner />
      <Reviews />
    </div>
  )
}

export default Home
