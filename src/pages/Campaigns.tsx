import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Target, Play, TrendingUp, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Campanha Nutrir Q1",
      projectId: 1,
      contentId: "C002",
      classification: "C2",
      startDate: "2025-01-21",
      endDate: "2025-01-25", 
      reach: 8920,
      engagement: 12.3,
      thruplay: 78.5,
      frequency: 2.1,
      amountSpent: 320.00,
      costPerEngagement: 0.42,
      reproduction25: 85.2,
      reproduction50: 72.8,
      reproduction75: 58.3,
      reproduction95: 42.1,
      reproduction100: 35.7
    },
    {
      id: 2,
      name: "Campanha Consciência Beta",
      projectId: 2,
      contentId: "C003",
      classification: "C3",
      startDate: "2025-01-18",
      endDate: "2025-01-23",
      reach: 12450,
      engagement: 9.8,
      thruplay: 82.1,
      frequency: 1.8,
      amountSpent: 450.00,
      costPerEngagement: 0.38,
      reproduction25: 88.9,
      reproduction50: 76.2,
      reproduction75: 64.1,
      reproduction95: 48.7,
      reproduction100: 41.3
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    projectId: "",
    contentId: "",
    classification: "C2",
    startDate: "",
    endDate: "",
    reach: "",
    engagement: "",
    thruplay: "",
    frequency: "",
    amountSpent: "",
    reproduction25: "",
    reproduction50: "",
    reproduction75: "",
    reproduction95: "",
    reproduction100: ""
  });

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "C2": return "bg-c2 text-white";
      case "C3": return "bg-c3 text-white";
      case "C4": return "bg-c4 text-white";
      default: return "bg-muted";
    }
  };

  const calculateCostPerEngagement = (spent: number, reach: number, engagement: number) => {
    const totalEngagements = reach * (engagement / 100);
    return totalEngagements > 0 ? (spent / totalEngagements).toFixed(2) : "0.00";
  };

  const handleCreateCampaign = () => {
    if (newCampaign.name && newCampaign.projectId) {
      const costPerEngagement = calculateCostPerEngagement(
        parseFloat(newCampaign.amountSpent) || 0,
        parseInt(newCampaign.reach) || 0,
        parseFloat(newCampaign.engagement) || 0
      );

      const campaign = {
        id: campaigns.length + 1,
        name: newCampaign.name,
        projectId: parseInt(newCampaign.projectId),
        contentId: newCampaign.contentId,
        classification: newCampaign.classification,
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
        reach: parseInt(newCampaign.reach) || 0,
        engagement: parseFloat(newCampaign.engagement) || 0,
        thruplay: parseFloat(newCampaign.thruplay) || 0,
        frequency: parseFloat(newCampaign.frequency) || 0,
        amountSpent: parseFloat(newCampaign.amountSpent) || 0,
        costPerEngagement: parseFloat(costPerEngagement),
        reproduction25: parseFloat(newCampaign.reproduction25) || 0,
        reproduction50: parseFloat(newCampaign.reproduction50) || 0,
        reproduction75: parseFloat(newCampaign.reproduction75) || 0,
        reproduction95: parseFloat(newCampaign.reproduction95) || 0,
        reproduction100: parseFloat(newCampaign.reproduction100) || 0
      };

      setCampaigns([...campaigns, campaign]);
      setNewCampaign({
        name: "",
        projectId: "",
        contentId: "",
        classification: "C2",
        startDate: "",
        endDate: "",
        reach: "",
        engagement: "",
        thruplay: "",
        frequency: "",
        amountSpent: "",
        reproduction25: "",
        reproduction50: "",
        reproduction75: "",
        reproduction95: "",
        reproduction100: ""
      });
    }
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
          <p className="text-muted-foreground">Gerencie campanhas C2-C4 focadas em engajamento e nurturing</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Campanha</DialogTitle>
              <DialogDescription>
                Configure uma nova campanha C2-C4 com métricas de engajamento e nurturing
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Label htmlFor="name">Nome da Campanha</Label>
                <Input
                  id="name"
                  placeholder="Digite o nome da campanha"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="projectId">Projeto</Label>
                <Select value={newCampaign.projectId} onValueChange={(value) => setNewCampaign({...newCampaign, projectId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Projeto Alpha</SelectItem>
                    <SelectItem value="2">Projeto Beta</SelectItem>
                    <SelectItem value="3">Projeto Gamma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contentId">ID do Conteúdo</Label>
                <Input
                  id="contentId"
                  placeholder="C001, C002..."
                  value={newCampaign.contentId}
                  onChange={(e) => setNewCampaign({...newCampaign, contentId: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="classification">Classificação</Label>
                <Select value={newCampaign.classification} onValueChange={(value) => setNewCampaign({...newCampaign, classification: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C2">C2 - Nutrir Audiência</SelectItem>
                    <SelectItem value="C3">C3 - Elevar Consciência</SelectItem>
                    <SelectItem value="C4">C4 - Conversão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Data Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="endDate">Data Fim</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="reach">Alcance</Label>
                <Input
                  id="reach"
                  type="number"
                  placeholder="0"
                  value={newCampaign.reach}
                  onChange={(e) => setNewCampaign({...newCampaign, reach: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="engagement">Engajamento (%)</Label>
                <Input
                  id="engagement"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newCampaign.engagement}
                  onChange={(e) => setNewCampaign({...newCampaign, engagement: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="thruplay">ThruPlay (%)</Label>
                <Input
                  id="thruplay"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newCampaign.thruplay}
                  onChange={(e) => setNewCampaign({...newCampaign, thruplay: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="frequency">Frequência</Label>
                <Input
                  id="frequency"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newCampaign.frequency}
                  onChange={(e) => setNewCampaign({...newCampaign, frequency: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="amountSpent">Valor Gasto (R$)</Label>
                <Input
                  id="amountSpent"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newCampaign.amountSpent}
                  onChange={(e) => setNewCampaign({...newCampaign, amountSpent: e.target.value})}
                />
              </div>

              <div className="col-span-3">
                <h4 className="font-medium mb-2">Métricas de Reprodução (%)</h4>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <Label htmlFor="rep25">25%</Label>
                    <Input
                      id="rep25"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newCampaign.reproduction25}
                      onChange={(e) => setNewCampaign({...newCampaign, reproduction25: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep50">50%</Label>
                    <Input
                      id="rep50"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newCampaign.reproduction50}
                      onChange={(e) => setNewCampaign({...newCampaign, reproduction50: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep75">75%</Label>
                    <Input
                      id="rep75"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newCampaign.reproduction75}
                      onChange={(e) => setNewCampaign({...newCampaign, reproduction75: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep95">95%</Label>
                    <Input
                      id="rep95"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newCampaign.reproduction95}
                      onChange={(e) => setNewCampaign({...newCampaign, reproduction95: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep100">100%</Label>
                    <Input
                      id="rep100"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newCampaign.reproduction100}
                      onChange={(e) => setNewCampaign({...newCampaign, reproduction100: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <Button onClick={handleCreateCampaign} className="w-full">
                  Criar Campanha
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Campanhas</CardTitle>
          <CardDescription>
            Campanhas de nurturing e conversão (C2-C4)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead>ThruPlay</TableHead>
                <TableHead>Custo/Eng.</TableHead>
                <TableHead>Valor Gasto</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getClassificationColor(campaign.classification)} variant="secondary">
                      {campaign.classification}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.reach.toLocaleString()}</TableCell>
                  <TableCell>{campaign.engagement}%</TableCell>
                  <TableCell>{campaign.thruplay}%</TableCell>
                  <TableCell>R$ {campaign.costPerEngagement.toFixed(2)}</TableCell>
                  <TableCell>R$ {campaign.amountSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              em execução
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              pessoas alcançadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eng. Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.length > 0 ? 
                (campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length).toFixed(1) : 
                "0.0"
              }%
            </div>
            <p className="text-xs text-muted-foreground">
              taxa de engajamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {campaigns.reduce((sum, c) => sum + c.amountSpent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              total aplicado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Campaigns;