"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, Building, AlertCircle, CheckCircle, X, Lock } from "lucide-react";

export default function HomeClient({ isAuthenticated: initialIsAuthenticated }: { isAuthenticated: boolean }) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

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
        body: JSON.stringify({ emails: emails, companyName }),
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
              <CardTitle className="text-2xl font-semibold">Email Preview</CardTitle>
              <CardDescription>
                This is a preview of the email that will be sent. The company name will be dynamically replaced.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <iframe
                  src="/templates/sponsorship.html"
                  className="w-full h-[600px] bg-white"
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
