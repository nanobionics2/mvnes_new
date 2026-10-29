/* MVNES · Sala de Espera — dados do instrumento e cálculos compartilhados (participante e painel) */
var VERSAO = "3.1";
var V = {
  VTCI: { nome: "Técnico-científico-intelectual", cor: "var(--v1)", txt: "Entender, interpretar, buscar a explicação do que está acontecendo." },
  VSC:  { nome: "Social-comunicacional", cor: "var(--v2)", txt: "Conversar, pedir apoio, negociar, ler as pessoas e as próprias reações." },
  VFE:  { nome: "Financeiro-empresarial", cor: "var(--v3)", txt: "Pesar custo e benefício, planejar recursos, achar a saída que compensa." },
  VEXO: { nome: "Exógeno-institucional", cor: "var(--v4)", txt: "Acionar regras, direitos, órgãos e os caminhos formais disponíveis." },
  VRES: { nome: "Resiliência à ruptura", cor: "var(--v5)", txt: "Não travar quando o imprevisto quebra o plano, improvisar e retomar." }
};
var K = Object.keys(V);
var K4 = ["VTCI", "VSC", "VFE", "VEXO"];
var DEM = { TEC: "VTCI", SOC: "VSC", FIN: "VFE", INST: "VEXO", RUPT: "VRES" };
var NOME_DEM = { TEC: "informação técnica", SOC: "conflito entre pessoas", FIN: "aperto financeiro", INST: "barreira institucional", RUPT: "imprevisto" };
var ORCAMENTO = 6;            /* pontos de tempo e energia por cena */
var NIVEIS = ["Nada", "Pouco", "Bastante", "Prioridade"];  /* 0 a 3 por ação */

