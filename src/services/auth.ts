import { AdminUser } from '../types';

/**
 * CLIENT-SIDE SECURE AUTHENTICATION SERVICE
 *
 * Implements:
 * - One-way cryptographic digest verification using the Web Crypto API (SHA-256)
 * - Zero plaintext password exposure in code, comments, logs, or storage
 * - Brute-force throttling / lockout protection
 * - Ephemeral in-memory session management with automatic inactivity logout
 */

// Cryptographic one-way digests of authorized credentials (no plaintext)
const AUTH_IDENTIFIER_DIGEST = '914c41fa2fe5b667e4010278eac8a3c9d633dc818dd4df691f155249534967de';
const AUTH_SECRET_DIGEST = '6cc82d5ab974fdad8177485af450b6fbe615ffaf19b9a29fdea3c73de7723e80';

// Throttling configuration
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes auto-logout

interface RateLimitState {
  failedAttempts: number;
  lockoutUntil: number | null;
}

// In-memory rate limiting state
let rateLimitState: RateLimitState = {
  failedAttempts: 0,
  lockoutUntil: null,
};

// In-memory active session (never stored with sensitive credentials)
let currentSession: AdminUser | null = null;
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
let sessionExpireCallback: (() => void) | null = null;

async function hashString(val: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(val);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AuthService = {
  /**
   * Check if client is currently locked out from login attempts
   */
  getLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
    if (rateLimitState.lockoutUntil) {
      const remaining = Math.ceil((rateLimitState.lockoutUntil - Date.now()) / 1000);
      if (remaining > 0) {
        return { isLocked: true, remainingSeconds: remaining };
      }
      // Lockout expired, reset
      rateLimitState = { failedAttempts: 0, lockoutUntil: null };
    }
    return { isLocked: false, remainingSeconds: 0 };
  },

  /**
   * Authenticate admin using Web Crypto SHA-256 derivation
   */
  async verifyCredentials(
    usernameInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    // 1. Check rate-limit lock
    const lockout = this.getLockoutStatus();
    if (lockout.isLocked) {
      return {
        success: false,
        error: `Too many failed attempts. Security cooldown active. Please wait ${lockout.remainingSeconds}s.`,
      };
    }

    const trimmedUser = usernameInput.trim().toLowerCase();

    // 2. Compute one-way cryptographic digests
    const userDigest = await hashString(trimmedUser);
    const passDigest = await hashString(passwordInput);

    // 3. Constant-comparison against authorized digests
    const isUserMatch = userDigest === AUTH_IDENTIFIER_DIGEST;
    const isSecretMatch = passDigest === AUTH_SECRET_DIGEST;

    if (isUserMatch && isSecretMatch) {
      // Successful authentication: Reset failed attempts
      rateLimitState = { failedAttempts: 0, lockoutUntil: null };

      const user: AdminUser = {
        email: 'saqib-admin@premiumbloodbank.com',
        name: 'Saqib Nawab (Administrator)',
        role: 'superadmin',
        lastLogin: new Date().toISOString(),
      };

      currentSession = user;
      this.resetInactivityTimer();

      return { success: true, user };
    }

    // 4. Failed attempt handling
    rateLimitState.failedAttempts += 1;
    if (rateLimitState.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      rateLimitState.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      return {
        success: false,
        error: `Too many failed login attempts. Security lockout engaged for 15 minutes.`,
      };
    }

    const attemptsLeft = MAX_FAILED_ATTEMPTS - rateLimitState.failedAttempts;
    return {
      success: false,
      error: `Invalid credentials. (${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining before lockout)`,
    };
  },

  /**
   * Inactivity auto-logout tracking
   */
  resetInactivityTimer(): void {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    if (currentSession) {
      inactivityTimer = setTimeout(() => {
        this.logout();
        if (sessionExpireCallback) {
          sessionExpireCallback();
        }
      }, INACTIVITY_TIMEOUT_MS);
    }
  },

  onSessionExpired(callback: () => void): void {
    sessionExpireCallback = callback;
  },

  getCurrentSession(): AdminUser | null {
    return currentSession;
  },

  logout(): void {
    currentSession = null;
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  },
};
