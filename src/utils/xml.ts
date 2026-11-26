export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function xmlResponse(content: string, type: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${content}\n`, {
    headers: { 'Content-Type': `${type}; charset=utf-8` },
  });
}
