/**
 * Helper function to check authentication in API routes
 * Authentication is disabled - always returns null (allows all requests)
 *
 * Usage:
 * ```typescript
 * const authError = await requireAuth();
 * if (authError) return authError;
 * ```
 */
export async function requireAuth() {
  // Authentication disabled - allow all requests
  return null;
}

/**
 * Helper function to get the current session
 * Authentication is disabled - returns mock session
 */
export async function getAuthSession() {
  // Return mock session for compatibility
  return {
    user: {
      id: 'admin',
      email: 'admin@portfolio.com',
      role: 'admin',
    },
  };
}
