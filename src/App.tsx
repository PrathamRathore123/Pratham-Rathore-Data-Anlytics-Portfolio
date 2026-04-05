/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Database, Code2, LineChart, Mail, Linkedin, Github, 
  ExternalLink, Download, ChevronRight, Menu, X, Award, Briefcase, 
  User, Cpu, PieChart, TrendingUp, MapPin, Send
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';

// --- Data ---
const SKILLS = [
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'SQL', level: 95, category: 'Programming' },
  { name: 'Excel', level: 92, category: 'Tools' },
  { name: 'Power BI', level: 88, category: 'Tools' },
  { name: 'EDA', level: 85, category: 'Concepts' },
  { name: 'Data Cleaning', level: 90, category: 'Concepts' },
  { name: 'MySQL', level: 85, category: 'Databases' },
  { name: 'PostgreSQL', level: 80, category: 'Databases' },
];

const PROJECTS = [
  {
    title: 'Sales Data Dashboard',
    desc: 'Interactive Power BI dashboard analyzing regional sales performance and identifying growth opportunities.',
    tools: ['Power BI', 'Excel'],
    result: 'Improved reporting efficiency by 30%',
    image: 'https://picsum.photos/seed/sales/800/600'
  },
  {
    title: 'Customer Behavior Analysis',
    desc: 'Python-based analysis using SQL queries to segment customers and predict churn patterns.',
    tools: ['Python', 'SQL', 'Pandas'],
    result: 'Reduced churn by 15% through targeted insights',
    image: 'https://picsum.photos/seed/behavior/800/600'
  },
  {
    title: 'Data Cleaning & Transformation',
    desc: 'Automated ETL pipeline for cleaning messy datasets from multiple sources for a retail client.',
    tools: ['Python', 'SQL', 'Airflow'],
    result: 'Reduced data processing time by 50%',
    image: 'https://picsum.photos/seed/cleaning/800/600'
  },
  {
    title: 'Business Performance Dashboard',
    desc: 'Comprehensive dashboard tracking KPIs across departments to align with strategic goals.',
    tools: ['Power BI', 'SQL'],
    result: 'Enabled real-time decision making for stakeholders',
    image: 'https://picsum.photos/seed/performance/800/600'
  }
];

const EXPERIENCE = [
  {
    role: 'Data Analyst',
    company: 'Confidential',
    period: '2024 - Present',
    desc: 'Focusing on insight generation, reporting, and building automated dashboards for business stakeholders.'
  },
  {
    role: 'Data Analyst Intern',
    company: 'Tech Solutions',
    period: '2023 - 2024',
    desc: 'Worked on real-world datasets, performing EDA and supporting senior analysts in reporting.'
  }
];