/* Cada cena manipula uma exigência (dem). Opções: [texto, {vetor: peso}] */
var CENAS = [
 {id:"tec1",dem:"TEC",t:"O exame com siglas",ctx:"Você recebe o resultado de um exame de sangue com 'VHS elevado' e 'PCR 18 mg/L' marcados em negrito. O médico só disse 'vamos acompanhar' e o retorno é daqui a dois meses.",
  o:[["Procuro entender o que essas siglas indicam e o que os números significam",{VTCI:1}],
     ["Mando uma mensagem para o consultório pedindo que me expliquem melhor",{VSC:1}],
     ["Vejo se vale pagar uma consulta antes do retorno para tirar a dúvida",{VFE:1}],
     ["Peço uma cópia do laudo completo e anoto meu direito de ser informado",{VEXO:1}],
     ["Leio sobre o assunto e levo as dúvidas por escrito a alguém de confiança da área",{VTCI:.5,VSC:.5}],
     ["Comparo laboratórios e preços para repetir o exame e ver se o valor se mantém",{VFE:.5,VTCI:.5}]]},
 {id:"tec2",dem:"TEC",t:"A bula do remédio novo",ctx:"O remédio novo que você começou a tomar diz na bula 'risco de hipoglicemia' e 'interação com anti-inflamatórios'. Você toma ibuprofeno de vez em quando para dor de cabeça.",
  o:[["Leio a bula com calma e tento entender o mecanismo da interação",{VTCI:1}],
     ["Pergunto ao farmacêutico do bairro, que já me conhece",{VSC:1}],
     ["Penso se compensa trocar o ibuprofeno por outra opção mais barata e segura",{VFE:1}],
     ["Ligo para o serviço de atendimento do fabricante ou procuro a Anvisa",{VEXO:1}],
     ["Pesquiso a interação e combino com a família um sinal de alerta caso eu passe mal",{VTCI:.5,VSC:.5}],
     ["Verifico no posto se há outra opção pela rede pública e entendo a diferença entre elas",{VEXO:.5,VTCI:.5}]]},
 {id:"soc1",dem:"SOC",t:"A família dividida",ctx:"Seu pai precisa operar a catarata. Seu irmão quer levá-lo primeiro a um curandeiro de confiança da família, e a conversa no grupo da família está ficando tensa.",
  o:[["Busco o que se sabe sobre catarata sem cirurgia para ter argumentos claros",{VTCI:1}],
     ["Chamo meu irmão para conversar pessoalmente, com calma, antes que piore",{VSC:1}],
     ["Mostro quanto pode custar adiar, se a visão piorar e ele parar de trabalhar",{VFE:1}],
     ["Vejo como agendar a cirurgia pelo SUS ou pelo plano, para ter a data em mãos",{VEXO:1}],
     ["Proponho que ele vá ao curandeiro e também à consulta, e acompanho os dois",{VSC:.5,VEXO:.5}],
     ["Divido com os irmãos o custo da cirurgia e uso isso para unir a família",{VSC:.5,VFE:.5}]]},
 {id:"soc2",dem:"SOC",t:"O médico apressado",ctx:"No posto, o médico é ríspido, olha pouco para você e se recusa a pedir o exame que você acredita precisar. Há uma fila grande lá fora.",
  o:[["Explico com termos precisos por que acho o exame necessário",{VTCI:1}],
     ["Mudo o tom, mostro que entendo a pressa dele e tento uma conversa mais leve",{VSC:1}],
     ["Avalio se sai mais em conta fazer o exame particular e não discutir",{VFE:1}],
     ["Peço que ele registre no prontuário a negativa e o motivo",{VEXO:1}],
     ["Volto outro dia com outro médico do posto, de quem os vizinhos falam bem",{VSC:.5,VEXO:.5}],
     ["Saio, me acalmo, e organizo uma lista com sintomas e datas para a próxima tentativa",{VSC:.5,VTCI:.5}]]},
 {id:"fin1",dem:"FIN",t:"O orçamento do dentista",ctx:"Um dente molar está comprometido. O dentista oferece um implante por R$ 6.000 ou a extração por R$ 250. Ele diz que as duas opções são possíveis.",
  o:[["Estudo o que acontece com a mordida e os dentes vizinhos em cada caso",{VTCI:1}],
     ["Pergunto a amigos que já fizeram implante como foi e se valeu a pena",{VSC:1}],
     ["Faço as contas de parcelamento e do que deixo de fazer com esse dinheiro",{VFE:1}],
     ["Procuro um Centro de Especialidades Odontológicas ou faculdade com atendimento",{VEXO:1}],
     ["Negocio com o dentista um valor ou prazo melhor",{VFE:.5,VSC:.5}],
     ["Comparo três orçamentos e o que cada um inclui no tratamento",{VFE:.5,VTCI:.5}]]},
 {id:"fin2",dem:"FIN",t:"O remédio do mês",ctx:"Seu remédio de uso contínuo, de marca, custa R$ 180 por mês. Este mês o dinheiro já está comprometido e faltam duas semanas para o pagamento.",
  o:[["Pesquiso se o genérico tem a mesma eficácia e o mesmo princípio ativo",{VTCI:1}],
     ["Peço ajuda a um parente até o próximo pagamento",{VSC:1}],
     ["Refaço o orçamento do mês e corto outra despesa para manter o remédio",{VFE:1}],
     ["Vejo se o remédio está no Farmácia Popular ou na farmácia do posto",{VEXO:1}],
     ["Comparo preços em várias farmácias e aplicativos de desconto",{VFE:.5,VTCI:.5}],
     ["Peço ao médico a receita do genérico e me cadastro no programa do governo",{VEXO:.5,VFE:.5}]]},
 {id:"inst1",dem:"INST",t:"A fila da cirurgia",ctx:"Sua cirurgia de hérnia foi aprovada pelo SUS, mas a central de regulação informa que não há previsão. A fila média é de oito meses e a dor atrapalha o trabalho.",
  o:[["Entendo como a regulação define as prioridades e se meu caso se encaixa",{VTCI:1}],
     ["Converso com o agente de saúde e pessoas que já passaram pela mesma fila",{VSC:1}],
     ["Calculo quanto custaria operar particular e quanto perco de trabalho esperando",{VFE:1}],
     ["Procuro a ouvidoria do SUS ou a Defensoria Pública para pedir prioridade",{VEXO:1}],
     ["Peço um laudo detalhado ao médico e com ele entro com o pedido de prioridade",{VEXO:.5,VTCI:.5}],
     ["Busco hospitais filantrópicos com valor social e vejo o que cabe no bolso",{VEXO:.5,VFE:.5}]]},
 {id:"inst2",dem:"INST",t:"O reajuste do plano",ctx:"Seu plano de saúde reajustou a mensalidade em 35% de um mês para o outro. A carta só cita 'reajuste contratual', sem detalhes.",
  o:[["Leio o contrato para entender a cláusula de reajuste",{VTCI:1}],
     ["Ligo para o corretor e tento uma explicação ou um desconto",{VSC:1}],
     ["Comparo com outros planos e com o custo de ficar sem plano",{VFE:1}],
     ["Consulto as regras da ANS e abro uma reclamação se o reajuste estiver fora delas",{VEXO:1}],
     ["Junto outros clientes na mesma situação para reclamar em conjunto",{VSC:.5,VEXO:.5}],
     ["Procuro o Procon e avalio, com os números, se vale a pena brigar",{VEXO:.5,VFE:.5}]]},
 {id:"rupt1",dem:"RUPT",t:"Uma noite de chuva",ctx:"Sua mãe, de 78 anos, escorrega no banheiro às 23h. O punho incha rápido. Está chovendo forte, você não tem carro e o celular está com 9% de bateria.",
  rupt:"A luz do bairro acaba de cair.",
  o:[["Observo se há deformidade, dormência ou dedos frios para saber a gravidade",{VTCI:1}],
     ["Bato na porta do vizinho e peço ajuda e carona",{VSC:1}],
     ["Chamo um carro por aplicativo mesmo com tarifa alta",{VFE:1}],
     ["Ligo para o SAMU (192) antes que a bateria acabe",{VEXO:1}],
     ["Imobilizo o punho com o que tenho em casa e decido o plano B em minutos",{VRES:1}],
     ["Não paro: enquanto acalmo minha mãe, já vou separando documentos e lanterna",{VRES:.5,VSC:.5}]]},
 {id:"rupt2",dem:"RUPT",t:"A cirurgia da véspera",ctx:"Sua cirurgia de joelho estava marcada para amanhã às 7h. Você tirou férias e arrumou quem cuidasse da casa.",
  rupt:"Às 20h o hospital liga e cancela. O centro cirúrgico alagou.",
  o:[["Pesquiso se esperar algumas semanas piora o joelho",{VTCI:1}],
     ["Ligo para meu cirurgião e pergunto se ele opera em outro hospital",{VSC:1}],
     ["Calculo o que perco em dias de férias e se vale pagar outro hospital",{VFE:1}],
     ["Peço o cancelamento registrado por escrito e pergunto meus direitos",{VEXO:1}],
     ["Ainda na ligação, peço a primeira data possível e reorganizo férias e ajuda",{VRES:1}],
     ["Remarco tudo no mesmo dia, avisando quem ia me ajudar",{VRES:.5,VSC:.5}]]},
 {id:"rupt3",dem:"RUPT",t:"No meio do tratamento",ctx:"Você está na sexta de vinte sessões de fisioterapia para o ombro, pagas pelo plano da empresa.",
  rupt:"A empresa fecha o setor e você é desligado na sexta-feira. O plano acaba no fim do mês.",
  o:[["Estudo os exercícios e o que acontece se eu parar agora",{VTCI:1}],
     ["Converso com o fisioterapeuta sobre o que fazer",{VSC:1}],
     ["Renegocio o valor das sessões direto com a clínica",{VFE:1}],
     ["Verifico se tenho direito de continuar no plano após a demissão",{VEXO:1}],
     ["Não interrompo: adapto os exercícios em casa com o que tenho e sigo",{VRES:1}],
     ["Retomo a rotina de exercícios na semana seguinte e procuro a fisioterapia do SUS",{VRES:.5,VEXO:.5}]]},
 {id:"rupt4",dem:"RUPT",t:"Longe de casa",ctx:"Você está a trabalho numa cidade a 300 km de casa. Seu remédio de pressão acabou hoje e a única farmácia da cidade não tem.",
  rupt:"A estrada foi interditada e o ônibus de volta só sai em três dias.",
  o:[["Pesquiso qual remédio equivalente pode substituir o meu com segurança",{VTCI:1}],
     ["Peço a um colega daqui que me indique um médico ou alguém que ajude",{VSC:1}],
     ["Vejo quanto custa mandar o remédio por transportadora ou uma consulta particular",{VFE:1}],
     ["Procuro a unidade de saúde da cidade para uma receita e o remédio da rede pública",{VEXO:1}],
     ["Reorganizo os três dias: controlo sal e esforço e mantenho o trabalho em andamento",{VRES:1}],
     ["Improviso: peço ao médico de casa uma receita por mensagem e resolvo aqui mesmo",{VRES:.5,VSC:.5}]]}
];
var N_RUPT = CENAS.filter(function (c) { return c.dem === "RUPT"; }).length;

