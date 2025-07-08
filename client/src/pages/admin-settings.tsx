import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, Video, Settings, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [zoomSettings, setZoomSettings] = useState({
    accountId: "",
    clientId: "",
    clientSecret: ""
  });
  
  const [youtubeSettings, setYoutubeSettings] = useState({
    apiKey: "",
    playlistId: ""
  });

  const { toast } = useToast();

  const handleZoomSave = async () => {
    try {
      // Save Zoom settings logic here
      toast({
        title: "Zoom Settings Saved",
        description: "Zoom API configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Zoom settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleYoutubeSave = async () => {
    try {
      // Save YouTube settings logic here
      toast({
        title: "YouTube Settings Saved",
        description: "YouTube API configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save YouTube settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const testZoomConnection = async () => {
    try {
      // Test Zoom connection logic here
      toast({
        title: "Connection Successful",
        description: "Successfully connected to Zoom API.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Zoom API. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  const testYouTubeConnection = async () => {
    try {
      // Test YouTube connection logic here
      toast({
        title: "Connection Successful",
        description: "Successfully connected to YouTube API.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to YouTube API. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure your Zoom and YouTube API connections for seamless integration
          </p>
        </div>

        <Tabs defaultValue="zoom" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="zoom" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Zoom API
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="zoom">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  Zoom Server-to-Server OAuth
                </CardTitle>
                <CardDescription>
                  Configure your Zoom API credentials to create meeting links and access recordings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input
                      id="accountId"
                      type="text"
                      placeholder="Enter your Zoom Account ID"
                      value={zoomSettings.accountId}
                      onChange={(e) => setZoomSettings(prev => ({
                        ...prev,
                        accountId: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      type="text"
                      placeholder="Enter your Zoom Client ID"
                      value={zoomSettings.clientId}
                      onChange={(e) => setZoomSettings(prev => ({
                        ...prev,
                        clientId: e.target.value
                      }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  <Input
                    id="clientSecret"
                    type="password"
                    placeholder="Enter your Zoom Client Secret"
                    value={zoomSettings.clientSecret}
                    onChange={(e) => setZoomSettings(prev => ({
                      ...prev,
                      clientSecret: e.target.value
                    }))}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Required Scopes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• meeting:write - Create meeting links</li>
                    <li>• meeting:read - Access recordings for 24/7 access</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleZoomSave} className="bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={testZoomConnection}>
                    <Key className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="youtube">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-600" />
                  YouTube Data API
                </CardTitle>
                <CardDescription>
                  Configure your YouTube API to fetch and embed educational videos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtubeApiKey">API Key</Label>
                    <Input
                      id="youtubeApiKey"
                      type="password"
                      placeholder="Enter your YouTube API Key"
                      value={youtubeSettings.apiKey}
                      onChange={(e) => setYoutubeSettings(prev => ({
                        ...prev,
                        apiKey: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playlistId">Playlist ID</Label>
                    <Input
                      id="playlistId"
                      type="text"
                      placeholder="Enter your YouTube Playlist ID"
                      value={youtubeSettings.playlistId}
                      onChange={(e) => setYoutubeSettings(prev => ({
                        ...prev,
                        playlistId: e.target.value
                      }))}
                    />
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">API Endpoint Example:</h4>
                  <code className="text-sm text-red-800 bg-red-100 px-2 py-1 rounded">
                    https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={youtubeSettings.playlistId || '{PLAYLIST_ID}'}&key={youtubeSettings.apiKey ? '***' : '{API_KEY}'}
                  </code>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Video Embedding:</h4>
                  <p className="text-sm text-gray-700 mb-2">Videos will be embedded using:</p>
                  <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
                    &lt;iframe src="https://www.youtube.com/embed/{"{VIDEO_ID}"}"&gt;&lt;/iframe&gt;
                  </code>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleYoutubeSave} className="bg-red-600 hover:bg-red-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={testYouTubeConnection}>
                    <Key className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>
              Current status of your API integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Zoom API</h4>
                    <p className="text-sm text-gray-600">Meeting creation & recordings</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Not Configured
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Youtube className="h-8 w-8 text-red-600" />
                  <div>
                    <h4 className="font-medium">YouTube API</h4>
                    <p className="text-sm text-gray-600">Video content fetching</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Not Configured
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}