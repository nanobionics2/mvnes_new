/**
 * MVNES · Sala de Espera — receptor de respostas (planilha "MVNES New respostas")
 * Implantar: Implantar > Nova implantação > App da Web
 *   Executar como: Eu  |  Quem pode acessar: Qualquer pessoa
 * Cole a URL /exec em config.js no repositório.
 */
var PANEL_KEY = 'b50c0a4bf7ab41ea87df7ed453b095ce';
var VETORES = ['VTCI', 'VSC', 'VFE', 'VEXO', 'VRES'];
var SOCIO = ['idade', 'escolaridade', 'renda', 'saude', 'plano', 'sexo'];

function sheet_(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var r = JSON.parse(e.postData.contents);
    var p = r.perfil || {};
    var hS = ['recebido', 'pid', 'nome', 'versao', 'inicio', 'fim'].concat(SOCIO,
      VETORES.map(function (v) { return 'prop_' + v; }), VETORES.map(function (v) { return 'mag_' + v; }), ['aplicadas_media'],
      ['VTCI', 'VSC', 'VFE', 'VEXO'].map(function (v) { return 'corresp_' + v; }), VETORES.map(function (v) { return 'esc_' + v; }), ['json']);
    sheet_('sessoes', hS).appendRow([new Date(), r.pid, r.nome, r.versao, r.inicio, r.data]
      .concat(SOCIO.map(function (k) { return (r.socio || {})[k] || ''; }),
        VETORES.map(function (v) { return (p.prop || {})[v]; }), VETORES.map(function (v) { return (p.mag || {})[v]; }), [p.aplicadas_media],
        ['VTCI', 'VSC', 'VFE', 'VEXO'].map(function (v) { return (p.correspondencia || {})[v]; }),
        VETORES.map(function (v) { var x = (r.escala_media || {})[v]; return x == null ? '' : x; }), [JSON.stringify(r)]));
    var hL = ['pid', 'cena', 'exigencia', 'posicao', 'vetor', 'fichas', 'exigido', 'tempo_ms'];
    var map = { TEC: 'VTCI', SOC: 'VSC', FIN: 'VFE', INST: 'VEXO', RUPT: 'VRES' };
    var rows = [];
    (r.cenas || []).forEach(function (c) {
      VETORES.forEach(function (v) {
        if (v === 'VRES' && c.dem !== 'RUPT') return;
        rows.push([r.pid, c.id, c.dem, c.pos, v, c.vetores[v], map[c.dem] === v ? 1 : 0, c.tempo_ms]);
      });
    });
    var shL = sheet_('cenas_longo', hL);
    if (rows.length) shL.getRange(shL.getLastRow() + 1, 1, rows.length, hL.length).setValues(rows);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, erro: String(err) });
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  var q = (e && e.parameter) || {};
  if (q.action !== 'list') return out_({ ok: true, app: 'MVNES Sala de Espera' });
  if (q.key !== PANEL_KEY) return out_({ ok: false, erro: 'chave' });
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessoes');
  if (!sh || sh.getLastRow() < 2) return out_({ ok: true, sessoes: [] });
  var vals = sh.getRange(2, sh.getLastColumn(), sh.getLastRow() - 1, 1).getValues();
  var sessoes = [];
  vals.forEach(function (v) { try { sessoes.push(JSON.parse(v[0])); } catch (x) {} });
  return out_({ ok: true, sessoes: sessoes });
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
