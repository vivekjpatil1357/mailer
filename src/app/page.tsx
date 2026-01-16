"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, Mail, Building, AlertCircle, CheckCircle } from "lucide-react";

export default function Home() {
  const [emails, setEmails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    setStatus(null);

    const emailList = emails
      .split(/[\n,;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'));

    if (emailList.length === 0) {
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
        body: JSON.stringify({ emails: emailList, companyName }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: `Emails sent successfully to ${emailList.length} recipients!` });
        setEmails("");
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
                  placeholder="e.g., TECH RMDSTIC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emails" className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Recipient Emails
                </label>
                <Textarea
                  id="emails"
                  placeholder="example1@email.com, example2@email.com"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  className="min-h-[150px] font-mono text-sm resize-y"
                />
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
