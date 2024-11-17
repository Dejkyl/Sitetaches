import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskForm } from './components/TaskForm';
import { TaskTable } from './components/TaskTable';
import { WeatherWidget } from './components/WeatherWidget';
import { Dashboard } from './components/Dashboard';
import { useTaskStore } from './lib/store';
import { PlusCircle } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">VainTaches</h1>
            <WeatherWidget />
          </div>

          <Tabs defaultValue="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              </TabsList>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm />
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="tasks" className="space-y-6">
              <TaskTable tasks={tasks} />
            </TabsContent>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;