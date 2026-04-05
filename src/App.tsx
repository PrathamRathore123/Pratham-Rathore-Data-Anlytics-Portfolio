/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Database, 
  Code2, 
  LineChart, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Download, 
  ChevronRight, 
  Menu, 
  X,
  Award,
  Briefcase,
  User,
  Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';

// --- Types & Constants ---

const SKILLS = [
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'SQL', level: 95, category: 'Database' },
  { name: 'R', level: 75, category: 'Programming' },
  { name: 'Tableau', level: 85, category: 'Visualization' },
  { name: 'Power BI', level: 80, category: 'Visualization' },
  { name: 'Pandas/NumPy', level: 90, category: 'Tools' },
  { name: 'Scikit-Learn', level: 70, category: 'Tools' },
  { name: 'Excel (VBA)', level: 85, category: 'Tools' },
];

const PROJECTS = [
  {
    title: 'E-commerce Customer Segmentation',
    description: 'Applied K-Means clustering to segment 50k+ customers based on RFM analysis, leading to a 15% increase in targeted campaign conversion.',
    tools: ['Python', 'Scikit-Learn', 'Tableau'],
    result: '15% Conversion Boost',
    image: 'https://picsum.photos/seed/data1/800/600'
  },
  {
    title: 'Financial Risk Dashboard',
    description: 'Developed a real-time risk assessment dashboard for a fintech startup, monitoring $5M+ in daily transactions for anomalies.',
    tools: ['SQL', 'Power BI', 'Python'],
    result: 'Reduced Fraud by 12%',
    image: 'https://picsum.photos/seed/data2/800/600'
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Optimized inventory levels using time-series forecasting (ARIMA), reducing warehouse overhead costs significantly.',
    tools: ['R', 'SQL', 'Excel'],
    result: '20% Cost Reduction',
    image: 'https://picsum.photos/seed/data3/800/600'
  }
];

const EXPERIENCE = [
  {
    company: 'DataCorp Solutions',
    role: 'Senior Data Analyst',
    period: '2022 - Present',
    description: 'Leading a team of 4 analysts to deliver actionable insights for Fortune 500 clients. Specialized in predictive modeling and automated reporting.'
  },
  {
    company: 'Insightful Metrics',
    role: 'Data Analyst',
    period: '2020 - 2022',
    description: 'Built automated ETL pipelines and self-service dashboards that reduced manual reporting time by 40 hours per month.'
  },
  {
    company: 'TechStart Inc',
    role: 'Junior Analyst',
    period: '2018 - 2020',
    description: 'Performed exploratory data analysis and supported the marketing team with A/B testing results and customer behavior reports.'
  }
];

const ACHIEVEMENTS = [
  { label: 'Projects Completed', value: 45, suffix: '+' },
  { label: 'Data Processed', value: 500, suffix: 'GB+' },
  { label: 'Cost Savings', value: 1.2, suffix: 'M$' },
  { label: 'Efficiency Gain', value: 35, suffix: '%' }
];

// --- Components ---

