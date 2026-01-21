"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Building, AlertCircle, CheckCircle, X, Lock } from "lucide-react";

const defaultBody=`<p>Dear Team <strong>{{companyName}}</strong>,</p>

                            <p>Greetings from <strong>TECH RMDSSOE, RMD Sinhgad Technical Institute, Pune</strong>.</p>

                            <p>
                                We hope this message finds you well. We are pleased to invite <strong>{{companyName}}</strong> to
                                collaborate with us as a brand sponsor for <strong>ELVION</strong>, a high-impact <strong>9-hour
                                    on-campus hackathon</strong> hosted at <strong>RMD Sinhgad Technical
                                    Institute</strong>.
                            </p>

                            <h3 style="color:#667eea; margin-top:25px;">About ELVION</h3>
                            <p>
                                <strong>ELVION</strong> is an innovation-driven hackathon designed to bring
                                together technically passionate students to ideate, build, and present solutions
                                in a competitive and high-energy environment.
                            </p>
                            <ul style="margin-left:20px;">
                                <li><strong>200+ expected registrations</strong> from students across multiple colleges</li>
                                <li><strong>Top 30 teams</strong> shortlisted for the final physical on-campus hackathon</li>
                                <li><strong>~1000+ students</strong> present on campus during the event day, ensuring continuous footfall and visibility</li>
                                <li>Faculty-supervised event with structured evaluations and an award ceremony</li>
                            </ul>
                            <p>
                                In addition, we are actively inviting students from colleges across Pune, supported by city-wide digital promotions and poster circulation, significantly extending the event's reach beyond our campus.
                            </p>

                            <h3 style="color:#667eea; margin-top:25px;">Why Partner with ELVION – Strong Brand Visibility & Recall
                            </h3>
                            <p>Sponsoring ELVION positions <strong>{{companyName}}</strong> directly in front of a highly relevant, tech-focused audience, offering both immediate visibility and long-term brand recall.</p>

                            <h4 style="color:#333; margin-top:20px; margin-bottom:10px;">1. High-Impact On-Ground Brand Visibility
                            </h4>
                            <ul style="margin-left:20px;">
                                <li>Prominent logo placement on stage backdrops, banners, standees, certificates,
                                    and event merchandise</li>
                                <li>Brand mentions during inauguration, judging rounds, and award ceremony</li>
                                <li>Tier-based recognition such as <strong>"Powered By {{companyName}}"</strong>,
                                    <strong>Industry Partner</strong>, or <strong>Event Sponsor</strong>, ensuring clear
                                    differentiation and premium recall</li>
                                <li>Visibility to <strong>~1000+ students</strong> physically present on campus throughout the day</li>
                                </li>
                            </ul>

                            <h4 style="color:#333; margin-top:20px; margin-bottom:10px;">2. Direct Engagement with a Focused Tech Audience</h4>
                            <ul style="margin-left:20px;">
                                <li>Opportunity to set up dedicated stalls/booths for demos, brochures, QR-based
                                    sign-ups, or promotional campaigns</li>
                                <li>Optional stage time to introduce your brand, products, platforms, or initiatives</li>
                                <li>Continuous engagement during the 9-hour event, ensuring more than just passive advertising
                                </li>
                            </ul>

                            <h4 style="color:#333; margin-top:20px; margin-bottom:10px;">3. Pune-Wide Digital & Promotional Reach
                            </h4>
                            <ul style="margin-left:20px;">
                                <li>Brand presence across pre-event social media promotions, posters, reels, and shoutouts</li>
                                <li>Posters and digital creatives circulated to engineering colleges across Pune</li>
                                <li>Inclusion in post-event content, photos, and impact reports shared with participants and stakeholders
                                </li>
                                <li>Long-term brand visibility through certificates, social media coverage, and online content</li>
                            </ul>

                            <h4 style="color:#333; margin-top:20px; margin-bottom:10px;">4. Product, Platform & Ecosystem
                                Awareness</h4>
                            <ul style="margin-left:20px;">
                                <li>Opportunity to encourage participants to explore or build around your tools, APIs, platforms, or
                                    services</li>
                                <li>Live exposure of your offerings to students who are actively engaged in
                                    technology, innovation, and problem-solving</li>
                                <li>Strong association with innovation, learning, and developer culture</li>
                            </ul>

                            <h3 style="color:#667eea; margin-top:25px;">Employment & Talent (Optional Value-Add)</h3>
                            <p>While ELVION is primarily a branding and engagement platform, sponsors may also:</p>
                            <ul style="margin-left:20px;">
                                <li>Interact with high-performing teams and students during the event</li>
                                <li>Opt for access to an opt-in participant resume pool (based on sponsorship tier)</li>
                                <li>Build early brand affinity among potential future hires</li>
                            </ul>

                            <h3 style="color:#667eea; margin-top:25px;">Flexible Sponsorship Models</h3>
                            <p>
                                We offer customizable sponsorship tiers, including <strong>cash, in-kind, or
                                    product-based partnerships</strong>, aligned with your brand objectives. Our organizing team
                                will ensure smooth execution, professional coordination, and maximum sponsor value.
                            </p>
                            <p>
                                The event will be conducted under <strong>faculty supervision</strong> and managed by a
                                dedicated student organizing team, ensuring credibility, structure, and accountability.
                            </p>

                            <p style="margin-top:25px;">
                                We would be delighted to discuss how <strong>{{companyName}}</strong> can leverage
                                ELVION as a high-visibility campus and Pune-wide branding opportunity. Please let us know a convenient
                                time to connect, and we will be happy to share the detailed sponsorship proposal.
                            </p>

                            <p>
                                Thank you for your time and consideration. We look forward to the possibility of
                                collaborating with <strong>{{companyName}}</strong>.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
                                <tr>
                                    <td style="vertical-align:top; width:60%;">
                                        <p style="margin:0;">
                                            Warm regards,<br />
                                            <strong>Team TECH RMDSSOE</strong><br />
                                            Department of Computer Engineering<br />
                                            RMD Sinhgad Technical Institute, Pune<br />
                                            Website: <a href="https://theclub.tech/"
                                                style="color:#667eea;">https://theclub.tech/</a>
                                        </p>
                                    </td>
                                    <!-- <td align="right" style="vertical-align:top; width:40%;">
                                        <img src="https://vivekpatil.me/images/stamp.jpg" draggable="false" oncontextmenu="return false;" alt="Stamp" width="120" style="max-width:100%; height:auto; pointer-events:none; user-select:none; -webkit-user-drag:none;" />
                                    </td> -->
                                </tr>
                            </table>
`
export default function HomeClient({ isAuthenticated: initialIsAuthenticated }: { isAuthenticated: boolean }) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [body, setBody] = useState(defaultBody);
  const [isEditing, setIsEditing] = useState(false);

  const handlePasswordSubmit = async () => {
      try {
        // console.log('sending ',password);
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError(null);
      } else {
        const data = await response.json();
        setAuthError(data.message || "Incorrect password. Please try again.");
      }
    } catch (error) {
      setAuthError("An error occurred during authentication.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newEmail = inputValue.trim();
      if (newEmail && !emails.includes(newEmail) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        setEmails([...emails, newEmail]);
        setInputValue("");
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleSend = async () => {
    setIsLoading(true);
    setStatus(null);

    if (emails.length === 0) {
      setStatus({ type: 'error', message: 'Please enter at least one valid email address.' });
      setIsLoading(false);
      return;
    }

    if (!companyName) {
      setStatus({ type: 'error', message: 'Company name is required.' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emails, companyName ,body}),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: `Emails sent successfully to ${emails.length} recipients!` });
        setEmails([]);
        setCompanyName("");
      } else {
        setStatus({ type: 'error', message: result.message || 'An unknown error occurred.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect to the server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Lock className="w-6 h-6" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please enter the password to access the campaign manager.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
            </div>
            {authError && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p>{authError}</p>
              </div>
            )}
            <Button onClick={handlePasswordSubmit} className="w-full">
              Unlock
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-gray-800 dark:text-gray-200" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              TECH RMDSTIC
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Email Campaign Manager
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Panel - Email Input */}
          <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                Campaign Details
              </CardTitle>
              <CardDescription>
                Enter recipient emails and the company name for the sponsorship request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="companyName" className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Name
                </label>
                <Input
                  id="companyName"
                  placeholder="e.g., Veltos AI"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emails" className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Recipient Emails
                </label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md min-h-10">
                  {emails.map(email => (
                    <Badge key={email} variant="secondary" className="flex items-center gap-1">
                      {email}
                      <button onClick={() => removeEmail(email)} className="rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <Input
                    id="emails"
                    placeholder="Type an email and press space..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border-none focus:ring-0 focus:outline-none p-0 m-0 h-auto bg-transparent"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSend} 
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900 py-3 text-base font-medium shadow-sm transition-colors disabled:opacity-50"
                size="lg"
              >
                {isLoading ? 'Sending...' : <><Send className="w-5 h-5 mr-2" /> Send Emails</>}
              </Button>
              {status && (
                <div className={`flex items-center gap-3 p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                  {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom Panel - Email Preview */}
          <Card className="shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Email Editor & Preview</CardTitle>
              <CardDescription>
                Edit the email content on the left and see a live preview on the right.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email-body" className="font-medium text-gray-800 dark:text-gray-200">Email Body (HTML)</label>
                <Textarea
                  id="email-body"
                  className="mt-2 w-full h-96 font-mono"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div>
                <label className="font-medium text-gray-800 dark:text-gray-200">Live Preview</label>
                <iframe
                  className="mt-2 w-full h-96 border rounded-md"
                  srcDoc={body.replace(/\{\{companyName\}\}/g, companyName || "Example Inc.")}
                  title="Email Preview"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
