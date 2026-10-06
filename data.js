/*
  CONTEÚDO DO SITE
  Pra adicionar um projeto novo: copie um bloco de PROJETOS, troque os campos e salve.
  Pra adicionar uma ferramenta: inclua um item na categoria certa de FERRAMENTAS.
  Imagens ficam na pasta img/. Se "imagem" ficar vazio, o card usa uma capa automática.
*/

const PERFIL = {
  nome: "Daniel Terra",
  apelido: "Dani",
  cargo: "Revenue Operations · Dados · Automação",
  local: "Vespasiano, MG",
  linkedin: "https://www.linkedin.com/in/daniel-terra-0494711bb/",
  github: "https://github.com/Danielterra13-lang",
  email: "daniel_terra13@hotmail.com",
  // Coloque os arquivos na pasta img/ com esses nomes
  fotoIA: "img/foto-ia.jpg",
  fotoPessoal: "img/foto-pessoal.jpg",
  // Número no formato internacional, só dígitos (ex.: 5531999999999). Vazio = o botão não aparece.
  whatsapp: "5531996843060",
  whatsappMensagem: "Oi, Dani! Vi seu portfólio e queria conversar.",
  resumo:
    "Atuo entre operações, dados e automação. Estruturo indicadores, construo dashboards executivos, cuido da arquitetura do CRM e automatizo processos. Na prática, pego processo complexo e transformo em fluxo simples, medido e fácil de escalar.",
};

