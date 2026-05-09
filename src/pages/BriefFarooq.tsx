import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Loader2, Sparkles, Send,
  Brain, Workflow, Megaphone, GraduationCap, Globe, MessageCircle, Phone, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type FarooqBrief = {
  // contacts
  name: string;
  contact: string;
  // Q1
  services: string[];
  servicesOther: string;
  // Q2
  salesProcess: string;
  hasSalesManager: string;
  hasAutomation: string;
  // Q3
  hasWebsite: string;
  websiteUrl: string;
  websiteRole: string;
  // bonus
  notes: string;
};

const initial: FarooqBrief = {
  name: "Farooq",
  contact: "",
  services: [],
  servicesOther: "",
  salesProcess: "",
  hasSalesManager: "",
  hasAutomation: "",
  hasWebsite: "",
  websiteUrl: "",
  websiteRole: "",
  notes: "",
};

const SERVICE_OPTIONS = [
  { id: "Picking & integrating AI tools", icon: Brain, emoji: "🧠" },
  { id: "Automating business processes", icon: Workflow, emoji: "⚙️" },
  { id: "Marketing & content AI", icon: Megaphone, emoji: "📣" },
  { id: "Team training & adoption", icon: GraduationCap, emoji: "🎓" },
];

const steps = [
  { id: 1, emoji: "👋", title: "About you" },
  { id: 2, emoji: "🧠", title: "What you help clients do" },
  { id: 3, emoji: "💼", title: "How clients buy" },
  { id: 4, emoji: "🌐", title: "Website" },
  { id: 5, emoji: "✨", title: "Anything else" },
];

const BriefFarooq = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FarooqBrief>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const totalSteps = steps.length;

  const update = <K extends keyof FarooqBrief>(k: K, v: FarooqBrief[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const toggleService = (id: string) => {
    setData((p) => ({
      ...p,
      services: p.services.includes(id)
        ? p.services.filter((s) => s !== id)
        : [...p.services, id],
    }));
  };

  const canNext = () => {
    if (step === 1) return data.name.trim() && data.contact.trim();
    if (step === 2) return data.services.length > 0 || data.servicesOther.trim();
    if (step === 3) return data.salesProcess.trim();
    if (step === 4) return data.hasWebsite.trim();
    return true;
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        services: data.services.join(", "),
      };
      const { error } = await supabase.functions.invoke("send-telegram", {
        body: { formType: "brief-farooq", ...payload },
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Brief sent! 🎉", description: "We'll get back to you shortly with a tailored strategy." });
    } catch (e) {
      console.error(e);
      toast({ title: "Something went wrong", description: "Please try again or DM us on Telegram", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Consulting Brief — Farooq</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-2xl">
        {!submitted ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" /> Strategy intake — for Farooq
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
                Save time. Scale smarter. <span className="text-primary">Stay ahead.</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                A few quick questions so we can hit the ground running.
              </p>
            </motion.div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Step {step} of {totalSteps} • {steps[step - 1].emoji} {steps[step - 1].title}
                </span>
                <span className="text-sm font-bold text-primary">{Math.round((step / totalSteps) * 100)}%</span>
              </div>
              <Progress value={(step / totalSteps) * 100} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
              >
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <Label className="mb-2 flex items-center gap-2"><User className="h-4 w-4" /> Your name</Label>
                      <Input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Farooq" />
                    </div>
                    <div>
                      <Label className="mb-2 flex items-center gap-2"><Phone className="h-4 w-4" /> Best way to reach you (WhatsApp / Telegram / phone / email)</Label>
                      <Input value={data.contact} onChange={(e) => update("contact", e.target.value)} placeholder="@username or +1..." />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold mb-1">QUESTION 01</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        What do you actually help clients do? AI consulting can mean a dozen different things — let's pinpoint the pain point your ads should speak to.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {SERVICE_OPTIONS.map((opt) => {
                          const active = data.services.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleService(opt.id)}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                                active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                              )}
                            >
                              <span className="text-2xl">{opt.emoji}</span>
                              <span className="font-semibold text-sm">{opt.id}</span>
                              {active && <Check className="ml-auto h-4 w-4 text-primary" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Or describe it in your own words (the more specific, the better)</Label>
                      <Textarea
                        rows={4}
                        value={data.servicesOther}
                        onChange={(e) => update("servicesOther", e.target.value)}
                        placeholder="E.g. I help e-commerce brands automate customer support with custom GPTs..."
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold mb-1">QUESTION 02</h2>
                    <p className="text-sm text-muted-foreground">
                      How do clients actually buy from you right now? This shapes the whole ad strategy.
                    </p>
                    <div>
                      <Label className="mb-2 block">Walk us through your sales process — calls, forms, funnel, DMs?</Label>
                      <Textarea
                        rows={5}
                        value={data.salesProcess}
                        onChange={(e) => update("salesProcess", e.target.value)}
                        placeholder="E.g. Ad → landing page → book a 30-min discovery call → proposal..."
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">Do you have a sales manager?</Label>
                        <Input
                          value={data.hasSalesManager}
                          onChange={(e) => update("hasSalesManager", e.target.value)}
                          placeholder="Yes / No / Just me"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Any automation in place? (email, CRM, sequences)</Label>
                        <Input
                          value={data.hasAutomation}
                          onChange={(e) => update("hasAutomation", e.target.value)}
                          placeholder="E.g. HubSpot + Mailchimp / None yet"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold mb-1">QUESTION 03</h2>
                    <p className="text-sm text-muted-foreground">
                      Do you have a website? Even a link in bio or a simple landing page counts.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Yes", "Just a link in bio", "Not yet"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("hasWebsite", opt)}
                          className={cn(
                            "p-3 rounded-xl border-2 text-sm font-semibold transition-all",
                            data.hasWebsite === opt ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {data.hasWebsite && data.hasWebsite !== "Not yet" && (
                      <>
                        <div>
                          <Label className="mb-2 flex items-center gap-2"><Globe className="h-4 w-4" /> Link</Label>
                          <Input
                            value={data.websiteUrl}
                            onChange={(e) => update("websiteUrl", e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">What does it currently do for you?</Label>
                          <Textarea
                            rows={3}
                            value={data.websiteRole}
                            onChange={(e) => update("websiteRole", e.target.value)}
                            placeholder="E.g. brochure site, lead capture, books calls automatically..."
                          />
                        </div>
                      </>
                    )}
                    {data.hasWebsite === "Not yet" && (
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                        No stress 😎 — we can sort that too. Skip ahead.
                      </div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold mb-1">Anything else we should know?</h2>
                    <p className="text-sm text-muted-foreground">
                      Goals, budget, timeline, dream clients — anything that helps us build a strategy that fits.
                    </p>
                    <Textarea
                      rows={6}
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Tell us anything..."
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6 gap-3">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              {step < totalSteps ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={isLoading} className="gradient-primary">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                  Send brief
                </Button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
              <Check className="h-10 w-10" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">Thanks, {data.name}!</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Got it. We'll review everything and come back with a strategy that actually fits your business.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BriefFarooq;