var ESCALA = [
 ["Quando algo me preocupa, procuro entender como aquilo funciona","VTCI"],
 ["Gosto de comparar explicações diferentes antes de decidir","VTCI"],
 ["Consigo interpretar informações técnicas com alguma facilidade","VTCI"],
 ["Diante de um problema, logo penso em alguém com quem conversar","VSC"],
 ["Consigo negociar sem criar atrito","VSC"],
 ["Percebo rápido como as pessoas estão reagindo","VSC"],
 ["Antes de decidir, penso no custo e no que ganho com aquilo","VFE"],
 ["Costumo planejar como vou pagar as coisas","VFE"],
 ["Enxergo jeitos de resolver algo gastando menos","VFE"],
 ["Sei a quem recorrer quando um serviço falha comigo","VEXO"],
 ["Procuro saber quais são meus direitos numa situação nova","VEXO"],
 ["Entendo como funcionam regras e órgãos públicos","VEXO"],
 ["Quando um plano desmorona de repente, logo monto outro","VRES"],
 ["Consigo improvisar quando os meios de costume falham","VRES"],
 ["Depois de um imprevisto, retomo o que estava fazendo sem demora","VRES"]
];

var SOCIO = [
 ["idade","Idade",["18 a 29","30 a 44","45 a 59","60 ou mais"]],
 ["escolaridade","Escolaridade",["Fundamental","Médio","Superior","Pós-graduação"]],
 ["renda","Renda familiar mensal",["Até 2 salários mínimos","2 a 5","5 a 10","Mais de 10","Prefiro não dizer"]],
 ["saude","Trabalha na área da saúde?",["Sim","Não"]],
 ["plano","Tem plano de saúde?",["Sim","Não"]],
 ["sexo","Sexo",["Feminino","Masculino","Prefiro não dizer"]]
];

