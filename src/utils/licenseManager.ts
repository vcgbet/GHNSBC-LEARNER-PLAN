export type LicenseTier = 'Free Trial' | 'Pro License' | 'Premium License';

export interface LicenseInfo {
  tier: LicenseTier;
  key?: string;
  clientName?: string;
  activatedAt?: string;
  maxWeeks: number;
  generationsUsed: number;
  generatedWeeks?: string[];
}

export const TIER_LIMITS: Record<LicenseTier, { maxWeeks: number; price: string; description: string; badgeColor: string }> = {
  'Free Trial': {
    maxWeeks: 1,
    price: 'Free',
    description: 'Generates Learner Plans for 1 Week Ending date only',
    badgeColor: 'bg-slate-700 text-slate-200 border-slate-600'
  },
  'Pro License': {
    maxWeeks: 6,
    price: 'GHC 100',
    description: 'Generates Learner Plans for up to 6 distinct Week Ending dates',
    badgeColor: 'bg-blue-600 text-white border-blue-400'
  },
  'Premium License': {
    maxWeeks: 16,
    price: 'GHC 150',
    description: 'Generates Learner Plans for whole Term (16 distinct Week Ending dates)',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold border-yellow-300'
  }
};

const SECRET_SALT = 'VCG_NSBC_2026_GHANA';
const STORAGE_KEY = 'ghana_nsbc_license_info';

