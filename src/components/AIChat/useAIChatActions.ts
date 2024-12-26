import { useCallback } from 'react';
import { campaignService } from '../../lib/services/campaignService';
import { leadService } from '../../lib/services/leadService';

export function useAIChatActions() {
  const executeActions = useCallback(async (actions: any[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'create_campaign':
          await campaignService.createCampaign(action.payload);
          break;
        case 'update_lead':
          await leadService.updateLeadStatus(action.payload.id, action.payload.status);
          break;
        // Add more action handlers as needed
      }
    }
  }, []);

  return { executeActions };
}