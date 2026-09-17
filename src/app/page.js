import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryPills from '../components/CategoryPills';
import BestSellers from '../components/BestSellers';
import WhyBeeJunior from '../components/WhyBeeJunior';
import PromoBanner from '../components/PromoBanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Collection Shortcuts */}
      <CategoryPills />

      {/* 4. Featured / Best Sellers */}
      <BestSellers />

      {/* 5. Why Bee Junior */}
      <WhyBeeJunior />

      {/* 6. Promotional Banner */}
      <PromoBanner />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
