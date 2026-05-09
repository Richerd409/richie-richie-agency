/**
 * Demo Authentication Service
 * Provides mock OTP verification and demo user data for testing
 */

export interface DemoUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: "worker" | "supervisor" | "client" | "admin";
  otp: string;
}

// Demo users with predefined OTPs for testing
export const DEMO_USERS: DemoUser[] = [
  {
    id: "demo_worker_1",
    email: "worker@demo.com",
    phone: "+91-9876543210",
    name: "Rajesh Kumar",
    role: "worker",
    otp: "123456",
  },
  {
    id: "demo_supervisor_1",
    email: "supervisor@demo.com",
    phone: "+91-9876543211",
    name: "Priya Singh",
    role: "supervisor",
    otp: "123456",
  },
  {
    id: "demo_client_1",
    email: "client@demo.com",
    phone: "+91-9876543212",
    name: "Tech Solutions Inc",
    role: "client",
    otp: "123456",
  },
  {
    id: "demo_admin_1",
    email: "admin@demo.com",
    phone: "+91-9876543213",
    name: "Admin User",
    role: "admin",
    otp: "123456",
  },
];

/**
 * Verify OTP in demo mode
 * Accepts any 6-digit OTP for demo users, or exact match for demo credentials
 */
export async function verifyDemoOtp(email: string, otp: string): Promise<DemoUser | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Find user by email
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // In demo mode, allow any email with valid OTP format
    if (/^\d{6}$/.test(otp)) {
      return {
        id: `demo_user_${Date.now()}`,
        email,
        phone: "+91-9876543200",
        name: email.split("@")[0],
        role: "worker",
        otp,
      };
    }
    return null;
  }

  // For demo users, accept the predefined OTP or any 6-digit code
  if (/^\d{6}$/.test(otp)) {
    return user;
  }

  return null;
}

/**
 * Send OTP in demo mode
 * Logs the OTP to console for testing
 */
export async function sendDemoOtp(email: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  const otp = user?.otp || "123456";

  // Log to console for demo purposes
  console.log(`📧 Demo OTP sent to ${email}: ${otp}`);

  return otp;
}

/**
 * Get demo user by email
 */
export function getDemoUser(email: string): DemoUser | undefined {
  return DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Get all demo credentials for reference
 */
export function getDemoCredentials() {
  return DEMO_USERS.map((user) => ({
    email: user.email,
    otp: user.otp,
    role: user.role,
    name: user.name,
  }));
}
