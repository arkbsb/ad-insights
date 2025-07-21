
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, FolderOpen, DollarSign, TrendingUp } from "lucide-react";
import { ProjectCreateDialog } from "@/components/ProjectCreateDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: number;
  name: string;
  monthly_budget: number;
  current_spend: number;
  status: string;
  created_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os projetos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "paused": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativo";
      case "paused": return "Pausado";
      case "completed": return "Concluído";
      default: return status;
    }
  };

  const calculateBudgetPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  const handleCreateProject = async (projectData: Omit<Project, 'id' | 'current_spend' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          name: projectData.name,
          monthly_budget: projectData.monthly_budget,
          status: projectData.status
        }])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      toast({
        title: "Sucesso",
        description: "Projeto criado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o projeto",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Sucesso",
        description: "Projeto excluído com sucesso",
      });
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted-foreground">Gerencie seus projetos e orçamentos mensais</p>
        </div>
        
        <ProjectCreateDialog onCreateProject={handleCreateProject} />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Carregando projetos...</p>
          </div>
        ) : (
          projects.map((project) => {
            const budgetPercentage = calculateBudgetPercentage(project.current_spend, project.monthly_budget);
          
          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)} variant="secondary">
                  {getStatusText(project.status)}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Budget Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Orçamento Mensal</span>
                    <span className="text-sm text-muted-foreground">
                      {budgetPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${budgetPercentage > 80 ? 'bg-warning' : budgetPercentage > 60 ? 'bg-primary' : 'bg-success'}`}
                      style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span>R$ {project.current_spend.toLocaleString()}</span>
                    <span>R$ {project.monthly_budget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Gasto</p>
                      <p className="text-sm font-medium">R$ {project.current_spend.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Criado em {new Date(project.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })
        )}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Crie seu primeiro projeto para começar a gerenciar suas campanhas
            </p>
            <ProjectCreateDialog 
              onCreateProject={handleCreateProject} 
              triggerText="Criar Primeiro Projeto" 
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Projects;