export function normalizeWeekEnding(weekEndingStr?: string): string {
  if (!weekEndingStr || !weekEndingStr.trim()) return 'default_week';
  return weekEndingStr
    .trim()
    .toLowerCase()
    .replace(/(\d+)(st|nd|rd|th)/gi, '$1') // e.g. 16th -> 16
    .replace(/[,.\-\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function computeChecksum(prefix: string, seed: string): string {
  const combined = `${prefix}-${seed}-${SECRET_SALT}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
}

export function getActiveLicense(): LicenseInfo {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: LicenseInfo = JSON.parse(stored);
      if (parsed && parsed.tier && TIER_LIMITS[parsed.tier]) {
        const rawWeeks = Array.isArray(parsed.generatedWeeks) ? parsed.generatedWeeks : [];
        const normalizedWeeks = Array.from(new Set(rawWeeks.map(w => normalizeWeekEnding(w))));
        return {
          ...parsed,
          maxWeeks: TIER_LIMITS[parsed.tier].maxWeeks,
          generatedWeeks: normalizedWeeks,
          generationsUsed: normalizedWeeks.length
        };
      }
    }
  } catch (e) {
    console.error("Failed to read license info:", e);
  }
  return {
    tier: 'Free Trial',
    maxWeeks: 1,
    generatedWeeks: [],
    generationsUsed: 0
  };
}

export function saveLicense(info: LicenseInfo): void {
  try {
    const normalizedWeeks = Array.from(new Set((info.generatedWeeks || []).map(w => normalizeWeekEnding(w))));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...info,
      generatedWeeks: normalizedWeeks,
      generationsUsed: normalizedWeeks.length
    }));
  } catch (e) {
    console.error("Failed to save license info:", e);
  }
}

export function checkLicenseCanGenerate(weekEndingInput?: string): { allowed: boolean; remaining: number; reason?: string } {
  const lic = getActiveLicense();
  let existingWeeks = [...(lic.generatedWeeks || []).map(w => normalizeWeekEnding(w))];
  const norm = normalizeWeekEnding(weekEndingInput);

  // If existingWeeks has 'default_week' placeholder, replace with current norm
  if (existingWeeks.length === 1 && existingWeeks[0] === 'default_week' && norm !== 'default_week') {
    existingWeeks = [norm];
    lic.generatedWeeks = existingWeeks;
    saveLicense(lic);
  }

  const isAlreadyGenerated = norm ? existingWeeks.includes(norm) : false;
  const currentCount = existingWeeks.length;
  const max = lic.maxWeeks;

  // If this week ending date was ALREADY generated before under this active license, re-generation is ALWAYS allowed!
  if (isAlreadyGenerated) {
    return {
      allowed: true,
      remaining: Math.max(0, max - currentCount)
    };
  }

  // If this is a NEW week ending date and we are at or exceeding the allowed max weeks:
  if (currentCount >= max) {
    let reason = '';
    const displayWeek = weekEndingInput?.trim() || 'a new week ending date';

    if (lic.tier === 'Free Trial') {
      const activeWeekStr = existingWeeks[0] ? `"${existingWeeks[0]}"` : 'a previous date';
      reason = `Free Trial Limit Reached! Your 1-week Free Trial has already been used for ${activeWeekStr}. Unlimited re-generations for ${activeWeekStr} are allowed, but generating for a new Week Ending date ("${displayWeek}") requires an upgrade. Please upgrade to Pro License (GHC 100 - up to 6 weeks) or Premium License (GHC 150 - Whole Term).`;
    } else if (lic.tier === 'Pro License') {
      reason = `Pro License Limit Reached! You have generated plans for ${max} distinct Week Ending dates under your Pro License (GHC 100). To generate plans for an additional Week Ending date ("${displayWeek}"), please upgrade to Premium License (GHC 150 - Whole Term) or activate a new license key.`;
    } else {
      reason = `Premium License Term Limit Reached! You have generated plans for all ${max} distinct Week Ending dates allowed for the term under your Premium License (GHC 150). For a new term extension or key, please contact Victor C. Gbetodeme.`;
    }

    return {
      allowed: false,
      remaining: 0,
      reason
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, max - currentCount)
  };
}

export function recordLicenseGeneration(weekEndingInput?: string): LicenseInfo {
  const current = getActiveLicense();
  let existingWeeks = [...(current.generatedWeeks || []).map(w => normalizeWeekEnding(w))];
  const norm = normalizeWeekEnding(weekEndingInput);

  if (existingWeeks.length === 1 && existingWeeks[0] === 'default_week' && norm !== 'default_week') {
    existingWeeks = [norm];
  } else if (norm && !existingWeeks.includes(norm)) {
    existingWeeks.push(norm);
  }

  const updated: LicenseInfo = {
    ...current,
    generatedWeeks: existingWeeks,
    generationsUsed: existingWeeks.length
  };

  saveLicense(updated);
  return updated;
}

export function generateLicenseKey(tier: 'Pro License' | 'Premium License', clientName?: string): string {
  const prefix = tier === 'Pro License' ? 'PRO50' : 'PREM150';
  const cleanClient = (clientName || 'VCG').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8) || 'VCG';
  const randomSeed = Math.random().toString(36).substring(2, 6).toUpperCase();
  const seed = `${cleanClient}-${randomSeed}`;
  const checksum = computeChecksum(prefix, seed);
  return `${prefix}-${seed}-${checksum}`;
}

export function validateLicenseKey(rawKey: string): { valid: boolean; tier?: LicenseTier; clientName?: string; message: string } {
  const key = rawKey.trim().toUpperCase();

  // Standard predefined keys for convenience
  if (key === 'PRO-50-VICTOR' || key === 'PRO50-VICTOR') {
    return { valid: true, tier: 'Pro License', message: 'Successfully activated Pro License (6 Weeks - GHC 100)!' };
  }
  if (key === 'PREM-150-VICTOR' || key === 'PREM150-VICTOR' || key === 'PREMIUM-150-VICTOR') {
    return { valid: true, tier: 'Premium License', message: 'Successfully activated Premium License (Whole Term - GHC 150)!' };
  }

  const parts = key.split('-');
  if (parts.length < 3) {
    return { valid: false, message: 'Invalid key format. Please check the key provided by Victor.' };
  }

  const prefix = parts[0];
  const checksum = parts[parts.length - 1];
  const seed = parts.slice(1, parts.length - 1).join('-');

  const expectedChecksum = computeChecksum(prefix, seed);

  if (checksum !== expectedChecksum) {
    return { valid: false, message: 'Invalid license key checksum. Please request a valid key from Victor.' };
  }

  if (prefix === 'PRO50') {
    return { valid: true, tier: 'Pro License', message: 'Successfully activated Pro License (6 Weeks - GHC 100)!' };
  } else if (prefix === 'PREM150') {
    return { valid: true, tier: 'Premium License', message: 'Successfully activated Premium License (Whole Term - GHC 150)!' };
  }

  return { valid: false, message: 'Unrecognized tier code in key.' };
}

export const activateLicenseKey = validateLicenseKey;


