'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Sparkles, Target } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Context-Aware{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Text Generation
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Craft concise, on-brand text for any purpose. Set your persona, tone, and goal 
                to generate perfect messages, drafts, and content tailored to your audience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <button className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors">
                Get Started
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Powerful Text Generation
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Configure your context and let AI craft the perfect message
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <MessageSquare className="h-5 w-5 flex-none text-cyan-400" />
                  Persona & Tone
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">
                    Define your voice, personality, and communication style for consistent messaging.
                  </p>
                </dd>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Target className="h-5 w-5 flex-none text-cyan-400" />
                  Goal-Oriented
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">
                    Set clear objectives for your content to ensure every message serves its purpose.
                  </p>
                </dd>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Sparkles className="h-5 w-5 flex-none text-cyan-400" />
                  AI-Powered
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">
                    Advanced language models generate contextually perfect text for any scenario.
                  </p>
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </section>

      {/* Placeholder for Input/LLM UI */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">
                Text Generation Interface
              </h3>
              <p className="text-gray-400 mb-6">
                The interactive prompt configurator and text generation interface will be implemented here.
              </p>
              <div className="space-y-4">
                <div className="h-12 rounded-md bg-gray-800 animate-pulse" />
                <div className="h-32 rounded-md bg-gray-800 animate-pulse" />
                <div className="h-10 rounded-md bg-cyan-600/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
