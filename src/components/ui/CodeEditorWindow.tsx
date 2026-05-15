/* ─── Monochrome Code Editor Window ──────────────────────────────────
   Java Spring Boot REST controller — strict B&W colour scheme.
   ─────────────────────────────────────────────────────────────────── */

const kw  = (t: string) => <span style={{ color: '#F0EDE7', fontWeight: 700 }}>{t}</span>;
const ty  = (t: string) => <span style={{ color: 'rgba(240,237,231,0.8)' }}>{t}</span>;
const str = (t: string) => <span style={{ color: 'rgba(240,237,231,0.65)', fontStyle: 'italic' }}>{t}</span>;
const cmt = (t: string) => <span style={{ color: 'rgba(240,237,231,0.28)', fontStyle: 'italic' }}>{t}</span>;
const fn  = (t: string) => <span style={{ color: '#F0EDE7', fontWeight: 600 }}>{t}</span>;
const pl  = (t: string) => <span style={{ color: 'rgba(240,237,231,0.6)' }}>{t}</span>;
const an  = (t: string) => <span style={{ color: 'rgba(240,237,231,0.55)', fontStyle: 'italic' }}>{t}</span>;

type Line = React.ReactNode;

const lines: Line[] = [
  <>{cmt('// UserController.java')}</>,
  <>{an('@RestController')} {an('@RequestMapping')}{pl('(')}{str('"/api/v1/users"')}{pl(')')}</>,
  <>{kw('public class')} {ty('UserController')} {pl('{')}</>,
  <>{pl('  ')}{kw('private final')} {ty('UserService')} {ty('userService')}{pl(';')}</>,
  <>{pl('  ')}{kw('private final')} {ty('JwtService')}  {ty('jwtService')}{pl(';')}</>,
  <></>,
  <>{pl('  ')}{an('@PostMapping')}{pl('(')}{str('"/auth/login"')}{pl(')')}</>,
  <>{pl('  ')}{kw('public')} {ty('ResponseEntity')}{pl('<')}{ty('AuthResponse')}{pl('>')} {fn('login')}{pl('(')}{an('@RequestBody')} {ty('LoginRequest')} {ty('req')}{pl(') {')}</>,
  <>{pl('    ')}{ty('User')} {ty('user')} {pl('=')} {ty('userService')}{pl('.')}{fn('authenticate')}{pl('(')}{ty('req')}{pl('.')}{fn('email')}{pl('(), ')}{ty('req')}{pl('.')}{fn('password')}{pl('());')}</>,
  <>{pl('    ')}{ty('String')} {ty('token')} {pl('=')} {ty('jwtService')}{pl('.')}{fn('generateToken')}{pl('(')}{ty('user')}{pl(');')}</>,
  <>{pl('    ')}{kw('return')} {ty('ResponseEntity')}{pl('.')}{fn('ok')}{pl('(')}{kw('new')} {fn('AuthResponse')}{pl('(')}{ty('token')}{pl(', ')}{ty('user')}{pl('.')}{fn('getRole')}{pl('()));')}</>,
  <>{pl('  }')}</>,
  <></>,
  <>{pl('  ')}{an('@GetMapping')}{pl('(')}{str('"/{id}"')}{pl(')')} {an('@PreAuthorize')}{pl('(')}{str('"hasRole(\'ADMIN\')"')}{pl(')')}</>,
  <>{pl('  ')}{kw('public')} {ty('ResponseEntity')}{pl('<')}{ty('UserDto')}{pl('>')} {fn('getById')}{pl('(')}{an('@PathVariable')} {ty('Long')} {ty('id')}{pl(') {')}</>,
  <>{pl('    ')}{kw('return')} {ty('ResponseEntity')}{pl('.')}{fn('ok')}{pl('(')}{ty('userService')}{pl('.')}{fn('findById')}{pl('(')}{ty('id')}{pl('));')}</>,
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
        {['rgba(240,237,231,0.18)', 'rgba(240,237,231,0.12)', 'rgba(240,237,231,0.08)'].map((bg, i) => (
          <span
            key={i}
            style={{
              width: 11, height: 11, borderRadius: '50%',
              background: bg, border: '1px solid rgba(240,237,231,0.1)',
              display: 'inline-block', flexShrink: 0,
            }}
          />
        ))}
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
            UserController.java
          </span>
          <span style={{ padding: '2px 12px', color: 'rgba(240,237,231,0.2)', fontSize: '11px' }}>
            JwtService.java
          </span>
        </div>
        <span style={{ color: 'rgba(240,237,231,0.2)', fontSize: '10px', letterSpacing: '0.05em' }}>
          Java
        </span>
      </div>

      {/* ── Editor body ───────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
        <div
          style={{
            padding: '16px 0', minWidth: 36, textAlign: 'right',
            paddingRight: 12, paddingLeft: 8,
            color: 'rgba(240,237,231,0.18)', userSelect: 'none',
            borderRight: '1px solid rgba(240,237,231,0.05)', flexShrink: 0,
          }}
        >
          {lines.map((_, i) => (
            <div key={i} style={{ height: '1.65em' }}>{i + 1}</div>
          ))}
        </div>
        <div style={{ padding: '16px 16px', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ height: '1.65em' }}>{line}</div>
          ))}
        </div>
      </div>

      {/* ── Status bar ────────────────────────────────── */}
      <div
        style={{
          background: '#E95420', padding: '2px 12px',
          display: 'flex', justifyContent: 'space-between', flexShrink: 0,
        }}
      >
        <span style={{ color: '#fff', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.05em' }}>
          main ⎇ — Java · Spring Boot
        </span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
          Ln 15, Col 1
        </span>
      </div>
    </div>
  );
}
