import React from 'react';
import { useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProfileCard } from './ProfileCard';
import { QRCodeCard } from './QRCodeCard';
import { SEOHead } from './SEOHead';
import { ThemeToggle } from '../ThemeToggle';
import { usePublicProfile } from '../../hooks/usePublicProfile';
import { Button } from '../ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading, error } = usePublicProfile(username);

  const profileUrl = `${window.location.origin}/u/${username}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ExternalLink className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Profile Not Found</h1>
            <p className="text-muted-foreground">
              The profile you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400  via-indigo-300 to-purple-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
        <SEOHead profile={profile} profileUrl={profileUrl} />
        <ThemeToggle />
        
        <div className="container mx-auto  px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            {/* Header with breadcrumb */}
            {/* <div className="mb-6 w-full max-w-4xl">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <span>Profile</span>
                <span>/</span>
                <span className="text-foreground font-medium">{profile.name}</span>
              </nav>
            </div> */}

            {/* Main content grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Profile content - takes up 3 columns on xl screens */}
              <div className="xl:col-span-3 flex justify-center">
                <div className="animate-in fade-in duration-1000 delay-200">
                  <ProfileCard profile={profile} />
                </div>
              </div>

              {/* QR Code sidebar - takes up 1 column on xl screens */}
              <div className="xl:col-span-1 flex justify-center xl:justify-start">
                <div className="sticky top-8 animate-in slide-in-from-right duration-1000 delay-400">
                  <QRCodeCard 
                    profileUrl={profileUrl} 
                    profileName={profile.name} 
                  />
                </div>
              </div>
            </div>

            {/* Mobile-optimized QR section */}
            {/* <div className="xl:hidden mt-8 w-full max-w-md mx-auto">
              <div className="animate-in slide-in-from-bottom duration-1000 delay-600">
                <QRCodeCard 
                  profileUrl={profileUrl} 
                  profileName={profile.name} 
                />
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-background/50 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>Powered by scc • Share your professional presence</p>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};