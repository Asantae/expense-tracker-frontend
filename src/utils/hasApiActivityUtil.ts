import { RootState } from "../store/store";

export const hasApiActivity = (state: RootState, actionType: string) =>
  state.api.activeRequests.includes(actionType);
