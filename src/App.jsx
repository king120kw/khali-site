import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import GlobalNav from './components/GlobalNav';
import AuthScreen from './components/AuthScreen';
import BrandStory from './components/BrandStory';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import CollectionBrowsing from './components/CollectionBrowsing';
import ProductDetail from './components/ProductDetail';
import Studio from './components/Studio';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import AIAssistant from './components/AIAssistant';
import SplashCursor from './components/SplashCursor';
import ErrorBoundary from './components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // State Management
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('auth-screen');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('mens'); // 'mens' or 'womens'
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Initial AI message
    setTimeout(() => {
      addAIMessage('Welcome to KHALI WORLD! I\'m your AI design assistant. Let me help you create something extraordinary.');
    }, 1000);
  }, []);

  const addAIMessage = (message) => {
    setAiMessages(prev => [...prev, message]);
  };

  const navigateTo = (screenId) => {
    setCurrentScreen(screenId);
    window.scrollTo(0, 0);
    // If lenis is available globally or through ref, we should call lenis.scrollTo(0)
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Always start with the brand story after login
    navigateTo('brand-story');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigateTo('auth-screen');
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    addAIMessage(`Great choice! I've added the ${item.name || 'custom design'} to your cart.`);
    navigateTo('dashboard');
  };

  const showProductDetail = (product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const showCollection = (collection) => {
    setSelectedCollection(collection);
    navigateTo('collection-browsing');
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Ensure native wheel events are not blocked at the root
    const handleWheel = (e) => {
      // Don't preventDefault here
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Screen rendering logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth-screen':
        return <AuthScreen onLogin={handleLogin} onGuestLogin={() => handleLogin({ name: 'Guest', email: 'guest@khali.world' })} />;
      case 'brand-story':
        return <BrandStory onNavigate={navigateTo} />;
      case 'onboarding':
        return <HowItWorks onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} onSelectCollection={showCollection} addAIMessage={addAIMessage} />;
      case 'collection-browsing':
        return <CollectionBrowsing collection={selectedCollection} onProductSelect={showProductDetail} />;
      case 'product-detail':
        return <ProductDetail product={selectedProduct} onAddToCart={addToCart} onNavigate={navigateTo} addAIMessage={addAIMessage} />;
      case 'exclusive':
        return <CollectionBrowsing category="exclusive" onNavigate={setCurrentScreen} onAddToCart={addToCart} />;
      case 'studio':
        return <Studio onAddToCart={addToCart} addAIMessage={addAIMessage} />;
      case 'checkout':
        return <Checkout cart={cart} onComplete={() => navigateTo('confirmation')} />;
      case 'confirmation':
        return <Confirmation onNavigate={navigateTo} />;
      default:
        return <AuthScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app-container">
      <ErrorBoundary>
        <SplashCursor />
        {/* Global Navigation - hidden on auth/story/how-it-works */}
        {['auth-screen', 'brand-story', 'onboarding'].indexOf(currentScreen) === -1 && (
          <GlobalNav
            onNavigate={navigateTo}
            cartCount={cart.length}
            onLogout={handleLogout}
          />
        )}

        {/* AI Assistant */}
        <AIAssistant
          isOpen={aiPanelOpen}
          toggleOpen={() => setAiPanelOpen(!aiPanelOpen)}
          messages={aiMessages}
        />

        {/* Main Content */}
        {renderScreen()}
      </ErrorBoundary>
    </div>
  );
}

export default App;
