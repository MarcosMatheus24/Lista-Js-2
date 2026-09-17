
    // Banco de Dados das 50 Questões
    const EXERCISES = [
      // ---------------- BLOCO I: CONDICIONAIS (1 - 17) ----------------
      {
        id: 1,
        block: "I",
        title: "Classificação de Consumo Elétrico",
        description: "Recebe o consumo mensal em kWh e enquadra a residência em faixas com mensagens educativas de orientação.",
        restrictions: "Trate valores negativos/inválidos e defina no mínimo 4 faixas.",
        inputs: [
          { name: "kwh", label: "Consumo Mensal (kWh)", type: "number", value: 280 }
        ],
        run: (data) => {
          const kwh = parseFloat(data.kwh);
          if (isNaN(kwh) || kwh < 0) return { error: "Erro: Informe um consumo mensal válido e positivo." };
          let faixa = "", orientação = "";
          if (kwh <= 100) {
            faixa = "Faixa A - Consumo Baixo (até 100 kWh)";
            orientação = "Parabéns! Sua residência possui um excelente nível de eficiência energética.";
          } else if (kwh <= 200) {
            faixa = "Faixa B - Consumo Moderado (101 a 200 kWh)";
            orientação = "Consumo dentro do padrão residencial médio. Mantenha os aparelhos fora da tomada em stand-by.";
          } else if (kwh <= 400) {
            faixa = "Faixa C - Consumo Alto (201 a 400 kWh)";
            orientação = "Atenção: Consumo elevado. Evite banhos demorados no chuveiro elétrico e otimize o uso do ar-condicionado.";
          } else {
            faixa = "Faixa D - Consumo Crítico (Acima de 400 kWh)";
            orientação = "Alerta Vermelho! Consumo muito alto. Recomendamos auditoria nos eletrodomésticos e verificação da instalação.";
          }
          return `📊 CLASSIFICAÇÃO ENERGÉTICA\n-----------------------------\nConsumo Registrado: ${kwh} kWh\nClassificação: ${faixa}\nOrientação: ${orientação}`;
        },
        code: `function exercicio01(kwh) {
  if (isNaN(kwh) || kwh < 0) return "Entrada inválida";
  if (kwh <= 100) return "Baixo Consumo - Excelente eficiência";
  else if (kwh <= 200) return "Consumo Moderado - Dentro da média";
  else if (kwh <= 400) return "Consumo Alto - Atenção com gastos";
  else return "Consumo Crítico - Necessita auditoria";
}`
      },
      {
        id: 2,
        block: "I",
        title: "Elegibilidade para Bolsa Acadêmica",
        description: "Avalia a elegibilidade baseando-se em média geral, frequência percentual e renda familiar per capita.",
        restrictions: "Relate exatamente quais critérios impediram a concessão da bolsa.",
        inputs: [
          { name: "media", label: "Média Geral (0-10)", type: "number", value: 8.5 },
          { name: "freq", label: "Frequência (%)", type: "number", value: 80 },
          { name: "renda", label: "Renda Per Capita (R$)", type: "number", value: 1800 }
        ],
        run: (data) => {
          const media = parseFloat(data.media);
          const freq = parseFloat(data.freq);
          const renda = parseFloat(data.renda);
          if (isNaN(media) || media < 0 || media > 10 || isNaN(freq) || freq < 0 || freq > 100 || isNaN(renda) || renda < 0) {
            return { error: "Erro: Insira notas (0-10), frequência (0-100%) e renda válidas." };
          }
          const impedimentos = [];
          if (media < 8.0) impedimentos.push(`Média insatisfatória (${media} < 8.0)`);
          if (freq < 75.0) impedimentos.push(`Frequência insuficiente (${freq}% < 75%)`);
          if (renda > 2118) impedimentos.push(`Renda acima do limite de R$ 2.118,00 (R$ ${renda.toFixed(2)})`);

          if (impedimentos.length === 0) {
            return `🎓 RESULTADO: ELEGÍVEL À BOLSA ACADÊMICA\n---------------------------------------\nO estudante atendeu a todos os requisitos com sucesso.`;
          } else if (media >= 7.5 && freq >= 75 && renda <= 2500) {
            return `🎓 RESULTADO: NECESSITA ANÁLISE COMPLEMENTAR\n-----------------------------------------------\nMotivos para análise:\n- ` + impedimentos.join("\n- ");
          } else {
            return `🎓 RESULTADO: NÃO ELEGÍVEL\n--------------------------\nCritérios não atendidos:\n- ` + impedimentos.join("\n- ");
          }
        },
        code: `function exercicio02(media, freq, renda) {
  const reprovadoMedia = media < 8.0;
  const reprovadoFreq = freq < 75.0;
  const reprovadoRenda = renda > 2118.0;

  if (!reprovadoMedia && !reprovadoFreq && !reprovadoRenda) return "Elegível";
  if (media >= 7.5 && freq >= 75) return "Análise Complementar";
  return "Não Elegível";
}`
      },
      {
        id: 3,
        block: "I",
        title: "Triagem de Prioridade em Atendimento",
        description: "Classifica a prioridade em Alta, Média ou Baixa de acordo com idade e condição especial informada.",
        restrictions: "Valide idades negativas ou irreais (ex: > 120 anos).",
        inputs: [
          { name: "idade", label: "Idade", type: "number", value: 68 },
          { name: "prioritario", label: "Possui Condição Especial/Gestante/Deficiência?", type: "select", options: ["Não", "Sim"], value: "Não" }
        ],
        run: (data) => {
          const idade = parseInt(data.idade);
          const prioritario = data.prioritario === "Sim";
          if (isNaN(idade) || idade < 0 || idade > 120) return { error: "Erro: Idade deve estar entre 0 e 120 anos." };

          let nivel = "";
          if (idade >= 80 || (idade >= 60 && prioritario)) {
            nivel = "NÍVEL 1 - PRIORIDADE MÁXIMA / SUPERPRIORIDADE";
          } else if (idade >= 60 || prioritario) {
            nivel = "NÍVEL 2 - PRIORIDADE MODERADA";
          } else {
            nivel = "NÍVEL 3 - ATENDIMENTO REGULAR";
          }
          return `🏥 TRIAGEM DE ATENDIMENTO\n-----------------------\nIdade: ${idade} anos\nCondição Especial: ${prioritario ? 'Sim' : 'Não'}\nClassificação: ${nivel}`;
        },
        code: `function exercicio03(idade, prioritario) {
  if (idade < 0 || idade > 120) return "Idade inválida";
  if (idade >= 80 || (idade >= 60 && prioritario)) return "Prioridade Máxima";
  if (idade >= 60 || prioritario) return "Prioridade Moderada";
  return "Atendimento Regular";
}`
      },
      {
        id: 4,
        block: "I",
        title: "Autorização de Acesso a Laboratório",
        description: "Informa se o acesso ao laboratório é concedido e, em caso de recusa, discrimina os motivos.",
        restrictions: "Utilize operador AND para as condições principais e liste pendências.",
        inputs: [
          { name: "matricula", label: "Matrícula Ativa?", type: "select", options: ["Sim", "Não"], value: "Sim" },
          { name: "treinamento", label: "Treinamento Concluído?", type: "select", options: ["Sim", "Não"], value: "Não" },
          { name: "horario", label: "Horário Permitido (8h-22h)?", type: "select", options: ["Sim", "Não"], value: "Sim" }
        ],
        run: (data) => {
          const mat = data.matricula === "Sim";
          const trei = data.treinamento === "Sim";
          const hor = data.horario === "Sim";

          if (mat && trei && hor) {
            return "🔑 ACESSO AUTORIZADO\n--------------------\nBem-vindo ao Laboratório de Informática!";
          }
          const recusas = [];
          if (!hor) recusas.push("Recusa por Horário: Fora do expediente permitido.");
          if (!mat) recusas.push("Recusa por Pendência Cadastral: Matrícula inativa.");
          if (!trei) recusas.push("Recusa por Pendência Cadastral: Treinamento de segurança pendente.");

          return `❌ ACESSO NEGADO\n---------------\nMotivos:\n- ` + recusas.join("\n- ");
        },
        code: `function exercicio04(mat, trei, hor) {
  if (mat && trei && hor) return "Autorizado";
  let recusas = [];
  if (!hor) recusas.push("Fora do horário");
  if (!mat || !trei) recusas.push("Pendência cadastral/treinamento");
  return recusas.join(", ");
}`
      },
      {
        id: 5,
        block: "I",
        title: "Cálculo de Tarifa de Estacionamento",
        description: "Calcula a cobrança baseada no tempo com tolerância inicial e regras por faixa de permanência.",
        restrictions: "Impede tempos negativos e define no mínimo 3 faixas de tempo.",
        inputs: [
          { name: "horas", label: "Horas Estacionado", type: "number", value: 3.5 }
        ],
        run: (data) => {
          const h = parseFloat(data.horas);
          if (isNaN(h) || h < 0) return { error: "Erro: Tempo de permanência inválido." };

          let tarifa = 0;
          let categoria = "";
          if (h <= 0.25) { // 15 minutos
            categoria = "Tolerância Inicial (Isento)";
            tarifa = 0;
          } else if (h <= 2) {
            categoria = "Curta Permanência (Tarifa Fixa)";
            tarifa = 10.0;
          } else if (h <= 6) {
            categoria = "Média Permanência (Fixa + Hora Adicional)";
            tarifa = 10.0 + Math.ceil(h - 2) * 5.0;
          } else {
            categoria = "Longa Permanência / Diária";
            tarifa = 35.0;
          }

          return `🚗 COMPROVANTE DE ESTACIONAMENTO\n---------------------------------\nTempo: ${h} horas\nCategoria: ${categoria}\nValor a Pagar: R$ ${tarifa.toFixed(2)}`;
        },
        code: `function exercicio05(horas) {
  if (horas < 0) return "Tempo inválido";
  if (horas <= 0.25) return { cat: "Tolerância", valor: 0 };
  if (horas <= 2) return { cat: "Curta", valor: 10 };
  if (horas <= 6) return { cat: "Média", valor: 10 + (horas-2)*5 };
  return { cat: "Longa", valor: 35 };
}`
      },
      {
        id: 6,
        block: "I",
        title: "Desconto Progressivo em Loja",
        description: "Calcula desconto conforme valor total da compra e participação no programa de fidelidade.",
        restrictions: "Garante que o valor final nunca seja negativo.",
        inputs: [
          { name: "total", label: "Valor Total da Compra (R$)", type: "number", value: 650 },
          { name: "fidelidade", label: "Cliente Fidelidade?", type: "select", options: ["Sim", "Não"], value: "Sim" }
        ],
        run: (data) => {
          const total = parseFloat(data.total);
          const fidelidade = data.fidelidade === "Sim";
          if (isNaN(total) || total <= 0) return { error: "Erro: Valor da compra inválido." };

          let percDesconto = 0;
          if (total < 100) {
            percDesconto = fidelidade ? 5 : 0;
          } else if (total <= 500) {
            percDesconto = fidelidade ? 10 : 5;
          } else {
            percDesconto = fidelidade ? 20 : 10;
          }

          const valorDesconto = total * (percDesconto / 100);
          const valorFinal = Math.max(0, total - valorDesconto);

          return `🛍️ RESUMO DA COMPRA\n--------------------\nValor Original: R$ ${total.toFixed(2)}\nFidelidade: ${fidelidade ? 'Sim (+ bônus)' : 'Não'}\nDesconto Aplicado: ${percDesconto}%\nEconomia: R$ ${valorDesconto.toFixed(2)}\nValor Final: R$ ${valorFinal.toFixed(2)}`;
        },
        code: `function exercicio06(total, fidelidade) {
  if (total <= 0) return "Valor inválido";
  let desc = 0;
  if (total < 100) desc = fidelidade ? 5 : 0;
  else if (total <= 500) desc = fidelidade ? 10 : 5;
  else desc = fidelidade ? 20 : 10;
  
  const vDesc = total * (desc / 100);
  return { desc, final: total - vDesc };
}`
      },
      {
        id: 7,
        block: "I",
        title: "Validação de Nota e Situação Acadêmica",
        description: "Classifica a situação acadêmica em Aprovado, Recuperação, Reprovado por Nota ou Reprovado por Frequência.",
        restrictions: "Valide intervalos de nota (0-10) e frequência (0-100%).",
        inputs: [
          { name: "nota", label: "Nota Final (0-10)", type: "number", value: 5.5 },
          { name: "freq", label: "Frequência (%)", type: "number", value: 80 }
        ],
        run: (data) => {
          const nota = parseFloat(data.nota);
          const freq = parseFloat(data.freq);
          if (isNaN(nota) || nota < 0 || nota > 10 || isNaN(freq) || freq < 0 || freq > 100) {
            return { error: "Erro: Forneça nota entre 0 e 10 e frequência entre 0% e 100%." };
          }

          let situacao = "";
          if (freq < 75) {
            situacao = "REPROVADO POR FREQUÊNCIA (Frequência < 75%)";
          } else if (nota >= 7.0) {
            situacao = "APROVADO DIRETO";
          } else if (nota >= 4.0) {
            situacao = "ELEGÍVEL PARA RECUPERAÇÃO";
          } else {
            situacao = "REPROVADO POR NOTA (Nota < 4.0)";
          }

          return `📚 SITUAÇÃO ACADÊMICA\n---------------------\nNota Final: ${nota.toFixed(1)}\nFrequência: ${freq}%\nSituação: ${situacao}`;
        },
        code: `function exercicio07(nota, freq) {
  if (nota < 0 || nota > 10 || freq < 0 || freq > 100) return "Inválido";
  if (freq < 75) return "Reprovado por Frequência";
  if (nota >= 7.0) return "Aprovado";
  if (nota >= 4.0) return "Recuperação";
  return "Reprovado por Nota";
}`
      },
      {
        id: 8,
        block: "I",
        title: "Escolha de Plano de Internet",
        description: "Recomenda um plano considerando simultaneamente consumo estimado de dados e quantidade de dispositivos.",
        restrictions: "Trate valores zero/negativos e explique a justificativa da recomendação.",
        inputs: [
          { name: "gb", label: "Consumo Estimado (GB)", type: "number", value: 150 },
          { name: "dispositivos", label: "Dispositivos Conectados", type: "number", value: 6 }
        ],
        run: (data) => {
          const gb = parseFloat(data.gb);
          const disp = parseInt(data.dispositivos);
          if (isNaN(gb) || gb <= 0 || isNaN(disp) || disp <= 0) {
            return { error: "Erro: Insira valores positivos para consumo e dispositivos." };
          }

          let plano = "", justificativa = "";
          if (gb <= 50 && disp <= 3) {
            plano = "Plano Básico (100 Mega)";
            justificativa = "Atende ao perfil leve com poucos dispositivos e consumo moderado.";
          } else if (gb <= 200 && disp <= 8) {
            plano = "Plano Família (300 Mega)";
            justificativa = "Ideal para consumo intermediário de dados e múltiplos dispositivos simultâneos.";
          } else {
            plano = "Plano Ultra Gamer/Pro (600 Mega + Fibra)";
            justificativa = "Recomendado para alto volume de tráfego (streaming/jogos) e mais de 8 dispositivos.";
          }

          return `🌐 RECOMENDAÇÃO DE PLANO DE INTERNET\n-----------------------------------\nConsumo: ${gb} GB | Dispositivos: ${disp}\nPlano Indicado: ${plano}\nMotivo: ${justificativa}`;
        },
        code: `function exercicio08(gb, disp) {
  if (gb <= 0 || disp <= 0) return "Valores inválidos";
  if (gb <= 50 && disp <= 3) return "Plano Básico";
  if (gb <= 200 && disp <= 8) return "Plano Família";
  return "Plano Ultra Gamer";
}`
      },
      {
        id: 9,
        block: "I",
        title: "Alerta de Estoque",
        description: "Classifica o estoque em Crítico, Adequado ou Excesso com base no nível mínimo estabelecido.",
        restrictions: "Impeça valores negativos de estoque.",
        inputs: [
          { name: "atual", label: "Estoque Atual", type: "number", value: 15 },
          { name: "minimo", label: "Estoque Mínimo", type: "number", value: 20 }
        ],
        run: (data) => {
          const atual = parseInt(data.atual);
          const minimo = parseInt(data.minimo);
          if (isNaN(atual) || atual < 0 || isNaN(minimo) || minimo <= 0) {
            return { error: "Erro: Quantidades de estoque não podem ser negativas ou nulas." };
          }

          let estado = "", acao = "";
          if (atual < minimo) {
            estado = "CRÍTICO (Abaixo do Mínimo)";
            acao = "Solicitar reposição urgente aos fornecedores para evitar desabastecimento.";
          } else if (atual <= minimo * 2.5) {
            estado = "ADEQUADO (Nível Seguro)";
            acao = "Estoque equilibrado. Nenhuma ação imediata necessária.";
          } else {
            estado = "EXCESSO DE CAPITAL PARADO";
            acao = "Considere promoções ou reavaliação de compras para liberar giro de caixa.";
          }

          return `📦 STATUS DO ESTOQUE\n--------------------\nEstoque Atual: ${atual} | Mínimo: ${minimo}\nClassificação: ${estado}\nRecomendação: ${acao}`;
        },
        code: `function exercicio09(atual, minimo) {
  if (atual < 0 || minimo <= 0) return "Entrada inválida";
  if (atual < minimo) return "Crítico";
  if (atual <= minimo * 2.5) return "Adequado";
  return "Excesso";
}`
      },
      {
        id: 10,
        block: "I",
        title: "Conversor de Temperatura com Validação",
        description: "Classifica a temperatura em Celsius em faixas operacionais antes de converter para Fahrenheit.",
        restrictions: "Valide faixa operacional aceitável (-50°C a 100°C).",
        inputs: [
          { name: "celsius", label: "Temperatura em Celsius (°C)", type: "number", value: 36.5 }
        ],
        run: (data) => {
          const c = parseFloat(data.celsius);
          if (isNaN(c) || c < -50 || c > 100) {
            return { error: "Erro: Temperatura fora do intervalo operacional seguro (-50°C a 100°C)." };
          }

          const f = (c * 9/5) + 32;
          let faixa = "";
          if (c < 0) faixa = "Congelante / Congelamento";
          else if (c <= 15) faixa = "Fria (Atenção ao resfriamento)";
          else if (c <= 28) faixa = "Agradável / Operação Normal";
          else if (c <= 38) faixa = "Aquecida / Atenção";
          else faixa = "Superaquecimento / Risco";

          return `🌡️ CONVERSOR DE TEMPERATURA\n---------------------------\nCelsius: ${c.toFixed(1)} °C\nFahrenheit: ${f.toFixed(1)} °F\nFaixa Operacional: ${faixa}`;
        },
        code: `function exercicio10(c) {
  if (c < -50 || c > 100) return "Fora da faixa operacional";
  const f = (c * 9/5) + 32;
  let faixa = c < 0 ? "Congelante" : c <= 28 ? "Normal" : "Aquecida";
  return { c, f, faixa };
}`
      },
      {
        id: 11,
        block: "I",
        title: "Sistema de Aprovação de Crédito Didático",
        description: "Classifica o pedido de crédito em Aprovado, Pendente ou Recusado avaliando renda, comprometimento e histórico.",
        restrictions: "Utilize condições compostas e fundamente os fatores de decisão.",
        inputs: [
          { name: "renda", label: "Renda Mensal (R$)", type: "number", value: 4500 },
          { name: "comprometimento", label: "% Comprometido da Renda", type: "number", value: 25 },
          { name: "historico", label: "Histórico de Pagamento", type: "select", options: ["Bom", "Regular", "Ruim"], value: "Bom" }
        ],
        run: (data) => {
          const renda = parseFloat(data.renda);
          const comp = parseFloat(data.comprometimento);
          const hist = data.historico;

          if (isNaN(renda) || renda <= 0 || isNaN(comp) || comp < 0 || comp > 100) {
            return { error: "Erro: Insira renda e percentual de comprometimento válidos." };
          }

          let decisao = "", fatores = [];
          if (hist === "Ruim" || comp > 50) {
            decisao = "RECUSADO";
            if (hist === "Ruim") fatores.push("Histórico negativo de restrições");
            if (comp > 50) fatores.push(`Comprometimento de renda excessivo (${comp}%)`);
          } else if (comp <= 30 && hist === "Bom" && renda >= 3000) {
            decisao = "APROVADO AUTOMATICAMENTE";
            fatores.push("Excelente histórico", "Baixo comprometimento de renda", "Renda compativel");
          } else {
            decisao = "PENDENTE DE ANÁLISE HUMANA";
            fatores.push("Parâmetros em faixa intermediária que exigem verificação de comprovantes");
          }

          return `💳 ANÁLISE DE CRÉDITO\n--------------------\nRenda: R$ ${renda.toFixed(2)} | Comprometimento: ${comp}%\nHistórico: ${hist}\nResultado: ${decisao}\nFatores Determinantes:\n- ` + fatores.join("\n- ");
        },
        code: `function exercicio11(renda, comp, hist) {
  if (hist === "Ruim" || comp > 50) return "Recusado";
  if (comp <= 30 && hist === "Bom" && renda >= 3000) return "Aprovado";
  return "Pendente de Análise";
}`
      },
      {
        id: 12,
        block: "I",
        title: "Controle de Velocidade em Via Simulada",
        description: "Avalia a velocidade do veículo em relação ao limite da via e classifica o excesso em faixas.",
        restrictions: "Crie pelo menos 3 níveis de excesso além da condição regular.",
        inputs: [
          { name: "vel", label: "Velocidade Registrada (km/h)", type: "number", value: 88 },
          { name: "limite", label: "Limite da Via (km/h)", type: "number", value: 70 }
        ],
        run: (data) => {
          const vel = parseFloat(data.vel);
          const limite = parseFloat(data.limite);
          if (isNaN(vel) || vel < 0 || isNaN(limite) || limite <= 0) return { error: "Erro: Velocidade ou limite inválidos." };

          if (vel <= limite) {
            return `🚘 RADAR DE VELOCIDADE\n----------------------\nVelocidade: ${vel} km/h (Limite: ${limite} km/h)\nSituação: VELOCIDADE ADEQUADA (Sem infração)`;
          }

          const ex = vel - limite;
          const perc = (ex / limite) * 100;
          let nivel = "";

          if (perc <= 20) {
            nivel = "Infração Leve/Média (Excesso de até 20%)";
          } else if (perc <= 50) {
            nivel = "Infração Grave (Excesso entre 20% e 50%)";
          } else {
            nivel = "Infração Gravíssima (Excesso acima de 50% - Risco de Suspensão)";
          }

          return `⚠️ ALERTA DE INFRAÇÃO\n--------------------\nVelocidade: ${vel} km/h | Limite: ${limite} km/h\nExcesso Absoluto: +${ex.toFixed(1)} km/h (+${perc.toFixed(1)}%)\nGravidade: ${nivel}`;
        },
        code: `function exercicio12(vel, limite) {
  if (vel <= limite) return "Velocidade Adequada";
  const perc = ((vel - limite) / limite) * 100;
  if (perc <= 20) return "Excesso Leve (Até 20%)";
  if (perc <= 50) return "Excesso Grave (20% a 50%)";
  return "Excesso Gravíssimo (Acima de 50%)";
}`
      },
      {
        id: 13,
        block: "I",
        title: "Avaliação de Desempenho de Servidor",
        description: "Mede o estado do servidor (Normal, Atenção ou Crítico) pela combinação de uso de CPU e Memória.",
        restrictions: "Valide percentuais entre 0 e 100 e utilize operadores AND e OR.",
        inputs: [
          { name: "cpu", label: "Uso de CPU (%)", type: "number", value: 88 },
          { name: "ram", label: "Uso de Memória RAM (%)", type: "number", value: 92 }
        ],
        run: (data) => {
          const cpu = parseFloat(data.cpu);
          const ram = parseFloat(data.ram);
          if (isNaN(cpu) || cpu < 0 || cpu > 100 || isNaN(ram) || ram < 0 || ram > 100) {
            return { error: "Erro: CPU e Memória devem ser valores entre 0% e 100%." };
          }

          let estado = "", justificativa = "";
          if (cpu >= 95 || ram >= 95 || (cpu >= 85 && ram >= 85)) {
            estado = "🚨 ESTADO CRÍTICO";
            justificativa = "Gargalo severo detectado. Risco de esgotamento de recursos e queda de serviços.";
          } else if (cpu >= 70 || ram >= 70) {
            estado = "⚠️ ESTADO DE ATENÇÃO";
            justificativa = "Pico elevado em pelo menos um dos recursos do servidor.";
          } else {
            estado = "✅ ESTADO NORMAL";
            justificativa = "Servidor operando em níveis seguros de carga.";
          }

          return `🖥️ MONITORAMENTO DE SERVIDOR\n----------------------------\nCPU: ${cpu}% | RAM: ${ram}%\nStatus: ${estado}\nJustificativa: ${justificativa}`;
        },
        code: `function exercicio13(cpu, ram) {
  if (cpu < 0 || cpu > 100 || ram < 0 || ram > 100) return "Inválido";
  if (cpu >= 95 || ram >= 95 || (cpu >= 85 && ram >= 85)) return "Crítico";
  if (cpu >= 70 || ram >= 70) return "Atenção";
  return "Normal";
}`
      },
      {
        id: 14,
        block: "I",
        title: "Validação de Triângulo",
        description: "Valida primeiro se três lados satisfazem a desigualdade triangular para depois classificá-los.",
        restrictions: "Trate medidas nulas/negativas e classifique em Equilátero, Isósceles ou Escaleno.",
        inputs: [
          { name: "a", label: "Lado A", type: "number", value: 5 },
          { name: "b", label: "Lado B", type: "number", value: 5 },
          { name: "c", label: "Lado C", type: "number", value: 8 }
        ],
        run: (data) => {
          const a = parseFloat(data.a);
          const b = parseFloat(data.b);
          const c = parseFloat(data.c);

          if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
            return { error: "Erro: Todos os lados devem ser estritamente positivos." };
          }

          // Validação da Desigualdade Triangular
          if (a + b <= c || a + c <= b || b + c <= a) {
            return `❌ NÃO É UM TRIÂNGULO\n---------------------\nAs medidas (${a}, ${b}, ${c}) violam a regra da desigualdade triangular (a soma de dois lados deve ser maior que o terceiro).`;
          }

          let tipo = "";
          if (a === b && b === c) {
            tipo = "EQUILÁTERO (Todos os 3 lados iguais)";
          } else if (a === b || b === c || a === c) {
            tipo = "ISÓSCELES (2 lados iguais e 1 diferente)";
          } else {
            tipo = "ESCALENO (Todos os 3 lados diferentes)";
          }

          return `📐 VALIDAÇÃO GEOMÉTRICA\n-----------------------\nLados: A=${a}, B=${b}, C=${c}\nStatus: Triângulo Válido\nClassificação: ${tipo}`;
        },
        code: `function exercicio14(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return "Lados inválidos";
  if (a + b <= c || a + c <= b || b + c <= a) return "Não é triângulo";
  if (a === b && b === c) return "Equilátero";
  if (a === b || b === c || a === c) return "Isósceles";
  return "Escaleno";
}`
      },
      {
        id: 15,
        block: "I",
        title: "Cálculo de Imposto em Faixas Simuladas",
        description: "Calcula o imposto devido sobre a renda utilizando um modelo progressivo de 4 faixas.",
        restrictions: "Apresente a alíquota marginal e o cálculo final claro.",
        inputs: [
          { name: "renda", label: "Renda Bruta (R$)", type: "number", value: 5200 }
        ],
        run: (data) => {
          const renda = parseFloat(data.renda);
          if (isNaN(renda) || renda < 0) return { error: "Erro: Renda não pode ser negativa." };

          let imposto = 0, faixa = "", aliquotaEfetiva = 0;

          if (renda <= 2000) {
            faixa = "Faixa 1 - Isento";
            imposto = 0;
          } else if (renda <= 4000) {
            faixa = "Faixa 2 - Alíquota de 7.5%";
            imposto = (renda - 2000) * 0.075;
          } else if (renda <= 7000) {
            faixa = "Faixa 3 - Alíquota de 15%";
            imposto = (2000 * 0.075) + ((renda - 4000) * 0.15);
          } else {
            faixa = "Faixa 4 - Alíquota de 22.5%";
            imposto = (2000 * 0.075) + (3000 * 0.15) + ((renda - 7000) * 0.225);
          }

          aliquotaEfetiva = renda > 0 ? (imposto / renda) * 100 : 0;

          return `💵 CÁLCULO DE IMPOSTO PROGRESSIVO\n----------------------------------\nRenda Declarada: R$ ${renda.toFixed(2)}\nFaixa Enquadrada: ${faixa}\nImposto Devido: R$ ${imposto.toFixed(2)}\nAlíquota Efetiva Real: ${aliquotaEfetiva.toFixed(2)}%`;
        },
        code: `function exercicio15(renda) {
  if (renda <= 2000) return { faixa: "Isento", imposto: 0 };
  let imp = 0;
  if (renda <= 4000) imp = (renda - 2000) * 0.075;
  else if (renda <= 7000) imp = (2000 * 0.075) + (renda - 4000) * 0.15;
  else imp = (2000 * 0.075) + (3000 * 0.15) + (renda - 7000) * 0.225;
  return { faixa: "Progressiva", imposto: imp };
}`
      },
      {
        id: 16,
        block: "I",
        title: "Classificação de Índice de Qualidade",
        description: "Converte o índice numérico (0 a 100) em nível textual com mensagens de atenção nos limites de faixas.",
        restrictions: "Valide o intervalo 0-100 e trate os valores limiares exatos (ex: 20, 40, 60, 80, 100).",
        inputs: [
          { name: "indice", label: "Índice de Qualidade (0-100)", type: "number", value: 80 }
        ],
        run: (data) => {
          const idx = parseFloat(data.indice);
          if (isNaN(idx) || idx < 0 || idx > 100) return { error: "Erro: O índice de qualidade deve estar entre 0 e 100." };

          let classe = "", notaLimite = "";
          if (idx === 0 || idx === 20 || idx === 40 || idx === 60 || idx === 80 || idx === 100) {
            notaLimite = `⚠️ Nota de Fronteira: O valor registrado (${idx}) está no limite exato da transição de faixa!`;
          }

          if (idx <= 20) classe = "Nível 1 - Péssimo / Crítico";
          else if (idx <= 40) classe = "Nível 2 - Inadequado / Ruim";
          else if (idx <= 60) classe = "Nível 3 - Aceitável / Regular";
          else if (idx <= 80) classe = "Nível 4 - Bom / Elevado";
          else classe = "Nível 5 - Excelente / Excelência";

          return `🏆 ÍNDICE DE QUALIDADE INSTITUCIONAL\n-------------------------------------\nÍndice: ${idx} / 100\nClassificação: ${classe}\n${notaLimite}`;
        },
        code: `function exercicio16(idx) {
  if (idx < 0 || idx > 100) return "Fora do intervalo";
  let lim = (idx % 20 === 0) ? " [Limite Exato de Faixa]" : "";
  if (idx <= 20) return "Péssimo" + lim;
  if (idx <= 40) return "Inadequado" + lim;
  if (idx <= 60) return "Aceitável" + lim;
  if (idx <= 80) return "Bom" + lim;
  return "Excelente" + lim;
}`
      },
      {
        id: 17,
        block: "I",
        title: "Regras de Frete de Comércio Eletrônico",
        description: "Determina política de frete (grátis, com desconto ou integral) segundo região, valor e clube VIP.",
        restrictions: "Considere no mínimo 3 regiões de entrega.",
        inputs: [
          { name: "regiao", label: "Região de Entrega", type: "select", options: ["Sudeste", "Sul", "Outras Regiões"], value: "Sudeste" },
          { name: "valor", label: "Valor da Compra (R$)", type: "number", value: 220 },
          { name: "clube", label: "Membro Clube de Benefícios?", type: "select", options: ["Sim", "Não"], value: "Sim" }
        ],
        run: (data) => {
          const regiao = data.regiao;
          const valor = parseFloat(data.valor);
          const clube = data.clube === "Sim";

          if (isNaN(valor) || valor < 0) return { error: "Erro: Valor da compra inválido." };

          let freteBase = 0;
          if (regiao === "Sudeste") freteBase = 20.0;
          else if (regiao === "Sul") freteBase = 30.0;
          else freteBase = 50.0;

          let freteFinal = freteBase;
          let regra = "";

          if (valor >= 300 || (clube && valor >= 150)) {
            freteFinal = 0;
            regra = "Isenção de Frete (Gratuito por meta de compra ou Clube VIP)";
          } else if (clube) {
            freteFinal = freteBase * 0.5;
            regra = "Desconto de 50% no Frete (Benefício Clube VIP)";
          } else {
            freteFinal = freteBase;
            regra = "Tarifa de Frete Integral Padronizada";
          }

          return `🚚 CÁLCULO DE FRETE E-COMMERCE\n-------------------------------\nRegião: ${regiao} | Valor Compra: R$ ${valor.toFixed(2)}\nStatus Clube VIP: ${clube ? 'Sim' : 'Não'}\nPolítica Aplicada: ${regra}\nValor Final do Frete: R$ ${freteFinal.toFixed(2)}`;
        },
        code: `function exercicio17(regiao, valor, clube) {
  let base = regiao === "Sudeste" ? 20 : regiao === "Sul" ? 30 : 50;
  if (valor >= 300 || (clube && valor >= 150)) return { frete: 0, regra: "Grátis" };
  if (clube) return { frete: base * 0.5, regra: "50% Desconto" };
  return { frete: base, regra: "Integral" };
}`
      },

      // ---------------- BLOCO II: REPETIÇÃO (18 - 34) ----------------
      {
        id: 18,
        block: "II",
        title: "Monitoramento Semanal de Consumo",
        description: "Processa os 7 registros diários de consumo para calcular total, média e extremos sem funções de máximo/mínimo.",
        restrictions: "PROIBIDO o uso de Math.max() ou Math.min().",
        inputs: [
          { name: "dias", label: "Consumo de 7 dias (kWh separados por vírgula)", type: "text", value: "12, 15, 8, 22, 19, 14, 10" },
          { name: "meta", label: "Meta Diária de Consumo (kWh)", type: "number", value: 15 }
        ],
        run: (data) => {
          const arrStr = data.dias.split(",");
          if (arrStr.length < 7) return { error: "Erro: Insira exatamente 7 valores numéricos para os 7 dias." };
          
          let total = 0, diasAcimaMeta = 0;
          let maior = -1, menor = 999999;
          const meta = parseFloat(data.meta) || 15;

          for (let i = 0; i < 7; i++) {
            const val = parseFloat(arrStr[i]);
            if (isNaN(val) || val < 0) return { error: `Erro: O valor do dia ${i+1} é inválido.` };
            total += val;
            if (val > meta) diasAcimaMeta++;

            // Busca manual sem Math.max/min
            if (val > maior) maior = val;
            if (val < menor) menor = val;
          }

          const media = total / 7;
          return `📈 MONITORAÇÃO SEMANAL ENERGÉTICA\n-----------------------------------\nConsumo Total da Semana: ${total.toFixed(1)} kWh\nMédia Diária: ${media.toFixed(2)} kWh\nDias com consumo acima da meta (${meta} kWh): ${diasAcimaMeta} dia(s)\nMaior Consumo Diário: ${maior} kWh (Loop manual)\nMenor Consumo Diário: ${menor} kWh (Loop manual)`;
        },
        code: `function exercicio18(vetor7Dias, meta) {
  let total = 0, maior = vetor7Dias[0], menor = vetor7Dias[0], acima = 0;
  for (let i = 0; i < 7; i++) {
    let v = vetor7Dias[i];
    total += v;
    if (v > meta) acima++;
    if (v > maior) maior = v; // Sem Math.max
    if (v < menor) menor = v; // Sem Math.min
  }
  return { total, media: total/7, maior, menor, acima };
}`
      },
      {
        id: 19,
        block: "II",
        title: "Tabuada Personalizada",
        description: "Gera a tabuada de um número até um limite configurável com laço de repetição.",
        restrictions: "Utilize for e formate cada linha como expressão matemática completa.",
        inputs: [
          { name: "num", label: "Número para Tabuada", type: "number", value: 7 },
          { name: "limite", label: "Limite de Multiplicação", type: "number", value: 10 }
        ],
        run: (data) => {
          const num = parseInt(data.num);
          const lim = parseInt(data.limite);
          if (isNaN(num) || isNaN(lim) || lim <= 0) return { error: "Erro: Insira número e limite válidos (limite > 0)." };

          let tabuada = `📐 TABUADA DO ${num} (até ${lim})\n----------------------------\n`;
          for (let i = 1; i <= lim; i++) {
            tabuada += `${num}  x  ${i.toString().padStart(2, ' ')}  =  ${num * i}\n`;
          }
          return tabuada;
        },
        code: `function exercicio19(num, limite) {
  let resultado = [];
  for (let i = 1; i <= limite; i++) {
    resultado.push(\`\${num} x \${i} = \${num * i}\`);
  }
  return resultado.join("\\n");
}`
      },
      {
        id: 20,
        block: "II",
        title: "Contagem Regressiva de Lançamento",
        description: "Exibe contagem decrescente a partir de um valor inicial inteiro até zero.",
        restrictions: "Valide se o número inicial é inteiro e positivo.",
        inputs: [
          { name: "inicio", label: "Tempo Inicial (Segundos)", type: "number", value: 5 }
        ],
        run: (data) => {
          const inicio = parseInt(data.inicio);
          if (isNaN(inicio) || inicio <= 0) return { error: "Erro: O tempo inicial deve ser um número inteiro positivo." };

          let passos = "🚀 SIMULADOR DE LANÇAMENTO\n---------------------------\n";
          for (let t = inicio; t >= 0; t--) {
            if (t === 0) {
              passos += "T-00: 💥 DECOLAGEM E LANÇAMENTO EFETUADO COM SUCESSO!";
            } else {
              passos += `T-${t.toString().padStart(2, '0')} segundos...\n`;
            }
          }
          return passos;
        },
        code: `function exercicio20(inicio) {
  if (inicio <= 0 || !Number.isInteger(inicio)) return "Inválido";
  let log = "";
  for (let i = inicio; i >= 0; i--) {
    log += i === 0 ? "🚀 Lançamento!" : \`\${i}... \`;
  }
  return log;
}`
      },
      {
        id: 21,
        block: "II",
        title: "Soma de Valores até Condição de Parada",
        description: "Acumula os valores de vendas digitadas até encontrar o valor sentinela (ex: -1).",
        restrictions: "Evite divisão por zero ao calcular a média e utilize laço indeterminado.",
        inputs: [
          { name: "vendas", label: "Sequência de Vendas (encerrando com -1)", type: "text", value: "150.50, 80.00, 200.00, 45.90, -1" }
        ],
        run: (data) => {
          const arr = data.vendas.split(",").map(s => parseFloat(s.trim()));
          let i = 0;
          let total = 0;
          let qtd = 0;
          const sentinela = -1;

          while (i < arr.length) {
            const v = arr[i];
            if (v === sentinela) break;
            if (!isNaN(v) && v >= 0) {
              total += v;
              qtd++;
            }
            i++;
          }

          const media = qtd > 0 ? (total / qtd) : 0;
          return `💰 RESUMO DAS VENDAS REGISTRADAS\n---------------------------------\nVendas Válidas Processadas: ${qtd}\nTotal Acumulado: R$ ${total.toFixed(2)}\nMédia por Venda: R$ ${media.toFixed(2)}`;
        },
        code: `function exercicio21(valores, sentinela = -1) {
  let total = 0, qtd = 0, idx = 0;
  while (idx < valores.length && valores[idx] !== sentinela) {
    if (valores[idx] >= 0) {
      total += valores[idx];
      qtd++;
    }
    idx++;
  }
  return { qtd, total, media: qtd > 0 ? total/qtd : 0 };
}`
      },
      {
        id: 22,
        block: "II",
        title: "Tentativas de Autenticação",
        description: "Controla o acesso com número máximo de tentativas de senha antes de bloquear.",
        restrictions: "Encerre o laço imediatamente após o acerto.",
        inputs: [
          { name: "senhaCorreta", label: "Senha Cadastrada", type: "text", value: "1234" },
          { name: "tentativas", label: "Tentativas Digitadas (separadas por vírgula)", type: "text", value: "0000, 1111, 1234" }
        ],
        run: (data) => {
          const correta = data.senhaCorreta;
          const tentArr = data.tentativas.split(",").map(s => s.trim());
          const maxTentativas = 3;
          let desbloqueado = false;
          let usadas = 0;

          for (let i = 0; i < tentArr.length && i < maxTentativas; i++) {
            usadas++;
            if (tentArr[i] === correta) {
              desbloqueado = true;
              break; // Encerra imediatamente no acerto
            }
          }

          if (desbloqueado) {
            return `🔓 AUTENTICAÇÃO BEM-SUCEDIDA\n---------------------------\nAcesso liberado na ${usadas}ª tentativa.`;
          } else {
            return `🔒 ACESSO BLOQUEADO\n--------------------\nLimite de ${maxTentativas} tentativas excedido sem sucesso.`;
          }
        },
        code: `function exercicio22(senhaCadastrada, listaTentativas) {
  const max = 3;
  let usou = 0, ok = false;
  for (let i = 0; i < listaTentativas.length && i < max; i++) {
    usou++;
    if (listaTentativas[i] === senhaCadastrada) {
      ok = true;
      break;
    }
  }
  return ok ? \`Acesso OK na \${usou}ª tentativa\` : "Bloqueado";
}`
      },
      {
        id: 23,
        block: "II",
        title: "Sequência de Números Pares e Ímpares",
        description: "Percorre um intervalo numérico fornecido e contabiliza/soma os pares e ímpares.",
        restrictions: "Corrija automaticamente se o limite inicial for maior que o final.",
        inputs: [
          { name: "inicio", label: "Limite Inicial", type: "number", value: 10 },
          { name: "fim", label: "Limite Final", type: "number", value: 1 }
        ],
        run: (data) => {
          let ini = parseInt(data.inicio);
          let fim = parseInt(data.fim);
          if (isNaN(ini) || isNaN(fim)) return { error: "Erro: Forneça números inteiros válidos." };

          let observacao = "";
          if (ini > fim) {
            const temp = ini;
            ini = fim;
            fim = temp;
            observacao = "(Aviso: O início era maior que o fim; os valores foram invertidos automaticamente)\n";
          }

          let qtdPares = 0, somaPares = 0;
          let qtdImpares = 0, somaImpares = 0;

          for (let i = ini; i <= fim; i++) {
            if (i % 2 === 0) {
              qtdPares++;
              somaPares += i;
            } else {
              qtdImpares++;
              somaImpares += i;
            }
          }

          return `🔢 ANÁLISE DO INTERVALO [${ini} até ${fim}]\n---------------------------------------\n${observacao}Pares  -> Quantidade: ${qtdPares} | Soma: ${somaPares}\nÍmpares -> Quantidade: ${qtdImpares} | Soma: ${somaImpares}`;
        },
        code: `function exercicio23(inicio, fim) {
  if (inicio > fim) [inicio, fim] = [fim, inicio]; // Ajusta inverter
  let qPar = 0, sPar = 0, qImp = 0, sImp = 0;
  for (let i = inicio; i <= fim; i++) {
    if (i % 2 === 0) { qPar++; sPar += i; }
    else { qImp++; sImp += i; }
  }
  return { qPar, sPar, qImp, sImp };
}`
      },
      {
        id: 24,
        block: "II",
        title: "Fatorial com Validação",
        description: "Calcula o fatorial de um número não negativo com laço multiplicativo iterativo.",
        restrictions: "PROIBIDO o uso de bibliotecas matemáticas para produto. Trate o caso especial 0! = 1.",
        inputs: [
          { name: "num", label: "Número Inteiro Não Negativo", type: "number", value: 5 }
        ],
        run: (data) => {
          const n = parseInt(data.num);
          if (isNaN(n) || n < 0) return { error: "Erro: Não é possível calcular o fatorial de números negativos ou inválidos." };

          if (n === 0) {
            return `🧮 RESULTADO DO FATORIAL\n-------------------------\n0! = 1 (Por definição matemática)`;
          }

          let fatorial = 1;
          let passos = [];
          for (let i = n; i >= 1; i--) {
            fatorial *= i;
            passos.push(i);
          }

          return `🧮 RESULTADO DO FATORIAL\n-------------------------\n${n}! = ${passos.join(" × ")} = ${fatorial}`;
        },
        code: `function exercicio24(n) {
  if (n < 0 || !Number.isInteger(n)) return "Não processável";
  if (n === 0) return 1;
  let fat = 1;
  for (let i = 1; i <= n; i++) {
    fat *= i;
  }
  return fat;
}`
      },
      {
        id: 25,
        block: "II",
        title: "Levantamento de Notas de uma Turma",
        description: "Processa as notas dos alunos e gera resumo com média e estatísticas sem utilizar vetores.",
        restrictions: "PROIBIDO o uso de vetores (arrays) nesta solução.",
        inputs: [
          { name: "notasStr", label: "Notas da Turma (separadas por vírgula)", type: "text", value: "8.5, 9.0, 3.5, 6.0, 7.5, 4.0" }
        ],
        run: (data) => {
          const notas = data.notasStr.split(",");
          let totalNotas = 0;
          let qtdEstudantes = 0;
          let aprovados = 0;
          let recuperacao = 0;
          let reprovados = 0;
          let maiorNota = -1;
          let menorNota = 11;

          // Processamento sequencial em variáveis simples sem guardar em array
          for (let i = 0; i < notas.length; i++) {
            const nota = parseFloat(notas[i].trim());
            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
              totalNotas += nota;
              qtdEstudantes++;

              if (nota >= 7.0) aprovados++;
              else if (nota >= 4.0) recuperacao++;
              else reprovados++;

              if (nota > maiorNota) maiorNota = nota;
              if (nota < menorNota) menorNota = nota;
            }
          }

          if (qtdEstudantes === 0) return { error: "Nenhuma nota válida fornecida." };

          const mediaGeral = totalNotas / qtdEstudantes;
          return `📊 RESUMO DA TURMA (Sem uso de Vetores)\n----------------------------------------\nTotal de Alunos: ${qtdEstudantes}\nMédia Geral: ${mediaGeral.toFixed(2)}\nAprovados (≥ 7.0): ${aprovados}\nEm Recuperação (4.0 - 6.9): ${recuperacao}\nReprovados (< 4.0): ${reprovados}\nMaior Nota: ${maiorNota}\nMenor Nota: ${menorNota}`;
        },
        code: `function exercicio25(listaNotasTexto) {
  // Processamento fluxo sem armazenamento em vetor final
  let soma = 0, qtd = 0, ap = 0, rec = 0, rep = 0;
  let maior = -1, menor = 11;
  
  let partes = listaNotasTexto.split(",");
  for (let i = 0; i < partes.length; i++) {
    let nota = parseFloat(partes[i]);
    if (!isNaN(nota)) {
      soma += nota; qtd++;
      if (nota >= 7) ap++; else if (nota >= 4) rec++; else rep++;
      if (nota > maior) maior = nota;
      if (nota < menor) menor = nota;
    }
  }
  return { media: soma/qtd, ap, rec, rep, maior, menor };
}`
      },
      {
        id: 26,
        block: "II",
        title: "Simulação de Crescimento de Investimento",
        description: "Simula mês a mês a evolução financeira até atingir o montante alvo usando laço while.",
        restrictions: "Evite laço infinito para taxas nulas ou negativas com limite de períodos.",
        inputs: [
          { name: "inicial", label: "Valor Inicial (R$)", type: "number", value: 1000 },
          { name: "taxa", label: "Taxa Mensal (%)", type: "number", value: 1.5 },
          { name: "alvo", label: "Valor Alvo (R$)", type: "number", value: 2000 }
        ],
        run: (data) => {
          const inicial = parseFloat(data.inicial);
          const taxa = parseFloat(data.taxa);
          const alvo = parseFloat(data.alvo);

          if (isNaN(inicial) || inicial <= 0 || isNaN(taxa) || taxa <= 0 || isNaN(alvo) || alvo <= inicial) {
            return { error: "Erro: Insira valores positivos e uma taxa superior a 0% para haver rendimento." };
          }

          let saldo = inicial;
          let meses = 0;
          let relatorio = `📈 SIMULAÇÃO DE INVESTIMENTO\n----------------------------\n`;

          while (saldo < alvo && meses < 600) { // Trava de segurança (50 anos)
            meses++;
            saldo += saldo * (taxa / 100);
            if (meses <= 5 || saldo >= alvo) {
              relatorio += `Mês ${meses.toString().padStart(2, '0')}: R$ ${saldo.toFixed(2)}\n`;
            } else if (meses === 6) {
              relatorio += `... (evoluindo)... \n`;
            }
          }

          relatorio += `----------------------------\nObjetivo atingido em ${meses} meses (${(meses/12).toFixed(1)} anos).\nSaldo Final: R$ ${saldo.toFixed(2)}`;
          return relatorio;
        },
        code: `function exercicio26(inicial, taxa, alvo) {
  if (taxa <= 0 || inicial <= 0) return "Impossível atingir meta";
  let saldo = inicial, meses = 0;
  while (saldo < alvo && meses < 600) {
    meses++;
    saldo += saldo * (taxa / 100);
  }
  return { meses, saldoFinal: saldo };
}`
      },
      {
        id: 27,
        block: "II",
        title: "Geração de Sequência de Fibonacci",
        description: "Apresenta os primeiros N termos da sequência de Fibonacci iterativamente.",
        restrictions: "PROIBIDO utilizar recursão.",
        inputs: [
          { name: "termos", label: "Quantidade de Termos", type: "number", value: 8 }
        ],
        run: (data) => {
          const n = parseInt(data.termos);
          if (isNaN(n) || n <= 0) return { error: "Erro: Quantidade de termos deve ser maior que zero." };

          let a = 0, b = 1;
          let termos = [];
          
          for (let i = 1; i <= n; i++) {
            termos.push(`Posição ${i}: ${a}`);
            const proximo = a + b;
            a = b;
            b = proximo;
          }

          return `🌀 SEQUÊNCIA DE FIBONACCI (${n} termos)\n-------------------------------------\n` + termos.join("\n");
        },
        code: `function exercicio27(qtdTermos) {
  if (qtdTermos <= 0) return [];
  let a = 0, b = 1, resultado = [];
  for (let i = 1; i <= qtdTermos; i++) {
    resultado.push(a);
    let temp = a + b;
    a = b;
    b = temp;
  }
  return resultado;
}`
      },
      {
        id: 28,
        block: "II",
        title: "Verificação de Número Primo",
        description: "Verifica se um número possui exatamente dois divisores positivos usando repetição com parada antecipada.",
        restrictions: "Trate números menores que 2 e utilize break para otimizar o laço.",
        inputs: [
          { name: "num", label: "Número Inteiro para Testar", type: "number", value: 29 }
        ],
        run: (data) => {
          const n = parseInt(data.num);
          if (isNaN(n)) return { error: "Erro: Forneça um número inteiro válido." };

          if (n < 2) {
            return `🔢 TESTE DE NÚMERO PRIMO\n-------------------------\nO número ${n} NÃO é primo (Números primos são inteiros estritamente maiores que 1).`;
          }

          let ehPrimo = true;
          let divisorEncontrado = null;

          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
              ehPrimo = false;
              divisorEncontrado = i;
              break; // Encerra a verificação antecipadamente ao achar o 1º divisor
            }
          }

          if (ehPrimo) {
            return `✨ NÚMERO PRIMO CONFIRMADO!\n----------------------------\nO número ${n} é PRIMO (possui apenas 2 divisores: 1 e ${n}).`;
          } else {
            return `❌ NÃO É PRIMO\n---------------\nO número ${n} não é primo pois é divisível por ${divisorEncontrado}.`;
          }
        },
        code: `function exercicio28(n) {
  if (n < 2) return false;
  let ehPrimo = true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      ehPrimo = false;
      break; // Interrupção antecipada
    }
  }
  return ehPrimo;
}`
      },
      {
        id: 29,
        block: "II",
        title: "Pesquisa de Satisfação",
        description: "Coleta notas de 1 a 5 até o marcador de encerramento (-1) e resume a distribuição.",
        restrictions: "Ignore entradas inválidas usando a instrução continue.",
        inputs: [
          { name: "notas", label: "Notas da Pesquisa (1-5, fim com -1)", type: "text", value: "5, 4, 3, 9, 5, 2, 1, 5, -1" }
        ],
        run: (data) => {
          const arr = data.notas.split(",").map(s => parseInt(s.trim()));
          const freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          let totalValidas = 0;
          let soma = 0;
          let descartadas = 0;

          for (let i = 0; i < arr.length; i++) {
            const nota = arr[i];
            if (nota === -1) break; // Sentinela de parada

            if (isNaN(nota) || nota < 1 || nota > 5) {
              descartadas++;
              continue; // Salta notas fora da faixa 1-5
            }

            freq[nota]++;
            soma += nota;
            totalValidas++;
          }

          if (totalValidas === 0) return { error: "Nenhuma nota válida foi inserida na pesquisa." };

          const media = soma / totalValidas;
          return `📊 PESQUISA DE SATISFAÇÃO\n-------------------------\nTotal de Respostas Válidas: ${totalValidas} (Descartadas: ${descartadas})\nMédia das Notas: ${media.toFixed(2)} / 5.0\n\nDistribuição das Notas:\n⭐ Nota 5 (Excelente): ${freq[5]}\n⭐ Nota 4 (Bom):       ${freq[4]}\n⭐ Nota 3 (Regular):   ${freq[3]}\n⭐ Nota 2 (Ruim):      ${freq[2]}\n⭐ Nota 1 (Péssimo):   ${freq[1]}`;
        },
        code: `function exercicio29(listaValores) {
  let freq = [0, 0, 0, 0, 0, 0]; // posições 1 a 5
  let total = 0, soma = 0;
  for (let i = 0; i < listaValores.length; i++) {
    let nota = listaValores[i];
    if (nota === -1) break;
    if (nota < 1 || nota > 5) continue; // Pula inválidas
    freq[nota]++;
    soma += nota;
    total++;
  }
  return { total, media: total > 0 ? soma/total : 0, freq };
}`
      },
      {
        id: 30,
        block: "II",
        title: "Controle de Caixa Diário",
        description: "Processa operações de entrada e saída mantendo saldo acumulado e alertando se fechar negativo.",
        restrictions: "Impeça lançamentos de valores negativos.",
        inputs: [
          { name: "ops", label: "Operações (ex: E:100, S:30, E:50)", type: "text", value: "E:250, S:100, E:80, S:300" }
        ],
        run: (data) => {
          const opsArr = data.ops.split(",");
          let saldo = 0;
          let qtdEntradas = 0, totalEntradas = 0;
          let qtdSaidas = 0, totalSaidas = 0;

          for (let i = 0; i < opsArr.length; i++) {
            const item = opsArr[i].trim();
            const partes = item.split(":");
            if (partes.length === 2) {
              const tipo = partes[0].toUpperCase();
              const valor = parseFloat(partes[1]);

              if (!isNaN(valor) && valor > 0) {
                if (tipo === "E") {
                  saldo += valor;
                  totalEntradas += valor;
                  qtdEntradas++;
                } else if (tipo === "S") {
                  saldo -= valor;
                  totalSaidas += valor;
                  qtdSaidas++;
                }
              }
            }
          }

          const alertaSaldo = saldo < 0 ? "\n🚨 ATENÇÃO: O caixa encerrou com SALDO NEGATIVO!" : "\n✅ Caixa encerrado com saldo positivo.";
          return `💵 CONTROLE DE CAIXA DIÁRIO\n---------------------------\nEntradas: ${qtdEntradas} op. (Total: R$ ${totalEntradas.toFixed(2)})\nSaídas:   ${qtdSaidas} op. (Total: R$ ${totalSaidas.toFixed(2)})\n---------------------------\nSALDO FINAL: R$ ${saldo.toFixed(2)}${alertaSaldo}`;
        },
        code: `function exercicio30(operacoes) {
  let saldo = 0, eCount = 0, sCount = 0;
  for (let op of operacoes) {
    if (op.valor <= 0) continue;
    if (op.tipo === "E") { saldo += op.valor; eCount++; }
    else if (op.tipo === "S") { saldo -= op.valor; sCount++; }
  }
  return { saldo, eCount, sCount, negativo: saldo < 0 };
}`
      },
      {
        id: 31,
        block: "II",
        title: "Jogo de Adivinhação com Limite de Tentativas",
        description: "Simula o jogo onde o jogador tenta adivinhar o número secreto recebendo dicas de 'Maior' ou 'Menor'.",
        restrictions: "Interrompa a execução ao acertar ou ao esgotar o limite de tentativas.",
        inputs: [
          { name: "secreto", label: "Número Secreto", type: "number", value: 42 },
          { name: "palpites", label: "Palpites do Jogador (separados por vírgula)", type: "text", value: "20, 50, 40, 42" }
        ],
        run: (data) => {
          const secreto = parseInt(data.secreto);
          const arr = data.palpites.split(",").map(s => parseInt(s.trim()));
          const maxTentativas = 5;
          let log = `🎯 JOGO DE ADIVINHAÇÃO (Número Secreto: ${secreto})\n-------------------------------------------------\n`;
          let acertou = false;
          let usadas = 0;

          for (let i = 0; i < arr.length && i < maxTentativas; i++) {
            usadas++;
            const p = arr[i];
            if (isNaN(p)) continue;

            if (p === secreto) {
              log += `Tentativa ${usadas}: ${p} -> 🎉 ACERTOU EM CHEIO!\n`;
              acertou = true;
              break;
            } else if (p < secreto) {
              log += `Tentativa ${usadas}: ${p} -> Tente um número MAIOR ⬆️\n`;
            } else {
              log += `Tentativa ${usadas}: ${p} -> Tente um número MENOR ⬇️\n`;
            }
          }

          log += `-------------------------------------------------\n`;
          log += acertou ? `VITÓRIA! Você venceu em ${usadas} tentativa(s).` : `DERROTA! Você não adivinhou após ${usadas} tentativas.`;
          return log;
        },
        code: `function exercicio31(secreto, listaPalpites) {
  const max = 5;
  let usou = 0, venceu = false;
  for (let i = 0; i < listaPalpites.length && i < max; i++) {
    usou++;
    if (listaPalpites[i] === secreto) { venceu = true; break; }
  }
  return { venceu, tentativas: usou };
}`
      },
      {
        id: 32,
        block: "II",
        title: "Múltiplos num Intervalo",
        description: "Identifica números em um intervalo que são múltiplos simultâneos de dois divisores informados.",
        restrictions: "Trate divisores iguais a zero.",
        inputs: [
          { name: "inicio", label: "Início do Intervalo", type: "number", value: 1 },
          { name: "fim", label: "Fim do Intervalo", type: "number", value: 50 },
          { name: "d1", label: "Divisor 1", type: "number", value: 3 },
          { name: "d2", label: "Divisor 2", type: "number", value: 5 }
        ],
        run: (data) => {
          const ini = parseInt(data.inicio);
          const fim = parseInt(data.fim);
          const d1 = parseInt(data.d1);
          const d2 = parseInt(data.d2);

          if (d1 === 0 || d2 === 0) return { error: "Erro: Os divisores de referência não podem ser zero." };

          let multiplos = [];
          for (let i = ini; i <= fim; i++) {
            if (i % d1 === 0 && i % d2 === 0) {
              multiplos.push(i);
            }
          }

          return `🔢 MÚLTIPLOS SIMULTÂNEOS DE ${d1} E ${d2}\n------------------------------------------\nIntervalo analisado: [${ini} até ${fim}]\nMúltiplos Encontrados: ${multiplos.length > 0 ? multiplos.join(", ") : "Nenhum"}\nTotal de Ocorrências: ${multiplos.length}`;
        },
        code: `function exercicio32(ini, fim, d1, d2) {
  if (d1 === 0 || d2 === 0) return "Divisor zero inválido";
  let lista = [];
  for (let i = ini; i <= fim; i++) {
    if (i % d1 === 0 && i % d2 === 0) lista.push(i);
  }
  return lista;
}`
      },
      {
        id: 33,
        block: "II",
        title: "Padrão Textual com Laços Aninhados",
        description: "Gera um triângulo textual crescente de caracteres controlando linhas e colunas.",
        restrictions: "PROIBIDO o uso do método repeat(). Utilize laços aninhados explícitos.",
        inputs: [
          { name: "linhas", label: "Número de Linhas", type: "number", value: 5 },
          { name: "caractere", label: "Caractere do Padrão", type: "text", value: "*" }
        ],
        run: (data) => {
          const n = parseInt(data.linhas);
          const char = data.caractere.charAt(0) || "*";
          if (isNaN(n) || n <= 0) return { error: "Erro: Insira um número de linhas maior que zero." };

          let figura = `🎨 PADRÃO VISUAL GERADO (Sem .repeat())\n----------------------------------------\n`;
          // Laço externo para as linhas
          for (let i = 1; i <= n; i++) {
            let linhaStr = "";
            // Laço interno aninhado para as colunas
            for (let j = 1; j <= i; j++) {
              linhaStr += char + " ";
            }
            figura += linhaStr + "\n";
          }
          return figura;
        },
        code: `function exercicio33(numLinhas, char = "*") {
  let saida = "";
  for (let i = 1; i <= numLinhas; i++) {
    let linha = "";
    for (let j = 1; j <= i; j++) { // Laço aninhado
      linha += char;
    }
    saida += linha + "\\n";
  }
  return saida;
}`
      },
      {
        id: 34,
        block: "II",
        title: "Processamento de Leituras de Sensor",
        description: "Filtra 20 leituras de sensor e calcula a média apenas dos valores dentro do intervalo operacional.",
        restrictions: "Utilize continue para descartar leituras fora da faixa segura.",
        inputs: [
          { name: "leituras", label: "20 Leituras do Sensor (separadas por vírgula)", type: "text", value: "22, 25, 110, 18, -5, 24, 28, 30, 200, 19, 21, 23, 26, 27, -10, 22, 24, 25, 29, 21" }
        ],
        run: (data) => {
          const arr = data.leituras.split(",").map(s => parseFloat(s.trim()));
          const minOp = 10, maxOp = 50; // Intervalo operacional válido (10°C a 50°C)
          let soma = 0;
          let aceitas = 0;
          let descartadas = 0;

          for (let i = 0; i < arr.length; i++) {
            const v = arr[i];
            if (isNaN(v) || v < minOp || v > maxOp) {
              descartadas++;
              continue; // Descarta e ignora no cálculo
            }
            soma += v;
            aceitas++;
          }

          const media = aceitas > 0 ? soma / aceitas : 0;
          return `📡 FILTRAGEM DE DADOS DO SENSOR\n-------------------------------\nTotal de Leituras Recebidas: ${arr.length}\nLeituras Válidas Aceitas: ${aceitas}\nLeituras Descartadas (Anomalias): ${descartadas}\nMédia Térmica das Válidas: ${media.toFixed(2)} °C`;
        },
        code: `function exercicio34(leituras) {
  const min = 10, max = 50;
  let soma = 0, aceitas = 0, descartes = 0;
  for (let i = 0; i < leituras.length; i++) {
    if (leituras[i] < min || leituras[i] > max) {
      descartes++;
      continue; // Pula anomalia
    }
    soma += leituras[i];
    aceitas++;
  }
  return { aceitas, descartes, media: aceitas > 0 ? soma/aceitas : 0 };
}`
      },

      // ---------------- BLOCO III: VETORES / ARRAYS (35 - 50) ----------------
      {
        id: 35,
        block: "III",
        title: "Cadastro e Análise de Notas em Vetor",
        description: "Armazena notas em um array e calcula estatísticas mapeando as posições acima da média.",
        restrictions: "Utilize percurso de array e exiba os índices explicitamente.",
        inputs: [
          { name: "vetorNotas", label: "Notas do Vetor (vírgulas)", type: "text", value: "7.0, 8.5, 4.0, 9.0, 6.5, 5.0" }
        ],
        run: (data) => {
          const arr = data.vetorNotas.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          if (arr.length === 0) return { error: "Informe notas numéricas válidas." };

          let soma = 0, maior = arr[0], menor = arr[0];
          for (let i = 0; i < arr.length; i++) {
            soma += arr[i];
            if (arr[i] > maior) maior = arr[i];
            if (arr[i] < menor) menor = arr[i];
          }

          const media = soma / arr.length;
          let posicoesAcima = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] > media) posicoesAcima.push(`Índice [${i}] (Nota: ${arr[i]})`);
          }

          return `📊 ANÁLISE DE VETOR DE NOTAS\n----------------------------\nVetor Armazenado: [${arr.join(", ")}]\nMédia Geral: ${media.toFixed(2)}\nMaior Nota: ${maior} | Menor Nota: ${menor}\nNotas Acima da Média:\n- ` + posicoesAcima.join("\n- ");
        },
        code: `function exercicio35(vetor) {
  let soma = 0, maior = vetor[0], menor = vetor[0];
  for (let i = 0; i < vetor.length; i++) {
    soma += vetor[i];
    if (vetor[i] > maior) maior = vetor[i];
    if (vetor[i] < menor) menor = vetor[i];
  }
  const media = soma / vetor.length;
  let posAcima = [];
  for (let i = 0; i < vetor.length; i++) {
    if (vetor[i] > media) posAcima.push(i);
  }
  return { media, maior, menor, posAcima };
}`
      },
      {
        id: 36,
        block: "III",
        title: "Controle de Consumo Mensal em Vetor",
        description: "Registra os 12 consumos mensais de energia e analisa variações sazonais.",
        restrictions: "Mapeie os meses pelos nomes e identifique picos de consumo.",
        inputs: [
          { name: "consumos", label: "12 Consumos Mensais (kWh)", type: "text", value: "220, 240, 210, 190, 180, 175, 170, 185, 195, 205, 230, 260" }
        ],
        run: (data) => {
          const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
          const arr = data.consumos.split(",").map(s => parseFloat(s.trim()));
          if (arr.length < 12) return { error: "Erro: É necessário fornecer os 12 valores de consumo do ano." };

          let totalAnual = 0;
          let idxMaior = 0, idxMenor = 0;

          for (let i = 0; i < 12; i++) {
            totalAnual += arr[i];
            if (arr[i] > arr[idxMaior]) idxMaior = i;
            if (arr[i] < arr[idxMenor]) idxMenor = i;
          }

          const mediaMensal = totalAnual / 12;
          let mesesAcima = [];
          for (let i = 0; i < 12; i++) {
            if (arr[i] > mediaMensal) {
              mesesAcima.push(`${mesesNomes[i]} (${arr[i]} kWh)`);
            }
          }

          return `📅 PAINEL DE CONSUMO ANUAL DE ENERGIA\n---------------------------------------\nConsumo Anual Acumulado: ${totalAnual} kWh\nMédia Mensal: ${mediaMensal.toFixed(1)} kWh\nMês de Maior Consumo: ${mesesNomes[idxMaior]} (${arr[idxMaior]} kWh)\nMês de Menor Consumo: ${mesesNomes[idxMenor]} (${arr[idxMenor]} kWh)\nMeses com consumo acima da média:\n- ` + mesesAcima.join(", ");
        },
        code: `function exercicio36(vetor12Meses) {
  let total = 0, iMaior = 0, iMenor = 0;
  for (let i = 0; i < 12; i++) {
    total += vetor12Meses[i];
    if (vetor12Meses[i] > vetor12Meses[iMaior]) iMaior = i;
    if (vetor12Meses[i] < vetor12Meses[iMenor]) iMenor = i;
  }
  const media = total / 12;
  return { total, media, iMaior, iMenor };
}`
      },
      {
        id: 37,
        block: "III",
        title: "Busca de Produto por Código",
        description: "Executa busca linear manual em vetor para localizar um código de produto.",
        restrictions: "PROIBIDO utilizar indexOf(), includes() ou find(). Interrompa no primeiro resultado.",
        inputs: [
          { name: "codigos", label: "Vetor de Códigos (separados por vírgula)", type: "text", value: "101, 204, 305, 408, 512" },
          { name: "alvo", label: "Código a Buscar", type: "number", value: 305 }
        ],
        run: (data) => {
          const arr = data.codigos.split(",").map(s => parseInt(s.trim()));
          const alvo = parseInt(data.alvo);
          let posicao = -1;

          // Busca manual sem métodos prontos da linguagem
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === alvo) {
              posicao = i;
              break; // Interrompe após localizar o 1º resultado
            }
          }

          if (posicao !== -1) {
            return `🔍 BUSCA DE PRODUTO\n-------------------\nCódigo Procurado: ${alvo}\nStatus: PRODUTO ENCONTRADO!\nPosição no Vetor: Índice [${posicao}]`;
          } else {
            return `🔍 BUSCA DE PRODUTO\n-------------------\nCódigo Procurado: ${alvo}\nStatus: ❌ PRODUTO NÃO CADASTRADO NO SISTEMA`;
          }
        },
        code: `function exercicio37(vetor, codigoProcurado) {
  let pos = -1;
  // Sem indexOf(), includes() ou find()
  for (let i = 0; i < vetor.length; i++) {
    if (vetor[i] === codigoProcurado) {
      pos = i;
      break; // Interrupção imediata
    }
  }
  return pos;
}`
      },
      {
        id: 38,
        block: "III",
        title: "Contagem de Ocorrências em Vetor",
        description: "Mapeia todas as ocorrências e índices de um determinado valor em uma coleção.",
        restrictions: "PROIBIDO usar métodos de busca prontos.",
        inputs: [
          { name: "vetor", label: "Elementos do Vetor", type: "text", value: "5, 2, 8, 5, 3, 5, 9, 1" },
          { name: "alvo", label: "Valor de Referência", type: "number", value: 5 }
        ],
        run: (data) => {
          const arr = data.vetor.split(",").map(s => parseInt(s.trim()));
          const alvo = parseInt(data.alvo);
          let indices = [];

          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === alvo) {
              indices.push(i);
            }
          }

          if (indices.length > 0) {
            return `🎯 RELATÓRIO DE OCORRÊNCIAS\n----------------------------\nValor Pesquisado: ${alvo}\nQuantidade de Ocorrências: ${indices.length} vez(es)\nEncontrado nos Índices: [${indices.join(", ")}]`;
          } else {
            return `🎯 RELATÓRIO DE OCORRÊNCIAS\n----------------------------\nValor Pesquisado: ${alvo}\nNenhuma ocorrência encontrada no vetor.`;
          }
        },
        code: `function exercicio38(vetor, alvo) {
  let posicoes = [];
  for (let i = 0; i < vetor.length; i++) {
    if (vetor[i] === alvo) posicoes.push(i);
  }
  return { contagem: posicoes.length, posicoes };
}`
      },
      {
        id: 39,
        block: "III",
        title: "Separação de Valores Pares e Ímpares",
        description: "Reorganiza um vetor numérico em dois novos vetores (Pares e Ímpares) preservando a ordem original.",
        restrictions: "Mantenha a ordem relativa e exiba os 3 vetores ao final.",
        inputs: [
          { name: "vetor", label: "Vetor Original", type: "text", value: "12, 7, 19, 44, 3, 8, 21" }
        ],
        run: (data) => {
          const orig = data.vetor.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          let pares = [];
          let impares = [];

          for (let i = 0; i < orig.length; i++) {
            if (orig[i] % 2 === 0) {
              pares.push(orig[i]);
            } else {
              impares.push(orig[i]);
            }
          }

          return `🔢 REORGANIZAÇÃO DE VETORES\n---------------------------\nVetor Original: [${orig.join(", ")}]\nVetor de Pares:   [${pares.join(", ")}]\nVetor de Ímpares: [${impares.join(", ")}]`;
        },
        code: `function exercicio39(vetorOrig) {
  let pares = [], impares = [];
  for (let i = 0; i < vetorOrig.length; i++) {
    if (vetorOrig[i] % 2 === 0) pares.push(vetorOrig[i]);
    else impares.push(vetorOrig[i]);
  }
  return { original: vetorOrig, pares, impares };
}`
      },
      {
        id: 40,
        block: "III",
        title: "Remoção Lógica de Duplicados",
        description: "Cria um novo vetor contendo apenas a primeira aparição de cada elemento.",
        restrictions: "PROIBIDO o uso de Set ou métodos prontos de deduplicação.",
        inputs: [
          { name: "vetor", label: "Vetor com Repetições", type: "text", value: "10, 20, 10, 30, 20, 40, 10" }
        ],
        run: (data) => {
          const orig = data.vetor.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          let unicos = [];

          for (let i = 0; i < orig.length; i++) {
            let jaExiste = false;
            // Verificação manual no vetor de únicos
            for (let j = 0; j < unicos.length; j++) {
              if (unicos[j] === orig[i]) {
                jaExiste = true;
                break;
              }
            }
            if (!jaExiste) {
              unicos.push(orig[i]);
            }
          }

          return `🧹 REMOÇÃO DE DUPLICADOS (Sem Set)\n------------------------------------\nVetor Original: [${orig.join(", ")}]\nVetor Limpo:    [${unicos.join(", ")}]`;
        },
        code: `function exercicio40(vetorComDuplicados) {
  let unicos = [];
  for (let i = 0; i < vetorComDuplicados.length; i++) {
    let existe = false;
    for (let j = 0; j < unicos.length; j++) {
      if (unicos[j] === vetorComDuplicados[i]) {
        existe = true; break;
      }
    }
    if (!existe) unicos.push(vetorComDuplicados[i]);
  }
  return unicos;
}`
      },
      {
        id: 41,
        block: "III",
        title: "Inversão Manual de Vetor",
        description: "Inverte a ordem dos elementos de um vetor sem utilizar métodos prontos.",
        restrictions: "PROIBIDO o uso de reverse().",
        inputs: [
          { name: "vetor", label: "Vetor de Entrada", type: "text", value: "A, B, C, D, E" }
        ],
        run: (data) => {
          const orig = data.vetor.split(",").map(s => s.trim());
          let invertido = [];

          // Percorre de trás para frente manualmente
          for (let i = orig.length - 1; i >= 0; i--) {
            invertido.push(orig[i]);
          }

          return `🔄 INVERSÃO DE VETOR (Sem reverse())\n------------------------------------\nVetor Original:  [${orig.join(", ")}]\nVetor Invertido: [${invertido.join(", ")}]`;
        },
        code: `function exercicio41(vetor) {
  let invertido = [];
  for (let i = vetor.length - 1; i >= 0; i--) {
    invertido.push(vetor[i]);
  }
  return invertido;
}`
      },
      {
        id: 42,
        block: "III",
        title: "Ordenação Simples sem Método Pronto",
        description: "Ordena um vetor em ordem crescente utilizando o algoritmo Bubble Sort.",
        restrictions: "PROIBIDO o uso de sort().",
        inputs: [
          { name: "vetor", label: "Vetor Desordenado", type: "text", value: "45, 12, 89, 33, 7, 21" }
        ],
        run: (data) => {
          const arr = data.vetor.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          const copiaOriginal = [...arr];

          // Algoritmo Bubble Sort manual
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
              if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }
          }

          return `📶 ORDENAÇÃO BUBBLE SORT (Sem sort())\n---------------------------------------\nVetor Antes:  [${copiaOriginal.join(", ")}]\nVetor Depois: [${arr.join(", ")}]`;
        },
        code: `function exercicio42(vetor) {
  let arr = [...vetor];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
      },
      {
        id: 43,
        block: "III",
        title: "Ranking de Desempenho",
        description: "Identifica as três maiores pontuações para compor um ranking tratando situações de empate.",
        restrictions: "Evite depender exclusivamente do sort() nativo.",
        inputs: [
          { name: "pontos", label: "Pontuações dos Participantes", type: "text", value: "85, 92, 92, 78, 90, 88" }
        ],
        run: (data) => {
          const arr = data.pontos.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          if (arr.length < 3) return { error: "Informe ao menos 3 pontuações." };

          let p1 = -1, p2 = -1, p3 = -1;

          for (let i = 0; i < arr.length; i++) {
            const v = arr[i];
            if (v > p1) {
              p3 = p2; p2 = p1; p1 = v;
            } else if (v > p2) {
              p3 = p2; p2 = v;
            } else if (v > p3) {
              p3 = v;
            }
          }

          return `🏆 RANKING TOP 3 DESEMPENHO\n---------------------------\nPontuações Recebidas: [${arr.join(", ")}]\n🥇 1º Lugar (Ouro):   ${p1} pts\n🥈 2º Lugar (Prata):  ${p2} pts\n🥉 3º Lugar (Bronce): ${p3} pts`;
        },
        code: `function exercicio43(pontuacoes) {
  let p1 = -1, p2 = -1, p3 = -1;
  for (let v of pontuacoes) {
    if (v > p1) { p3 = p2; p2 = p1; p1 = v; }
    else if (v > p2) { p3 = p2; p2 = v; }
    else if (v > p3) { p3 = v; }
  }
  return { primeiro: p1, segundo: p2, terceiro: p3 };
}`
      },
      {
        id: 44,
        block: "III",
        title: "Análise de Temperaturas Semanais",
        description: "Analisa 14 dias de medições de temperatura e detecta sequências de calor acima da faixa de conforto.",
        restrictions: "Identifique maior sequência consecutiva acima do limite.",
        inputs: [
          { name: "temps", label: "14 Temperaturas (°C)", type: "text", value: "20, 22, 26, 28, 29, 21, 19, 18, 27, 30, 31, 32, 22, 20" },
          { name: "limite", label: "Limite de Conforto (°C)", type: "number", value: 25 }
        ],
        run: (data) => {
          const arr = data.temps.split(",").map(s => parseFloat(s.trim()));
          const limite = parseFloat(data.limite) || 25;
          if (arr.length < 14) return { error: "É necessário informar 14 medições diárias." };

          let soma = 0, abaixo = 0, dentro = 0, acima = 0;
          let seqAtual = 0, maxSeq = 0;

          for (let i = 0; i < 14; i++) {
            const t = arr[i];
            soma += t;

            if (t < 18) abaixo++;
            else if (t <= limite) dentro++;
            else acima++;

            if (t > limite) {
              seqAtual++;
              if (seqAtual > maxSeq) maxSeq = seqAtual;
            } else {
              seqAtual = 0;
            }
          }

          return `🌡️ ANÁLISE DE 14 DIAS DE TEMPERATURA\n------------------------------------\nMédia do Período: ${(soma/14).toFixed(1)} °C\nDias dentro do conforto (18°C a ${limite}°C): ${dentro} dias\nDias com calor acima do limite: ${acima} dias\nMaior sequência consecutiva de dias quentes: ${maxSeq} dia(s) seguidos`;
        },
        code: `function exercicio44(temps14Dias, limiteConforto = 25) {
  let soma = 0, seq = 0, maxSeq = 0;
  for (let t of temps14Dias) {
    soma += t;
    if (t > limiteConforto) {
      seq++; if (seq > maxSeq) maxSeq = seq;
    } else { seq = 0; }
  }
  return { media: soma/14, maxSequenciaQuente: maxSeq };
}`
      },
      {
        id: 45,
        block: "III",
        title: "Carrinho de Compras em Arrays Paralelos",
        description: "Calcula o valor total do carrinho e relaciona produtos e preços por meio de índices em vetores paralelos.",
        restrictions: "Utilize 2 vetores paralelos e valide posições equivalentes.",
        inputs: [
          { name: "prods", label: "Lista de Produtos", type: "text", value: "Arroz, Feijão, Carne, Leite, Café" },
          { name: "precos", label: "Lista de Preços (R$)", type: "text", value: "25.0, 8.5, 42.0, 5.5, 14.0" }
        ],
        run: (data) => {
          const prods = data.prods.split(",").map(s => s.trim());
          const precos = data.precos.split(",").map(s => parseFloat(s.trim()));

          if (prods.length !== precos.length) return { error: "Erro: A quantidade de produtos e preços deve ser igual." };

          let total = 0;
          let idxCaro = 0, idxBarato = 0;

          for (let i = 0; i < prods.length; i++) {
            total += precos[i];
            if (precos[i] > precos[idxCaro]) idxCaro = i;
            if (precos[i] < precos[idxBarato]) idxBarato = i;
          }

          return `🛒 CARRINHO DE COMPRAS (Arrays Paralelos)\n-----------------------------------------\nTotal do Carrinho: R$ ${total.toFixed(2)}\nItem Mais Caro:   ${prods[idxCaro]} (R$ ${precos[idxCaro].toFixed(2)})\nItem Mais Barato: ${prods[idxBarato]} (R$ ${precos[idxBarato].toFixed(2)})`;
        },
        code: `function exercicio45(produtos, precos) {
  let total = 0, iCaro = 0, iBarato = 0;
  for (let i = 0; i < produtos.length; i++) {
    total += precos[i];
    if (precos[i] > precos[iCaro]) iCaro = i;
    if (precos[i] < precos[iBarato]) iBarato = i;
  }
  return { total, itemCaro: produtos[iCaro], itemBarato: produtos[iBarato] };
}`
      },
      {
        id: 46,
        block: "III",
        title: "Fila de Atendimento Simplificada",
        description: "Simula uma fila de atendimento onde novos elementos entram no final e são atendidos no início.",
        restrictions: "Utilize operações de acoplamento de fila sem deixar a fila com estado negativo.",
        inputs: [
          { name: "filaInicial", label: "Fila Inicial", type: "text", value: "Ana, Bruno, Carlos" },
          { name: "operacao", label: "Ação a Simular", type: "select", options: ["Atender Próximo", "Inserir Novo Cliente"], value: "Atender Próximo" },
          { name: "novoNome", label: "Nome do Novo Cliente (se inserindo)", type: "text", value: "Daniela" }
        ],
        run: (data) => {
          let fila = data.filaInicial.split(",").map(s => s.trim()).filter(s => s !== "");
          const op = data.operacao;
          let msg = "";

          if (op === "Atender Próximo") {
            if (fila.length === 0) {
              return "⚠️ A fila está vazia. Nenhum cliente para atender.";
            }
            const atendido = fila.shift(); // Remove o primeiro
            msg = `👤 Cliente Atendido: ${atendido}`;
          } else {
            const novo = data.novoNome.trim();
            if (novo) {
              fila.push(novo); // Insere no final
              msg = `➕ Cliente Adicionado: ${novo}`;
            }
          }

          return `📋 SIMULAÇÃO DE FILA DE ATENDIMENTO\n-----------------------------------\n${msg}\nEstado Atual da Fila: [${fila.join(" -> ")}] (Total: ${fila.length})`;
        },
        code: `function exercicio46(fila, acao, cliente) {
  if (acao === "atender") {
    if (fila.length === 0) return "Fila vazia";
    let atendido = fila.shift();
    return { atendido, filaRestante: fila };
  } else {
    fila.push(cliente);
    return { inserido: cliente, filaAtualizada: fila };
  }
}`
      },
      {
        id: 47,
        block: "III",
        title: "Pesquisa de Dados Acima de um Limite",
        description: "Filtra medições numéricas que superam um limite informado gerando um novo vetor.",
        restrictions: "PROIBIDO utilizar o método filter().",
        inputs: [
          { name: "medicoes", label: "Medições", type: "text", value: "15, 28, 42, 8, 35, 50, 19" },
          { name: "limite", label: "Valor Limite de Corte", type: "number", value: 25 }
        ],
        run: (data) => {
          const orig = data.medicoes.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          const limite = parseFloat(data.limite);
          let filtrados = [];

          // Filtragem manual sem .filter()
          for (let i = 0; i < orig.length; i++) {
            if (orig[i] > limite) {
              filtrados.push(orig[i]);
            }
          }

          const perc = orig.length > 0 ? (filtrados.length / orig.length) * 100 : 0;
          return `🧪 FILTRAGEM MANAL (Sem filter())\n---------------------------------\nVetor Original: [${orig.join(", ")}]\nLimite de Corte: > ${limite}\nValores Aprovados: [${filtrados.join(", ")}]\nRepresentação: ${filtrados.length} de ${orig.length} (${perc.toFixed(1)}%)`;
        },
        code: `function exercicio47(vetor, limite) {
  let selecionados = [];
  for (let i = 0; i < vetor.length; i++) {
    if (vetor[i] > limite) {
      selecionados.push(vetor[i]);
    }
  }
  return selecionados;
}`
      },
      {
        id: 48,
        block: "III",
        title: "Comparação entre Dois Vetores",
        description: "Compara o desempenho posição a posição de duas turmas e determina a equipe vencedora.",
        restrictions: "Compare os vetores em laço e apresente estatísticas relativas.",
        inputs: [
          { name: "turmaA", label: "Notas Turma A", type: "text", value: "8.0, 7.5, 9.0, 6.0, 8.5" },
          { name: "turmaB", label: "Notas Turma B", type: "text", value: "7.0, 8.0, 8.5, 6.5, 7.0" }
        ],
        run: (data) => {
          const a = data.turmaA.split(",").map(s => parseFloat(s.trim()));
          const b = data.turmaB.split(",").map(s => parseFloat(s.trim()));

          if (a.length !== b.length) return { error: "Ambas as turmas devem ter o mesmo número de notas para comparação por posição." };

          let vitoriasA = 0, vitoriasB = 0, empates = 0;
          let somaA = 0, somaB = 0;

          for (let i = 0; i < a.length; i++) {
            somaA += a[i];
            somaB += b[i];

            if (a[i] > b[i]) vitoriasA++;
            else if (b[i] > a[i]) vitoriasB++;
            else empates++;
          }

          const mediaA = somaA / a.length;
          const mediaB = somaB / b.length;
          let campeao = mediaA > mediaB ? "Turma A" : mediaB > mediaA ? "Turma B" : "Empate Técnico";

          return `⚔️ CONFRONTO DIRETO ENTRE TURMAS\n-----------------------------------\nConfrontos Posição a Posição:\n- Turma A superou B: ${vitoriasA} vezes\n- Turma B superou A: ${vitoriasB} vezes\n- Empates na posição: ${empates}\n\nMédia Turma A: ${mediaA.toFixed(2)}\nMédia Turma B: ${mediaB.toFixed(2)}\nGrupo Campeão Geral: 🏆 ${campeao}`;
        },
        code: `function exercicio48(vetorA, vetorB) {
  let winA = 0, winB = 0, emp = 0, sA = 0, sB = 0;
  for (let i = 0; i < vetorA.length; i++) {
    sA += vetorA[i]; sB += vetorB[i];
    if (vetorA[i] > vetorB[i]) winA++;
    else if (vetorB[i] > vetorA[i]) winB++;
    else emp++;
  }
  return { winA, winB, emp, mediaA: sA/vetorA.length, mediaB: sB/vetorA.length };
}`
      },
      {
        id: 49,
        block: "III",
        title: "Matriz Simplificada Representada por Vetores",
        description: "Representa a matriz de consumo de 3 setores durante 5 dias utilizando vetores aninhados.",
        restrictions: "Utilize laços aninhados para totais por setor e por dia.",
        inputs: [
          { name: "matrizStr", label: "Matriz 3x5 (Linhas por ponto e vírgula)", type: "text", value: "10,12,15,11,14; 8,9,11,10,12; 20,22,19,25,21" }
        ],
        run: (data) => {
          const linhas = data.matrizStr.split(";");
          if (linhas.length < 3) return { error: "Informe os 3 setores separados por ponto e vírgula." };

          const matriz = linhas.map(l => l.split(",").map(n => parseFloat(n.trim())));
          let totalSetor = [0, 0, 0];
          let totalDia = [0, 0, 0, 0, 0];
          let maxConsumo = -1, setorPico = 0, diaPico = 0;

          // Laços aninhados para percorrer matriz
          for (let s = 0; s < 3; s++) {
            for (let d = 0; d < 5; d++) {
              const val = matriz[s][d] || 0;
              totalSetor[s] += val;
              totalDia[d] += val;

              if (val > maxConsumo) {
                maxConsumo = val;
                setorPico = s + 1;
                diaPico = d + 1;
              }
            }
          }

          return `🏬 MATRIZ DE CONSUMO DE SETORES (3x5)\n-------------------------------------\nTotal Setor 1: ${totalSetor[0]} kWh | Total Setor 2: ${totalSetor[1]} kWh | Total Setor 3: ${totalSetor[2]} kWh\n\nPico Máximo Individual: ${maxConsumo} kWh (Setor ${setorPico}, Dia ${diaPico})`;
        },
        code: `function exercicio49(matriz3x5) {
  let tSetor = [0, 0, 0], tDia = [0, 0, 0, 0, 0];
  let max = -1, pSetor = 0, pDia = 0;
  for (let s = 0; s < 3; s++) {
    for (let d = 0; d < 5; d++) {
      let v = matriz3x5[s][d];
      tSetor[s] += v; tDia[d] += v;
      if (v > max) { max = v; pSetor = s; pDia = d; }
    }
  }
  return { tSetor, tDia, pico: { valor: max, setor: pSetor, dia: pDia } };
}`
      },
      {
        id: 50,
        block: "III",
        title: "Painel de Eficiência Energética Integrado",
        description: "Desafio integrador final: Processa o consumo de 10+ residências integrando condicionais, repetição e vetores.",
        restrictions: "Integre a classificação por faixas, estatísticas completas e alerta de unidades críticas.",
        inputs: [
          { name: "consumos", label: "Consumo de 10 Residências (kWh)", type: "text", value: "120, 250, 480, 95, 310, 180, 520, 210, 140, 390" }
        ],
        run: (data) => {
          const arr = data.consumos.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          if (arr.length < 10) return { error: "Informe consumos para no mínimo 10 residências." };

          let soma = 0, maior = arr[0], menor = arr[0];
          let faixas = { Baixo: 0, Moderado: 0, Alto: 0, Critico: 0 };
          let unidadesCriticas = [];

          for (let i = 0; i < arr.length; i++) {
            const kwh = arr[i];
            soma += kwh;
            if (kwh > maior) maior = kwh;
            if (kwh < menor) menor = kwh;

            // Classificação por condicionais
            if (kwh <= 100) faixas.Baixo++;
            else if (kwh <= 200) faixas.Moderado++;
            else if (kwh <= 400) faixas.Alto++;
            else {
              faixas.Critico++;
              unidadesCriticas.push(`Unidade #${i+1} (${kwh} kWh)`);
            }
          }

          const media = soma / arr.length;
          return `🌟 DESAFIO INTEGRADOR: PAINEL DE EFICIÊNCIA ENERGÉTICA\n-----------------------------------------------------\nUnidades Processadas: ${arr.length}\nConsumo Médio Geral:  ${media.toFixed(1)} kWh\nMaior Consumo: ${maior} kWh | Menor: ${menor} kWh\n\nDistribuição por Faixas:\n🟢 Baixo Consumo (≤100 kWh):     ${faixas.Baixo} unidades\n🟡 Moderado (101-200 kWh):       ${faixas.Moderado} unidades\n🟠 Alto Consumo (201-400 kWh):   ${faixas.Alto} unidades\n🔴 Crítico (>400 kWh):           ${faixas.Critico} unidades\n\nUnidades em Condição Crítica:\n` + (unidadesCriticas.length > 0 ? "- " + unidadesCriticas.join("\n- ") : "Nenhuma unidade em situação crítica!");
        },
        code: `function exercicio50(vetorConsumos) {
  let soma = 0, maior = vetorConsumos[0], menor = vetorConsumos[0];
  let faixas = { baixo: 0, mod: 0, alto: 0, crit: 0 };
  for (let i = 0; i < vetorConsumos.length; i++) {
    let c = vetorConsumos[i];
    soma += c;
    if (c > maior) maior = c;
    if (c < menor) menor = c;
    if (c <= 100) faixas.baixo++;
    else if (c <= 200) faixas.mod++;
    else if (c <= 400) faixas.alto++;
    else faixas.crit++;
  }
  return { media: soma/vetorConsumos.length, maior, menor, faixas };
}`
      }
    ];


    let currentExerciseId = null;
    let currentFilter = "all";

    document.addEventListener("DOMContentLoaded", () => {
      renderSidebarList();
      setupEventListeners();
    });

    // Renderiza a lista na sidebar
    function renderSidebarList() {
      const listEl = document.getElementById("exerciseList");
      const searchVal = document.getElementById("searchInput").value.toLowerCase().trim();
      listEl.innerHTML = "";

      let visibleCount = 0;

      EXERCISES.forEach(ex => {
        // Filtro por bloco e busca
        const matchBlock = currentFilter === "all" || ex.block === currentFilter;
        const matchSearch = ex.title.toLowerCase().includes(searchVal) || 
                            ex.id.toString().includes(searchVal) ||
                            ex.description.toLowerCase().includes(searchVal);

        if (matchBlock && matchSearch) {
          visibleCount++;
          const btn = document.createElement("button");
          btn.className = `w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
            currentExerciseId === ex.id 
              ? "bg-brand-600/20 border-brand-500/50 text-white" 
              : "border-transparent hover:bg-slate-800/60 text-slate-300 light:hover:bg-slate-100 light:text-slate-700"
          }`;

          const blockColor = ex.block === "I" ? "bg-amber-500/20 text-amber-400" : ex.block === "II" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400";

          btn.innerHTML = `
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${blockColor}">${ex.block}</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold truncate">Ex ${ex.id}: ${ex.title}</div>
              <div class="text-[11px] text-slate-400 truncate">${ex.description}</div>
            </div>
          `;

          btn.addEventListener("click", () => {
            selectExercise(ex.id);
            if (window.innerWidth < 1024) {
              toggleSidebar(false);
            }
          });

          listEl.appendChild(btn);
        }
      });

      document.getElementById("visibleCount").innerText = visibleCount;
    }

    // Seleciona e exibe um exercício individual
    function selectExercise(id) {
      currentExerciseId = id;
      const ex = EXERCISES.find(e => e.id === id);
      if (!ex) return;

      document.getElementById("welcomeCard").classList.add("hidden");
      document.getElementById("batchPanel").classList.add("hidden");
      document.getElementById("exerciseCard").classList.remove("hidden");

      document.getElementById("exBadgeBlock").innerText = `Bloco ${ex.block}`;
      document.getElementById("exIdText").innerText = `Exercício #${ex.id}`;
      document.getElementById("exTitle").innerText = ex.title;
      document.getElementById("exDescription").innerText = ex.description;

      const restEl = document.getElementById("exRestrictions");
      if (ex.restrictions) {
        restEl.innerText = `⚠️ Restrições: ${ex.restrictions}`;
        restEl.classList.remove("hidden");
      } else {
        restEl.classList.add("hidden");
      }

      // Monta inputs dinâmicos
      const container = document.getElementById("formInputsContainer");
      container.innerHTML = "";

      ex.inputs.forEach(input => {
        const fieldWrapper = document.createElement("div");
        fieldWrapper.className = "space-y-1.5";

        const label = document.createElement("label");
        label.className = "text-xs font-medium text-slate-300 light:text-slate-700";
        label.innerText = input.label;

        let inputEl;
        if (input.type === "select") {
          inputEl = document.createElement("select");
          inputEl.className = "w-full px-3 py-2 text-xs md:text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500 light:bg-slate-100 light:border-slate-300 light:text-slate-800";
          input.options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.innerText = opt;
            if (opt === input.value) option.selected = true;
            inputEl.appendChild(option);
          });
        } else {
          inputEl = document.createElement("input");
          inputEl.type = input.type;
          inputEl.value = input.value;
          inputEl.className = "w-full px-3 py-2 text-xs md:text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500 light:bg-slate-100 light:border-slate-300 light:text-slate-800";
        }
        inputEl.dataset.name = input.name;

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(inputEl);
        container.appendChild(fieldWrapper);
      });

      // Esconde resultado prévio e atualiza código
      document.getElementById("resultContainer").classList.add("hidden");
      document.getElementById("codeBlock").innerText = ex.code;

      renderSidebarList();
    }

    // Coleta dados e executa a função do exercício ativo
    function runCurrentExercise() {
      if (!currentExerciseId) return;
      const ex = EXERCISES.find(e => e.id === currentExerciseId);
      if (!ex) return;

      const inputEls = document.querySelectorAll("#formInputsContainer [data-name]");
      const formData = {};
      inputEls.forEach(el => {
        formData[el.dataset.name] = el.value;
      });

      const res = ex.run(formData);
      const resContainer = document.getElementById("resultContainer");
      const resOutput = document.getElementById("resultOutput");

      resContainer.classList.remove("hidden");
      if (typeof res === "object" && res.error) {
        resOutput.className = "p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs md:text-sm";
        resOutput.innerText = res.error;
      } else {
        resOutput.className = "p-4 rounded-xl bg-slate-900 border border-slate-800 light:bg-slate-100 light:border-slate-200 font-mono text-xs md:text-sm text-slate-200 light:text-slate-800 whitespace-pre-wrap";
        resOutput.innerText = typeof res === "string" ? res : JSON.stringify(res, null, 2);
      }
    }

    // Executa o modo Lote (Batch Run) para os 50 exercícios
    function runAllBatch() {
      document.getElementById("welcomeCard").classList.add("hidden");
      document.getElementById("exerciseCard").classList.add("hidden");
      const batchPanel = document.getElementById("batchPanel");
      batchPanel.classList.remove("hidden");

      const tbody = document.getElementById("batchTableBody");
      tbody.innerHTML = "";

      const t0 = performance.now();
      let passed = 0;

      EXERCISES.forEach(ex => {
        // Monta os parâmetros de exemplo
        const sampleData = {};
        ex.inputs.forEach(inp => sampleData[inp.name] = inp.value);

        const res = ex.run(sampleData);
        const isSuccess = !(typeof res === "object" && res.error);
        if (isSuccess) passed++;

        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-800/40 light:hover:bg-slate-100 transition-colors";

        const shortResult = typeof res === "string" ? res.split("\n")[0] : isSuccess ? "Executado com Sucesso" : res.error;

        tr.innerHTML = `
          <td class="p-3 font-mono font-bold text-brand-400">#${ex.id}</td>
          <td class="p-3 font-medium text-slate-200 light:text-slate-800">${ex.title}</td>
          <td class="p-3 font-mono text-slate-400 text-[11px] max-w-[180px] truncate">${JSON.stringify(sampleData)}</td>
          <td class="p-3 font-mono text-slate-300 light:text-slate-600 max-w-[220px] truncate">${shortResult}</td>
          <td class="p-3 text-center">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">
              ${isSuccess ? 'OK' : 'ERRO'}
            </span>
          </td>
        `;
        tbody.appendChild(tr);
      });

      const t1 = performance.now();
      document.getElementById("batchTotal").innerText = EXERCISES.length;
      document.getElementById("batchPassed").innerText = passed;
      document.getElementById("batchFailed").innerText = EXERCISES.length - passed;
      document.getElementById("batchTime").innerText = `${(t1 - t0).toFixed(0)}ms`;
    }

    // Configuração dos Event Listeners
    function setupEventListeners() {
      // Toggle Sidebar Mobile
      document.getElementById("toggleSidebarBtn").addEventListener("click", () => toggleSidebar(true));
      document.getElementById("sidebarOverlay").addEventListener("click", () => toggleSidebar(false));

      // Busca e Filtros
      document.getElementById("searchInput").addEventListener("input", renderSidebarList);
      document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          document.querySelectorAll(".filter-btn").forEach(b => {
            b.className = "filter-btn flex-1 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors light:bg-slate-100 light:text-slate-600";
          });
          e.target.className = "filter-btn active flex-1 py-1 text-xs font-medium rounded-md bg-brand-600 text-white transition-colors";
          currentFilter = e.target.dataset.filter;
          renderSidebarList();
        });
      });

      // Ações do Exercício
      document.getElementById("runSingleBtn").addEventListener("click", runCurrentExercise);
      document.getElementById("fillExampleBtn").addEventListener("click", () => {
        if (currentExerciseId) selectExercise(currentExerciseId);
      });

      // Navegação Anterior / Próximo
      document.getElementById("prevExBtn").addEventListener("click", () => {
        if (currentExerciseId && currentExerciseId > 1) selectExercise(currentExerciseId - 1);
      });
      document.getElementById("nextExBtn").addEventListener("click", () => {
        if (currentExerciseId && currentExerciseId < 50) selectExercise(currentExerciseId + 1);
      });

      // Acordeão do Código
      document.getElementById("toggleCodeBtn").addEventListener("click", () => {
        const codeAccordion = document.getElementById("codeAccordion");
        const icon = document.getElementById("toggleCodeIcon");
        codeAccordion.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
      });

      // Lote
      document.getElementById("runAllBtn").addEventListener("click", runAllBatch);
      document.getElementById("startBatchBtn").addEventListener("click", runAllBatch);

      // Tema Claro / Escuro
      document.getElementById("themeToggleBtn").addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        document.documentElement.classList.toggle("light");
        const isDark = document.documentElement.classList.contains("dark");
        document.getElementById("themeIcon").className = isDark ? "fa-solid fa-moon text-base" : "fa-solid fa-sun text-base text-amber-500";
      });
    }

    function toggleSidebar(open) {
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("sidebarOverlay");
      if (open) {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
      } else {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
      }
    }
