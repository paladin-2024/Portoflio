/* ─── Monochrome Code Editor Window ──────────────────────────────────
   Styled like a VS Code / IDE window but strict B&W — no syntax colours.
   Contrast is done through weight, opacity, and style (bold/italic).
   ─────────────────────────────────────────────────────────────────── */

const kw  = (t: string) => <span style={{ color: '#F0EDE7', fontWeight: 700 }}>{t}</span>;
const ty  = (t: string) => <span style={{ color: 'rgba(240,237,231,0.8)' }}>{t}</span>;
const str = (t: string) => <span style={{ color: 'rgba(240,237,231,0.65)', fontStyle: 'italic' }}>{t}</span>;
const cmt = (t: string) => <span style={{ color: 'rgba(240,237,231,0.28)', fontStyle: 'italic' }}>{t}</span>;
const fn  = (t: string) => <span style={{ color: '#F0EDE7', fontWeight: 600 }}>{t}</span>;
const pl  = (t: string) => <span style={{ color: 'rgba(240,237,231,0.6)' }}>{t}</span>;
const num = (t: string) => <span style={{ color: 'rgba(240,237,231,0.55)' }}>{t}</span>;

type Line = React.ReactNode;

const lines: Line[] = [
  <>{cmt('// auth.middleware.ts')}</>,
  <>{kw('import')} {pl('{')} {ty('Request')}{pl(',')} {ty('Response')}{pl(',')} {ty('NextFunction')} {pl('}')} {kw('from')} {str("'express'")}{pl(';')}</>,
  <>{kw('import')} {ty('jwt')} {kw('from')} {str("'jsonwebtoken'")}{pl(';')}</>,
  <>{kw('import')} {pl('{')} {ty('db')} {pl('}')} {kw('from')} {str("'../db/postgres'")}{pl(';')}</>,
  <></>,
  <>{kw('export')} {kw('async')} {kw('function')} {fn('requireAuth')}{pl('(')}</>,
  <>{pl('  ')}{ty('req')}{pl(': ')}{ty('Request')}{pl(',')}</>,
  <>{pl('  ')}{ty('res')}{pl(': ')}{ty('Response')}{pl(',')}</>,
  <>{pl('  ')}{ty('next')}{pl(': ')}{ty('NextFunction')}</>,
  <>{pl(') {')} {cmt('// JWT guard middleware')}</>,
  <>{pl('  ')}{kw('const')} {ty('token')} {pl('=')} {ty('req')}{pl('.')}{fn('headers')}{pl('.')}{fn('authorization')}{pl('?.')}{fn('split')}{pl('(')}{str("' '")}){pl('[')}{num('1')}{pl('];')}</>,
  <></>,
  <>{pl('  ')}{kw('if')} {pl('(!')}{ty('token')}{pl(') {')} </>,
  <>{pl('    ')}{kw('return')} {ty('res')}{pl('.')}{fn('status')}{pl('(')}{num('401')}{pl(').')}{fn('json')}{pl('({')} {ty('error')}{pl(': ')}{str("'Unauthorized'")} {pl('});')}</>,
  <>{pl('  }')}</>,
  <></>,
  <>{pl('  ')}{kw('try')} {pl('{')}</>,
  <>{pl('    ')}{kw('const')} {ty('payload')} {pl('=')} {ty('jwt')}{pl('.')}{fn('verify')}{pl('(')}{ty('token')}{pl(', ')}{ty('process')}{pl('.')}{fn('env')}{pl('.')}{ty('JWT_SECRET')}{pl('!);')}</>,
  <>{pl('    ')}{kw('const')} {ty('user')} {pl('=')} {kw('await')} {ty('db')}{pl('.')}{fn('query')}{pl('(')}</>,
  <>{pl('      ')}{str("'SELECT id, role FROM users WHERE id = $1'")}{pl(',')}</>,
  <>{pl('      ')}{pl('[')}{ty('payload')}{pl('.')}{ty('sub')}{pl(']')}</>,
  <>{pl('    );')}</>,
  <>{pl('    ')}{ty('req')}{pl('.')}{ty('user')} {pl('=')} {ty('user')}{pl('.')}{ty('rows')}{pl('[')}{num('0')}{pl('];')}</>,
  <>{pl('    ')}{fn('next')}{pl('();')}</>,
  <>{pl('  }')} {kw('catch')} {pl('{')}</>,
  <>{pl('    ')}{ty('res')}{pl('.')}{fn('status')}{pl('(')}{num('403')}{pl(').')}{fn('json')}{pl('({')} {ty('error')}{pl(': ')}{str("'Token expired'")} {pl('});')}</>,
  <>{pl('  }')}</>,
  <>{pl('}')}</>,
];

export function CodeEditorWindow() {
  return (
    <div
      style={{
        background: '#0a0908',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '12.5px',
        lineHeight: '1.65',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Title bar ─────────────────────────────────── */}
      <div
        style={{
          background: '#141210',
          borderBottom: '1px solid rgba(240,237,231,0.07)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {/* Traffic-light dots — monochrome */}
        {['rgba(240,237,231,0.18)', 'rgba(240,237,231,0.12)', 'rgba(240,237,231,0.08)'].map((bg, i) => (
          <span
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: bg,
              border: '1px solid rgba(240,237,231,0.1)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        ))}
        {/* Tab bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: 10, gap: 2 }}>
          <span
            style={{
              padding: '2px 12px',
              background: '#0a0908',
              border: '1px solid rgba(240,237,231,0.1)',
              borderBottom: 'none',
              color: 'rgba(240,237,231,0.7)',
              fontSize: '11px',
            }}
          >
            auth.middleware.ts
          </span>
          <span
            style={{
              padding: '2px 12px',
              color: 'rgba(240,237,231,0.2)',
              fontSize: '11px',
            }}
          >
            db/postgres.ts
          </span>
        </div>
        {/* Minimap indicator */}
        <span style={{ color: 'rgba(240,237,231,0.2)', fontSize: '10px', letterSpacing: '0.05em' }}>
          TS
        </span>
      </div>

      {/* ── Editor body ───────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
        {/* Line numbers */}
        <div
          style={{
            padding: '16px 0',
            minWidth: 40,
            textAlign: 'right',
            paddingRight: 14,
            paddingLeft: 8,
            color: 'rgba(240,237,231,0.18)',
            userSelect: 'none',
            borderRight: '1px solid rgba(240,237,231,0.05)',
            flexShrink: 0,
          }}
        >
          {lines.map((_, i) => (
            <div key={i} style={{ height: '1.65em' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code */}
        <div style={{ padding: '16px 20px', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ height: '1.65em' }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status bar ────────────────────────────────── */}
      <div
        style={{
          background: '#E95420',
          padding: '2px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#fff', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.05em' }}>
          main ⎇ — TypeScript
        </span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
          Ln 27, Col 1
        </span>
      </div>
    </div>
  );
}
