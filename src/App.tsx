import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Cpu, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PHASES, BENEFITS, Phase, Step } from './constants';

const IconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="w-6 h-6 text-google-blue" />,
  Users: <Users className="w-6 h-6 text-google-red" />,
  Cpu: <Cpu className="w-6 h-6 text-google-yellow" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-google-green" />,
};

export default function App() {
  const [activePhaseId, setActivePhaseId] = useState<string>(PHASES[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activePhase = PHASES.find(p => p.id === activePhaseId) || PHASES[0];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8f8f8]">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-secondary/10 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-display font-bold text-secondary-dark">
          <span className="text-primary">GEG-FWB</span> : Guide Fédération
        </h1>
        <button 
          className="p-2 text-secondary-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 z-40 md:relative md:z-0
        w-full md:w-80 bg-white border-r border-secondary/10 p-8
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:sticky md:top-0 md:h-screen overflow-y-auto
      `}>
        <div className="mb-12 hidden md:block">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
            </div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Google for Education</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-secondary-dark leading-tight">
            <span className="text-primary">GEG-FWB</span> : Guide de Mise en Place de la Fédération d'Identité
          </h1>
        </div>

        <nav className="space-y-3">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Phases du projet</p>
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => {
                setActivePhaseId(phase.id);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left p-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                activePhaseId === phase.id 
                  ? 'bg-primary-light text-primary-dark shadow-sm border border-primary/20' 
                  : 'text-secondary hover:bg-primary-light/50'
              }`}
            >
              <div className={`shrink-0 ${activePhaseId === phase.id ? 'text-primary-dark' : 'text-primary'}`}>
                {IconMap[phase.icon]}
              </div>
              <span>{phase.title}</span>
            </button>
          ))}
        </nav>

        <div className="mt-12 pt-12 border-t border-secondary/10 hidden md:block">
          <p className="text-xs text-secondary leading-relaxed">
            Guide interactif basé sur les procédures de déploiement Google for Education & Microsoft Entra ID.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhaseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary-dark shadow-sm border border-secondary/10">
                  {IconMap[activePhase.icon]}
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-secondary-dark">{activePhase.title}</h2>
                  <p className="text-secondary mt-1">Suivez les étapes ci-dessous pour compléter cette phase.</p>
                </div>
              </div>

              <div className="space-y-8">
                {activePhase.steps.map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    className="bg-white rounded-3xl p-8 shadow-sm border border-secondary/5 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-primary-light w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-primary-dark shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-secondary-dark">{step.title}</h3>
                        <p className="text-secondary">{step.description}</p>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-6 ml-12">
                      {step.details.map((detail, dIdx) => (
                        <React.Fragment key={dIdx}>
                          <li className="flex items-start gap-3 text-secondary">
                            <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                          {step.links?.filter(l => l.index === dIdx).map((link, lIdx) => (
                            <div key={lIdx} className="my-4">
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-sm"
                              >
                                <span>{link.label}</span>
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </ul>

                    {step.links?.filter(l => l.index === undefined).map((link, lIdx) => (
                      <div key={lIdx} className="ml-12 mb-6">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-sm"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    ))}

                    {step.tips && (
                      <div className="ml-12 bg-primary-light/30 border border-primary/10 rounded-2xl p-5 flex gap-4">
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm text-secondary-dark">
                          <p className="font-bold mb-1">Conseils :</p>
                          <ul className="list-disc list-inside space-y-1 opacity-80">
                            {step.tips.map((tip, tIdx) => (
                              <li key={tIdx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {step.warning && (
                      <div className="ml-12 mt-4 bg-google-red/5 border border-google-red/10 rounded-2xl p-5 flex gap-4">
                        <AlertTriangle className="w-5 h-5 text-google-red shrink-0 mt-0.5" />
                        <div className="text-sm text-secondary-dark">
                          <p className="font-bold mb-1 text-google-red">Attention :</p>
                          <p className="opacity-90">
                            {step.warning}
                            {step.warningLink && (
                              <a 
                                href={step.warningLink.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="underline font-bold hover:text-google-red transition-colors ml-1"
                              >
                                {step.warningLink.label}
                              </a>
                            )}
                            .
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <div className="mt-16 flex justify-between items-center border-t border-secondary/10 pt-8">
                <button 
                  disabled={PHASES.findIndex(p => p.id === activePhaseId) === 0}
                  onClick={() => setActivePhaseId(PHASES[PHASES.findIndex(p => p.id === activePhaseId) - 1].id)}
                  className="px-6 py-3 rounded-2xl font-bold text-secondary hover:bg-primary/10 disabled:opacity-30 transition-all flex items-center gap-2"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Phase Précédente
                </button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  disabled={PHASES.findIndex(p => p.id === activePhaseId) === PHASES.length - 1}
                  onClick={() => setActivePhaseId(PHASES[PHASES.findIndex(p => p.id === activePhaseId) + 1].id)}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-secondary-dark rounded-2xl font-bold shadow-sm hover:bg-primary-dark transition-all disabled:opacity-30"
                >
                  Phase Suivante
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Benefits Section - Integrated at the bottom */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary-dark text-white rounded-3xl p-8 shadow-md col-span-1 md:col-span-2">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                Bénéfices Clés du Déploiement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                      {benefit.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-secondary/10 shadow-sm flex-1">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2 text-secondary-dark">
                <Lock className="w-5 h-5 text-primary" />
                Sécurité & Contrôle
              </h3>
              <p className="text-secondary text-sm mb-6 leading-relaxed">
                L'objectif est d'unifier l'expérience utilisateur tout en garantissant la sécurité des données de l'établissement.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <div className="w-2 h-2 bg-primary rounded-full shadow-sm" />
                  <span>Pas de serveurs locaux requis</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <div className="w-2 h-2 bg-primary rounded-full shadow-sm" />
                  <span>Conformité RGPD renforcée</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <div className="w-2 h-2 bg-primary rounded-full shadow-sm" />
                  <span>Protection automatisée des mineurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 mt-24 text-center">
          <p className="text-secondary text-xs opacity-60">
            © {new Date().getFullYear()} EduNum - Guide de Fédération d'Identité. Tous droits réservés.
          </p>
        </footer>
      </main>
    </div>
  );
}
