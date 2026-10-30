import ts from 'typescript';

export interface FriendFeedSource {
  siteUrl: string;
  feedUrl: string;
}

function readUrl(value: ts.Expression, label: string): string {
  if (!ts.isStringLiteral(value)) {
    throw new Error(`${label} must be a string literal.`);
  }
  if ([...value.text].some((char) => char.charCodeAt(0) <= 32 || char.charCodeAt(0) === 127)) {
    throw new Error(`${label} cannot contain whitespace or control characters.`);
  }

  const url = new URL(value.text);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error(`${label} must be an HTTP or HTTPS URL without credentials.`);
  }
  return value.text;
}

export function getFriendFeedSources(source: string): FriendFeedSource[] {
  const file = ts.createSourceFile(
    'friends.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const declarations = file.statements.flatMap((statement) =>
    ts.isVariableStatement(statement)
      ? statement.declarationList.declarations.filter(
          (declaration) =>
            ts.isIdentifier(declaration.name) && declaration.name.text === 'FRIEND_LIST'
        )
      : []
  );
  if (declarations.length !== 1) {
    throw new Error('Expected one FRIEND_LIST declaration.');
  }

  const friends = declarations[0].initializer;
  if (!friends || !ts.isArrayLiteralExpression(friends)) {
    throw new Error('FRIEND_LIST must be an array literal.');
  }

  const sites = new Set<string>();
  const feeds = new Set<string>();
  return friends.elements.flatMap((friend, index) => {
    if (!ts.isObjectLiteralExpression(friend)) {
      throw new Error(`Friend ${index + 1} must be an object literal.`);
    }

    let siteUrl: string | undefined;
    let feedUrl: string | undefined;
    for (const property of friend.properties) {
      if (ts.isSpreadAssignment(property) || ts.isComputedPropertyName(property.name)) {
        throw new Error(`Friend ${index + 1} cannot use spread or computed properties.`);
      }
      const key = property.name.text;
      if (key !== 'href' && key !== 'rss') continue;
      if (!ts.isPropertyAssignment(property)) {
        throw new Error(`Friend ${index + 1} ${key} must be a property assignment.`);
      }

      const value = readUrl(property.initializer, `Friend ${index + 1} ${key}`);
      if (key === 'href') {
        if (siteUrl !== undefined)
          throw new Error(`Friend ${index + 1} has duplicate href fields.`);
        siteUrl = value;
      } else {
        if (feedUrl !== undefined) throw new Error(`Friend ${index + 1} has duplicate rss fields.`);
        feedUrl = value;
      }
    }

    if (!siteUrl) throw new Error(`Friend ${index + 1} is missing href.`);
    const siteKey = new URL(siteUrl).href;
    if (sites.has(siteKey)) throw new Error(`Duplicate friend URL: ${siteUrl}`);
    sites.add(siteKey);
    if (!feedUrl) return [];

    const feedKey = new URL(feedUrl).href;
    if (feeds.has(feedKey)) throw new Error(`Duplicate RSS URL: ${feedUrl}`);
    feeds.add(feedKey);
    return [{ siteUrl, feedUrl }];
  });
}
