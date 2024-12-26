```typescript
import { supabase } from '@/lib/supabase/client';
import type { GeneratedContent, PublishingPlatform } from '../types';

export class ContentSchedulingService {
  static async scheduleContent(
    content: GeneratedContent,
    platform: PublishingPlatform,
    scheduledTime: Date
  ) {
    // Valider la date de programmation
    this.validateScheduledTime(scheduledTime);
    
    // Vérifier les conflits de programmation
    await this.checkSchedulingConflicts(platform, scheduledTime);
    
    // Programmer la publication
    const scheduleId = await this.createSchedule(content, platform, scheduledTime);
    
    return {
      scheduleId,
      content,
      platform,
      scheduledTime
    };
  }

  private static validateScheduledTime(scheduledTime: Date) {
    const now = new Date();
    const minTime = new Date(now.getTime() + 15 * 60 * 1000); // +15 minutes
    const maxTime = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // +90 jours

    if (scheduledTime < minTime) {
      throw new Error('La date de programmation doit être au moins 15 minutes dans le futur');
    }

    if (scheduledTime > maxTime) {
      throw new Error('La date de programmation ne peut pas dépasser 90 jours');
    }
  }

  private static async checkSchedulingConflicts(
    platform: PublishingPlatform,
    scheduledTime: Date
  ) {
    // Vérifier s'il y a déjà du contenu programmé à +/- 1 heure
    const buffer = 60 * 60 * 1000; // 1 heure en millisecondes
    const minTime = new Date(scheduledTime.getTime() - buffer);
    const maxTime = new Date(scheduledTime.getTime() + buffer);

    const { data: existingSchedules } = await supabase
      .from('content_schedules')
      .select('*')
      .eq('platform', platform)
      .gte('scheduled_time', minTime.toISOString())
      .lte('scheduled_time', maxTime.toISOString());

    if (existingSchedules && existingSchedules.length > 0) {
      throw new Error(
        'Il existe déjà du contenu programmé dans cet intervalle de temps'
      );
    }
  }

  private static async createSchedule(
    content: GeneratedContent,
    platform: PublishingPlatform,
    scheduledTime: Date
  ) {
    const { data, error } = await supabase
      .from('content_schedules')
      .insert({
        content_id: content.id,
        platform,
        scheduled_time: scheduledTime.toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  static async getUpcomingSchedules(): Promise<any[]> {
    const { data } = await supabase
      .from('content_schedules')
      .select(`
        *,
        content:content_id (*)
      `)
      .eq('status', 'pending')
      .gte('scheduled_time', new Date().toISOString())
      .order('scheduled_time', { ascending: true });

    return data || [];
  }

  static async cancelSchedule(scheduleId: string) {
    const { error } = await supabase
      .from('content_schedules')
      .delete()
      .eq('id', scheduleId);

    if (error) throw error;
  }

  static async updateSchedule(
    scheduleId: string,
    newScheduledTime: Date
  ) {
    // Valider la nouvelle date
    this.validateScheduledTime(newScheduledTime);

    const { error } = await supabase
      .from('content_schedules')
      .update({
        scheduled_time: newScheduledTime.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', scheduleId);

    if (error) throw error;
  }
}
```