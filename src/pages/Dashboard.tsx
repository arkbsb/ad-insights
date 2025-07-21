import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, DollarSign, Calendar, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Seguidores Ganhos",
      value: "2,341",
      change: "+15.2%",
      icon: Users,
      color: "text-c1"
    },
    {
      title: "Custo Por Seguidor Médio",
      value: "R$ 0,45",
      change: "-12.8%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Campanhas Ativas",
      value: "8",
      change: "+2",
      icon: Target,
      color: "text-c2"
    },
    {
      title: "ROI Médio",
      value: "4.2x",
      change: "+0.8x",
      icon: TrendingUp,
      color: "text-c3"
    }
  ];

  const bestCreatives = [
    { id: "C001", type: "C1", performance: 92, cost: "R$ 0,32", followers: 145 },
    { id: "C042", type: "C2", performance: 88, cost: "R$ 0,18", engagement: "8.4%" },
    { id: "C023", type: "C3", performance: 85, cost: "R$ 0,22", thruplay: "78%" },
    { id: "C015", type: "C4", performance: 81, cost: "R$ 0,28", completion: "65%" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "C1": return "bg-c1 text-white";
      case "C2": return "bg-c2 text-white";
      case "C3": return "bg-c3 text-white";
      case "C4": return "bg-c4 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do desempenho das suas campanhas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Jan 2025 - Dez 2030
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success font-medium">{stat.change}</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Custo por Seguidor ao Longo do Tempo</CardTitle>
            <CardDescription>
              Evolução do CPS dos seus melhores conteúdos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Gráfico será implementado aqui</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Melhores Criativos</CardTitle>
            <CardDescription>
              Ranking por performance nas etapas do funil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bestCreatives.map((creative) => (
              <div key={creative.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <Badge className={getTypeColor(creative.type)} variant="secondary">
                    {creative.type}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{creative.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Performance: {creative.performance}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{creative.cost}</p>
                  <p className="text-xs text-muted-foreground">
                    {creative.type === "C1" && `${creative.followers} seguidores`}
                    {creative.type === "C2" && `${creative.engagement} eng.`}
                    {creative.type === "C3" && `${creative.thruplay} thruplay`}
                    {creative.type === "C4" && `${creative.completion} compl.`}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-c1/10 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-c1" />
              </div>
              Análise C1
            </CardTitle>
            <CardDescription>
              Otimização de custo por seguidor
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-c2/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-c2" />
              </div>
              Análise C2-C4
            </CardTitle>
            <CardDescription>
              Engajamento e nurturing da audiência
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              Sugestões IA
            </CardTitle>
            <CardDescription>
              Recomendações baseadas em métricas
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;