import fs from 'fs';
import path from 'path';

/**
 * Tìm file JSON data gần nhất với spec file đang chạy.
 * Thứ tự ưu tiên:
 *   1. <specBaseName>.json         (e.g., auth.json)
 *   2. <specBaseName-without-api>.json  (e.g., auth.json từ auth-api.spec.ts)
 *   3. <dirName>.json              (e.g., auth.json trong folder auth/)
 *   4. <dirName>-api.json
 */
export function resolveModuleDataPath(specFilePath: string): string | undefined {
  const specDir = path.dirname(specFilePath);
  const specBaseName = path.basename(specFilePath).replace(/\.spec\.(ts|js)$/, '');

  const candidates = [
    path.join(specDir, `${specBaseName}.json`),
    path.join(specDir, `${specBaseName.replace(/-api$/, '')}.json`),
    path.join(specDir, `${path.basename(specDir)}.json`),
    path.join(specDir, `${path.basename(specDir)}-api.json`),
  ];

  return candidates.find((filePath) => fs.existsSync(filePath));
}

/**
 * Đọc và parse file JSON data của module.
 * Trả về object rỗng nếu không tìm thấy hoặc lỗi parse.
 */
export function loadModuleData(jsonFilePath: string | undefined): Record<string, any> {
  if (!jsonFilePath) return {};

  try {
    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.warn(`[confHelper] Không thể đọc file JSON: ${jsonFilePath}`, err);
    return {};
  }
}

/**
 * Trích xuất case key từ tags hoặc title của test.
 * Ưu tiên tag dạng @TC_UI_01 hoặc @TC_API_06.
 */
export function extractCaseKey(
  tags: string[],
  title: string,
  moduleData: Record<string, any>,
): string {
  const tcTag = tags.find((tag) => /^@TC_/i.test(tag));
  let tcKey = tcTag ? tcTag.replace(/^@/, '') : '';

  // Nếu tag không khớp trực tiếp với key trong data, tìm theo title
  if (!tcKey || !moduleData[tcKey]) {
    const matchedKey = Object.keys(moduleData).find(
      (key) => title.includes(key) || (tcKey && key.includes(tcKey)),
    );
    if (matchedKey) tcKey = matchedKey;
  }

  return tcKey;
}

/**
 * Lấy data của một case cụ thể từ moduleData.
 * Hỗ trợ cả caseId có prefix '@' (e.g., '@TC_UI_01').
 */
export function getCaseData<T = any>(moduleData: Record<string, any>, caseId: string): T {
  const cleanId = caseId.replace(/^@/, '');
  return (moduleData[cleanId] ?? {}) as T;
}

