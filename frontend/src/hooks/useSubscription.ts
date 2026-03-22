import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Subscription } from "../types/subs.types";
import { createSubscription, getSubscription } from "../api/subs.api";

interface useSubscriptionReturn {
  subscription: Subscription[] | undefined;
  createSubs: (data: any) => void;
  isLoading: boolean;
  isCreating: boolean;
}

export const useSubscription = (): useSubscriptionReturn => {
  const queryClient = useQueryClient();
  /**
   * fetch data
   */
  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });
  /**
   * create subscription
   */
  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: (newData) => {
      queryClient.setQueryData<Subscription[]>(["subscription"], (old) =>
        old ? [...old, newData] : [newData],
      );
    },
  });

  return {
    subscription,
    createSubs: createMutation.mutate,
    isLoading,
    isCreating: createMutation.isPending,
  };
};
