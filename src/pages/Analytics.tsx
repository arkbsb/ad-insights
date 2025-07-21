import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, PieChart, Calendar, Download, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Analytics = () => {
  const suggestionsList = [
    {
      id: 1,
      type: "warning",
      title: "CPM Alto Detectado",
      description: "Campanha C001 com CPM de R$ 4.50, 58% acima da média do setor",
      action: "Revisar segmentação e criativos"
    },
    {
      id: 2,
      type: "success",
      title: "Performance Excepcional",
      description: "Conteúdo C042 atingiu CPS de R$ 0.18, 40% abaixo da meta",
      action: "Escalar investimento neste criativo"
    },
    {
      id: 3,
      type: "info",
      title: "Oportunidade de Otimização",
      description: "Taxa de reprodução de 95% baixa em campanhas C3",
      action: "Testar ganchos mais envolventes"
    }
  ];

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "warning": return "border-l-4 border-l-warning bg-warning/5";
      case "success": return "border-l-4 border-l-success bg-success/5";
      case "info": return "border-l-4 border-l-primary bg-primary/5";
      default: return "border-l-4 border-l-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Análises avançadas e sugestões de melhorias baseadas em IA</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2028">2028</SelectItem>
              <SelectItem value="2029">2029</SelectItem>
              <SelectItem value="2030">2030</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Custo por Seguidor - Evolução</CardTitle>
            <CardDescription>
              Acompanhe a evolução do CPS dos seus melhores conteúdos ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de linha temporal</p>
                <p className="text-xs text-muted-foreground mt-1">Em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Classificação</CardTitle>
            <CardDescription>
              Performance comparativa entre C1, C2, C3 e C4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de distribuição</p>
                <p className="text-xs text-muted-foreground mt-1">Em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Performers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Melhores Criativos por Etapa do Funil</CardTitle>
          <CardDescription>
            Ranking dinâmico dos conteúdos com melhor performance em cada classificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["C1", "C2", "C3", "C4"].map((classification) => (
              <div key={classification} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Badge 
                    className={
                      classification === "C1" ? "bg-c1 text-white" :
                      classification === "C2" ? "bg-c2 text-white" :
                      classification === "C3" ? "bg-c3 text-white" :
                      "bg-c4 text-white"
                    } 
                    variant="secondary"
                  >
                    {classification}
                  </Badge>
                  <div>
                    <p className="font-medium">
                      {classification === "C1" && "Melhor Custo por Seguidor"}
                      {classification === "C2" && "Melhor Taxa de Engajamento"}
                      {classification === "C3" && "Melhor ThruPlay Rate"}
                      {classification === "C4" && "Melhor Taxa de Conversão"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Conteúdo {classification}00{Math.floor(Math.random() * 9) + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {classification === "C1" && "R$ 0.32"}
                    {classification === "C2" && "12.4%"}
                    {classification === "C3" && "78.2%"}
                    {classification === "C4" && "8.7%"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {classification === "C1" && "por seguidor"}
                    {classification === "C2" && "engajamento"}
                    {classification === "C3" && "thruplay"}
                    {classification === "C4" && "conversão"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Analista de Sugestões IA
          </CardTitle>
          <CardDescription>
            Recomendações inteligentes baseadas nas suas métricas de performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestionsList.map((suggestion) => (
              <div key={suggestion.id} className={`p-4 rounded-lg ${getSuggestionColor(suggestion.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                    <p className="text-sm font-medium">{suggestion.action}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Aplicar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">
              +0.8x vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">7</div>
            <p className="text-xs text-muted-foreground">
              melhorias identificadas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;