/* ---------- utilitários ---------- */
function $(s) { return document.querySelector(s); }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function toTop() { try { window.scrollTo(0, 0); } catch (e) {} }
function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
function copyText(t, b) { function sel() { t.focus(); t.select(); } try { navigator.clipboard.writeText(t.value).then(function () { b.textContent = "Copiado"; }, sel); } catch (e) { sel(); } }
function csvLine(r) { return r.map(function (x) { x = x == null ? "" : String(x); return /[",\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; }).join(","); }

/* ---------- perfil de uma sessão ---------- */
function vetoresDaCena(c, aloc) {
  var vet = {}; K.forEach(function (v) { vet[v] = 0; });
  c.o.forEach(function (op, k) { Object.keys(op[1]).forEach(function (v) { vet[v] += aloc[k] * op[1][v]; }); });
  return vet;
}
function perfil(cenas) {
  var tot = {}; K.forEach(function (v) { tot[v] = 0; });
  cenas.forEach(function (c) { K.forEach(function (v) { tot[v] += c.vetores[v]; }); });
  var soma = K.reduce(function (a, v) { return a + tot[v]; }, 0);
  var prop = {}, mag = {}, corr = {};
  K.forEach(function (v) { prop[v] = soma ? tot[v] / soma : 0; mag[v] = tot[v] / (v === "VRES" ? (N_RUPT || 1) : cenas.length); });
  var aplic = cenas.reduce(function (a, c) { return a + c.aplicadas; }, 0) / cenas.length;
  K4.forEach(function (v) {
    var d = Object.keys(DEM).filter(function (x) { return DEM[x] === v; })[0];
    var a = cenas.filter(function (c) { return c.dem === d; }), b = cenas.filter(function (c) { return c.dem !== d; });
    corr[v] = a.reduce(function (s, c) { return s + c.vetores[v]; }, 0) / (a.length || 1) - b.reduce(function (s, c) { return s + c.vetores[v]; }, 0) / (b.length || 1);
  });
  return { tot: tot, prop: prop, mag: mag, aplic: aplic, corr: corr };
}
function escalaMedia(e) {
  var m = {};
  K.forEach(function (v) {
    var it = []; ESCALA.forEach(function (x, k) { if (x[1] === v && e[k]) it.push(e[k]); });
    m[v] = it.length ? it.reduce(function (a, b) { return a + b; }, 0) / it.length : null;
  });
  return m;
}

/* ---------- estatística ---------- */
function mean(a) { return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : NaN; }
function vari(a) { var m = mean(a); return a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / ((a.length - 1) || 1); }
function pearson(x, y) {
  var n = x.length; if (n < 3) return null;
  var mx = mean(x), my = mean(y), a = 0, b = 0, c = 0;
  for (var i = 0; i < n; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) * (x[i] - mx); c += (y[i] - my) * (y[i] - my); }
  return b && c ? a / Math.sqrt(b * c) : null;
}
function alpha(items) {
  var k = items.length, n = items[0] ? items[0].length : 0; if (k < 2 || n < 3) return null;
  var tot = range(n).map(function (i) { return items.reduce(function (s, c) { return s + c[i]; }, 0); });
  var vt = vari(tot); if (!vt) return null;
  return k / (k - 1) * (1 - items.reduce(function (s, c) { return s + vari(c); }, 0) / vt);
}
function f2(x) { return x == null || isNaN(x) ? "–" : x.toFixed(2); }
