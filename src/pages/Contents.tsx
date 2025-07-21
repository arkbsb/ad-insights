import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FileText, Calendar, Target, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Content {
  id: number;
  name: string;
  project_id: number;
  classification: string;
  reach: number;
  engagement: number;
  followers_before: number;
  followers_after: number;
  start_date: string;
  end_date: string;
  amount_spent: number;
  cpm: number;
  content_id: string;
}

interface Project {
  id: number;
  name: string;
}

const Contents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContents();
    fetchProjects();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Erro ao buscar conteúdos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os conteúdos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const [newContent, setNewContent] = useState({
    name: "",
    project_id: "",
    classification: "C1",
    reach: "",
    engagement: "",
    followers_before: "",
    followers_after: "",
    start_date: "",
    end_date: "",
    amount_spent: "",
    cpm: "",
    content_id: ""
  });

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "C1": return "bg-c1 text-white";
      case "C2": return "bg-c2 text-white";
      case "C3": return "bg-c3 text-white";
      case "C4": return "bg-c4 text-white";
      default: return "bg-muted";
    }
  };

  const calculateCostPerFollower = (spent: number, followersBefore: number, followersAfter: number) => {
    const newFollowers = followersAfter - followersBefore;
    return newFollowers > 0 ? (spent / newFollowers).toFixed(2) : "0.00";
  };

  const handleCreateContent = async () => {
    if (newContent.name && newContent.project_id) {
      try {
        const { data, error } = await supabase
          .from('contents')
          .insert([{
            name: newContent.name,
            project_id: parseInt(newContent.project_id),
            classification: newContent.classification,
            reach: parseInt(newContent.reach) || 0,
            engagement: parseFloat(newContent.engagement) || 0,
            followers_before: parseInt(newContent.followers_before) || 0,
            followers_after: parseInt(newContent.followers_after) || 0,
            start_date: newContent.start_date,
            end_date: newContent.end_date,
            amount_spent: parseFloat(newContent.amount_spent) || 0,
            cpm: parseFloat(newContent.cpm) || 0,
            content_id: newContent.content_id
          }])
          .select()
          .single();

        if (error) throw error;

        setContents([data, ...contents]);
        setNewContent({
          name: "",
          project_id: "",
          classification: "C1",
          reach: "",
          engagement: "",
          followers_before: "",
          followers_after: "",
          start_date: "",
          end_date: "",
          amount_spent: "",
          cpm: "",
          content_id: ""
        });
        toast({
          title: "Sucesso",
          description: "Conteúdo criado com sucesso",
        });
      } catch (error) {
        console.error('Erro ao criar conteúdo:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o conteúdo",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteContent = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContents(contents.filter(c => c.id !== id));
      toast({
        title: "Sucesso",
        description: "Conteúdo excluído com sucesso",
      });
    } catch (error) {
      console.error('Erro ao excluir conteúdo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o conteúdo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conteúdos</h1>
          <p className="text-muted-foreground">Gerencie seus conteúdos e métricas de performance</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Conteúdo</DialogTitle>
              <DialogDescription>
                Adicione um novo conteúdo com suas métricas de performance
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nome do Conteúdo</Label>
                  <Input
                    id="name"
                    placeholder="Digite o nome do conteúdo"
                    value={newContent.name}
                    onChange={(e) => setNewContent({...newContent, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="content_id">ID do Conteúdo</Label>
                  <Input
                    id="content_id"
                    placeholder="Ex: C001"
                    value={newContent.content_id}
                    onChange={(e) => setNewContent({...newContent, content_id: e.target.value})}
                  />
              </div>
              
                <div>
                  <Label htmlFor="project_id">Projeto</Label>
                  <Select value={newContent.project_id} onValueChange={(value) => setNewContent({...newContent, project_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              <div>
                <Label htmlFor="classification">Classificação</Label>
                <Select value={newContent.classification} onValueChange={(value) => setNewContent({...newContent, classification: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C1">C1 - Atrair Seguidores</SelectItem>
                    <SelectItem value="C2">C2 - Nutrir Audiência</SelectItem>
                    <SelectItem value="C3">C3 - Elevar Consciência</SelectItem>
                    <SelectItem value="C4">C4 - Conversão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reach">Alcance</Label>
                <Input
                  id="reach"
                  type="number"
                  placeholder="0"
                  value={newContent.reach}
                  onChange={(e) => setNewContent({...newContent, reach: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="engagement">Engajamento (%)</Label>
                <Input
                  id="engagement"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={newContent.engagement}
                  onChange={(e) => setNewContent({...newContent, engagement: e.target.value})}
                />
              </div>

              <div>
                  <Label htmlFor="followers_before">Seguidores Antes</Label>
                  <Input
                    id="followers_before"
                    type="number"
                    placeholder="0"
                    value={newContent.followers_before}
                    onChange={(e) => setNewContent({...newContent, followers_before: e.target.value})}
                  />
              </div>

              <div>
                  <Label htmlFor="followers_after">Seguidores Depois</Label>
                  <Input
                    id="followers_after"
                    type="number"
                    placeholder="0"
                    value={newContent.followers_after}
                    onChange={(e) => setNewContent({...newContent, followers_after: e.target.value})}
                  />
              </div>

              <div>
                  <Label htmlFor="start_date">Data Início</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={newContent.start_date}
                    onChange={(e) => setNewContent({...newContent, start_date: e.target.value})}
                  />
              </div>

              <div>
                  <Label htmlFor="end_date">Data Fim</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={newContent.end_date}
                    onChange={(e) => setNewContent({...newContent, end_date: e.target.value})}
                  />
              </div>

              <div>
                  <Label htmlFor="amount_spent">Valor Gasto (R$)</Label>
                  <Input
                    id="amount_spent"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newContent.amount_spent}
                    onChange={(e) => setNewContent({...newContent, amount_spent: e.target.value})}
                  />
              </div>

              <div>
                <Label htmlFor="cpm">CPM (R$)</Label>
                <Input
                  id="cpm"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newContent.cpm}
                  onChange={(e) => setNewContent({...newContent, cpm: e.target.value})}
                />
              </div>

              <div className="col-span-2">
                <Button onClick={handleCreateContent} className="w-full">
                  Criar Conteúdo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Conteúdos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os seus conteúdos e suas métricas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead>Novos Seguidores</TableHead>
                <TableHead>Custo/Seguidor</TableHead>
                <TableHead>Valor Gasto</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <p className="text-muted-foreground">Carregando conteúdos...</p>
                  </TableCell>
                </TableRow>
              ) : contents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum conteúdo encontrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                contents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">{content.content_id}</TableCell>
                    <TableCell>{content.name}</TableCell>
                    <TableCell>
                      <Badge className={getClassificationColor(content.classification)} variant="secondary">
                        {content.classification}
                      </Badge>
                    </TableCell>
                    <TableCell>{content.reach.toLocaleString()}</TableCell>
                    <TableCell>{content.engagement}%</TableCell>
                    <TableCell>{content.followers_after - content.followers_before}</TableCell>
                    <TableCell>R$ {calculateCostPerFollower(content.amount_spent, content.followers_before, content.followers_after)}</TableCell>
                    <TableCell>R$ {content.amount_spent.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteContent(content.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conteúdos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contents.length}</div>
            <p className="text-xs text-muted-foreground">
              ativos no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contents.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              pessoas alcançadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguidores Ganhos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contents.reduce((sum, c) => sum + (c.followers_after - c.followers_before), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              novos seguidores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {contents.reduce((sum, c) => sum + c.amount_spent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              em campanhas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contents;