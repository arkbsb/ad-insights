
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Project {
  id: number;
  name: string;
  monthly_budget: number;
  current_spend: number;
  status: string;
  created_at: string;
}

interface ProjectCreateDialogProps {
  onCreateProject: (project: Omit<Project, 'id' | 'current_spend' | 'created_at'>) => void;
  triggerText?: string;
}

export const ProjectCreateDialog = ({ onCreateProject, triggerText = "Novo Projeto" }: ProjectCreateDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    monthly_budget: "",
    status: "active"
  });

  const handleCreateProject = () => {
    if (newProject.name && newProject.monthly_budget) {
      onCreateProject({
        name: newProject.name,
        monthly_budget: parseFloat(newProject.monthly_budget),
        status: newProject.status
      });
      setNewProject({ name: "", monthly_budget: "", status: "active" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Configure um novo projeto com orçamento mensal definido
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Projeto</Label>
            <Input
              id="name"
              placeholder="Digite o nome do projeto"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="budget">Orçamento Mensal (R$)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="0.00"
              value={newProject.monthly_budget}
              onChange={(e) => setNewProject({...newProject, monthly_budget: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateProject} className="w-full">
            Criar Projeto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
