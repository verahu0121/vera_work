import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X, ChevronRight, Copy, RefreshCw, Eye, EyeOff, Clock3, KeyRound, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { apiJson } from '../data/api';
import { GUEST_STATUS_LABELS, guestStatus, type GuestCode, type GuestSession } from '../data/guestAccess';

const fieldClass = 'w-full min-w-0 rounded-[14px] border border-black/10 bg-white px-4 py-3 text-[14px] text-[#1a1c1c] outline-none focus:border-[#03aaa5] disabled:bg-black/[0.025] disabled:text-[#929294]';
const primaryClass = 'rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] tracking-[1.5px] text-white transition-colors hover:bg-[#343737] disabled:opacity-40';
const secondaryClass = 'rounded-full border border-black/10 bg-white px-4 py-2.5 text-[12px] text-[#424646] hover:bg-[#f5f5f2] disabled:opacity-40';
const endpoint = '/api/admin/guest-passwords';
type Draft = {label: string; password: string; durationHours: number; maxLogins: number; loginDeadline: string; hardDeadline: string};
type Detail = {code: GuestCode; sessions: GuestSession[]; serverNow: string};
type Result = {code: GuestCode; password?: string};
const dateLabel = (value: string | null) => value ? new Intl.DateTimeFormat('zh-CN', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false}).format(new Date(value)) : '不限制';
const dateInput = (value: string) => new Date(Date.parse(value) + 8 * 3600000).toISOString().slice(0,16);
const dateIso = (value: string) => new Date(`${value}:00+08:00`).toISOString();
const draftFrom = (code?: GuestCode): Draft => ({label: code?.label ?? '', password: '', durationHours: code?.durationHours ?? 4, maxLogins: code?.maxLogins ?? 1, loginDeadline: dateInput(code?.loginDeadline ?? new Date(Date.now() + 7 * 86400000).toISOString()), hardDeadline: code?.hardDeadline ? dateInput(code.hardDeadline) : ''});
function randomPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let result = '';
  while (result.length < 16) for (const byte of crypto.getRandomValues(new Uint8Array(32))) {
    if (byte < 256 - 256 % alphabet.length && result.length < 16) result += alphabet[byte % alphabet.length];
  }
  return result;
}
function Status({code, now = Date.now()}: {code: GuestCode; now?: number}) {
  const status = guestStatus(code, now);
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${status === 'active' ? 'bg-[#e5f7f4] text-[#09887f]' : status === 'revoked' ? 'bg-[#fff0ec] text-[#bf624d]' : 'bg-[#f0efeb] text-[#777b7c]'}`}>{GUEST_STATUS_LABELS[status]}</span>;
}
function Field({label, hint, children}: {label: string; hint?: string; children: React.ReactNode}) {
  return <label className="flex min-w-0 flex-col gap-2"><span className="text-[10px] font-medium uppercase tracking-[1.4px] text-[#777b80]">{label}</span>{children}{hint && <span className="text-[11px] leading-5 text-[#8a8c8d]">{hint}</span>}</label>;
}

export function GuestLoginSettings({enabled = true}: {enabled?: boolean}) {
  const [codes, setCodes] = useState<GuestCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'ended'>('all');
  const [clock, setClock] = useState(Date.now());
  const offset = useRef(0);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'detail' | 'edit' | 'reopen' | 'add'>('create');
  const [detail, setDetail] = useState<Detail | null>(null);
  const [draft, setDraft] = useState<Draft>(() => draftFrom());
  const [showPassword, setShowPassword] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [amount, setAmount] = useState(1);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<Result | null>(null);
  const [confirm, setConfirm] = useState<'revoke' | 'hard' | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const selectedId = useRef<string | null>(null);

  async function refresh() {
    try {
      const data = await apiJson<{codes: GuestCode[]; serverNow: string}>(endpoint);
      offset.current = Date.parse(data.serverNow) - Date.now();
      setClock(Date.now() + offset.current);
      setCodes(data.codes);
      setError('');
    } catch (e) { setError(e instanceof Error ? e.message : '读取失败'); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    if (!enabled) return;
    void refresh();
    const timer = window.setInterval(() => {setClock(Date.now() + offset.current); if (!document.hidden) void refresh();}, 30000);
    return () => window.clearInterval(timer);
  }, [enabled]);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busyRef.current) {setOpen(false); setReceipt(null); setConfirm(null);}
      if (event.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]');
        const first = items?.[0], last = items?.[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {event.preventDefault(); last?.focus();}
        if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first?.focus();}
      }
    };
    document.addEventListener('keydown', handler);
    return () => {document.body.style.overflow = originalOverflow; document.removeEventListener('keydown', handler); previousFocus?.focus();};
  }, [open]);

  function close() { if (!busyRef.current) {selectedId.current = null; setOpen(false); setReceipt(null); setConfirm(null); setDraft(draftFrom());} }
  function create(copy?: GuestCode) {
    selectedId.current = null;
    const values = draftFrom(copy);
    if (copy) {values.label = `${copy.label} · 副本`; values.loginDeadline = dateInput(new Date(Date.now() + 7 * 86400000).toISOString()); values.hardDeadline = '';}
    values.password = randomPassword();
    setDraft(values); setMode('create'); setDetail(null); setReceipt(null); setFormError(''); setAdvanced(false); setOpen(true); setShowPassword(false);
  }
  async function inspect(code: GuestCode) {
    selectedId.current = code.id;
    setMode('detail'); setReceipt(null); setDetail(null); setFormError(''); setOpen(true);
    try { const data = await apiJson<Detail>(`${endpoint}/${code.id}`); if (selectedId.current === code.id) setDetail(data); }
    catch(e) { if (selectedId.current === code.id) setFormError(e instanceof Error ? e.message : '读取失败'); }
  }
  function edit(nextMode: 'edit' | 'reopen' | 'add') {
    if (!detail) return;
    setDraft(draftFrom(detail.code)); setMode(nextMode); setAdvanced(!!detail.code.hardDeadline); setFormError(''); setAmount(1);
  }
  async function copy(text: string) { try {await navigator.clipboard.writeText(text); toast.success('已复制');} catch {toast.error('复制失败，请选择文字手动复制');} }
  async function submit(action?: 'revoke', confirmedHard = false) {
    if (busyRef.current) return;
    setFormError('');
    const current = detail?.code;
    const hard = draft.hardDeadline ? dateIso(draft.hardDeadline) : null;
    if (!action && mode !== 'add' && current && current.usedLogins > 0 && hard && (!current.hardDeadline || Date.parse(hard) < Date.parse(current.hardDeadline)) && !confirmedHard) {setConfirm('hard'); return;}
    busyRef.current = true; setBusy(true); setConfirm(null);
    try {
      const body = action ? {action, version: current?.version} : mode === 'add' ? {action: 'add-uses', amount, version: current?.version} : {
        label: draft.label, durationHours: Number(draft.durationHours), maxLogins: Number(draft.maxLogins),
        loginDeadline: dateIso(draft.loginDeadline), hardDeadline: hard, ...(draft.password ? {password: draft.password} : {}),
        ...(current ? {version: current.version, action: mode === 'reopen' ? 'reopen' : 'edit', confirmHardDeadline: confirmedHard} : {}),
      };
      const result = await apiJson<Result>(current ? `${endpoint}/${current.id}` : endpoint, {method: current ? 'PATCH' : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
      await refresh();
      if (result.password) {setReceipt(result); setDraft(draftFrom());}
      else {setDetail(await apiJson<Detail>(`${endpoint}/${result.code.id}`)); setMode('detail');}
      toast.success(action === 'revoke' ? '已撤销并结束访问' : current ? '配置已更新' : '游客密码已创建');
    } catch(e) {setFormError(e instanceof Error ? e.message : '保存失败');}
    finally {busyRef.current = false; setBusy(false);}
  }
  const now = clock;
  const visible = codes.filter(c => filter === 'all' || (guestStatus(c, now) === 'active') === (filter === 'active'));
  const active = codes.filter(c => guestStatus(c, now) === 'active').length;
  const current = detail?.code;
  const revoked = !!current?.revokedAt;
  const restricted = revoked || (!!current && guestStatus(current, now) !== 'active' && mode === 'edit');
  const title = receipt ? 'Ready to Share' : mode === 'create' ? 'New Guest Password' : mode === 'detail' ? 'Guest Access Details' : mode === 'add' ? 'Add Login Uses' : mode === 'reopen' ? 'Reopen Guest Access' : 'Edit Guest Access';

  return <>
    <section className="flex min-h-0 min-w-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-6 shadow-[0_24px_72px_rgba(26,28,28,0.06)]" aria-label="Guest Login">
      <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Temporary Portfolio Access</div>
      <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Guest Login</div>
      <div className="mt-5 flex items-center justify-between gap-2"><p className="text-[12px] text-[#858888]">{codes.length} 个密码 · {active} 个可使用</p><button type="button" disabled={!enabled} onClick={() => create()} className="flex items-center gap-1.5 rounded-full bg-[#1a1c1c] px-3.5 py-2.5 text-[11px] text-white disabled:opacity-40"><Plus size={14}/>新增密码</button></div>
      <div className="mt-5 flex gap-1 rounded-full bg-[#f4f4f0] p-1">{([['all','全部'],['active','可使用'],['ended','已结束']] as const).map(([key,label]) => <button key={key} onClick={() => setFilter(key)} className={`flex-1 rounded-full py-2 text-[11px] ${filter === key ? 'bg-white text-[#1a1c1c] shadow-sm' : 'text-[#929494]'}`}>{label}</button>)}</div>
      <div className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {loading ? <p className="py-8 text-center text-[12px] text-[#888]">正在读取访客密码…</p> : error ? <div role="alert" className="rounded-[20px] bg-[#fff3ef] p-4 text-[12px] leading-6 text-[#b45f4f]">{error}<button onClick={() => void refresh()} className="ml-3 underline">重试</button></div> : visible.length ? visible.map(code => <button key={code.id} onClick={() => void inspect(code)} className="group w-full rounded-[20px] border border-black/7 bg-[#fcfcf9] p-4 text-left transition-colors hover:border-[#03aaa5]/40 hover:bg-[#f3fbf8]">
          <div className="flex items-center justify-between gap-2"><span className="truncate text-[14px] font-medium text-[#303636]">{code.label}</span><Status code={code} now={now}/></div>
          <div className="mt-3 flex items-center gap-4 text-[11px] text-[#787e7d]"><span>{code.usedLogins} / {code.maxLogins} 次</span><span>{code.durationHours} 小时 / 次</span><ChevronRight size={14} className="ml-auto text-[#a3aaa7]"/></div>
          <div className="mt-2 text-[10px] text-[#959996]">允许登录至 {dateLabel(code.loginDeadline)}</div>
          {code.activeSessions > 0 && <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#138e82]"><span className="size-1.5 rounded-full bg-[#31ad9b]"/>{code.activeSessions} 个会话尚未到期</div>}
        </button>) : <div className="flex flex-col items-center px-3 py-12 text-center"><KeyRound size={26} strokeWidth={1.2} className="text-[#a9b8b2]"/><p className="mt-4 text-[13px] text-[#646e69]">{codes.length ? '没有符合条件的密码' : '为每位访客创建一份邀请'}</p><p className="mt-2 text-[11px] leading-6 text-[#949c98]">独立设置访问时长与登录次数<br/>随时查看使用情况或撤销访问</p></div>}
      </div>
      <div className="mt-4 flex items-start gap-2 border-t border-black/5 pt-4 text-[10px] leading-5 text-[#939996]"><ShieldCheck size={14} className="mt-0.5 shrink-0"/><span>仅授予作品集浏览权限。有效会话数量不代表当前在线人数。</span></div>
    </section>

    {open && createPortal(<div className="fixed inset-0 z-[200] flex justify-end bg-[#1a2523]/25 backdrop-blur-[5px]" onMouseDown={event => {if (event.target === event.currentTarget) close();}}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="guest-drawer-title" tabIndex={-1} className="flex h-full w-full max-w-[620px] flex-col bg-[#faf9f5] shadow-[-20px_0_80px_rgba(0,0,0,0.1)] outline-none">
        <header className="flex items-start justify-between border-b border-black/7 px-7 pb-6 pt-8"><div><p className="text-[10px] uppercase tracking-[2.5px] text-[#89918d]">Security / Guest Login</p><h2 id="guest-drawer-title" className="mt-3 text-[23px] font-medium tracking-tight text-[#242c29]">{title}</h2></div><button aria-label="关闭访客密码设置" disabled={busy} onClick={close} className="rounded-full border border-black/10 bg-white p-2.5"><X size={18}/></button></header>
        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
          {formError && <div role="alert" className="mb-5 rounded-[14px] bg-[#fff0eb] px-4 py-3 text-[13px] leading-6 text-[#b45843]">{formError}{formError.includes('刷新') && current && <button onClick={() => void inspect(current)} className="ml-2 underline">刷新详情</button>}</div>}
          {receipt?.password ? <div><div className="rounded-[24px] border border-[#cce9df] bg-[#edf8f2] p-6"><ShieldCheck size={26} className="text-[#339982]"/><h3 className="mt-4 text-[17px] font-medium">{receipt.code.label}</h3><p className="mt-2 text-[12px] leading-6 text-[#748a81]">请现在复制并保存密码，关闭后不会再次显示。</p><div className="my-6 break-all rounded-[14px] bg-white p-4 font-mono text-[23px] tracking-[2px] text-[#1f5546] select-all">{receipt.password}</div><button className={`${primaryClass} flex items-center gap-2`} onClick={() => void copy(receipt.password!)}><Copy size={14}/>复制密码</button></div><div className="my-6 space-y-3 text-[13px] text-[#6a736e]"><p>允许登录至：{dateLabel(receipt.code.loginDeadline)}（北京时间）</p><p>每次访问：{receipt.code.durationHours} 小时 · 最多 {receipt.code.maxLogins} 次成功登录</p>{receipt.code.hardDeadline && <p>所有访问统一结束：{dateLabel(receipt.code.hardDeadline)}</p>}</div><button className={secondaryClass} onClick={() => void copy(`邀请你浏览我的作品集：${window.location.origin}\n游客密码：${receipt.password}\n请在 ${dateLabel(receipt.code.loginDeadline)}（北京时间）前登录。每次可访问 ${receipt.code.durationHours} 小时，最多 ${receipt.code.maxLogins} 次成功登录。同一浏览器有效期内刷新或重新打开页面不额外计次。${receipt.code.hardDeadline ? `\n所有访问最晚于 ${dateLabel(receipt.code.hardDeadline)}（北京时间）结束。` : ''}`)}>复制邀请信息</button></div> : mode === 'detail' ? current ? <>
            <div className="flex items-center justify-between gap-4"><h3 className="break-words text-[21px] font-medium text-[#27342e]">{current.label}</h3><Status code={current} now={now}/></div>
            <div className="my-6 grid grid-cols-3 gap-3">{[[`${current.usedLogins} / ${current.maxLogins}`, '已用 / 总次数'],[`${current.durationHours}h`, '每次访问时长'],[String(current.activeSessions), '尚未到期的会话']].map(([value,label]) => <div key={label} className="rounded-[20px] border border-black/7 bg-white px-3 py-5 text-center"><div className="text-[23px] text-[#283f34]">{value}</div><div className="mt-2 text-[10px] text-[#909690]">{label}</div></div>)}</div>
            <dl className="space-y-4 text-[13px]">{[['允许新登录至', dateLabel(current.loginDeadline)],['统一结束时间', dateLabel(current.hardDeadline)],['创建时间', dateLabel(current.createdAt)],['最后使用', current.lastUsedAt ? dateLabel(current.lastUsedAt) : '尚未使用']].map(([key,value]) => <div key={key} className="flex justify-between gap-4"><dt className="text-[#8b918b]">{key}</dt><dd className="text-right text-[#424e46]">{value}</dd></div>)}</dl>
            <p className="mt-4 text-[10px] text-[#969c95]">以上时间均为北京时间。密码仅在创建或替换时显示。</p>
            <div className="mt-6 flex flex-wrap gap-2"><button onClick={() => edit('edit')} className={secondaryClass}>{revoked || guestStatus(current,now) !== 'active' ? '编辑备注' : '编辑配置'}</button>{!revoked && <><button onClick={() => edit('add')} className={secondaryClass}>追加次数</button><button onClick={() => edit('reopen')} className={secondaryClass}>延长期限 / 重新开放</button></>}<button onClick={() => create(current)} className={secondaryClass}>复制配置并新建</button></div>
            <div className="mt-8 border-t border-black/7 pt-6"><h4 className="text-[12px] font-medium text-[#626e66]">登录记录</h4><p className="mt-1 text-[11px] leading-5 text-[#9aa19a]">已有会话保持原到期时间；追加额度不会延长它们。</p><div className="mt-4 space-y-3">{detail.sessions.length ? detail.sessions.map(session => <div key={session.id} className="rounded-[16px] border border-black/7 bg-white p-4 text-[12px]"><div className="flex justify-between gap-3"><span>{dateLabel(session.createdAt)}</span><span className="text-[#83978b]">{session.revokedAt ? '已撤销 / 已退出' : Date.parse(session.expiresAt) <= now ? '已到期' : '访问有效'}</span></div><p className="mt-2 text-[11px] text-[#9a9f9a]">结束于 {dateLabel(session.expiresAt)}</p><p className="mt-2 truncate text-[10px] text-[#a3a9a4]" title={session.browser}>{session.browser}</p></div>) : <p className="py-5 text-[12px] text-[#999]">尚无登录记录</p>}</div></div>
          </> : <p className="py-10 text-[13px] text-[#888]">{formError ? '请关闭后重试。' : '正在读取详情…'}</p> : <form id="guest-config-form" onSubmit={event => {event.preventDefault(); void submit();}} className="space-y-5">
            {current && <button type="button" onClick={() => setMode('detail')} className="flex items-center gap-1.5 text-[12px] text-[#819188]"><ArrowLeft size={13}/>返回密码详情</button>}
            {mode === 'add' ? <><p className="text-[14px] leading-7 text-[#717c74]">为「{current?.label}」追加登录额度，已用次数和已有会话保持不变。</p><Field label="Additional Logins · 追加次数"><input aria-label="追加次数" type="number" min="1" max="10000" required value={amount} onChange={e => setAmount(Number(e.target.value))} className={fieldClass}/></Field><p className="rounded-[16px] bg-[#eef5ef] p-4 text-[13px]">追加后：{current?.usedLogins} / {(current?.maxLogins ?? 0) + amount} 次</p><p className="text-[12px] leading-6 text-[#929991]">若登录期限或统一结束时间已过，仍需延长期限才能重新登录。</p></> : <>
              <Field label="Guest Label · 访客备注" hint="仅在后台显示，建议每位接收者使用独立密码。"><input aria-label="访客备注" autoComplete="off" maxLength={80} required value={draft.label} onChange={e => setDraft({...draft,label:e.target.value})} className={fieldClass}/></Field>
              {!restricted && (!current || current.usedLogins === 0) && <Field label={current ? 'Replace Password · 替换密码（可选）' : 'Guest Password · 游客密码'} hint={current ? '留空保留原密码；替换后，之前发出的密码立即失效。' : '8–64 个字符；创建成功后请复制保存。'}><div className="flex gap-2"><input aria-label="游客密码" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength={8} maxLength={64} required={!current} value={draft.password} onChange={e => setDraft({...draft,password:e.target.value})} className={fieldClass}/><button type="button" title="显示或隐藏密码" aria-label="显示或隐藏密码" onClick={() => setShowPassword(!showPassword)} className="shrink-0 rounded-[12px] border border-black/10 bg-white p-3">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button><button type="button" title="随机生成密码" aria-label="随机生成密码" onClick={() => setDraft({...draft,password:randomPassword()})} className="shrink-0 rounded-[12px] border border-black/10 bg-white p-3"><RefreshCw size={16}/></button></div></Field>}
              {!restricted && <><div className="grid grid-cols-2 gap-4"><Field label="Duration · 每次访问时长"><div className="relative"><input aria-label="每次访问时长" type="number" min="0.25" max="168" step="0.25" required value={draft.durationHours} onChange={e => setDraft({...draft,durationHours:Number(e.target.value)})} className={`${fieldClass} pr-14`}/><span className="absolute right-4 top-3.5 text-[12px] text-[#949a95]">小时</span></div><div className="flex gap-1">{[1,2,4,8].map(h => <button type="button" key={h} onClick={() => setDraft({...draft,durationHours:h})} className={`flex-1 rounded-full py-1 text-[10px] ${draft.durationHours === h ? 'bg-[#dcefe6] text-[#358666]' : 'bg-[#efefe9] text-[#94988f]'}`}>{h}h</button>)}</div></Field><Field label="Max Logins · 最大登录次数" hint={current ? `已用 ${current.usedLogins} 次，不能低于已用次数` : '仅成功建立新会话计次'}><input aria-label="最大登录次数" type="number" min={Math.max(1,current?.usedLogins ?? 1)} max="10000" required value={draft.maxLogins} onChange={e => setDraft({...draft,maxLogins:Number(e.target.value)})} className={fieldClass}/></Field></div>
              <Field label="Login Deadline · 允许新登录至" hint="北京时间 UTC+8。仅限制新登录，已有会话继续至各自到期。"><input aria-label="允许新登录至" type="datetime-local" required value={draft.loginDeadline} onChange={e => setDraft({...draft,loginDeadline:e.target.value})} className={fieldClass}/></Field>
              <button type="button" onClick={() => setAdvanced(!advanced)} className="flex items-center gap-1.5 text-[12px] text-[#648574]"><ChevronRight size={14} className={advanced ? 'rotate-90' : ''}/>高级设置{draft.hardDeadline && ' · 已设置统一结束时间'}</button>
              {advanced && <Field label="Hard Deadline · 所有访问统一结束时间" hint="可留空。前移可能提前结束已有访问；后移不会自动延长或恢复已有会话。"><div className="flex gap-2"><input aria-label="所有访问统一结束时间" type="datetime-local" value={draft.hardDeadline} onChange={e => setDraft({...draft,hardDeadline:e.target.value})} className={fieldClass}/><button type="button" onClick={() => setDraft({...draft,hardDeadline:''})} className={secondaryClass}>清除</button></div></Field>}
              <div className="flex gap-3 rounded-[18px] bg-[#edf4ee] p-4 text-[12px] leading-6 text-[#69816d]"><Clock3 size={16} className="mt-1 shrink-0"/><p>最多支持 {draft.maxLogins} 次成功登录；{current ? '后续每次新登录' : '每次登录后'}可访问 {draft.durationHours} 小时。有效会话内刷新或重开页面不计次，也不续期。{draft.hardDeadline && ' 所有访问受统一结束时间限制。'}</p></div></>}
            </>}
          </form>}
        </div>
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-black/7 bg-white/60 px-7 py-5"><span className="text-[10px] text-[#989e97]">仅授予作品集浏览权限</span>{receipt ? <button onClick={close} className={primaryClass}>已保存，关闭</button> : mode === 'detail' ? current && !revoked ? <button onClick={() => setConfirm('revoke')} className="rounded-full bg-[#fff0eb] px-5 py-3 text-[12px] text-[#bf654d]">撤销并结束访问</button> : <button onClick={close} className={secondaryClass}>关闭</button> : <button type="submit" form="guest-config-form" disabled={busy} className={primaryClass}>{busy ? '正在保存…' : mode === 'create' ? 'CREATE GUEST PASSWORD' : mode === 'add' ? '确认追加次数' : mode === 'reopen' ? '确认重新开放' : '保存配置'}</button>}</footer>
        {confirm && <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#15211c]/20 p-6"><div role="alertdialog" aria-modal="true" aria-labelledby="guest-confirm-title" className="w-full max-w-[440px] rounded-[28px] bg-white p-7 shadow-xl"><h3 id="guest-confirm-title" className="text-[18px] font-medium">{confirm === 'revoke' ? '撤销并结束访问？' : '确认前移统一结束时间？'}</h3><p className="mt-4 text-[13px] leading-7 text-[#7a837b]">{confirm === 'revoke' ? `该密码不可再用于登录，现有 ${current?.activeSessions ?? 0} 个有效会话也将被终止。撤销不可恢复，其他访客密码不受影响。` : `此操作可能提前结束已有访问（当前有 ${current?.activeSessions ?? 0} 个有效会话）。之后延长截止时间不会恢复被截短的会话。`}</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setConfirm(null)} className={secondaryClass}>取消</button><button onClick={() => void submit(confirm === 'revoke' ? 'revoke' : undefined, true)} className={primaryClass}>确认{confirm === 'revoke' ? '撤销' : '修改'}</button></div></div></div>}
      </div>
    </div>, document.body)}
  </>;
}
