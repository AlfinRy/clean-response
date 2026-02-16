import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CodeExample from '@/components/CodeExample'
import WhyThisPackage from '@/components/WhyThisPackage'
import Footer from '@/components/Footer'
import ShaderBackground from '@/components/ShaderBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <ShaderBackground />
      <Hero />
      <Features />
      <CodeExample />
      <WhyThisPackage />
      <Footer />
    </main>
  )
}
