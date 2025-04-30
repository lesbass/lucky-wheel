import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertPlayerSchema, type InsertPlayer } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function PlayerForm() {
  const queryClient = useQueryClient();
  const form = useForm<InsertPlayer>({
    resolver: zodResolver(insertPlayerSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: addPlayer, isPending } = useMutation({
    mutationFn: async (data: InsertPlayer) => {
      const res = await apiRequest("POST", "/api/players", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
      form.reset();
    },
  });

  const { mutate: clearPlayers, isPending: isClearing } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", "/api/players");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
    },
  });

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => addPlayer(data))} className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter player name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>Add Player</Button>
        </form>
      </Form>
      <Button 
        variant="outline" 
        onClick={() => clearPlayers()} 
        disabled={isClearing}
        className="w-full"
      >
        Clear All Players
      </Button>
    </div>
  );
}
