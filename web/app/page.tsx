import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CodeExample from '@/components/CodeExample'
import HowItWorks from '@/components/HowItWorks'
import QuickStart from '@/components/QuickStart'
import WhyThisPackage from '@/components/WhyThisPackage'
import Footer from '@/components/Footer'
import ShaderBackground from '@/components/ShaderBackground'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <ShaderBackground />
      <Navigation />
      <div className="pt-20">
        <Hero />
        <Features />
        <CodeExample />
        <HowItWorks />
        <QuickStart />
        <WhyThisPackage />
        <Footer />
      </div>
    </main>
  )
}
