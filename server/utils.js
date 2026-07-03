// Returns the URL only if it is a safe http(s) absolute URL or a root-relative
// path; otherwise returns ''. Blocks javascript:, data:, vbscript:, etc.
export function safeUrl(value) {
  const v = (value || '').trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith('/') && !v.startsWith('//')) return v;
  return '';
}
