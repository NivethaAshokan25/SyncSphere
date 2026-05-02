
export interface GoogleUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

/**
 * Firebase Authentication Scaffold
 * Handles Google OAuth Sign-in integration.
 */
export const authService = {
  async signInWithGoogle(): Promise<GoogleUser> {
    console.log('Initiating Google Sign-In via Firebase Auth...');
    // Mocking Google Sign-in flow for the hackathon demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uid: 'google-oauth2|123456789',
          displayName: 'Sarah Chen',
          email: 'sarah.chen@syncsphere.ai',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        });
      }, 1200);
    });
  },

  async signOut(): Promise<void> {
    console.log('Signing out from Firebase Auth...');
    return Promise.resolve();
  },

  getCurrentUser(): GoogleUser | null {
    // Mock current user
    return null;
  }
};