const PROJETOS = [
  {
    id: "anac",
    titulo: "Malha aérea brasileira",
    categoria: "Engenharia de dados",
    ano: "2026",
    destaque: true,
    imagem: "img/anac.jpg",
    resumo:
      "Pipeline completo com 26 anos de dados da ANAC: do CSV bruto ao BigQuery, transformação em dbt, exportação automática pelo GitHub Actions e um dashboard com mapa de rotas.",
    numero: { valor: "1M+", rotulo: "linhas processadas" },
    stack: ["BigQuery", "dbt", "Python", "GitHub Actions", "Cloud Storage", "Leaflet", "Chart.js"],
    links: {
      dashboard: "https://danielterra13-lang.github.io/projeto-anac/",
      github: "https://github.com/Danielterra13-lang/projeto-anac",
    },
    contexto:
      "Dado público de aviação costuma virar planilha estática: alguém baixa o CSV, faz um gráfico e para ali. Aqui o mesmo dado foi tratado como pipeline de verdade, com ingestão, camadas de transformação, exportação versionada e um front-end que lê esses arquivos. O recorte longo permite contar a história inteira: a malha cresceu sem parar até 2019, perdeu mais da metade dos passageiros em 2020 e bateu recorde em 2025.",
    fluxo: [
      "CSV bruto da ANAC",
      "Cloud Storage",
      "BigQuery (raw, tudo STRING)",
      "dbt staging",
      "dbt marts",
      "Python exporta JSON",
      "Dashboard no GitHub Pages",
    ],
    decisoes: [
      { t: "Tabela raw toda em STRING", d: "A carga não quebra por causa de uma linha suja. A conversão de tipo fica no dbt, com safe_cast tratando erro linha a linha." },
      { t: "Sem camada intermediate no dbt", d: "Os marts só agregam o staging. Criar mais uma camada seria estrutura por estrutura." },
      { t: "Top 150 rotas por ano no mapa", d: "Reduziu o JSON de rotas de uns 400 MB para cerca de 3 MB sem perder a história principal." },
      { t: "Service account restrita no GitHub Actions", d: "Só leitura e execução de jobs no BigQuery. Se a chave vazar, o estrago possível é pequeno." },
    ],
    bugs: [
      { t: "Cabeçalho do CSV entrando como dado", d: "Apareceu uma região chamada AEROPORTO_DE_ORIGEM_UF no gráfico. O filtro olhava o texto antes da conversão, não o resultado. Passou a filtrar pelo resultado do safe_cast." },
      { t: "Um espaço em branco virando categoria", d: "String com um espaço é verdadeira em JavaScript e passava pelo filtro do front. Resolvido com nullif(trim(campo), '') ainda no staging." },
      { t: "NaN quebrando conversão para inteiro", d: "Rotas com métrica nula derrubavam a exportação. Entrou checagem explícita com pd.notna antes de converter." },
    ],
    resultado: [
      "37,4 milhões de passageiros em 2000, 119,2 milhões em 2019",
      "Queda de 57% em 2020, com 51,3 milhões",
      "Recorde histórico em 2025, com 130,7 milhões",
      "Atualização automática todo dia 20 pelo GitHub Actions",
    ],
  },
  {
    id: "eleitoral",
    titulo: "Monitoramento eleitoral com LLM",
    categoria: "IA aplicada",
    ano: "2026",
    destaque: true,
    imagem: "img/eleitoral.jpg",
    imagemExtra: "img/eleitoral-mapa.jpg",
    resumo:
      "Cruza pesquisas eleitorais públicas com a situação de reeleição de cada governo estadual e classifica o risco de continuidade nas 27 disputas de 2026. IA onde precisa de julgamento, regra fixa onde precisa de auditoria.",
    numero: { valor: "27", rotulo: "estados monitorados" },
    stack: ["Claude (Scheduled Tasks)", "Google Apps Script", "Google Sheets", "HTML/JS", "SVG"],
    links: {
      dashboard: "https://danielterra13-lang.github.io/monitoramento-eleitoral-llm/",
      github: "https://github.com/Danielterra13-lang/monitoramento-eleitoral-llm",
      case: "https://hip-memory-a6b.notion.site/Monitoramento-eleitoral-com-LLM-3aceb2f6a878803bbe02e4e042a94a95",
    },
    contexto:
      "Nasceu de uma necessidade real de vendas B2G: entender, estado por estado, se o grupo político atual tende a continuar no governo. Foi reconstruído do zero com dados públicos e infraestrutura pessoal para virar portfólio.",
    fluxo: [
      "Claude pesquisa pré-candidatos (semanal)",
      "Revisão humana do .xlsx",
      "Apps Script coleta pesquisas",
      "Apps Script calcula o gap",
      "Planilha",
      "Dashboard com mapa",
    ],
    decisoes: [
      { t: "Curadoria por Scheduled Task, não API dentro do Apps Script", d: "Sem custo recorrente de API e com uma pessoa revisando antes de qualquer dado entrar na planilha." },
      { t: "Classificação por regra fixa, não por LLM", d: "O cálculo do gap é determinístico. LLM ali só traria custo, latência e inconsistência. Limite de 6 p.p. considerando a margem de erro combinada das pesquisas." },
      { t: "Cortei as bandeiras dos estados", d: "A UF e o mapa já cumprem esse papel. Menos uma dependência de dado." },
    ],
    bugs: [],
    resultado: [
      "Mapa do Brasil interativo, com clique que filtra a tabela",
      "Atualização semanal com revisão humana no meio",
      "Custo de API zero",
    ],
  },
  {
    id: "pipeline-municipal",
    titulo: "Enriquecimento de dados municipais",
    categoria: "ETL · Python",
    ano: "2026",
    destaque: true,
    imagem: "",
    resumo:
      "Scripts em Python que juntam INEP, Tesouro (SICONFI), FNDE e Google News para enriquecer uma base de municípios e alimentar o Lead Score de uma operação comercial B2G no HubSpot.",
    numero: { valor: "4", rotulo: "fontes públicas" },
    stack: ["Python", "pandas", "API SICONFI", "INEP", "FNDE", "Google News RSS", "HubSpot"],
    links: {
      github: "https://github.com/Danielterra13-lang/pipeline-enriquecimento-municipal",
      case: "https://hip-memory-a6b.notion.site/Case-Pipeline-de-Enriquecimento-de-Dados-P-blicos-Municipais-3aceb2f6a87880cc8177e45166edac88",
    },
    contexto:
      "Em venda para o setor público, saber quais municípios priorizar depende de dado que não está no CRM: número de matrículas, quanto a receita depende do FUNDEB, se o município recebe complementação VAAR, se a secretaria anda falando de tecnologia. Esses scripts nasceram como notebooks soltos e foram reescritos como pipeline reutilizável.",
    fluxo: [
      "Base de municípios (código IBGE)",
      "Matrículas INEP",
      "Dependência FUNDEB (SICONFI)",
      "VAAR (FNDE)",
      "Notícias categorizadas",
      "Planilha enriquecida",
      "Lead Score no HubSpot",
    ],
    decisoes: [
      { t: "Código IBGE de 7 dígitos como chave única", d: "Todos os scripts normalizam a chave do mesmo jeito, então os resultados se encaixam sem fuzzy matching no final." },
      { t: "Cache dos microdados do INEP", d: "O ZIP passa de 1 GB. Baixar uma vez e reaproveitar." },
      { t: "Cabeçalho detectado por palavra-chave", d: "A planilha do FNDE muda de formato entre publicações. Ler por posição fixa quebraria na próxima versão." },
      { t: "Zero credencial no código", d: "Os notebooks originais tinham uma chave de API exposta. Foi revogada e a versão pública não usa chave nenhuma." },
    ],
    bugs: [],
    resultado: [
      "Notebooks soltos viraram scripts com CLI, logging e funções isoladas",
      "Base de municípios pronta para priorização comercial",
      "Próximo passo mapeado: orquestração e validação de linhas perdidas em merges",
    ],
  },
  {
    id: "nba",
    titulo: "NBA Dashboard 2025-26",
    categoria: "Dados · Postgres",
    ano: "2026",
    destaque: false,
    imagem: "img/nba.jpg",
    resumo:
      "Estatísticas de todos os jogadores da temporada, filtráveis por time, com o painel inteiro mudando para as cores de cada franquia. Coleta em Python, banco em esquema estrela no Supabase e front consultando a API direto.",
    numero: { valor: "30", rotulo: "times" },
    stack: ["Python", "nba_api", "Supabase", "PostgreSQL", "Plotly.js"],
    links: {
      dashboard: "https://danielterra13-lang.github.io/nba-dashboard-supabase/",
      github: "https://github.com/Danielterra13-lang/nba-dashboard-supabase",
    },
    contexto:
      "Torço pro Celtics e queria um painel com a mesma qualidade dos dashboards que faço no trabalho, só que com outra stack: SQL de verdade em Postgres e consumo de API REST no front.",
    fluxo: ["nba_api (Python)", "CSV local", "Supabase (Postgres)", "API REST", "Dashboard HTML"],
    decisoes: [
      { t: "Esquema estrela com campo de temporada já na fato", d: "Adicionar outra temporada é rodar a coleta de novo, não redesenhar o banco." },
      { t: "Front direto no Supabase, sem backend", d: "Só funciona com segurança porque a chave do navegador é só leitura via Row Level Security." },
      { t: "Fundo de cada time gerado com color-mix", d: "Uma fórmula mistura a cor secundária da franquia com branco e serve para 29 times. O Nets, que tem branco como secundária, ganhou um tema escuro próprio." },
      { t: "Quadra mostra volume, não posição de arremesso", d: "A API não informa de onde saiu cada cesta, só o total por tipo. Em vez de inventar posição, o gráfico mostra garrafão e área do arco com intensidade pelo peso de 2PT, 3PT e lance livre." },
    ],
    bugs: [
      { t: "API da NBA bloqueia IP de nuvem", d: "No Colab dava timeout. É bloqueio de IP de datacenter. A coleta passou a rodar local." },
      { t: "Altura vindo como texto", d: "O campo chega como \"6-6\". Troquei pelo campo numérico em polegadas e converti para centímetros." },
      { t: "NaN não é JSON válido", d: "Jogador sem estatística quebrava o envio. Entrou uma limpeza explícita antes do upsert." },
      { t: "Coluna nova no meio de uma view", d: "Ao incluir pontos por tipo de cesta, o Postgres recusou o CREATE OR REPLACE VIEW, que só aceita coluna nova no final. Reordenei a view." },
    ],
    resultado: [
      "Painel inteiro troca de cor conforme o time escolhido",
      "Quebra de pontos por tipo de cesta numa quadra simplificada",
      "View no banco entrega tudo pronto, sem join no navegador",
    ],
  },
  {
    id: "gestao-revops",
    titulo: "Gestão de ações de RevOps",
    categoria: "Produto · Supabase",
    ano: "2026",
    destaque: false,
    imagem: "img/gestao-revops.jpg",
    resumo:
      "Um banco Postgres servindo dois front-ends: um dashboard público só de leitura e um app mobile privado, com login por link mágico, para cadastrar e editar as ações do time.",
    numero: { valor: "R$ 0", rotulo: "de infraestrutura por mês" },
    stack: ["Supabase", "PostgreSQL", "RLS", "PWA", "HTML/JS", "GitHub Pages"],
    links: {
      dashboard: "https://danielterra13-lang.github.io/gestao-acoes-revops/revops-dashboard.html",
      github: "https://github.com/Danielterra13-lang/gestao-acoes-revops",
    },
    contexto:
      "Começou como um dashboard que eu usava de verdade no trabalho, lendo uma planilha. Planilha funciona até duas pessoas precisarem editar ao mesmo tempo ou alguém precisar ver o status sem poder mexer. Essa versão anonimizada refaz o sistema com banco relacional e controle de acesso.",
    fluxo: ["App privado (escrita)", "Supabase com RLS", "Dashboard público (leitura)"],
    decisoes: [
      { t: "Regra de negócio no banco", d: "Tipo, etapa e status têm check constraint. Se a interface deixar passar um valor errado, o Postgres recusa." },
      { t: "PWA em vez de app nativo", d: "Abre no celular, vai pra tela inicial e reaproveita a mesma stack do dashboard. Pra uso pessoal, nativo não se paga." },
      { t: "Login sem senha", d: "Link mágico elimina toda a gestão de senha para um único usuário." },
    ],
    bugs: [
      { t: "Política de escrita aberta demais", d: "A primeira versão liberava escrita para qualquer usuário autenticado. O security advisor do Supabase apontou: qualquer pessoa cria conta por link mágico. A política passou a travar pelo e-mail." },
    ],
    resultado: [
      "CRUD completo no app privado",
      "Problema real de segurança pego e corrigido antes de ir ao ar",
    ],
  },
  {
    id: "feedback-cs",
    titulo: "Painel de feedback de CS",
    categoria: "Dashboard · Automação",
    ano: "2026",
    destaque: false,
    imagem: "img/feedback-cs.jpg",
    resumo:
      "Template de dashboard em HTML puro que lê uma planilha do Google ao vivo. Um fluxo no Make usa IA para categorizar os feedbacks de clientes e o painel mostra fila por urgência, sentimento e risco de churn.",
    numero: { valor: "30 s", rotulo: "de atualização automática" },
    stack: ["Make", "Claude", "Google Sheets", "HTML/JS", "JSONP"],
    links: {
      dashboard: "https://danielterra13-lang.github.io/dashboard-feedback-cs/",
      github: "https://github.com/Danielterra13-lang/dashboard-feedback-cs",
      case: "https://hip-memory-a6b.notion.site/Case-Dashboard-Operacional-Standalone-com-Google-Sheets-como-Fonte-de-Dados-3aceb2f6a878802fb4aee0e56da3e204",
      extra: { rotulo: "Fluxo no Make", url: "https://us2.make.com/public/shared-scenario/tnGDXksyFPG/fluxo-de-categorizacao-feedback" },
    },
    contexto:
      "Times pequenos de CS precisam de um painel que funcione sem backend, sem licença de BI e sem ninguém exportando dado na mão. A arquitetura é genérica: qualquer planilha alimenta esse layout trocando duas variáveis.",
    fluxo: ["Google Forms", "Make + IA categoriza", "Google Sheets", "Dashboard (JSONP, 30 s)"],
    decisoes: [
      { t: "JSONP em vez de fetch", d: "Lê a planilha sem chave de API e sem servidor intermediário." },
      { t: "Configuração por parâmetro na URL", d: "O mesmo arquivo serve para outra planilha sem editar código." },
    ],
    bugs: [
      { t: "Coluna de data que nunca aparecia", d: "O código procurava o nome padrão do Forms em português, mas a planilha vinha com \"Timestamp\". Agora a coluna de data é detectada entre vários nomes possíveis." },
    ],
    resultado: [
      "Um único index.html, abre direto no navegador",
      "Virou o template dos meus outros dashboards em HTML",
    ],
  },
  {
    id: "rh-n8n",
    titulo: "Pipeline de RH com n8n",
    categoria: "Automação · BI",
    ano: "2026",
    destaque: false,
    imagem: "img/rh-n8n.jpg",
    imagemExtra: "img/rh-powerbi.jpg",
    resumo:
      "Uma planilha de RH bagunçada vira pipeline: o n8n detecta a atualização no Drive, trata os dados e grava no Supabase, e o Power BI entrega o painel com um assistente para perguntas em linguagem natural.",
    numero: { valor: "107 → 90", rotulo: "linhas viraram registros limpos" },
    stack: ["n8n", "Docker", "Supabase", "PostgreSQL", "Power BI"],
    links: {
      github: "https://github.com/Danielterra13-lang/case-pipeline-rh-n8n-supabase-powerbi",
    },
    contexto:
      "A planilha de colaboradores tinha cabeçalho repetido a cada período de contratação, blocos separados por linha em branco e registro real misturado com linha de seção. Qualquer pergunta simples, como headcount por setor, exigia limpeza manual toda vez.",
    fluxo: [
      "Planilha no Google Drive",
      "n8n detecta a atualização",
      "Extração e tratamento (Code)",
      "Gravação no Supabase",
      "Tabelas dimensão",
      "Power BI + assistente de IA",
    ],
    decisoes: [
      { t: "Tratamento fora do Power BI", d: "O dado limpo fica num banco de verdade. Outro dashboard, uma API ou um script em Python consomem a mesma base sem repetir a limpeza." },
      { t: "n8n self-hosted em Docker", d: "Controle total de execução e credenciais, sem limite de execuções. Em troca, uptime e backup ficam por minha conta." },
      { t: "Erro desviado para log, sem travar o loop", d: "Se uma gravação falha, o registro do erro vai para um arquivo no Drive e o resto continua sendo processado." },
    ],
    bugs: [
      { t: "Chave duplicada no Postgres", d: "O gatilho reprocessa a planilha inteira a cada edição e o node fazia INSERT simples. O próprio log de erro do pipeline pegou. A correção é trocar por upsert usando o ID do colaborador." },
      { t: "RLS desligado no Supabase", d: "Aceitável para portfólio, mas registrado como ponto a corrigir antes de qualquer dado real de RH passar por ali." },
    ],
    resultado: [
      "Planilha que exigia limpeza manual agora atualiza sozinha",
      "Painel com headcount, contratações, desligamentos e folha",
      "Perguntas em linguagem natural direto no dashboard",
    ],
  },
  {
    id: "powerbi-ia",
    titulo: "Vendas em Power BI com IA",
    categoria: "Business Intelligence",
    ano: "2026",
    destaque: false,
    imagem: "img/powerbi-ia.jpg",
    imagemExtra: "img/powerbi-ia-tooltip.jpg",
    resumo:
      "Dashboard comercial com faturamento, custo, lucro e crescimento mês a mês e ano a ano, tooltips analíticos e um campo de perguntas em linguagem natural ligado ao modelo.",
    numero: { valor: "17", rotulo: "medidas DAX" },
    stack: ["Power BI", "DAX", "Power Query", "Star schema"],
    links: {
      dashboard: "https://app.powerbi.com/view?r=eyJrIjoiZTg4MmU1YWEtNzNkNS00NDM1LTk0NGUtOGI1Mzk3Nzk1MjdlIiwidCI6ImQ0Njc3NjUyLTNmZjItNDdkZC04MzdlLWU4NmU3MmE3ZTkzMSJ9",
      github: "https://github.com/Danielterra13-lang/case-dashboard-vendas-powerbi-ia",
    },
    contexto:
      "Gestor comercial quer três coisas ao mesmo tempo: visão consolidada, comparação com o período anterior e resposta rápida para perguntas pontuais sem abrir chamado para o analista.",
    fluxo: ["Excel (vendas + países)", "Power Query", "Modelo estrela", "Medidas DAX", "Relatório + IA"],
    decisoes: [
      { t: "Calendário próprio em M", d: "Nada de auto date/time. Toda a inteligência de tempo (YoY, MoM) depende de uma tabela de datas controlada." },
      { t: "Medidas centralizadas numa tabela só", d: "Nenhuma medida solta dentro de fato ou dimensão. Fica fácil de achar e manter." },
      { t: "HASONEVALUE nos comparativos", d: "O YoY só aparece quando o filtro tem um ano só. Evita número sem sentido." },
    ],
    bugs: [],
    resultado: [
      "Modelo enxuto, 1 fato e 2 dimensões, cerca de 2,8 MB",
      "Tooltip que mostra o recorte do mês sem precisar clicar",
    ],
  },
  {
    id: "app-vendas",
    titulo: "Aplicativo de vendas",
    categoria: "App · Python",
    ano: "2026",
    destaque: false,
    imagem: "img/app-vendas.jpg",
    imagemFit: "contain",
    resumo:
      "App de registro de vendas em Python com Kivy, sincronizando com Firebase pela API REST, funcionando offline e com APK Android gerado automaticamente pelo GitHub Actions.",
    numero: { valor: "APK", rotulo: "pronto para baixar" },
    stack: ["Python", "Kivy", "Firebase", "REST", "GitHub Actions", "Docker"],
    links: {
      download: "https://github.com/Danielterra13-lang/aplicativo-vendas-kivy/releases/latest",
      github: "https://github.com/Danielterra13-lang/aplicativo-vendas-kivy",
    },
    contexto:
      "Partiu de um exercício de curso e foi reconstruído com arquitetura, persistência remota e identidade visual próprias. É o projeto que mostra entrega de produto de ponta a ponta, e a base para o próximo: um pipeline analítico em cima desses dados de venda.",
    fluxo: ["App (Kivy)", "Cache local (JSON)", "Firebase Realtime DB", "KPIs no app"],
    decisoes: [
      { t: "Firebase por REST puro, sem SDK", d: "O SDK não tem build para todas as plataformas e HTTP puro é muito mais fácil de debugar." },
      { t: "Camadas separadas", d: "Bootstrap, layout, lógica de tela e dados em arquivos diferentes. Deu pra iterar sem quebrar o resto." },
      { t: "Build Android sem máquina virtual", d: "O curso pedia VirtualBox. Aqui o APK sai de uma imagem Docker rodando no GitHub Actions." },
    ],
    bugs: [
      { t: "Perda de dados entre dispositivos", d: "O app gravava a coleção inteira a partir da memória local e apagava o que só existia no servidor. Passou a gravar registro por registro." },
      { t: "Firebase devolvendo array com null", d: "Com chaves numéricas sequenciais o nó vira lista com buracos. Uma função normaliza os dois formatos." },
      { t: "Race condition no Kivy", d: "A primeira tela disparava antes dos ids existirem. Entrou checagem e reagendamento para o próximo frame." },
    ],
    resultado: [
      "Funciona sem internet e sincroniza depois",
      "APK publicado como release no GitHub",
    ],
  },
];

