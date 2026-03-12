import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/sessions";
import toast from "react-hot-toast";

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully!!"),
    onError: (error) => {
      (toast.error(error?.response?.data?.message || "failed to create a room"),
        console.log(error));
    },
  });

  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
    onError: (error) => {
      console.error("failed to fetch active sessions", error);
      toast.error(
        error.response?.data?.message || "Unable to load active sessions",
      );
    },
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
    onError: (error) => {
      console.error("failed to fetch recent sessions", error);
      toast.error(
        error.response?.data?.message || "Unable to load your recent sessions",
      );
    },
  });

  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });

  return result;
};

export const useJoinSession = (id) => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    // pass a function that will be called when the mutation runs
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => toast.success("Joined session successfully!!"),
    onError: (error) =>
      toast.error(
        error.response?.data?.message || "failed to join the session",
      ),
  });

  return result;
};

export const useEndSession = (id) => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: () => sessionApi.endSession(id),
    onSuccess: () => toast.success("Session ended successfully!!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "failed to end the session"),
  });

  return result;
};