const ACHIEVEMENTS = [
  { label: 'Rows Analyzed', value: 10000, suffix: '+' },
  { label: 'Dashboards Built', value: 10, suffix: '+' },
  { label: 'Reporting Speed', value: 40, suffix: '% ↑' }
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
        if (start >= end) { setCount(end); clearInterval(timer); }
        else { setCount(start); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-accent-cyan">
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const FadeIn = ({ children, delay = 0, x = 0, y = 20 }: any) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-300">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,204,0.05)_0%,transparent_70%)]" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan/20 rounded-full"
            initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
            animate={{ y: [null, Math.random() * 100 + '%'], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-dark-bg/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a href="#" className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-blue rounded-lg flex items-center justify-center text-dark-bg">
              <BarChart3 size={24} />
            </div>
            <span>Pratham<span className="text-accent-cyan">.</span></span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-accent-cyan transition-colors">{item}</a>
            ))}
            <button className="btn-secondary py-2 px-6 text-sm">Resume</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 mt-4 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-accent-cyan">{item}</a>
                ))}
                <button className="btn-primary w-full">Download Resume</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center section-padding pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center z-10">
          <FadeIn x={-50}>
            <motion.span className="text-accent-cyan font-mono tracking-widest mb-4 block">DATA ANALYST</motion.span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Turning <span className="text-gradient">Data</span> Into Actionable Insights.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl">
              Data Analyst with 2 years of experience transforming raw data into meaningful business decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary flex items-center gap-2">View Projects <ChevronRight size={20} /></a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} x={50} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-cyan/10 blur-[100px] rounded-full" />
              <div className="glass-card p-8 rounded-2xl relative border-accent-cyan/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/50" /><div className="w-3 h-3 rounded-full bg-yellow-500/50" /><div className="w-3 h-3 rounded-full bg-green-500/50" /></div>
                  <div className="text-xs font-mono text-slate-500">analysis_v1.py</div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-accent-cyan/5 rounded-xl border border-accent-cyan/10 flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 1 }} className="flex-1 bg-accent-cyan/40 rounded-t-sm" />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[Database, LineChart, Code2].map((Icon, i) => (
                      <div key={i} className="h-12 bg-white/5 rounded-lg flex items-center justify-center"><Icon className="text-accent-cyan/50" size={20} /></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-accent-cyan">01.</span> About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-lg">
              <p>I am a Data Analyst with 2 years of experience in analyzing, cleaning, and visualizing data to deliver actionable insights. I specialize in transforming complex data into clear and impactful business solutions.</p>
              <div className="flex items-center gap-2 text-accent-cyan"><MapPin size={18} /> <span>Ahmedabad, India</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Data Analysis', icon: BarChart3 },
                { title: 'Data Visualization', icon: PieChart },
                { title: 'Dashboard Building', icon: TrendingUp },
                { title: 'Business Insights', icon: Briefcase }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} y={10}>
                  <div className="glass-card p-6 rounded-xl hover:border-accent-cyan/30 group">
                    <item.icon className="text-accent-cyan mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="text-white font-bold text-sm">{item.title}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-white/5">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-accent-cyan">02.</span> Technical Skills
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {SKILLS.slice(0, 4).map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2"><span className="text-white font-medium">{skill.name}</span><span className="text-accent-cyan font-mono">{skill.level}%</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue" />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card p-8 rounded-2xl h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SKILLS.slice(0, 6)}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(0,229,204,0.05)' }} contentStyle={{ backgroundColor: '#070f1a', border: '1px solid rgba(0,229,204,0.2)', borderRadius: '8px' }} />
                  <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                    {SKILLS.map((_, index) => <Cell key={index} fill={index % 2 === 0 ? '#00e5cc' : '#007cf0'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-accent-cyan">03.</span> Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl overflow-hidden group hover:border-accent-cyan/30">
                  <div className="h-48 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent-cyan hover:text-dark-bg transition-all"><ExternalLink size={20} /></button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map(tool => <span key={tool} className="text-[10px] font-mono px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded border border-accent-cyan/20">{tool}</span>)}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6">{project.desc}</p>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Result</span>
                      <span className="text-sm font-bold text-accent-cyan">{project.result}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-white/5">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-accent-cyan">04.</span> Experience
          </h2>
          <div className="space-y-8 max-w-3xl">
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1} x={-20}>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-accent-cyan/30">
                  <div className="absolute left-[-4px] top-2 w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5cc]" />
                  <div className="glass-card p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <span className="text-accent-cyan font-mono text-sm">{exp.period}</span>
                    </div>
                    <div className="text-accent-blue font-medium mb-4">{exp.company}</div>
                    <p className="text-slate-400">{exp.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Achievements Section */}
      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card p-10 rounded-2xl text-center hover:border-accent-cyan/30">
                <CountUp value={item.value} suffix={item.suffix} />
                <div className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-xs">{item.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-accent-cyan">05.</span> Get In Touch
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-lg text-slate-400">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
              <div className="space-y-6">
                <a href="mailto:prathamrathore2003@gmail.com" className="flex items-center gap-4 text-white hover:text-accent-cyan transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-dark-bg transition-all"><Mail size={24} /></div>
                  <span>prathamrathore2003@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/pratham-rathore-b151a1292" target="_blank" className="flex items-center gap-4 text-white hover:text-accent-cyan transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-dark-bg transition-all"><Linkedin size={24} /></div>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-cyan focus:outline-none transition-all" />
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-cyan focus:outline-none transition-all" />
              </div>
              <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-cyan focus:outline-none transition-all resize-none" />
              <button className="btn-primary w-full flex items-center justify-center gap-2">Send Message <Send size={18} /></button>
            </form>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xl font-display font-bold text-white mb-4">Pratham Rathore</div>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-slate-400 hover:text-accent-cyan transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-accent-cyan transition-colors"><Mail size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-accent-cyan transition-colors"><Github size={20} /></a>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Pratham Rathore. Built with precision and data.</p>
        </div>
      </footer>
    </div>
  );
}