const CountUp = ({ value, suffix = '' }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-neon-blue">
      {count % 1 === 0 ? count : count.toFixed(1)}{suffix}
    </span>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      viewport={{ once: true }}
      className="h-1 bg-neon-blue mt-4"
    />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-navy-900 selection:bg-neon-blue/30 selection:text-neon-blue">
      {/* Background Particles Simulation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,25,47,0)_0%,rgba(10,25,47,1)_100%)]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, Math.random() * 100 + '%'],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-navy-900/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-display font-bold text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center text-navy-900">
              <BarChart3 size={24} />
            </div>
            <span className="hidden sm:inline">Data<span className="text-neon-blue">Analyst</span></span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-neon-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-transparent border border-neon-blue text-neon-blue rounded-md text-sm font-medium hover:bg-neon-blue/10 transition-all neon-glow"
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-800 border-b border-white/10 mt-4 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-neon-blue"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="w-full py-3 bg-neon-blue text-navy-900 rounded-md font-bold">
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-neon-blue font-mono text-sm tracking-widest mb-4 block"
            >
              HI, MY NAME IS
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Transforming <span className="text-neon-blue">Data</span> Into Decisions.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              I'm a Data Analyst specializing in building robust analytical models, 
              interactive dashboards, and predictive insights that drive business growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-neon-blue text-navy-900 rounded-md font-bold flex items-center gap-2 shadow-lg shadow-neon-blue/20"
              >
                View My Work <ChevronRight size={20} />
              </motion.a>
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-neon-blue text-neon-blue rounded-md font-bold hover:bg-neon-blue/10 transition-all"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-neon-blue/10 blur-[100px] rounded-full" />
            <div className="glass-card p-8 rounded-2xl relative border-neon-blue/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs font-mono text-slate-500">data_viz_v2.py</div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
                <div className="h-32 bg-neon-blue/5 rounded-xl border border-neon-blue/10 flex items-end p-4 gap-2">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="flex-1 bg-neon-blue/40 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <Database className="text-neon-blue/50" size={20} />
                  </div>
                  <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <LineChart className="text-neon-blue/50" size={20} />
                  </div>
                  <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <Code2 className="text-neon-blue/50" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-navy-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="A quick look into my background and what drives my passion for data.">
            About Me
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-slate-400 text-lg"
            >
              <p>
                I am a curious problem-solver who believes that every data point tells a story. 
                With a background in Statistics and Computer Science, I bridge the gap between 
                complex technical analysis and clear business strategy.
              </p>
              <p>
                My approach is data-first: I don't just build models; I ensure they are 
                interpretable and actionable. Whether it's optimizing supply chains or 
                understanding customer churn, I focus on the ROI of every insight.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center text-neon-blue">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold">Strategy</div>
                    <div className="text-xs">Business Focused</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center text-neon-blue">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold">Automation</div>
                    <div className="text-xs">ETL & Pipelines</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2">
                <img 
                  src="https://picsum.photos/seed/analyst/600/600" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-neon-blue/20 rounded-2xl -z-10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="My technical toolkit for data extraction, processing, and visualization.">
            Technical Skills
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {SKILLS.slice(0, 4).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-neon-blue font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {SKILLS.slice(4).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-neon-blue font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Distribution Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 glass-card p-8 rounded-2xl h-[400px]"
          >
            <h3 className="text-xl font-display font-bold text-white mb-8">Proficiency Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILLS}>
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(100,255,218,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#112240', 
                    border: '1px solid rgba(100,255,218,0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                  {SKILLS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#64ffda' : '#00d4ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-navy-800/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Real-world applications of data science to solve complex business problems.">
            Featured Projects
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-neon-blue hover:text-navy-900 transition-all">
                      <ExternalLink size={20} />
                    </button>
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-neon-blue hover:text-navy-900 transition-all">
                      <Github size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[10px] font-mono px-2 py-1 bg-neon-blue/10 text-neon-blue rounded border border-neon-blue/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-slate-500">IMPACT</span>
                    <span className="text-sm font-bold text-neon-cyan">{project.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 glass-card rounded-2xl border-neon-blue/10"
              >
                <CountUp value={item.value} suffix={item.suffix} />
                <div className="text-slate-400 mt-2 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-navy-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="My professional journey and key contributions across different organizations.">
            Work Experience
          </SectionHeading>

          <div className="space-y-8 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative md:w-1/2 p-6",
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                )}
              >
                <div className={cn(
                  "absolute top-8 w-4 h-4 bg-neon-blue rounded-full border-4 border-navy-900 z-10",
                  i % 2 === 0 ? "-left-2 md:left-auto md:-right-2" : "-left-2"
                )} />
                <div className="glass-card p-8 rounded-2xl hover:border-neon-blue/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-xl font-display font-bold text-white">{exp.role}</h3>
                    <span className="text-neon-blue font-mono text-sm">{exp.period}</span>
                  </div>
                  <div className="text-neon-cyan font-medium mb-4 flex items-center gap-2 md:justify-end">
                    <Briefcase size={16} /> {exp.company}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 bg-neon-blue/5">
              <SectionHeading>Let's Connect</SectionHeading>
              <p className="text-slate-400 mb-12 text-lg">
                I'm currently open to new opportunities and collaborations. 
                Whether you have a question or just want to say hi, my inbox is always open!
              </p>
              
              <div className="space-y-6">
                <a href="mailto:prathamr2004@gmail.com" className="flex items-center gap-4 text-white hover:text-neon-blue transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center group-hover:bg-neon-blue group-hover:text-navy-900 transition-all">
                    <Mail size={24} />
                  </div>
                  <span>prathamr2004@gmail.com</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-white hover:text-neon-blue transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center group-hover:bg-neon-blue group-hover:text-navy-900 transition-all">
                    <Linkedin size={24} />
                  </div>
                  <span>linkedin.com/in/data-analyst</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-white hover:text-neon-blue transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center group-hover:bg-neon-blue group-hover:text-navy-900 transition-all">
                    <Github size={24} />
                  </div>
                  <span>github.com/data-analyst</span>
                </a>
              </div>
            </div>

            <div className="p-12">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-neon-blue text-navy-900 rounded-lg font-bold shadow-lg shadow-neon-blue/20"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-white font-display font-bold">
            <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center text-navy-900">
              <BarChart3 size={18} />
            </div>
            DataAnalyst
          </div>
          
          <div className="text-slate-500 text-sm">
            © 2026 Designed & Built by Data Analyst. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-neon-blue transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
