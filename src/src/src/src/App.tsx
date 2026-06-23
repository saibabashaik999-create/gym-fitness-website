import { useState, useEffect, useRef } from 'react';
import {
  Dumbbell,
  Users,
  Trophy,
  Clock,
  MapPin,
  Phone,
  Star,
  ChevronDown,
  Menu,
  X,
  Heart,
  Target,
  Zap,
  Award,
  Timer,
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  ChevronRight,
  Play,
  Quote,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';

const reviews = [
  {
    name: 'Anandini Pamidi',
    rating: 5,
    text: 'I have been going to this gym for the past 7 months and have achieved the goals I set for myself under the personal training of Nagaraju Sir. I have seen significant improvements in my fitness, strength, and confidence during this period.',
    tag: 'body transformation',
    time: '2 weeks ago'
  },
  {
    name: 'Naga Vamsi Kokkiligadda',
    rating: 5,
    text: 'The gym has an excellent ambience and is equipped with all the essential machines and facilities. They also offer personal training sessions. I am currently taking daily classes from Naga Raju sir, who has over 15 years of experience.',
    tag: 'trainers',
    time: '6 months ago'
  },
  {
    name: 'Prashanthi Naidu',
    rating: 5,
    text: 'F24 is one of the best gyms in Ongole! It has all the equipment needed for weight loss as well as bodybuilding. Personal training is top-notch & Trainer Nagaraju garu has excellent knowledge and also prepare workout charts and diet plans.',
    tag: 'weight loss',
    time: '4 months ago'
  }
];

const services = [
  {
    icon: Dumbbell,
    title: 'Body Building',
    description: 'State-of-the-art equipment for muscle building and strength training',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: TrendingUp,
    title: 'Weight Loss',
    description: 'Scientifically designed programs for effective fat burning',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Personal Training',
    description: 'One-on-one sessions with experienced certified trainers',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'Custom Diet Plans',
    description: 'Personalized nutrition plans to match your fitness goals',
    color: 'from-purple-500 to-pink-500'
  }
];

const stats = [
  { number: 500, suffix: '+', label: 'Active Members', icon: Users },
  { number: 15, suffix: '+', label: 'Years Experience', icon: Award },
  { number: 33, suffix: '', label: '5-Star Reviews', icon: Star },
  { number: 50, suffix: '+', label: 'Equipment Types', icon: Dumbbell }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [countedStats, setCountedStats] = useState(false);
  const [displayStats, setDisplayStats] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'services', 'trainers', 'reviews', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setDisplayStats(stats.map((stat, i) => Math.floor(stat.number * easeOut)));

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayStats(stats.map((stat) => stat.number));
          setCountedStats(true);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countedStats) {
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countedStats]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-400 overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'nav-blur bg-dark-400/80 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-orange via-accent-yellow to-accent-gold rounded-xl flex items-center justify-center font-display font-bold text-xl text-dark-400 shadow-glow animate-pulse-glow">
                  F24
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-2xl font-bold gradient-text">F24</span>
                <span className="font-display text-2xl font-light text-white/90 ml-1">Gym</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Services', 'Trainers', 'Reviews', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`relative font-medium transition-colors py-2 ${
                    activeSection === item.toLowerCase()
                      ? 'text-accent-orange'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-gold rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="btn-primary px-6 py-2.5 rounded-full font-semibold text-white"
              >
                Join Now
              </button>
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-dark-400/95 nav-blur transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {['Home', 'About', 'Services', 'Trainers', 'Reviews', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left text-lg text-white/80 hover:text-accent-orange transition-colors py-2"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary w-full py-3 rounded-lg font-semibold text-white mt-4"
            >
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-hero overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 star-pattern opacity-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent-orange/5 to-transparent rounded-full blur-3xl" />

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border-2 border-accent-orange/20 rotate-45 animate-rotate-slow hidden lg:block" />
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-accent-yellow/10 rounded-full animate-bounce-subtle hidden lg:block" />
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-accent-gold/30 rotate-45 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-slide-up">
                <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                <span className="text-white/90 font-medium">5.0 Rating - 33 Reviews</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Transform Your
                <span className="block gradient-text mt-2">Fitness Journey</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-8 animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                Experience premium fitness at Ongole's best gym. State-of-the-art equipment, expert trainers, and personalized programs to help you achieve your goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <button
                  onClick={() => scrollTo('contact')}
                  className="btn-primary px-8 py-4 rounded-full font-semibold text-white text-lg flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/20 hover:border-accent-orange hover:text-accent-orange transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                  <Play className="w-5 h-5" />
                  Virtual Tour
                </button>
              </div>

              <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-dark-400 bg-gradient-to-br from-gray-600 to-gray-800"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{stats[0].number}+ Members</p>
                  <p className="text-white/60 text-sm">Trust F24 Fitness</p>
                </div>
              </div>
            </div>

            {/* Hero Image/3D Card */}
            <div className="relative hidden lg:block">
              <div className="relative preserve-3d">
                <div className="card-3d glass rounded-3xl p-1 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="F24 Gym Interior"
                    className="w-full h-[500px] object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/90 via-transparent to-transparent rounded-3xl" />

                  {/* Floating Stats Card */}
                  <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm">Featured Trainer</p>
                        <p className="text-white font-semibold">Nagaraju Sir</p>
                        <p className="text-accent-gold text-sm">15+ Years Experience</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-gold rounded-2xl blur-xl opacity-50" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-accent-yellow to-accent-gold rounded-full blur-2xl opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollTo('about')} className="flex flex-col items-center gap-2 text-white/60 hover:text-accent-orange transition-colors">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} id="about" className="relative py-24 bg-section overflow-hidden">
        <div className="absolute inset-0 star-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="reveal glass rounded-2xl p-6 lg:p-8 text-center hover-lift group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-orange/20 to-accent-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-accent-orange" />
                  </div>
                  <div className="font-display text-4xl lg:text-5xl font-bold gradient-text mb-2 counter-value">
                    {displayStats[index]}{stat.suffix}
                  </div>
                  <p className="text-white/70 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 bg-dark-400 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Grid */}
            <div className="relative reveal-left order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="card-3d-reverse rounded-2xl overflow-hidden h-40 lg:h-48">
                    <img
                      src="https://images.pexels.com/photos/260324/pexels-photo-260324.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Gym Equipment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="card-3d rounded-2xl overflow-hidden h-64 lg:h-80">
                    <img
                      src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Workout Area"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8 lg:pt-12">
                  <div className="card-3d rounded-2xl overflow-hidden h-64 lg:h-80">
                    <img
                      src="https://images.pexels.com/photos/2294362/pexels-photo-2294362.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Training Session"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="card-3d-reverse rounded-2xl overflow-hidden h-40 lg:h-48">
                    <img
                      src="https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Fitness Area"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-glow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-display text-3xl font-bold gradient-text">15+</div>
                  <div className="text-white/70 text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="reveal-right order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                <span className="text-white/80 text-sm font-medium">About F24 Gym</span>
              </div>

              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                One of the <span className="gradient-text">Best Gyms</span> in Ongole
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-6">
                F24 Gym & Fitness stands as Ongole's premier fitness destination. With over 15 years of expertise, we provide exceptional facilities, highly qualified trainers, and personalized fitness programs.
              </p>

              <p className="text-white/70 leading-relaxed mb-8">
                Our trainer Nagaraju Sir brings 15+ years of experience in body transformation, weight loss, and muscle building. We craft custom workout charts and diet plans tailored to your unique fitness goals.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: 'Hygienic Atmosphere' },
                  { icon: Dumbbell, text: 'Modern Equipment' },
                  { icon: Users, text: 'Expert Trainers' },
                  { icon: Clock, text: 'Flexible Timings' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <item.icon className="w-5 h-5 text-accent-orange" />
                    <span className="text-white/90 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo('services')}
                className="btn-primary px-8 py-3 rounded-full font-semibold text-white inline-flex items-center gap-2 group"
              >
                Our Services
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 bg-section overflow-hidden">
        <div className="absolute inset-0 star-pattern opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-accent-orange" />
              <span className="text-white/80 text-sm font-medium">What We Offer</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Premium Services</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive fitness solutions designed to help you achieve your goals faster and safer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="reveal-scale card-3d glass rounded-2xl p-6 lg:p-8 group cursor-pointer hover-lift"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center reveal">
            <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Flexible Timing Options</h3>
                  <p className="text-white/70">
                    Open from 5:00 AM to 10:00 PM. Choose the time slot that fits your schedule perfectly.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-accent-gold">
                  <Timer className="w-5 h-5" />
                  <span className="font-semibold">17 Hours Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="relative py-24 bg-dark-400 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-accent-orange" />
              <span className="text-white/80 text-sm font-medium">Expert Team</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Meet Our <span className="gradient-text">Expert Trainers</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Highly qualified professionals dedicated to your fitness success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Main Trainer Card */}
            <div className="reveal card-3d glass rounded-3xl overflow-hidden group">
              <div className="relative h-80">
                <img
                  src="https://images.pexels.com/photos/6550808/pexels-photo-6550808.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Head Trainer Nagaraju Sir"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-dark-400/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-accent-orange to-accent-gold px-4 py-1.5 rounded-full text-dark-400 font-semibold text-sm">
                    Head Trainer
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Nagaraju Sir</h3>
                <p className="text-accent-gold font-medium mb-4">Head Fitness Trainer</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Body Transformation', 'Weight Loss', 'Muscle Building', 'Personal Training'].map((tag) => (
                    <span key={tag} className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent-orange" />
                    <span className="text-white/70">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-1 star-rating">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white font-semibold">5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trainer Info Cards */}
            <div className="space-y-4">
              {[
                {
                  title: 'Custom Workout Charts',
                  description: 'Personalized workout plans designed specifically for your body type and fitness goals.',
                  icon: Target,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Diet Plans',
                  description: 'Scientifically crafted nutrition plans to complement your training program.',
                  icon: Heart,
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'One-on-One Sessions',
                  description: 'Personal training sessions with undivided attention and guidance.',
                  icon: Users,
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Progress Tracking',
                  description: 'Regular assessments and adjustments to ensure consistent progress.',
                  icon: TrendingUp,
                  color: 'from-orange-500 to-amber-500'
                }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="reveal-right glass rounded-2xl p-5 flex items-center gap-4 hover-lift"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-24 bg-section overflow-hidden">
        <div className="absolute inset-0 star-pattern opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-4 bg-white/5 rounded-full px-6 py-3 mb-6">
              <div className="flex items-center gap-1 star-rating">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">5.0 (33 reviews)</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Members Say</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Real stories from real people who transformed their lives at F24
            </p>
          </div>

          {/* Review Summary */}
          <div className="reveal-scale glass rounded-2xl p-6 lg:p-8 mb-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <span className="text-3xl font-bold text-white">{num === 5 ? '33' : num === 4 ? '0' : num === 3 ? '0' : num === 2 ? '0' : '0'}</span>
                  <div className="flex gap-0.5">
                    {Array(5).fill(null).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < num ? 'fill-accent-gold text-accent-gold' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">{num} stars</span>
                </div>
              ))}
            </div>
            <div className="divider-glow mt-8" />
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Body Transformation', 'Weight Loss', 'Trainers', 'Muscle Gaining', 'Diet Plans'].map((tag) => (
                <span key={tag} className="text-sm bg-white/10 text-white/80 px-4 py-2 rounded-full hover:bg-accent-orange/20 hover:text-accent-orange transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="reveal card-3d glass rounded-2xl p-6 hover-lift"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center text-dark-400 font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      <p className="text-white/50 text-sm">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 star-rating">
                    {Array(review.rating).fill(null).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-accent-orange/30 mb-3" />
                <p className="text-white/70 leading-relaxed mb-4">{review.text}</p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs bg-accent-orange/20 text-accent-orange px-3 py-1 rounded-full">
                    {review.tag}
                  </span>
                  <button className="text-accent-gold hover:text-accent-orange transition-colors text-sm font-medium flex items-center gap-1">
                    Helpful
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <button className="px-8 py-3 rounded-full font-semibold text-white border-2 border-white/20 hover:border-accent-orange hover:text-accent-orange transition-all backdrop-blur-sm inline-flex items-center gap-2">
              View All Reviews
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-dark-400 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="reveal-left">
              <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-accent-orange" />
                <span className="text-white/80 text-sm font-medium">Get in Touch</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Start Your <span className="gradient-text">Transformation</span> Today
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Ready to transform your fitness journey? Contact us today to schedule a free consultation and gym tour.
              </p>

              <div className="space-y-4">
                <div className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-white/60 text-sm">
                      4th floor, Anil plaza, Church Centre, beside Head Post Office, Gadiyaram Vari Veedhi, Bandla Metla, Ongole, AP 523001
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-white/60">089781 78377</p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Working Hours</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-medium">Open Now</span>
                      <span className="text-white/60 text-sm">- Closes 10 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="reveal-right">
              <div className="glass rounded-3xl p-6 lg:p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-6">Quick Inquiry</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Schedule a Tour', desc: 'Visit our state-of-the-art facility', icon: MapPin },
                    { title: 'Book a Trial', desc: 'Free trial session with our trainers', icon: Calendar },
                    { title: 'Membership Plans', desc: 'Explore flexible membership options', icon: Target }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={i}
                        className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4 group text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-orange/20 to-accent-gold/20 flex items-center justify-center group-hover:from-accent-orange group-hover:to-accent-gold transition-all">
                          <Icon className="w-5 h-5 text-accent-orange group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <p className="text-white/60 text-sm">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-accent-orange transition-colors" />
                      </button>
                    );
                  })}
                </div>
                <button className="btn-primary w-full py-4 rounded-xl font-semibold text-white mt-6 flex items-center justify-center gap-2 group">
                  <Phone className="w-5 h-5" />
                  Call Now: 089781 78377
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-dark-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-orange via-accent-yellow to-accent-gold rounded-xl flex items-center justify-center font-display font-bold text-xl text-dark-400 shadow-glow">
                  F24
                </div>
                <div>
                  <span className="font-display text-2xl font-bold gradient-text">F24 Gym</span>
                  <p className="text-white/60 text-sm">Transform Your Fitness</p>
                </div>
              </div>
              <p className="text-white/60 max-w-md leading-relaxed mb-6">
                Experience premium fitness at Ongole's best gym. State-of-the-art equipment, expert trainers, and personalized programs to help you achieve your goals.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' }
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-orange transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Trainers', 'Reviews', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link.toLowerCase())}
                      className="text-white/60 hover:text-accent-orange transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {['Body Building', 'Weight Loss', 'Personal Training', 'Diet Plans', 'Group Classes'].map((service) => (
                  <li key={service}>
                    <a href="#services" className="text-white/60 hover:text-accent-orange transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider-glow mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              2024 F24 Gym & Fitness. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <span>4th floor, Anil plaza, Ongole, AP 523001</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
