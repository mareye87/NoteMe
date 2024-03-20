import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "./config/supabaseClient";
import { toast } from "react-toastify";
import { useState } from "react";

export const useFetchGroups = (email) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["groups", email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select()
        .filter("emails", "cs", `{"${email}"}`);
      // .filter("emails", "cs", `{"${email}"}`);
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
  });
  return { isLoading, isError, data };
};

export const useFetchSingleGroup = (id) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["groups", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
  });

  return { isLoading, isError, data };
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async (newGroup) => {
      const { data, error } = await supabase
        .from("groups")
        .insert([newGroup])
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("New group created");
    },
    onError: () => {
      console.log(error.message);
      toast.error("Sorry, there was an error...");
    },
  });
  return { mutate, isError, isPending, error };
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteGroup,
    isLoading: isDeletingGroupPending,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      const { data, error } = await supabase
        .from("groups")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Sorry, there was an error...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group deleted successfully");
    },
  });
  return { deleteGroup, isDeletingGroupPending, error };
};

export const useEditGroup = (id) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: async (group) => {
      const { data, error } = await supabase
        .from("groups")
        .update(group)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Sorry there was an error...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group edited");
    },
  });
  return { mutate, isError, isLoading };
};

export const useFetchNotes = (id) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["notes", { id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("group_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
  });
  return { isLoading, isError, data };
};

export const useFetchSingleNote = (id) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
  });
  return { isLoading, isError, data };
};

export const useCreateNewNote = () => {
  const queryClient = useQueryClient();
  const { mutate: createNote, isLoading: isCreateNotePending } = useMutation({
    mutationFn: async (note) => {
      const { data, error } = await supabase
        .from("notes")
        .insert([note])
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onError: () => {
      console.log(error);
      toast.error("Sorry there was an error...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created");
    },
  });
  return { createNote, isCreateNotePending };
};

export const useEditNote = (id) => {
  const queryClient = useQueryClient();
  const { mutate: editNote, isLoading: isEditNotePending } = useMutation({
    mutationFn: async (note) => {
      const { data, error } = await supabase
        .from("notes")
        .update(note)
        .eq("id", id)
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onError: () => {
      console.log(error);
      toast.error("Sorry there was an error...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note edited");
    },
  });
  return { editNote, isEditNotePending };
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteNote, isLoading: isDeletingTaskPending } = useMutation({
    mutationFn: async (id) => {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data) {
        return data;
      }
    },
    onError: () => {
      console.log(error);
      toast.error("Sorry there was an error...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.info("Note deleted");
    },
  });
  return { deleteNote, isDeletingTaskPending };
};