const FERRAMENTAS = [
  {
    categoria: "CRM e operação comercial",
    itens: [
      { nomes: ["HubSpot", "RD Station", "Pipedrive", "Agendor", "Pipefy"], contexto: "Gestão do CRM de ponta a ponta: pipelines, fluxos e automações, propriedades, marketing, temperatura de conta, lead score e integração com WhatsApp." },
      { nomes: ["ZoomInfo", "Apollo"], contexto: "Prospecção e enriquecimento de contas." },
      { nomes: ["Salesbud"], contexto: "Prompts que avaliam calls comerciais por dimensão e mandam a nota para o CRM." },
    ],
  },
  {
    categoria: "BI e visualização",
    itens: [
      { nomes: ["Power BI"], contexto: "Mais de 20 dashboards construídos. DAX, modelagem estrela, parâmetros What-if e assistente de IA no relatório." },
      { nomes: ["Looker Studio"], contexto: "Relatórios rápidos ligados a Google Sheets e BigQuery." },
      { nomes: ["HTML", "Chart.js", "Leaflet", "Plotly"], contexto: "Dashboards leves, sem licença, publicados no GitHub Pages." },
    ],
  },
  {
    categoria: "Automação e integração",
    itens: [
      { nomes: ["Make"], contexto: "Integração entre CRM, planilhas e IA. Categorização de feedback e envio de notas de calls para o CRM." },
      { nomes: ["n8n"], contexto: "Self-hosted em Docker. Pipelines de dados com tratamento de erro dentro do fluxo." },
      { nomes: ["Google Apps Script"], contexto: "Coletas agendadas, cálculos em planilha e busca de municípios por distância rodoviária." },
      { nomes: ["Power Automate"], contexto: "Fluxos dentro do ecossistema Microsoft." },
    ],
  },
  {
    categoria: "Dados e engenharia",
    itens: [
      { nomes: ["SQL"], contexto: "Do staging no dbt às views e constraints no Postgres." },
      { nomes: ["Python"], contexto: "pandas, APIs e ETL. Mais de 14 automações com dados públicos de educação." },
      { nomes: ["BigQuery", "dbt"], contexto: "Warehouse e transformação em camadas." },
      { nomes: ["Supabase", "Firebase"], contexto: "Banco, autenticação e Row Level Security para apps pequenos." },
      { nomes: ["GitHub Actions"], contexto: "Agendamento de pipelines e build de APK." },
    ],
  },
  {
    categoria: "IA aplicada",
    itens: [
      { nomes: ["Claude", "ChatGPT", "Gemini"], contexto: "Processos com LLM no dia a dia: categorização de texto, curadoria com revisão humana, análise de dados e leitura de transcrições." },
      { nomes: ["Prompt engineering"], contexto: "Prompts calibrados para sair num formato que o CRM e as automações conseguem ler." },
    ],
  },
];

