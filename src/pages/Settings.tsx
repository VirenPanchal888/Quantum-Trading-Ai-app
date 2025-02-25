
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify({
      notifications,
      darkMode,
      autoRefresh
    }));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        
        <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Notifications</h3>
                <p className="text-sm text-gray-400">Receive alerts for price changes</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Dark Mode</h3>
                <p className="text-sm text-gray-400">Toggle dark/light theme</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Auto Refresh</h3>
                <p className="text-sm text-gray-400">Auto refresh market data</p>
              </div>
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>

            <Button
              className="w-full mt-6"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
