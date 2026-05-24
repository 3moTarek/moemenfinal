type StoredOtp = {
  code: string;
  expiresAt: number;
};

const otpStore = new Map<string, StoredOtp>();

export function createOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOtp(email: string, code: string) {
  otpStore.set(email, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
}

export function verifyOtp(email: string, code: string) {
  const storedOtp = otpStore.get(email);

  if (!storedOtp) {
    return false;
  }

  const isExpired = Date.now() > storedOtp.expiresAt;

  if (isExpired) {
    otpStore.delete(email);
    return false;
  }

  const isValid = storedOtp.code === code;

  if (isValid) {
    otpStore.delete(email);
  }

  return isValid;
}