const SOBRE = {
  texto: [
    "Sou o Daniel, mas todo mundo me chama de Dani. Hoje trabalho como Revenue Operations na Letrus, numa operação comercial que vende para o setor público. No dia a dia cuido de indicadores, dashboards para a diretoria, governança do HubSpot e dos pipelines de dados que alimentam o CRM.",
    "Comecei como estagiário na B2Card e fui parar em Sales Ops. Depois passei por BI, analytics e automação, em operações B2B, B2C e B2G. Mudam os processos, mas o trabalho é parecido: organizar o CRM, medir o que importa e automatizar o que dá. Estou na pós em Análise de Dados e IA e o caminho que quero seguir é engenharia de dados e analytics engineering.",
  ],
  trajetoria: ["Letrus", "Comunica.In", "Rocketseat", "Grupo Livemed", "Aceleradora WebFit", "B2Card"],
  formacao: [
    "Pós em Análise de Dados e IA (cursando)",
    "Gestão Comercial, Senac Minas",
    "Certificações em Power BI, Python, n8n, Make, Microsoft Fabric e Estatística Aplicada",
  ],
  gostos: [
    { icone: "galo", cor: "galo", titulo: "Galo", texto: "Atleticano. Isso já diz bastante sobre paciência." },
    { icone: "trevo", cor: "celtics", titulo: "Boston Celtics", texto: "Meu time na NBA. O dashboard de NBA aqui do portfólio nasceu disso." },
    { icone: "urso", cor: "bears", titulo: "Chicago Bears", texto: "Meu time na NFL." },
    { icone: "tv", cor: "series", titulo: "Séries", texto: "Sopranos, Breaking Bad, Better Call Saul e Peaky Blinders." },
    { icone: "caneca", cor: "fora", titulo: "Fora da tela", texto: "Academia, cerveja artesanal, samba e jogo do Galo." },
  ],
};
